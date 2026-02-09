// Background service worker

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      settings: {
        autoDetect: false,
        highlightFields: true,
        fillDelay: 100
      }
    });
    
    // Open welcome page or instructions
    chrome.tabs.create({
      url: 'https://github.com/yourusername/job-autofill-extension'
    });
  } else if (details.reason === 'update') {
    console.log('Extension updated');
  }
});

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProfile') {
    chrome.storage.local.get(['profiles'], (result) => {
      const profile = result.profiles?.[request.profileId];
      sendResponse({ profile: profile });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'log') {
    console.log('Content script log:', request.message);
  }
});

// Context menu (right-click) option
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'autofill-form',
    title: 'Autofill with Job Assistant',
    contexts: ['editable']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'autofill-form') {
    // Get the active profile
    chrome.storage.local.get(['profiles'], (result) => {
      const profiles = result.profiles || {};
      const profileIds = Object.keys(profiles);
      
      if (profileIds.length === 0) {
        // No profiles, open popup
        chrome.action.openPopup();
      } else {
        // Use the first profile by default
        chrome.tabs.sendMessage(tab.id, {
          action: 'autofill',
          profileId: profileIds[0]
        });
      }
    });
  }
});

// Badge to show number of profiles
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.profiles) {
    const profileCount = Object.keys(changes.profiles.newValue || {}).length;
    chrome.action.setBadgeText({ text: profileCount > 0 ? profileCount.toString() : '' });
    chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
  }
});

// Initialize badge on startup
chrome.storage.local.get(['profiles'], (result) => {
  const profileCount = Object.keys(result.profiles || {}).length;
  if (profileCount > 0) {
    chrome.action.setBadgeText({ text: profileCount.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
  }
});
