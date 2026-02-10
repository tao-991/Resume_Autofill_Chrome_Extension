// Content script - runs on all web pages to detect and fill forms

// Field matching patterns
const FIELD_PATTERNS = {
  email: /email|e-mail|mail/i,
  phone: /phone|mobile|telephone|tel|phone number/i,
  linkedin: /linkedin|linked-in/i,
  website: /website|portfolio|personal.*site|url/i,
  github: /github|git|\bgithub\b/i,
  street: /street|address.*line.*1|address1/i,
  address2: /address.*line.*2|address2|apt|suite/i,
  city: /city|town/i,
  state: /state|province|region/i,
  zip: /zip|postal|post.*code/i,
  country: /country|nation/i,
  firstName: /first.*name|fname|given.*name|forename/i,
  lastName: /last.*name|lname|surname|family.*name/i,
  fullName: /\bname\b|full.*name|your.*name|applicant.*name|contact.*name|candidate.*name|legal.*name|氏名|名前|姓名/i,
  
  // Work related
  currentCompany: /current.*company|employer|company|organization|勤務先|会社/i,
  currentTitle: /current.*title|current.*position|job.*title/i,
  jobDescription: /description|.*description|responsibilities|achievements|summary|職務内容/i,
  
  // Education
  school: /school|university|college|institution/i,
  degree: /degree|education.*level/i,
  major: /major|field.*study|specialization|majob.*|field.*of.*study/i,
  gpa: /gpa|grade.*point/i,
  
  // Additional
  skills: /skills|technologies|competencies/i,
  workAuth: /work.*auth|authorization|visa.*status|employment.*eligibility/i,
  veteran: /veteran|military.*service/i,
  gender: /gender|sex(?!.*offender)/i,
  race: /race|ethnicity/i,
  disability: /disability|disabled/i,
  
};

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autofill') {
    handleAutofill(request.profileId);
    sendResponse({ success: true });
  }
  return true;
});

async function handleAutofill(profileId) {
  try {
    // Get profile data
    const result = await chrome.storage.local.get(['profiles', 'settings', 'resumeText']);
    const profile = result.profiles?.[profileId];
    
    if (!profile) {
      console.error('Profile not found');
      return;
    }
    
    const settings = result.settings || { fillDelay: 100, highlightFields: false };
    
    // Find all form fields
    const fields = findFormFields();

    // counter for several edu/work experience
    const counters = {
      currentCompany: 0,
      currentTitle: 0,
      jobDescription: 0,
      workStart: 0,
      workEnd: 0,
      school: 0,
      degree: 0,
      major: 0,
      eduStart: 0,
      eduEnd: 0
    };
    
    // Fill fields
    for (const field of fields) {
      const value = await getFieldValue(field, profile, result.resumeText, counters);
      
      if (value) {
        await fillField(field.element, value, settings.fillDelay);
        
        if (settings.highlightFields) {
          highlightField(field.element);
        }
      }
    }
    
    console.log('Autofill completed');
  } catch (error) {
    console.error('Autofill error:', error);
  }
}

function findFormFields() {
  const fields = [];
  
  // Find all input, textarea, and select elements
  const elements = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select');
  
  elements.forEach(element => {
    // Skip if already filled (optional - you can remove this if you want to overwrite)
    if (element.value && element.value.trim() !== '') {
      return;
    }
    
    // Get identifiers
    const id = element.id?.toLowerCase() || '';
    const name = element.name?.toLowerCase() || '';
    const placeholder = element.placeholder?.toLowerCase() || '';
    const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
    const label = findLabel(element)?.toLowerCase() || '';
    
    const identifiers = `${id} ${name} ${placeholder} ${ariaLabel} ${label}`;
    
    fields.push({
      element: element,
      identifiers: identifiers,
      type: element.type,
      tagName: element.tagName.toLowerCase()
    });
  });
  
  return fields;
}

function findLabel(element) {
  // Try to find associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent;
  }
  
  // Check parent label
  const parentLabel = element.closest('label');
  if (parentLabel) return parentLabel.textContent;
  
  // Check previous sibling
  let prev = element.previousElementSibling;
  while (prev) {
    if (prev.tagName === 'LABEL') {
      return prev.textContent;
    }
    if (prev.textContent && prev.textContent.trim().length < 100) {
      return prev.textContent;
    }
    prev = prev.previousElementSibling;
  }
  
  return '';
}

function matchField(identifiers, patterns) {
  for (const [key, pattern] of Object.entries(patterns)) {
    if (pattern.test(identifiers)) {
      return key;
    }
  }
  return null;
}

