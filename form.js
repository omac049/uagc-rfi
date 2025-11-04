/**
 * RFI 2.0 - Form Logic with Enhanced UX AI
 * Intelligent assistance to help users complete the form successfully
 */

// Configuration
const CONFIG = {
    apiEndpoint: '/api/lead',  // Update with actual Lead API endpoint
    enableAnalytics: true,
    testMode: true,  // Set to true for testing without API calls
    autoSaveEnabled: true,
    helpTipsEnabled: true,
    completionTimeEstimate: 180 // seconds
};

// UX AI State
let currentStep = 1;
let selectedProgram = null;
let formStartTime = null;
let fieldInteractionTimes = {};
let fieldAttempts = {};
let autoSaveInterval = null;
let userStrugglingFields = new Set();
let lastActiveTime = Date.now();
let completionEstimate = CONFIG.completionTimeEstimate;
let userEngaged = false;  // Track if user has interacted with the form

// DOM Elements
const form = document.getElementById('rfiForm');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const btnNext = document.getElementById('btnNext');
const btnBack = document.getElementById('btnBack');
const btnSubmit = document.getElementById('btnSubmit');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const loadingOverlay = document.getElementById('loadingOverlay');
const successMessage = document.getElementById('successMessage');

// Form Fields
const educationLevel = document.getElementById('educationLevel');
const degreeProgram = document.getElementById('degreeProgram');
const rnLicenseGroup = document.getElementById('rnLicenseGroup');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const state = document.getElementById('state');
const tcpaConsent = document.getElementById('tcpaConsent');
const programId = document.getElementById('programId');

/**
 * Initialize the form with UX AI enhancements
 */
function init() {
    // Track form start time
    formStartTime = Date.now();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UX AI features
    initUXAIFeatures();
    
    // Track analytics - form viewed
    trackEvent('form_viewed', { step: 1 });
    
    // Check for URL parameters (for partner pages)
    checkUrlParameters();
    
    // Load saved form data if available
    loadSavedFormData();
    
    // Set up engagement detection (messages only appear after user interacts)
    setupEngagementDetection();
    
    console.log('RFI 2.0 Form with UX AI Initialized');
}

/**
 * Initialize UX AI Features
 */
function initUXAIFeatures() {
    // Create and inject smart help UI elements
    createSmartHelpUI();
    
    // Enable auto-save
    if (CONFIG.autoSaveEnabled) {
        startAutoSave();
    }
    
    // Note: Activity tracking is now only enabled after user engagement
    
    // Initialize field-level assistance
    setupFieldAssistance();
    
    // Add progress encouragement
    setupProgressEncouragement();
    
    // Add field completion indicators (NEW)
    addFieldStatusIndicators();
    
    // Initialize form completion tracking (NEW)
    updateFormCompletion();
    
    // Initialize Step 2 enhancements (NEW)
    initStep2Enhancements();
}

/**
 * Initialize Step 2 Enhancement Features
 */
function initStep2Enhancements() {
    // Edit Program Button
    const editProgramBtn = document.getElementById('editProgramBtn');
    if (editProgramBtn) {
        editProgramBtn.addEventListener('click', () => {
            goToStep(1);
        });
    }
    
    // Consent Details Toggle
    const consentDetailsBtn = document.getElementById('consentDetailsBtn');
    const consentDetails = document.getElementById('consentDetails');
    if (consentDetailsBtn && consentDetails) {
        consentDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (consentDetails.style.display === 'none') {
                consentDetails.style.display = 'block';
                consentDetailsBtn.textContent = 'Show less';
            } else {
                consentDetails.style.display = 'none';
                consentDetailsBtn.textContent = 'Learn more';
            }
        });
    }
}

/**
 * Create Smart Help UI Components
 */
