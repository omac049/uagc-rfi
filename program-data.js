/**
 * RFI 2.0 - Program Data
 * Maps areas of interest to specific degree programs
 * Each program includes: name, programId (Salesforce 18-char ID), and conditional flags
 */

const PROGRAM_DATA = {
    'business': [
        // Associate Programs
        { name: 'AA in Business', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'AA in Organizational Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Bachelor Programs
        { name: 'BA in Accounting', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Business Administration', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Business Economics', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Business Information Systems', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Finance', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Human Resources Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Marketing', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Operations Management and Analysis', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Organizational Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Project Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Supply Chain Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Master Programs
        { name: 'M of Accountancy', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'M of Business Administration', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'M of Human Resource Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Organizational Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MS in Finance', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'leadership': [
        // Bachelor Programs
        { name: 'BA in Business Leadership', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Master Programs
        { name: 'MA in Leadership', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'Master of Arts in Leadership', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'information-technology': [
        // Bachelor Programs
        { name: 'BS in Computer Software Technology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BS in Cyber and Data Security Technology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BS in Information Technology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Master Programs
        { name: 'M of Information Systems Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MS in Technology Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'education': [
        // Associate Programs
        { name: 'AA in Early Childhood Education', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Bachelor Programs
        { name: 'BA in Child Development', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Early Childhood Development with Differentiated Instruction', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Early Childhood Education', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Early Childhood Education Administration', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Education Studies', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Instructional Design', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Master Programs
        { name: 'MA in Early Childhood Education Leadership', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Education', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Special Education', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'Master of Arts in Teaching and Learning w/ Technology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MS in Instructional Design and Technology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        // Post-Baccalaureate
        { name: 'Post-Baccalaureate Teaching Certification', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'health-human-services': [
        // Bachelor Programs
        { name: 'BA in Applied Behavioral Science', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Health and Human Services', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Health and Wellness', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Health Care Administration', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Psychology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BS in Health Information Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BS in Nursing', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate', requiresRnLicense: true },
        // Master Programs
        { name: 'M of Public Health', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Health Care Administration', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Human Services', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MA in Psychology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' },
        { name: 'MS in Health Informatics and Analytics', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'criminal-justice': [
        // Associate Programs
        { name: 'AA in Military Studies', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Bachelor Programs
        { name: 'BA in Homeland Security and Emergency Management', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Social and Criminal Justice', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        // Master Programs
        { name: 'MS in Criminal Justice', programId: 'a0Axxxxxxxxxxxxxxx', level: 'graduate' }
    ],
    
    'liberal-arts': [
        // Bachelor Programs
        { name: 'BA in Communication Studies', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Liberal Arts', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Social Science', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' },
        { name: 'BA in Sociology', programId: 'a0Axxxxxxxxxxxxxxx', level: 'undergraduate' }
    ]
};

// Export for use in form.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROGRAM_DATA;
}
