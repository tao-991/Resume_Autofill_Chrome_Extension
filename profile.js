// profile.js

let currentProfileId = null;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentProfileId = urlParams.get('id');

  if (currentProfileId) {
    await loadProfile(currentProfileId);
  } else {
    // Initial fields for new profile
    addWorkExperience();
    addEducation();
  }

  // FIXED: IDs matched to profile.html
  document.getElementById('add-work-btn').addEventListener('click', () => addWorkExperience());
  document.getElementById('add-education-btn').addEventListener('click', () => addEducation());
  document.getElementById('profile-form').addEventListener('submit', saveProfile);
});

function addWorkExperience(data = {}) {
  const container = document.getElementById('work-experience-container');
  const div = document.createElement('div');
  div.className = 'item-block';
  div.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-group">
      <label>Job Title</label>
      <input type="text" class="w-title" value="${data.title || ''}" placeholder="Software Engineer">
    </div>
    <div class="form-group">
      <label>Company</label>
      <input type="text" class="w-company" value="${data.company || ''}" placeholder="Tech Corp">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="month" class="w-start" value="${data.startDate || ''}">
      </div>
      <div class="form-group">
        <label>End Date</label>
        <input type="month" class="w-end" value="${data.endDate || ''}">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="w-desc" rows="3">${data.description || ''}</textarea>
    </div>
  `;
  container.appendChild(div);
}

function addEducation(data = {}) {
  const container = document.getElementById('education-container');
  const div = document.createElement('div');
  div.className = 'item-block';
  div.innerHTML = `
    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    <div class="form-group">
      <label>School/University</label>
      <input type="text" class="e-school" value="${data.school || ''}">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Degree</label>
        <input type="text" class="e-degree" value="${data.degree || ''}">
      </div>
      <div class="form-group">
        <label>Field of Study</label>
        <input type="text" class="e-field" value="${data.field || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Start Date</label>
        <input type="month" class="e-start" value="${data.startDate || ''}">
      </div>
      <div class="form-group">
        <label>Graduation Date</label>
        <input type="month" class="e-end" value="${data.endDate || ''}">
      </div>
    </div>
    <div class="form-group">
      <label>GPA</label>
      <input type="text" class="e-gpa" value="${data.gpa || ''}">
    </div>
  `;
  container.appendChild(div);
}

async function loadProfile(id) {
  const result = await chrome.storage.local.get(['profiles']);
  const profile = result.profiles?.[id];
  if (!profile) return;

  const form = document.getElementById('profile-form');
  
  Object.keys(profile).forEach(key => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input && typeof profile[key] === 'string') {
      input.value = profile[key];
    }
  });

  document.getElementById('work-experience-container').innerHTML = '';
  if (profile.workExperience && profile.workExperience.length > 0) {
    profile.workExperience.forEach(w => addWorkExperience(w));
  }

  document.getElementById('education-container').innerHTML = '';
  if (profile.education && profile.education.length > 0) {
    profile.education.forEach(e => addEducation(e));
  }
}

async function saveProfile(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

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

  document.querySelectorAll('#work-experience-container .item-block').forEach(item => {
    profile.workExperience.push({
      title: item.querySelector('.w-title').value,
      company: item.querySelector('.w-company').value,
      startDate: item.querySelector('.w-start').value,
      endDate: item.querySelector('.w-end').value,
      description: item.querySelector('.w-desc').value
    });
  });

  document.querySelectorAll('#education-container .item-block').forEach(item => {
    profile.education.push({
      school: item.querySelector('.e-school').value,
      degree: item.querySelector('.e-degree').value,
      field: item.querySelector('.e-field').value,
      startDate: item.querySelector('.e-start').value,
      endDate: item.querySelector('.e-end').value,
      gpa: item.querySelector('.e-gpa').value
    });
  });

  const res = await chrome.storage.local.get({ profiles: {} });
  let profiles = res.profiles;
  if (Array.isArray(profiles)) profiles = {}; 

  const id = currentProfileId || Date.now().toString();
  profiles[id] = profile;

  await chrome.storage.local.set({ profiles });
  
  const status = document.getElementById('status');
  status.textContent = "✓ Profile Saved!";
  status.style.color = "#10b981";
  
  setTimeout(() => window.close(), 1000);
}