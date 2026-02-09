// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Profile management
let currentProfileId = null;
let profiles = {};

// Load profiles on startup
loadProfiles();

document.getElementById('new-profile-btn').addEventListener('click', () => {
  currentProfileId = null;
  document.getElementById('profile-form-container').style.display = 'block';
  document.getElementById('profile-form').reset();
  document.getElementById('delete-profile-btn').style.display = 'none';
  
  // Clear dynamic sections
  document.getElementById('work-experience-container').innerHTML = '';
  document.getElementById('education-container').innerHTML = '';
  
  // Add one empty work experience and education
  addWorkExperience();
  addEducation();
});

document.getElementById('profile-select').addEventListener('change', (e) => {
  const profileId = e.target.value;
  if (profileId) {
    loadProfile(profileId);
  } else {
    document.getElementById('profile-form-container').style.display = 'none';
  }
});

document.getElementById('cancel-profile-btn').addEventListener('click', () => {
  document.getElementById('profile-form-container').style.display = 'none';
  document.getElementById('profile-select').value = '';
});

document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await saveProfile();
});

document.getElementById('delete-profile-btn').addEventListener('click', async () => {
  if (confirm('Are you sure you want to delete this profile?')) {
    await deleteProfile(currentProfileId);
  }
});

// Work Experience
document.getElementById('add-work-btn').addEventListener('click', addWorkExperience);

function addWorkExperience(data = {}) {
  const container = document.getElementById('work-experience-container');
  const index = container.children.length;
  
  const div = document.createElement('div');
  div.className = 'experience-item';
  div.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-group">
      <label>Job Title</label>
      <input type="text" name="work[${index}][title]" value="${data.title || ''}" placeholder="Software Engineer">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" name="work[${index}][company]" value="${data.company || ''}" placeholder="Tech Corp">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="month" name="work[${index}][startDate]" value="${data.startDate || ''}">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="month" name="work[${index}][endDate]" value="${data.endDate || ''}" placeholder="Leave blank if current">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea name="work[${index}][description]" rows="3" placeholder="Key responsibilities and achievements">${data.description || ''}</textarea>
    </div>
  `;
  
  container.appendChild(div);
}

// Education
document.getElementById('add-education-btn').addEventListener('click', addEducation);

function addEducation(data = {}) {
  const container = document.getElementById('education-container');
  const index = container.children.length;
  
  const div = document.createElement('div');
  div.className = 'education-item';
  div.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-group">
      <label>School/University</label>
      <input type="text" name="education[${index}][school]" value="${data.school || ''}" placeholder="University of Example">
    </div>
    <div class="form-group">
      <label>Degree</label>
      <input type="text" name="education[${index}][degree]" value="${data.degree || ''}" placeholder="Bachelor of Science">
    </div>
    <div class="form-group">
      <label>Field of Study</label>
      <input type="text" name="education[${index}][field]" value="${data.field || ''}" placeholder="Computer Science">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="month" name="education[${index}][startDate]" value="${data.startDate || ''}">
      </div>
      <div class="form-group">
        <label>Graduation Date</label>
        <input type="month" name="education[${index}][endDate]" value="${data.endDate || ''}">
      </div>
    </div>
    <div class="form-group">
      <label>GPA (optional)</label>
      <input type="text" name="education[${index}][gpa]" value="${data.gpa || ''}" placeholder="3.8/4.0">
    </div>
  `;
  
  container.appendChild(div);
}

async function loadProfiles() {
  const result = await chrome.storage.local.get(['profiles']);
  profiles = result.profiles || {};
  
  const select = document.getElementById('profile-select');
  select.innerHTML = '<option value="">-- Select a Profile --</option>';
  
  Object.keys(profiles).forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = profiles[id].profileName;
    select.appendChild(option);
  });
}

function loadProfile(profileId) {
  currentProfileId = profileId;
  const profile = profiles[profileId];
  
  if (!profile) return;
  
  document.getElementById('profile-form-container').style.display = 'block';
  document.getElementById('delete-profile-btn').style.display = 'block';
  
  // Fill basic fields
  const form = document.getElementById('profile-form');
  Object.keys(profile).forEach(key => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input && typeof profile[key] === 'string') {
      input.value = profile[key];
    }
  });
  
  // Load work experience
  const workContainer = document.getElementById('work-experience-container');
  workContainer.innerHTML = '';
  if (profile.workExperience && profile.workExperience.length > 0) {
    profile.workExperience.forEach(work => addWorkExperience(work));
  } else {
    addWorkExperience();
  }
  
  // Load education
  const eduContainer = document.getElementById('education-container');
  eduContainer.innerHTML = '';
  if (profile.education && profile.education.length > 0) {
    profile.education.forEach(edu => addEducation(edu));
  } else {
    addEducation();
  }
}

