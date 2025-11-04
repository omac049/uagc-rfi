/**
 * Thank You Page Personalization
 * Retrieves user data from URL parameters or localStorage and personalizes the page
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Thank You Page Initialized');
    
    // Get user data from URL parameters or localStorage
    const userData = getUserData();
    
    // Personalize the page
    if (userData) {
        personalizePage(userData);
    }
    
    // Setup CTA buttons
    setupCTAButtons(userData);
    
    // Track page view
    trackPageView();
});

/**
 * Get user data from URL parameters or localStorage
 */
function getUserData() {
    // Try URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    
    const userData = {
        firstName: urlParams.get('firstName') || '',
        lastName: urlParams.get('lastName') || '',
        email: urlParams.get('email') || '',
        educationLevel: urlParams.get('educationLevel') || '',
        programName: urlParams.get('programName') || '',
        programId: urlParams.get('programId') || ''
    };
    
    // If no URL params, try localStorage (from RFI form submission)
    if (!userData.firstName) {
        try {
            const storedData = localStorage.getItem('uagc_rfi_submission');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                Object.assign(userData, parsed);
            }
        } catch (e) {
            console.error('Could not retrieve stored data:', e);
        }
    }
    
    return userData;
}

/**
 * Personalize the page with user data
 */
function personalizePage(userData) {
    // Personalize user name
    const userNameEl = document.getElementById('userName');
    if (userNameEl && userData.firstName) {
        userNameEl.textContent = userData.firstName;
    }
    
    // Personalize email in timeline
    const userEmailEl = document.getElementById('userEmail');
    if (userEmailEl && userData.email) {
        userEmailEl.textContent = userData.email;
    }
    
    // Personalize program information
    const programTitleEl = document.getElementById('programTitle');
    const programLevelEl = document.getElementById('programLevel');
    
    if (programTitleEl && userData.programName) {
        programTitleEl.textContent = userData.programName;
    }
    
    if (programLevelEl && userData.educationLevel) {
        const levelText = userData.educationLevel === 'undergraduate' ? 'Undergraduate Program' : 'Graduate Program';
        programLevelEl.textContent = levelText;
    }
    
    console.log('Page personalized for:', userData.firstName, userData.programName);
}

/**
 * Setup CTA buttons with appropriate links
 */
function setupCTAButtons(userData) {
    const btnStartApplication = document.getElementById('btnStartApplication');
    const btnLearnMore = document.getElementById('btnLearnMore');
    
    if (btnStartApplication) {
        // Link to application page with program pre-selected
        let applicationUrl = 'https://www.uagc.edu/apply';
        
        if (userData && userData.programId) {
            applicationUrl += `?programId=${encodeURIComponent(userData.programId)}`;
        }
        
        btnStartApplication.href = applicationUrl;
        
        // Track click
        btnStartApplication.addEventListener('click', function() {
            trackEvent('start_application_clicked', {
                program: userData.programName,
                source: 'thank_you_page'
            });
        });
    }
    
    if (btnLearnMore) {
        // Link to program page
        let programUrl = getProgramUrl(userData);
        btnLearnMore.href = programUrl;
        
        // Track click
        btnLearnMore.addEventListener('click', function() {
            trackEvent('learn_more_clicked', {
                program: userData.programName,
                source: 'thank_you_page'
            });
        });
    }
}

/**
 * Get program URL based on program name and level
 */
function getProgramUrl(userData) {
    if (!userData || !userData.programName) {
        return 'https://www.uagc.edu/online-degrees';
    }
    
    // Create URL-friendly slug from program name
    const slug = userData.programName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    
    // Construct program URL
    const baseUrl = 'https://www.uagc.edu';
    const programUrl = `${baseUrl}/online-degrees/${slug}`;
    
    return programUrl;
}

/**
 * Open chat (if chat system is available)
 */
function openChat() {
    // Check if chat widget exists
    if (typeof window.LiveChat !== 'undefined') {
        window.LiveChat.open();
    } else if (typeof window.$zopim !== 'undefined') {
        window.$zopim.livechat.window.show();
    } else {
        // Fallback to contact page
        window.location.href = 'https://www.uagc.edu/contact';
    }
    
    trackEvent('chat_opened', { source: 'thank_you_page' });
}

// Make openChat available globally
window.openChat = openChat;

/**
 * Track page view for analytics
 */
function trackPageView() {
    trackEvent('thank_you_page_viewed', {
        timestamp: new Date().toISOString()
    });
}

/**
 * Track analytics events
 */
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel (if available)
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, eventData);
    }
    
    // Console log for development
    console.log(`Analytics Event: ${eventName}`, eventData);
}

/**
 * Clear stored RFI data (cleanup after successful submission)
 */
function clearStoredData() {
    try {
        localStorage.removeItem('uagc_rfi_draft');
        localStorage.removeItem('uagc_rfi_submission');
        console.log('Stored RFI data cleared');
    } catch (e) {
        console.error('Could not clear stored data:', e);
    }
}

// Clear the draft after 5 seconds (give time for personalization to load)
setTimeout(clearStoredData, 5000);
