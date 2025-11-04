# RFI 2.0 API Integration Documentation

## Overview

This document details the integration between the RFI 2.0 form and the Lead API / Salesforce CRM.

---

## API Endpoint Configuration

### Production
```
POST https://api.uagc.edu/v1/leads
Content-Type: application/json
```

### Staging (for testing)
```
POST https://staging-api.uagc.edu/v1/leads
Content-Type: application/json
```

---

## Request Payload

### Sample Request

```json
{
  "areaOfInterest": "business",
  "degreeProgram": "Bachelor of Arts in Business Administration",
  "programId": "a0A5f000000XyZ1EAK",
  "rnLicense": null,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "5551234567",
  "state": "CA",
  "militaryStatus": "no",
  "tcpaConsent": true,
  "vendor": "uagc-homegrown",
  "formType": "rfi-2.0",
  "partnerId": "",
  "partnerName": "",
  "submittedAt": "2025-10-31T14:30:00.000Z",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "referrer": "https://www.google.com/"
}
```

### Field Specifications

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| `areaOfInterest` | String | Yes | 50 | Kebab-case category (e.g., "business", "health-human-services") |
| `degreeProgram` | String | Yes | 200 | Full program name |
| `programId` | String | Yes | 18 | Salesforce 18-character Program ID |
| `rnLicense` | String | No | 10 | "yes", "no", or null (only for nursing programs) |
| `firstName` | String | Yes | 50 | Prospective student's first name |
| `lastName` | String | Yes | 50 | Prospective student's last name |
| `email` | String | Yes | 100 | Valid email address |
| `phone` | String | Yes | 10 | 10 digits, no formatting |
| `state` | String | Yes | 2 | Two-letter state code (e.g., "CA") |
| `militaryStatus` | String | No | 20 | "yes", "no", or "prefer-not-to-say" |
| `tcpaConsent` | Boolean | Yes | - | Must be true |
| `vendor` | String | Yes | 50 | Always "uagc-homegrown" |
| `formType` | String | Yes | 20 | Always "rfi-2.0" |
| `partnerId` | String | No | 50 | Partner tracking ID (if applicable) |
| `partnerName` | String | No | 100 | Partner name (if applicable) |
| `submittedAt` | String | Yes | - | ISO 8601 timestamp |
| `userAgent` | String | No | 500 | Browser user agent string |
| `referrer` | String | No | 500 | Document referrer URL |

---

## Response Formats

### Success Response (200 OK)

```json
{
  "success": true,
  "leadId": "00Q5f000000YzW1EAK",
  "message": "Lead created successfully",
  "timestamp": "2025-10-31T14:30:01.234Z"
}
```

### Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid email format",
  "field": "email",
  "timestamp": "2025-10-31T14:30:01.234Z"
}
```

### Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Unable to process request at this time",
  "timestamp": "2025-10-31T14:30:01.234Z"
}
```

---

## Salesforce Field Mapping

### Lead Object Fields

| API Field | Salesforce Field | Field Type | Notes |
|-----------|-----------------|------------|-------|
| `firstName` | `FirstName` | Text(50) | Standard field |
| `lastName` | `LastName` | Text(50) | Standard field |
| `email` | `Email` | Email | Standard field |
| `phone` | `Phone` | Phone | Standard field |
| `state` | `State` | Text(2) | Standard address field |
| `programId` | `Program__c` | Lookup | Custom lookup to Program object |
| `degreeProgram` | `Program_Name__c` | Text(200) | Custom field for display |
| `areaOfInterest` | `Area_of_Interest__c` | Picklist | Custom picklist |
| `militaryStatus` | `Military_Affiliated__c` | Picklist | Custom picklist |
| `rnLicense` | `RN_Licensed__c` | Picklist | Custom picklist |
| `tcpaConsent` | `TCPA_Consent__c` | Checkbox | Custom checkbox |
| `partnerId` | `Partner_ID__c` | Text(50) | Custom field |
| `partnerName` | `Partner_Name__c` | Text(100) | Custom field |
| `vendor` | `Lead_Source_Detail__c` | Text(50) | Custom field |
| `formType` | `Form_Version__c` | Text(20) | Custom field for tracking |
| `userAgent` | `User_Agent__c` | Text(500) | Custom field |
| `referrer` | `Referrer_URL__c` | URL | Custom field |

### Picklist Values

**Area_of_Interest__c:**
- Business
- Education
- Liberal Arts
- Health & Human Services
- Criminal Justice
- Information Technology
- Communication & Humanities
- Leadership
- Sciences & Mathematics
- Human & Behavioral Performance

**Military_Affiliated__c:**
- Yes
- No
- Prefer Not to Say

**RN_Licensed__c:**
- Yes
- No

---

## Error Handling

### Client-Side (form.js)

The form handles errors gracefully:

1. **Validation Errors**: Displayed inline under fields
2. **Network Errors**: Alert shown to user
3. **API Errors**: Alert with message to retry or contact support

### Retry Logic

```javascript
// Implement exponential backoff for retries
async function submitWithRetry(data, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await submitToAPI(data);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await delay(Math.pow(2, i) * 1000); // 1s, 2s, 4s
        }
    }
}
```

---

## Authentication

### API Key (if required)

If your API requires authentication:

```javascript
const response = await fetch(CONFIG.apiEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key-here', // Add if needed
        'Authorization': 'Bearer token-here' // Or Bearer token
    },
    body: JSON.stringify(data)
});
```

---

## Rate Limiting