function createSmartHelpUI() {
    // Create floating help button
    const helpButton = document.createElement('div');
    helpButton.className = 'smart-help-button';
    helpButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="help-badge" style="display: none;">!</span>
    `;
    helpButton.title = 'Need help? Click for assistance';
    helpButton.onclick = showContextualHelp;
    document.querySelector('.rfi-container').appendChild(helpButton);
    
    // Create smart tip container
    const tipContainer = document.createElement('div');
    tipContainer.className = 'smart-tip-container';
    tipContainer.id = 'smartTipContainer';
    tipContainer.style.display = 'none';
    document.querySelector('.rfi-container').appendChild(tipContainer);
}

/**
 * Setup Field-Level Assistance
 */
function setupFieldAssistance() {
    const allInputs = form.querySelectorAll('input, select, textarea');
    
    allInputs.forEach(field => {
        // Track when user focuses on field
        field.addEventListener('focus', (e) => handleFieldFocus(e.target));
        
        // Track when user leaves field
        field.addEventListener('blur', (e) => handleFieldBlur(e.target));
        
        // Track typing patterns for assistance
        if (field.tagName === 'INPUT') {
            field.addEventListener('input', (e) => handleFieldInput(e.target));
        }
        
        // Initialize field tracking
        const fieldId = field.id || field.name;
        if (fieldId) {
            fieldInteractionTimes[fieldId] = { focus: 0, blur: 0, totalTime: 0 };
            fieldAttempts[fieldId] = 0;
        }
    });
}

/**
 * Handle field focus with smart assistance
 */
function handleFieldFocus(field) {
    const fieldId = field.id || field.name;
    if (!fieldId) return;
    
    // Track focus time
    fieldInteractionTimes[fieldId].focus = Date.now();
    fieldAttempts[fieldId]++;
    
    // Update last active time
    lastActiveTime = Date.now();
    
    // Show contextual help based on field and user behavior
    showFieldHelp(field);
    
    // If user has attempted this field multiple times, offer extra help
    if (fieldAttempts[fieldId] > 2 && !userStrugglingFields.has(fieldId)) {
        userStrugglingFields.add(fieldId);
        showStrugglingHelp(field);
    }
}

/**
 * Handle field blur tracking
 */
function handleFieldBlur(field) {
    const fieldId = field.id || field.name;
    if (!fieldId || !fieldInteractionTimes[fieldId]) return;
    
    // Track blur time and calculate interaction duration
    fieldInteractionTimes[fieldId].blur = Date.now();
    const interactionTime = fieldInteractionTimes[fieldId].blur - fieldInteractionTimes[fieldId].focus;
    fieldInteractionTimes[fieldId].totalTime += interactionTime;
    
    // If user spent too long on field (>30 seconds), they might need help
    if (interactionTime > 30000 && field.value === '') {
        showStrugglingHelp(field);
    }
}

/**
 * Handle field input for smart suggestions
 */
function handleFieldInput(field) {
    const fieldId = field.id || field.name;
    
    // Provide smart suggestions based on field type
    switch (fieldId) {
        case 'email':
            suggestEmailDomain(field);
            break;
        case 'phone':
            // Already handled by formatPhoneNumber
            break;
        case 'firstName':
        case 'lastName':
            validateNameInput(field);
            break;
    }
    
    // Clear any previous error as user types
    if (field.value.length > 0) {
        clearError(field);
    }
}

/**
 * Show contextual help for current field
 */
function showFieldHelp(field) {
    if (!CONFIG.helpTipsEnabled) return;
    
        const fieldId = field.id || field.name;
    const helpMessages = {
        'educationLevel': {
            title: 'Choosing Your Education Level',
            message: 'Select undergraduate for associate\'s or bachelor\'s degrees, or graduate for master\'s or doctoral programs.',
            icon: '🎓'
        },
        'degreeProgram': {
            title: 'Select Your Degree Program',
            message: 'Choose the specific degree that matches your educational goals. Each program is designed for working adults and offers flexible online learning.',                                                                        
            icon: '📚'
        },
        'firstName': {
            title: 'Your First Name',
            message: 'Enter your legal first name as it appears on official documents.',
            icon: '👤'
        },
        'email': {
            title: 'Email Address',
            message: 'We\'ll send program information and admission details to this email. Make sure it\'s an address you check regularly.',
            icon: '📧'
        },
        'phone': {
            title: 'Phone Number',
            message: 'An admissions counselor will contact you at this number to answer questions and guide you through the enrollment process.',
            icon: '📱'
        },
        'state': {
            title: 'Your State',
            message: 'This helps us provide you with relevant program availability and state-specific information.',
            icon: '📍'
        }
    };
    
    const helpInfo = helpMessages[fieldId];
    if (helpInfo && userEngaged) {
        showSmartTip(helpInfo.message, helpInfo.title, helpInfo.icon);
    }
}

/**
 * Show help for users struggling with a field
 */
function showStrugglingHelp(field) {
    const fieldId = field.id || field.name;
    
        const strugglingMessages = {
        'educationLevel': 'Not sure which level? Choose undergraduate if you\'re starting or completing a bachelor\'s degree, or graduate if you already have a bachelor\'s and want an advanced degree.',
        'degreeProgram': 'Not sure which degree is right for you? Our admissions counselors can help! For now, choose the one that sounds most interesting.',   
        'email': 'Need an email address? Consider creating a free Gmail, Outlook, or Yahoo account to use for your education journey.',
        'phone': 'Enter your phone number in this format: (555) 123-4567. We\'ll only contact you about your educational opportunities.',
        'state': 'Select the state where you currently live. This helps us provide you with relevant program information.'
    };
    
        const message = strugglingMessages[fieldId];
    if (message && userEngaged) {
        showSmartTip(message, '💡 Need Help?', '🆘', 'warning');
        
        // Track that we offered help
        trackEvent('help_offered', { field: fieldId, attempts: fieldAttempts[fieldId] });                                                                       
    }
}

/**
 * Show smart tip notification
 */
function showSmartTip(message, title = 'Tip', icon = '💡', type = 'info') {
    const tipContainer = document.getElementById('smartTipContainer');
    if (!tipContainer) return;
    
    tipContainer.className = `smart-tip-container ${type}`;
    tipContainer.innerHTML = `
        <div class="smart-tip-content">
            <div class="smart-tip-icon">${icon}</div>
            <div class="smart-tip-text">
                <strong class="smart-tip-title">${title}</strong>
                <p class="smart-tip-message">${message}</p>
            </div>
            <button class="smart-tip-close" onclick="this.closest('.smart-tip-container').style.display='none'">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    tipContainer.style.display = 'block';
    
    // Auto-hide after 10 seconds unless it's a warning
    if (type !== 'warning') {
        setTimeout(() => {
            tipContainer.style.display = 'none';
        }, 10000);
    }
}