async function saveProfile() {
  const form = document.getElementById('profile-form');
  const formData = new FormData(form);
  
  const profile = {
    profileName: formData.get('profileName'),
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    linkedin: formData.get('linkedin'),
    website: formData.get('website'),
    github: formData.get('github'),
    street: formData.get('street'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
    country: formData.get('country'),
    skills: formData.get('skills'),
    workAuthorization: formData.get('workAuthorization'),
    veteranStatus: formData.get('veteranStatus'),
    gender: formData.get('gender'),
    race: formData.get('race'),
    workExperience: [],
    education: []
  };
  
  // Extract work experience
  const workItems = document.querySelectorAll('#work-experience-container .experience-item');
  workItems.forEach((item, index) => {
    const title = item.querySelector(`[name="work[${index}][title]"]`)?.value;
    if (title) {
      profile.workExperience.push({
        title: title,
        company: item.querySelector(`[name="work[${index}][company]"]`)?.value || '',
        startDate: item.querySelector(`[name="work[${index}][startDate]"]`)?.value || '',
        endDate: item.querySelector(`[name="work[${index}][endDate]"]`)?.value || '',
        description: item.querySelector(`[name="work[${index}][description]"]`)?.value || ''
      });
    }
  });
  
  // Extract education
  const eduItems = document.querySelectorAll('#education-container .education-item');
  eduItems.forEach((item, index) => {
    const school = item.querySelector(`[name="education[${index}][school]"]`)?.value;
    if (school) {
      profile.education.push({
        school: school,
        degree: item.querySelector(`[name="education[${index}][degree]"]`)?.value || '',
        field: item.querySelector(`[name="education[${index}][field]"]`)?.value || '',
        startDate: item.querySelector(`[name="education[${index}][startDate]"]`)?.value || '',
        endDate: item.querySelector(`[name="education[${index}][endDate]"]`)?.value || '',
        gpa: item.querySelector(`[name="education[${index}][gpa]"]`)?.value || ''
      });
    }
  });
  
  // Save profile
  const profileId = currentProfileId || Date.now().toString();
  profiles[profileId] = profile;
  
  await chrome.storage.local.set({ profiles: profiles });
  
  alert('Profile saved successfully!');
  await loadProfiles();
  document.getElementById('profile-select').value = profileId;
}

async function deleteProfile(profileId) {
  delete profiles[profileId];
  await chrome.storage.local.set({ profiles: profiles });
  
  document.getElementById('profile-form-container').style.display = 'none';
  await loadProfiles();
  document.getElementById('profile-select').value = '';
  alert('Profile deleted successfully!');
}

// Resume upload
document.getElementById('upload-resume-btn').addEventListener('click', () => {
  document.getElementById('resume-upload').click();
});

document.getElementById('resume-upload').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const statusDiv = document.getElementById('resume-status');
  statusDiv.className = 'status-text info';
  statusDiv.textContent = 'Processing resume...';
  
  try {
    const text = await readFile(file);
    await chrome.storage.local.set({ resumeText: text, resumeFileName: file.name });
    
    statusDiv.className = 'status-text success';
    statusDiv.textContent = `Resume uploaded: ${file.name}`;
  } catch (error) {
    statusDiv.className = 'status-text error';
    statusDiv.textContent = `Error: ${error.message}`;
  }
});

async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    if (file.type === 'application/pdf') {
      reader.onload = async (e) => {
        try {
          // For PDF, we'll store the text representation
          // In production, you'd want to use a PDF parsing library
          resolve('PDF content - use PDF parsing library in production');
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    }
  });
}

// API Configuration
document.getElementById('save-api-btn').addEventListener('click', async () => {
  const provider = document.getElementById('ai-provider').value;
  const apiKey = document.getElementById('api-key').value;
  
  if (!apiKey) {
    const statusDiv = document.getElementById('api-status');
    statusDiv.className = 'status-text error';
    statusDiv.textContent = 'Please enter an API key';
    return;
  }
  
  await chrome.storage.local.set({ 
    aiProvider: provider,
    apiKey: apiKey 
  });
  
  const statusDiv = document.getElementById('api-status');
  statusDiv.className = 'status-text success';
  statusDiv.textContent = 'API configuration saved!';
});

// Load API config
chrome.storage.local.get(['aiProvider', 'apiKey'], (result) => {
  if (result.aiProvider) {
    document.getElementById('ai-provider').value = result.aiProvider;
  }
  if (result.apiKey) {
    document.getElementById('api-key').value = result.apiKey;
  }
});

// Autofill button
document.getElementById('autofill-btn').addEventListener('click', async () => {
  const selectedProfileId = document.getElementById('profile-select').value;
  
  if (!selectedProfileId) {
    alert('Please select a profile first!');
    return;
  }
  
  const statusDiv = document.getElementById('autofill-status');
  statusDiv.className = 'status-text info';
  statusDiv.textContent = 'Filling form...';
  
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    await chrome.tabs.sendMessage(tab.id, {
      action: 'autofill',
      profileId: selectedProfileId
    });
    
    statusDiv.className = 'status-text success';
    statusDiv.textContent = 'Form filled successfully!';
  } catch (error) {
    statusDiv.className = 'status-text error';
    statusDiv.textContent = `Error: ${error.message}`;
  }
});

// Settings
document.getElementById('save-settings-btn').addEventListener('click', async () => {
  const settings = {
    autoDetect: document.getElementById('auto-detect-forms').checked,
    highlightFields: document.getElementById('highlight-fields').checked,
    fillDelay: parseInt(document.getElementById('fill-delay').value)
  };
  
  await chrome.storage.local.set({ settings: settings });
  
  const statusDiv = document.getElementById('settings-status');
  statusDiv.className = 'status-text success';
  statusDiv.textContent = 'Settings saved!';
});

// Load settings
chrome.storage.local.get(['settings'], (result) => {
  if (result.settings) {
    document.getElementById('auto-detect-forms').checked = result.settings.autoDetect || false;
    document.getElementById('highlight-fields').checked = result.settings.highlightFields || false;
    document.getElementById('fill-delay').value = result.settings.fillDelay || 100;
  }
});