**Expected Limits:**
- 100 requests per minute per IP
- 10,000 requests per day per IP

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635789600
```

---

## CORS Configuration

For cross-domain requests, ensure these headers are set on the API:

```
Access-Control-Allow-Origin: https://www.uagc.edu
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-API-Key
Access-Control-Max-Age: 86400
```

---

## Testing

### Test Mode

Enable test mode in `form.js`:

```javascript
const CONFIG = {
    apiEndpoint: '/api/lead',
    enableAnalytics: true,
    testMode: true  // Prevents actual API calls
};
```

### cURL Test

```bash
curl -X POST https://api.uagc.edu/v1/leads \
  -H "Content-Type: application/json" \
  -d '{
    "areaOfInterest": "business",
    "degreeProgram": "Bachelor of Arts in Business Administration",
    "programId": "a0A5f000000XyZ1EAK",
    "rnLicense": null,
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "5551234567",
    "state": "CA",
    "militaryStatus": "no",
    "tcpaConsent": true,
    "vendor": "uagc-homegrown",
    "formType": "rfi-2.0",
    "partnerId": "",
    "partnerName": "",
    "submittedAt": "2025-10-31T14:30:00.000Z",
    "userAgent": "Test",
    "referrer": ""
  }'
```

### Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "RFI 2.0 API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Submit Lead",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"areaOfInterest\": \"business\",\n  \"degreeProgram\": \"Bachelor of Arts in Business Administration\",\n  \"programId\": \"a0A5f000000XyZ1EAK\",\n  \"firstName\": \"John\",\n  \"lastName\": \"Smith\",\n  \"email\": \"john.smith@example.com\",\n  \"phone\": \"5551234567\",\n  \"state\": \"CA\",\n  \"militaryStatus\": \"no\",\n  \"tcpaConsent\": true,\n  \"vendor\": \"uagc-homegrown\",\n  \"formType\": \"rfi-2.0\",\n  \"submittedAt\": \"2025-10-31T14:30:00.000Z\"\n}"
        },
        "url": {
          "raw": "https://api.uagc.edu/v1/leads",
          "protocol": "https",
          "host": ["api", "uagc", "edu"],
          "path": ["v1", "leads"]
        }
      }
    }
  ]
}
```

---

## Webhooks (Optional)

If you want to receive notifications when leads are created:

### Webhook Endpoint Setup

```javascript
// On your server
app.post('/webhooks/lead-created', (req, res) => {
    const { leadId, email, program } = req.body;
    
    // Process webhook
    console.log(`New lead created: ${leadId}`);
    
    // Send to email automation, Slack, etc.
    
    res.status(200).json({ received: true });
});
```

---

## Monitoring

### Key Metrics to Track

1. **API Response Time**: Should be < 500ms
2. **Error Rate**: Should be < 1%
3. **Success Rate**: Should be > 99%

### Logging

Log these events for debugging:

```javascript
// Success
console.log('Lead submitted', {
    leadId: response.leadId,
    program: formData.degreeProgram,
    timestamp: new Date().toISOString()
});

// Error
console.error('API Error', {
    status: error.status,
    message: error.message,
    formData: formData,
    timestamp: new Date().toISOString()
});
```

---

## Security Considerations

### Data Validation

- All input is sanitized on the server
- Email format validated with regex
- Phone number must be exactly 10 digits
- State code validated against allowed list

### PII Protection

- Form data transmitted over HTTPS only
- No sensitive data logged to console in production
- User data not stored in browser localStorage

### TCPA Compliance

- Consent checkbox required before submission
- Consent timestamp recorded
- Consent text clearly displayed

---

## Sample Integration Code

### Node.js/Express Backend

```javascript
const express = require('express');
const jsforce = require('jsforce');
const app = express();

app.use(express.json());

app.post('/api/lead', async (req, res) => {
    try {
        // Validate request
        if (!req.body.email || !req.body.tcpaConsent) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Missing required fields'
            });
        }

        // Connect to Salesforce
        const conn = new jsforce.Connection({
            loginUrl: process.env.SF_LOGIN_URL
        });
        
        await conn.login(
            process.env.SF_USERNAME,
            process.env.SF_PASSWORD + process.env.SF_TOKEN
        );

        // Create Lead
        const result = await conn.sobject('Lead').create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Phone: req.body.phone,
            State: req.body.state,
            Program__c: req.body.programId,
            Program_Name__c: req.body.degreeProgram,
            Area_of_Interest__c: req.body.areaOfInterest,
            Military_Affiliated__c: req.body.militaryStatus,
            RN_Licensed__c: req.body.rnLicense,
            TCPA_Consent__c: req.body.tcpaConsent,
            Lead_Source_Detail__c: req.body.vendor,
            Form_Version__c: req.body.formType,
            Partner_ID__c: req.body.partnerId,
            Partner_Name__c: req.body.partnerName
        });

        // Return success
        res.json({
            success: true,
            leadId: result.id,
            message: 'Lead created successfully',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

app.listen(3000, () => {
    console.log('API server running on port 3000');
});
```

---

## Troubleshooting

### Common Issues

**Issue: CORS Error**
- **Solution**: Ensure API has proper CORS headers set
- **Check**: Browser console for specific CORS error

**Issue: 401 Unauthorized**
- **Solution**: Verify API key/authentication token
- **Check**: API credentials in environment variables

**Issue: 400 Bad Request**
- **Solution**: Check payload format matches API spec
- **Check**: Console log the payload before sending

**Issue: Lead not appearing in Salesforce**
- **Solution**: Verify Program ID is correct 18-char format
- **Check**: Salesforce lead object and field mappings

---

## Contact

**API Support:**
- Email: api-support@uagc.edu
- Documentation: https://api.uagc.edu/docs

**Salesforce Integration:**
- Salesforce Admin: salesforce@uagc.edu
- Instance: https://uagc.lightning.force.com

---

*Document Last Updated: October 31, 2025*