/**
 * Show contextual help modal
 */
function showContextualHelp() {
    const currentField = document.activeElement;
    const helpContent = getContextualHelpContent();
    
    const helpModal = `
        <div class="help-modal-overlay" onclick="closeHelpModal()">
            <div class="help-modal" onclick="event.stopPropagation()">
                <div class="help-modal-header">
                    <h3>📋 Form Assistance</h3>
                    <button class="help-modal-close" onclick="closeHelpModal()">×</button>
                </div>
                <div class="help-modal-body">
                    ${helpContent}
                </div>
                <div class="help-modal-footer">
                    <p class="help-contact">Need more help? Call us at <strong>1-866-711-1700</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.id = 'helpModalContainer';
    modalContainer.innerHTML = helpModal;
    document.body.appendChild(modalContainer);
    
    // Track help viewed
    trackEvent('help_modal_opened', { step: currentStep });
}

/**
 * Get contextual help content based on current step
 */
function getContextualHelpContent() {
    if (currentStep === 1) {
        return `
            <h4>Step 1: Program Selection</h4>
            <div class="help-section">
                <p><strong>Area of Interest:</strong> Choose the field you want to study. This could be related to your current career or a new field you want to explore.</p>
                <p><strong>Degree Program:</strong> After selecting an area, choose the specific degree. Consider:</p>
                <ul>
                    <li>Your career goals</li>
                    <li>Bachelor's (undergraduate) vs. Master's (graduate) programs</li>
                    <li>Programs that match your interests</li>
                </ul>
            </div>
            <div class="help-section">
                <h5>Popular Programs:</h5>
                <ul>
                    <li><strong>Business:</strong> MBA, Business Administration, Accounting</li>
                    <li><strong>Healthcare:</strong> Nursing (RN to BSN), Healthcare Administration</li>
                    <li><strong>Education:</strong> Early Childhood Education, Educational Leadership</li>
                    <li><strong>Technology:</strong> Information Technology, Cybersecurity</li>
                </ul>
            </div>
        `;
    } else {
        return `
            <h4>Step 2: Contact Information</h4>
            <div class="help-section">
                <p>We need your contact information so our admissions team can:</p>
                <ul>
                    <li>Send you detailed program information</li>
                    <li>Answer your questions about enrollment</li>
                    <li>Help you understand financial aid options</li>
                    <li>Guide you through the application process</li>
                </ul>
            </div>
            <div class="help-section">
                <p><strong>Your Privacy:</strong> We value your privacy. Your information is secure and will only be used by UAGC for educational opportunities. We won't share it with third parties.</p>
            </div>
            <div class="help-section">
                <h5>What Happens Next?</h5>
                <ol>
                    <li>You'll receive an email with program details</li>
                    <li>An admissions counselor will call you within 1-2 business days</li>
                    <li>They'll answer your questions and help you start your journey</li>
                </ol>
            </div>
        `;
    }
}

/**
 * Close help modal
 */
function closeHelpModal() {
    const modalContainer = document.getElementById('helpModalContainer');
    if (modalContainer) {
        modalContainer.remove();
    }
}

/**
 * Email domain suggestion
 */
function suggestEmailDomain(field) {
    const value = field.value.toLowerCase();
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    
    if (value.includes('@') && !value.includes('.')) {
        const parts = value.split('@');
        if (parts[1]) {
            const matches = commonDomains.filter(domain => domain.startsWith(parts[1]));
            if (matches.length > 0) {
                showEmailSuggestion(field, parts[0], matches[0]);
            }
        }
    }
}

/**
 * Show email domain suggestion
 */
function showEmailSuggestion(field, username, domain) {
    let suggestionEl = document.getElementById('emailSuggestion');
    
    if (!suggestionEl) {
        suggestionEl = document.createElement('div');
        suggestionEl.id = 'emailSuggestion';
        suggestionEl.className = 'email-suggestion';
        field.parentElement.appendChild(suggestionEl);
    }
    
    suggestionEl.innerHTML = `
        Did you mean <strong>${username}@${domain}</strong>?
        <button type="button" class="suggestion-accept" onclick="acceptEmailSuggestion('${username}@${domain}')">
            Use this
        </button>
    `;
    suggestionEl.style.display = 'block';
}

/**
 * Accept email suggestion
 */
function acceptEmailSuggestion(suggestion) {
    email.value = suggestion;
    const suggestionEl = document.getElementById('emailSuggestion');
    if (suggestionEl) {
        suggestionEl.style.display = 'none';
    }
    trackEvent('email_suggestion_accepted', { suggestion });
}

// Make function available globally
window.acceptEmailSuggestion = acceptEmailSuggestion;
window.closeHelpModal = closeHelpModal;

/**
 * Validate name input (no numbers or special characters)
 */
function validateNameInput(field) {
    const value = field.value;
    const hasInvalidChars = /[0-9!@#$%^&*(),.?":{}|<>]/.test(value);
    
    if (hasInvalidChars && userEngaged) {
        showSmartTip(
            'Names should only contain letters, spaces, hyphens, and apostrophes.',                                                                             
            '⚠️ Invalid Characters',
            '⚠️',
            'warning'
        );
    }
}

/**
 * Setup Progress Encouragement
 */
function setupProgressEncouragement() {
    // Show encouragement messages at key points
    const encouragementPoints = [
        { trigger: 'area_selected', message: 'Great choice! 🎯 Now let\'s find your perfect program.' },
        { trigger: 'program_selected', message: 'Excellent! 👏 You\'re halfway there. Just need your contact info.' },
        { trigger: 'step_completed', message: 'Almost done! 🚀 Last step - your contact information.' }
    ];
    
    // Store in window for access
    window.encouragementPoints = encouragementPoints;
}

/**
 * Show encouragement message
 */
function showEncouragement(message) {
    if (userEngaged) {
        showSmartTip(message, '✨ Progress Update', '✨', 'success');
    }
}

/**
 * Setup engagement detection - only activate help features after user interacts
 */
function setupEngagementDetection() {
    const formFields = form.querySelectorAll('input, select, textarea');
    
    const handleFirstInteraction = () => {
        if (!userEngaged) {
            userEngaged = true;
            console.log('User engaged with form - activating help features');
            
            // Show welcome message after user starts interacting
            showWelcomeMessage();
            
            // Start activity tracking
            setupActivityTracking();
            
            // Remove listeners after first interaction
            formFields.forEach(field => {
                field.removeEventListener('focus', handleFirstInteraction);
                field.removeEventListener('click', handleFirstInteraction);
            });
        }
    };
    
    // Listen for first interaction with any form field
    formFields.forEach(field => {
        field.addEventListener('focus', handleFirstInteraction, { once: true });
        field.addEventListener('click', handleFirstInteraction, { once: true });
    });
}

/**
 * Show welcome message
 */
function showWelcomeMessage() {
    setTimeout(() => {
        showSmartTip(
            'Welcome! We\'ll help you every step of the way. 😊',
            '👋 Welcome!',
            '👋',
            'info'
        );
    }, 1000);
}

/**
 * Setup Activity Tracking for Abandonment Detection
 */
function setupActivityTracking() {
    // Track mouse movement and keyboard activity
    let inactivityTimer;
    
    const resetInactivityTimer = () => {
        lastActiveTime = Date.now();
        clearTimeout(inactivityTimer);
        
        // If inactive for 60 seconds, offer help
        inactivityTimer = setTimeout(() => {
            if (!successMessage.style.display || successMessage.style.display === 'none') {
                offerAbandonmentHelp();
            }
        }, 60000);
    };
    
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    
    // Initial timer
    resetInactivityTimer();
}

/**
 * Offer help when user seems to be abandoning form
 */
function offerAbandonmentHelp() {
    // Only offer help if user has engaged with the form
    if (!userEngaged) return;
    
    // Check if form has any data
    const hasData = educationLevel.value || firstName.value || email.value;
    
    if (hasData) {
        showSmartTip(
            'Still here? Need any help completing the form? Click the help button (?) if you have questions!',                                              
            '🤔 Need Assistance?',
            '🆘',
            'warning'
        );
        
        // Show help badge
        const helpBadge = document.querySelector('.help-badge');
        if (helpBadge) {
            helpBadge.style.display = 'block';
        }
        
        trackEvent('abandonment_help_offered', { step: currentStep });
    }
}

/**
 * Auto-save form data to localStorage
 */
function startAutoSave() {
    autoSaveInterval = setInterval(() => {
        saveFormData();
    }, 10000); // Save every 10 seconds
}

/**
 * Save form data to localStorage
 */
function saveFormData() {
    const formData = {
        educationLevel: educationLevel.value,
        degreeProgram: degreeProgram.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        state: state.value,
        timestamp: Date.now(),
        step: currentStep
    };
    
    try {
        localStorage.setItem('uagc_rfi_draft', JSON.stringify(formData));
    } catch (e) {
        console.error('Could not save form data:', e);
    }
}

/**
 * Load saved form data from localStorage
 */
function loadSavedFormData() {
    try {
        const savedData = localStorage.getItem('uagc_rfi_draft');
        if (!savedData) return;
        
        const formData = JSON.parse(savedData);
        
        // Check if data is less than 7 days old
        const daysSinceLastSave = (Date.now() - formData.timestamp) / (1000 * 60 * 60 * 24);
        if (daysSinceLastSave > 7) {
            localStorage.removeItem('uagc_rfi_draft');
            return;
        }
        
        // Restore form data
        if (formData.educationLevel) {
            educationLevel.value = formData.educationLevel;
            handleEducationLevelChange();
        }
        if (formData.degreeProgram) {
            degreeProgram.value = formData.degreeProgram;
            handleProgramChange();
        }
        if (formData.firstName) firstName.value = formData.firstName;
        if (formData.lastName) lastName.value = formData.lastName;
        if (formData.email) email.value = formData.email;
        if (formData.phone) phone.value = formData.phone;
        if (formData.state) state.value = formData.state;
        
                // Show notification only if user has engaged
        if (userEngaged) {
            showSmartTip(
                'We restored your previous progress! You can continue where you left off.',                                                                         
                '💾 Progress Restored',
                '💾',
                'success'
            );
        }
        
        trackEvent('form_data_restored', { daysSinceLastSave });
    } catch (e) {
        console.error('Could not load saved form data:', e);
    }
}

/**
 * Clear saved form data
 */
function clearSavedFormData() {
    try {
        localStorage.removeItem('uagc_rfi_draft');
    } catch (e) {
        console.error('Could not clear saved form data:', e);
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Education Level change
    educationLevel.addEventListener('change', handleEducationLevelChange);
    
    // Degree Program change
    degreeProgram.addEventListener('change', handleProgramChange);
    
    // Phone number formatting
    phone.addEventListener('input', formatPhoneNumber);
    
    // Navigation buttons
    btnNext.addEventListener('click', handleNextStep);
    btnBack.addEventListener('click', handleBackStep);
    
    // Form submission
    form.addEventListener('submit', handleSubmit);
    
    // Real-time validation on blur
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });
}

/**
 * Populate degree program options based on education level
 * Gets ALL programs across all areas filtered by level
 */
function populateDegreeOptions(level) {
    // Collect all programs across all areas
    let allPrograms = [];
    
    Object.keys(PROGRAM_DATA).forEach(area => {
        const areaPrograms = PROGRAM_DATA[area];
        areaPrograms.forEach(program => {
            allPrograms.push({
                ...program,
                area: area // Keep track of which area this program belongs to
            });
        });
    });
    
    // Filter programs by education level
    const programs = allPrograms.filter(program => program.level === level);
    
    // Sort programs alphabetically by name for better UX
    programs.sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear existing options
    degreeProgram.innerHTML = '<option value="">Select Your Degree*</option>';
    
    // Add filtered programs
    programs.forEach((program, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = program.name;
        option.dataset.programId = program.programId;
        option.dataset.requiresRn = program.requiresRnLicense || false;
        option.dataset.area = program.area; // Store area for reference
        degreeProgram.appendChild(option);
    });
    
    console.log(`Populated ${programs.length} ${level} programs across all areas`);
}

/**
 * Format phone number as user types
 */
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
}

/**
 * Handle education level change - enables and filters degree programs
 */
function handleEducationLevelChange() {
    const selectedLevel = educationLevel.value;
    
    if (!selectedLevel) {
        degreeProgram.disabled = true;
        degreeProgram.innerHTML = '<option value="">Select Your Degree*</option>';
        rnLicenseGroup.style.display = 'none';
        return;
    }
    
    // Enable and populate degree dropdown with ALL programs filtered by education level
    degreeProgram.disabled = false;
    populateDegreeOptions(selectedLevel);
    
    // Clear previous selection
    degreeProgram.value = '';
    selectedProgram = null;
    rnLicenseGroup.style.display = 'none';
    
    // Clear errors
    clearError(degreeProgram);
    
    // Show encouragement
    const levelText = selectedLevel === 'undergraduate' ? 'undergraduate' : 'graduate';
    showEncouragement(`Great! Now select your ${levelText} program.`);
    
    // Track analytics
    trackEvent('education_level_selected', { level: selectedLevel });
}

/**
 * Handle Degree Program selection
 */
function handleProgramChange() {
    const selectedIndex = degreeProgram.value;
    
    if (!selectedIndex || selectedIndex === '') {
        rnLicenseGroup.style.display = 'none';
        selectedProgram = null;
        return;
    }
    
    // Get selected program data from the dropdown option
    const selectedOption = degreeProgram.options[degreeProgram.selectedIndex];
    selectedProgram = {
        name: selectedOption.textContent,
        programId: selectedOption.dataset.programId,
        requiresRnLicense: selectedOption.dataset.requiresRn === 'true',
        area: selectedOption.dataset.area
    };
    
    // Set hidden program ID field
    programId.value = selectedProgram.programId;
    
    // Show RN license question if nursing program
    if (selectedProgram.requiresRnLicense) {
        rnLicenseGroup.style.display = 'block';
    } else {
        rnLicenseGroup.style.display = 'none';
    }
    
    // Clear error
    clearError(degreeProgram);
    
    // Show encouragement
    const encouragement = window.encouragementPoints?.find(p => p.trigger === 'program_selected');
    if (encouragement) {
        showEncouragement(encouragement.message);
    }
    
    // Track analytics
    trackEvent('program_selected', { 
        area: selectedArea, 
        program: selectedProgram.name 
    });
    
        console.log('Selected program:', selectedProgram);
}

/**
 * Handle Next Step button
 */
function handleNextStep(e) {
    e.preventDefault();
    
    // Validate Step 1 fields
    const isValid = validateStep1();
    
        if (!isValid) {
        // Show helpful error message
        if (userEngaged) {
            showSmartTip(
                'Please complete all required fields before continuing. Look for the red error messages below.',                                                    
                '⚠️ Required Fields Missing',
                '⚠️',
                'warning'
            );
        }
        
        // Scroll to first error
        const firstError = step1.querySelector('.form-error.show');
        if (firstError) {
            firstError.closest('.form-group').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        return;
    }
    
    // Move to Step 2
    goToStep(2);
    
    // Show encouragement
    const encouragement = window.encouragementPoints?.find(p => p.trigger === 'step_completed');
    if (encouragement) {
        showEncouragement(encouragement.message);
    }
    
    // Track analytics
    trackEvent('step_completed', { 
        step: 1,
        educationLevel: educationLevel.value,
        area: selectedProgram?.area,
        program: selectedProgram?.name 
    });
}

/**
 * Handle Back Step button
 */
function handleBackStep(e) {
    e.preventDefault();
    goToStep(1);
}

/**
 * Navigate to specific step
 */
function goToStep(stepNumber) {
    // Hide all steps
    step1.classList.remove('active');
    step2.classList.remove('active');
    
    // Show target step
    if (stepNumber === 1) {
        step1.classList.add('active');
        currentStep = 1;
    } else {
        step2.classList.add('active');
        currentStep = 2;
    }
    
    // Update progress bar
    updateProgress(stepNumber);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus first field
    setTimeout(() => {
        const firstField = document.querySelector('.form-step.active input, .form-step.active select');
        if (firstField) firstField.focus();
    }, 300);
}

/**
 * Update progress indicator with enhanced visual feedback
 */
function updateProgress(step) {
    const percentage = (step / 2) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `Step ${step} of 2`;
    
    // Update percentage display if it exists
    const progressPercentage = document.querySelector('.progress-percentage');
    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }
    
    // Celebrate completion
    if (percentage === 100) {
        progressFill.style.background = 'linear-gradient(90deg, #10B981 0%, #059669 100%)';
    }
}

/**
 * Calculate and update form completion percentage
 */
function updateFormCompletion() {
    const allRequiredFields = form.querySelectorAll('[required]');
    let completedFields = 0;
    
    allRequiredFields.forEach(field => {
        if (field.type === 'checkbox') {
            if (field.checked) completedFields++;
        } else if (field.value && field.value.trim() !== '') {
            completedFields++;
        }
    });
    
    const completionPercentage = Math.round((completedFields / allRequiredFields.length) * 100);
    
    // Update completion badge if it exists
    const completionBadge = document.querySelector('.completion-percentage');
    if (completionBadge) {
        completionBadge.textContent = completionPercentage + '%';
    }
    
    return completionPercentage;
}

/**
 * Add field completion indicators (checkmarks)
 */
function addFieldStatusIndicators() {
    const allInputs = form.querySelectorAll('.form-input, .form-select');
    
    allInputs.forEach(field => {
        // Add status indicator element if it doesn't exist
        let statusIndicator = field.parentElement.querySelector('.field-status');
        if (!statusIndicator) {
            statusIndicator = document.createElement('span');
            statusIndicator.className = 'field-status';
            field.parentElement.appendChild(statusIndicator);
        }
        
        // Update status on input
        field.addEventListener('blur', () => {
            if (validateField(field)) {
                statusIndicator.textContent = '✓';
                statusIndicator.className = 'field-status valid';
                field.classList.add('touched');
                updateFormCompletion();
            } else if (field.value) {
                statusIndicator.textContent = '✗';
                statusIndicator.className = 'field-status invalid';
                field.classList.add('touched');
            } else {
                statusIndicator.className = 'field-status';
                statusIndicator.textContent = '';
            }
        });
        
        // Also update on input for better feedback
        field.addEventListener('input', () => {
            if (field.classList.contains('touched')) {
                if (validateField(field)) {
                    statusIndicator.textContent = '✓';
                    statusIndicator.className = 'field-status valid';
                    updateFormCompletion();
                }
            }
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    // Clear previous error
    clearError(field);
    
    // Skip if field doesn't exist or is not visible
    if (!field || field.offsetParent === null) {
        return true;
    }
    
    const fieldName = field.name || field.id;
    
    // Checkbox validation (for TCPA consent) - handle first
    if (field.type === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
            showError(field, 'You must agree to continue');
            return false;
        }
        return true;
    }
    
    const value = field.value ? field.value.trim() : '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || fieldName;
        showError(field, `${label} is required`);
        return false;
    }
    
    // Skip further validation if field is empty and not required
    if (!value && !field.hasAttribute('required')) {
        return true;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.id === 'phone' && value) {
        // Remove all non-digit characters for validation
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
            showError(field, 'Please enter a valid 10-digit phone number');
            return false;
        }
    }
    
    // Select/dropdown validation
    if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
        if (!value || value === '') {
            const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || fieldName;
            showError(field, `Please select a ${label.toLowerCase()}`);
            return false;
        }
    }
    
    // Text field minimum length
    if ((field.type === 'text' || field.tagName === 'TEXTAREA') && value) {
        if (value.length < 2) {
            const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || fieldName;
            showError(field, `${label} must be at least 2 characters`);
            return false;
        }
    }
    
    return true;
}

/**
 * Validate Step 1 fields
 */
function validateStep1() {
    let isValid = true;
    
    // Validate Education Level
    if (!validateField(educationLevel)) {
        isValid = false;
    }
    
    // Validate Degree Program
    if (!validateField(degreeProgram)) {
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate Step 2 fields
 */
function validateStep2() {
    let isValid = true;
    
    // Required fields
    const fieldsToValidate = [firstName, lastName, email, phone, state, tcpaConsent];
    
    fieldsToValidate.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Navigate to specific step
 */
function goToStep(stepNumber) {
    // Hide all steps
    step1.classList.remove('active');
    step2.classList.remove('active');
    
    // Show target step
    if (stepNumber === 1) {
        step1.classList.add('active');
        currentStep = 1;
    } else {
        step2.classList.add('active');
        currentStep = 2;
        
        // Show step summary with previous selections
        showStepSummary();
    }
    
    // Update progress bar
    updateProgress(stepNumber);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus first field
    setTimeout(() => {
        const firstField = document.querySelector('.form-step.active input, .form-step.active select');
        if (firstField) firstField.focus();
    }, 300);
}

/**
 * Show summary of Step 1 selections in Step 2
 */
function showStepSummary() {
    const summaryContainer = document.getElementById('stepSummary');
    const summaryContent = document.getElementById('stepSummaryContent');
    
    if (!summaryContainer || !summaryContent) return;
    
    // Get selected values
    const levelText = educationLevel.options[educationLevel.selectedIndex]?.text;
    const programText = degreeProgram.options[degreeProgram.selectedIndex]?.text;
    
    if (levelText && programText) {
        summaryContent.innerHTML = `
            <div class="step-summary-item">
                <span class="step-summary-icon">✓</span>
                <strong>${levelText}</strong> - ${programText}
            </div>
        `;
        summaryContainer.style.display = 'block';
    }
}

/**
 * Show error message for field
 */
function showError(field, message) {
    const fieldName = field.name || field.id;
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.classList.add('error');
        
        // Announce to screen readers
        errorElement.setAttribute('role', 'alert');
    }
}

/**
 * Clear error message for field
 */
function clearError(field) {
    const fieldName = field.name || field.id;
    const errorElement = document.getElementById(`${fieldName}Error`);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate Step 2
    const isValid = validateStep2();
    
    if (!isValid) {
        // Scroll to first error
        const firstError = step2.querySelector('.form-error.show');
        if (firstError) {
            firstError.closest('.form-group').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
        return;
    }
    
    // Disable submit button
    btnSubmit.disabled = true;
    
    // Show loading overlay
    loadingOverlay.style.display = 'flex';
    
    // Gather form data
    const formData = gatherFormData();
    
    // Track analytics - form submitted
    trackEvent('form_submitted', {
        program: selectedProgram?.name,
        timeToComplete: Math.round((Date.now() - formStartTime) / 1000)
    });
    
    try {
        // Submit to API
        if (CONFIG.testMode) {
            console.log('TEST MODE - Form data:', formData);
            await delay(2000); // Simulate API call
            handleSubmitSuccess();
        } else {
            await submitToAPI(formData);
            handleSubmitSuccess();
        }
    } catch (error) {
        handleSubmitError(error);
    }
}

/**
 * Gather all form data
 */
function gatherFormData() {
    // Get RN license answer if applicable
    const rnLicenseAnswer = rnLicenseGroup.style.display !== 'none' 
        ? document.querySelector('input[name="rnLicense"]:checked')?.value || null
        : null;
    
    // Get military status
    const militaryStatus = document.querySelector('input[name="militaryStatus"]:checked')?.value || null;
    
    return {
        // Program Information
        educationLevel: educationLevel.value,
        areaOfInterest: selectedProgram?.area,
        degreeProgram: selectedProgram?.name,
        programId: programId.value,
        rnLicense: rnLicenseAnswer,
        
        // Personal Information
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.replace(/\D/g, ''), // Send digits only
        state: state.value,
        militaryStatus: militaryStatus,
        
        // Consent
        tcpaConsent: tcpaConsent.checked,
        
        // Metadata
        vendor: document.getElementById('vendor').value,
        formType: document.getElementById('formType').value,
        partnerId: document.getElementById('partnerId').value,
        partnerName: document.getElementById('partnerName').value,
        
        // Tracking
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
}

/**
 * Submit data to Lead API
 */
async function submitToAPI(data) {
    const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
}

/**
 * Handle successful submission
 */
function handleSubmitSuccess() {
    // Store submission data for thank you page personalization
    const submissionData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        educationLevel: educationLevel.value,
        programName: selectedProgram?.name || '',
        programId: programId.value
    };
    
    try {
        localStorage.setItem('uagc_rfi_submission', JSON.stringify(submissionData));
    } catch (e) {
        console.error('Could not store submission data:', e);
    }
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Clear saved draft
    clearSavedFormData();
    
    // Stop auto-save
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
    
    // Track analytics - conversion
    trackEvent('form_conversion', {
        program: selectedProgram?.name,
        timeToComplete: Math.round((Date.now() - formStartTime) / 1000)
    });
    
    console.log('Form submitted successfully!');
    console.log('Submission data:', submissionData);
    
    // Redirect to thank you page with URL parameters
    try {
        // Simple, clean redirect - just use relative path
        const params = new URLSearchParams({
            firstName: submissionData.firstName,
            programName: submissionData.programName,
            programId: submissionData.programId,
            email: submissionData.email,
            educationLevel: submissionData.educationLevel
        });
        
        const redirectUrl = 'thank-you.html?' + params.toString();
        console.log('Redirecting to:', redirectUrl);
        
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 500);
    } catch (error) {
        console.error('Error redirecting to thank you page:', error);
        // Fallback: try simple redirect
        window.location.href = 'thank-you.html';
    }
}

/**
 * Handle submission error
 */
function handleSubmitError(error) {
    console.error('Form submission error:', error);
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Re-enable submit button
    btnSubmit.disabled = false;
    
    // Show error message to user
    alert('Sorry, there was an error submitting your request. Please try again or contact us directly.');
    
    // Track analytics - error
    trackEvent('form_error', {
        error: error.message,
        step: 2
    });
}

/**
 * Track analytics events
 */
function trackEvent(eventName, eventData = {}) {
    if (!CONFIG.enableAnalytics) return;
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log(`Analytics Event: ${eventName}`, eventData);
    
    // You can add other analytics platforms here (Facebook Pixel, etc.)
}

/**
 * Check URL parameters for partner/campaign tracking
 */
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Partner ID
    const partnerIdParam = urlParams.get('partner_id');
    if (partnerIdParam) {
        document.getElementById('partnerId').value = partnerIdParam;
    }
    
    // Partner Name
    const partnerNameParam = urlParams.get('partner_name');
    if (partnerNameParam) {
        document.getElementById('partnerName').value = partnerNameParam;
    }
    
    // Pre-select education level (for targeted landing pages)
    const levelParam = urlParams.get('level');
    if (levelParam && (levelParam === 'undergraduate' || levelParam === 'graduate')) {
        educationLevel.value = levelParam;
        handleEducationLevelChange();
    }
}

/**
 * Utility: Delay function
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Initialize tooltip functionality
 */
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    tooltipTriggers.forEach(trigger => {
        const tooltipId = trigger.getAttribute('data-tooltip');
        const tooltipContent = document.getElementById(`tooltip-${tooltipId}`);
        
        if (!tooltipContent) return;
        
        // Click handler for desktop and mobile
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = tooltipContent.classList.contains('show');
            
            // Close all other tooltips
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                if (t !== tooltipContent) {
                    t.classList.remove('show');
                    t.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Reset all other triggers
            document.querySelectorAll('.tooltip-trigger').forEach(t => {
                if (t !== trigger) {
                    t.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle this tooltip
            tooltipContent.classList.toggle('show');
            
            // Update ARIA attributes
            const newExpandedState = !isExpanded;
            trigger.setAttribute('aria-expanded', newExpandedState.toString());
            tooltipContent.setAttribute('aria-hidden', (!newExpandedState).toString());
            
            // Track analytics
            if (newExpandedState) {
                trackEvent('tooltip_opened', { tooltip: tooltipId });
            }
        });
        
        // Hover handlers for desktop only
        if (window.matchMedia('(min-width: 769px)').matches) {
            trigger.addEventListener('mouseenter', () => {
                tooltipContent.classList.add('show');
                trigger.setAttribute('aria-expanded', 'true');
                tooltipContent.setAttribute('aria-hidden', 'false');
                trackEvent('tooltip_opened', { tooltip: tooltipId });
            });
            
            trigger.addEventListener('mouseleave', () => {
                // Delay closing to allow user to move to tooltip
                setTimeout(() => {
                    if (!tooltipContent.matches(':hover')) {
                        tooltipContent.classList.remove('show');
                        trigger.setAttribute('aria-expanded', 'false');
                        tooltipContent.setAttribute('aria-hidden', 'true');
                    }
                }, 100);
            });
            
            tooltipContent.addEventListener('mouseleave', () => {
                tooltipContent.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
                tooltipContent.setAttribute('aria-hidden', 'true');
            });
        }
    });
    
    // Close tooltips when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.tooltip-trigger') && !e.target.closest('.tooltip-content')) {
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                t.classList.remove('show');
                t.setAttribute('aria-hidden', 'true');
            });
            document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Close tooltips on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.tooltip-content.show').forEach(t => {
                t.classList.remove('show');
                t.setAttribute('aria-hidden', 'true');
            });
            document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        initTooltips();
    });
} else {
    init();
    initTooltips();
}