async function getFieldValue(field, profile, resumeText, counters) {
  const fieldType = matchField(field.identifiers, FIELD_PATTERNS);
  
  if (!fieldType) {
    return null;
  }
  
  // Handle standard fields
  switch (fieldType) {
    case 'firstName':
      return profile.fullName?.split(' ')[0] || '';
    case 'lastName':
      const nameParts = profile.fullName?.split(' ') || [];
      return nameParts.slice(1).join(' ') || '';
    case 'fullName':
      return profile.fullName || '';
    case 'email':
      return profile.email || '';
    case 'phone':
      return profile.phone || '';
    case 'linkedin':
      return profile.linkedin || '';
    case 'website':
      return profile.website || '';
    case 'github':
      return profile.github || '';
    case 'street':
      return profile.street || '';
    case 'city':
      return profile.city || '';
    case 'state':
      return profile.state || '';
    case 'zip':
      return profile.zip || '';
    case 'country':
      return profile.country || '';
    case 'skills':
      return profile.skills || '';
    case 'workAuth':
      return getWorkAuthText(profile.workAuthorization);
    case 'veteran':
      return getVeteranText(profile.veteranStatus);
    case 'gender':
      return getGenderText(profile.gender);
    case 'race':
      return getRaceText(profile.race);
    
    // Work experience
    case 'currentCompany':{
      const index = counters.currentCompany++;
      return profile.workExperience?.[index]?.company || '';
    }
    case 'currentTitle':{
      const index = counters.currentTitle++;
      return profile.workExperience?.[index]?.title || '';
    }
    case 'jobDescription':{
      const index = counters.jobDescription++;
      return profile.workExperience?.[index]?.description || '';
    }
      
    
    // Education
    case 'school':{
      const index = counters.school++;
      return profile.education?.[index]?.school || '';
    }
    case 'degree':{
      const index = counters.degree++;
      return profile.education?.[index]?.degree || '';
    }
    case 'major':{
      const index = counters.major++;
      return profile.education?.[index]?.field || '';
    }
    case 'gpa':{
      const index = counters.gpa++;
      return profile.education?.[index]?.gpa || '';
    }
      
    
    default:
      return null;
  }
}


async function fillField(element, value, delay) {
  // Wait for delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Set value
  if (element.tagName.toLowerCase() === 'select') {
    // For select elements, try to match by value or text
    const options = Array.from(element.options);
    const matchedOption = options.find(opt => 
      opt.value.toLowerCase() === value.toLowerCase() ||
      opt.textContent.toLowerCase().includes(value.toLowerCase())
    );
    
    if (matchedOption) {
      element.value = matchedOption.value;
    }
  } else {
    element.value = value;
  }
  
  // Trigger events to ensure the page recognizes the change
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
  element.dispatchEvent(new Event('blur', { bubbles: true }));
}

function highlightField(element) {
  const originalBorder = element.style.border;
  element.style.border = '2px solid #667eea';
  element.style.transition = 'border 0.3s';
  
  setTimeout(() => {
    element.style.border = originalBorder;
  }, 2000);
}

// Helper functions for mapping values
function getWorkAuthText(value) {
  const mapping = {
    'us_citizen': 'U.S. Citizen',
    'green_card': 'Green Card Holder',
    'h1b': 'H-1B Visa',
    'opt': 'OPT',
    'cpt': 'CPT',
    'require_sponsorship': 'Require Sponsorship',
    'other': 'Other'
  };
  return mapping[value] || '';
}

function getVeteranText(value) {
  const mapping = {
    'not_veteran': 'Not a Veteran',
    'veteran': 'Veteran',
    'disabled_veteran': 'Disabled Veteran',
    'prefer_not_say': 'Prefer Not to Say'
  };
  return mapping[value] || '';
}

function getGenderText(value) {
  const mapping = {
    'male': 'Male',
    'female': 'Female',
    'non_binary': 'Non-Binary',
    'prefer_not_say': 'Prefer Not to Say'
  };
  return mapping[value] || '';
}

function getRaceText(value) {
  const mapping = {
    'asian': 'Asian',
    'black': 'Black or African American',
    'hispanic': 'Hispanic or Latino',
    'white': 'White',
    'native_american': 'Native American',
    'pacific_islander': 'Pacific Islander',
    'two_or_more': 'Two or More Races',
    'prefer_not_say': 'Prefer Not to Say'
  };
  return mapping[value] || '';
}

// Initialize - check settings on page load
chrome.storage.local.get(['settings'], (result) => {
  const settings = result.settings || {};
  
  if (settings.autoDetect) {
    // Could add automatic form detection here
    console.log('Auto-detect enabled');
  }
});
