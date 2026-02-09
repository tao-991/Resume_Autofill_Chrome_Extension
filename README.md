# Job Application Autofill Extension

A Chrome extension that automatically fills job application forms using your saved profiles and AI-powered resume analysis.

## Features

### ✨ Core Features
- **Multiple Profiles**: Create and manage multiple profiles for different job types
- **Smart Field Matching**: Automatically detects and fills common application fields
- **AI-Powered Responses**: Uses Claude or GPT to generate personalized answers to open-ended questions
- **Resume Upload**: Upload your resume for AI to reference when answering questions
- **Customizable Settings**: Control fill delay, field highlighting, and auto-detection

### 📝 Supported Fields
- **Basic Information**: Name, email, phone, LinkedIn, GitHub, portfolio
- **Address**: Street, city, state, ZIP, country
- **Work Experience**: Job titles, companies, dates, descriptions
- **Education**: Schools, degrees, fields of study, GPA
- **Additional**: Skills, work authorization, veteran status, demographics
- **Open-Ended Questions**: "Why do you want to work here?", "Why are you a good fit?", etc.

## Installation

### Option 1: Load Unpacked (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension directory

### Option 2: Create Icons (Required)

The extension needs icon files. Create a folder called `icons` and add three PNG files:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

You can use any logo or icon you like, or create simple colored squares as placeholders.

## Setup

### 1. Create a Profile

1. Click the extension icon in your Chrome toolbar
2. Go to the "Profiles" tab
3. Click "+ New Profile"
4. Fill in your information:
   - Basic info (name, email, phone, etc.)
   - Address details
   - Work experience (add multiple positions)
   - Education history
   - Skills
   - Additional information (work authorization, etc.)
5. Click "Save Profile"

### 2. Configure AI (Optional but Recommended)

For AI-powered answers to open-ended questions:

1. Go to the "Autofill" tab
2. Choose your AI provider (Anthropic Claude or OpenAI GPT)
3. Enter your API key:
   - **Anthropic**: Get key from https://console.anthropic.com/
   - **OpenAI**: Get key from https://platform.openai.com/api-keys
4. Click "Save API Configuration"

### 3. Upload Resume (Optional)

1. Go to the "Autofill" tab
2. Click "Upload Resume"
3. Select your resume file (PDF, DOC, DOCX, or TXT)
4. The AI will use this to generate personalized responses

## Usage

### Method 1: Extension Popup

1. Navigate to a job application page
2. Click the extension icon
3. Select a profile from the dropdown (if not already selected)
4. Go to the "Autofill" tab
5. Click "Fill Current Page"
6. Watch as your information is automatically filled in!

### Method 2: Context Menu

1. Navigate to a job application page
2. Right-click on any input field
3. Select "Autofill with Job Assistant"
4. The extension will use your most recently selected profile

## How It Works

### Traditional Field Matching

The extension uses pattern matching to identify common fields:
- Looks at field names, IDs, labels, and placeholders
- Matches patterns like "email", "phone", "first name", etc.
- Fills fields with data from your selected profile

### AI-Powered Responses

For open-ended questions that can't be filled with profile data:
1. The extension detects questions like "Why do you want to work here?"
2. It sends the question + your resume + profile to the AI
3. The AI generates a personalized, professional response
4. The response is automatically filled into the field

## Settings

### Auto-Detect Forms
Enable this to automatically detect forms when you load a page.

### Highlight Fields
When enabled, filled fields will briefly flash with a blue border.

### Fill Delay
Adjust the delay (in milliseconds) between filling each field. This makes the autofill appear more natural.

## Supported Platforms

The extension works on most job application platforms, including:
- Workday
- Greenhouse
- Lever
- iCIMS
- Taleo
- SmartRecruiters
- Custom application forms
- And many more!

## Privacy & Security

- **All data is stored locally** in your browser using Chrome's storage API
- **No data is sent to any server** except when using AI features
- **API keys are stored securely** in local storage
- **Resume text is processed locally** and only sent to AI when needed

## Troubleshooting

### Fields Not Filling
- Make sure you've selected a profile
- Check that the field labels match common patterns
- Try manually filling a field to see if the site uses custom JavaScript

### AI Not Working
- Verify your API key is correct
- Check that you've uploaded a resume
- Make sure you have internet connection
- Check browser console for error messages

### Extension Not Appearing
- Make sure Developer Mode is enabled
- Try reloading the extension
- Check that all required files are present

## Development

### File Structure
```
job-autofill-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup logic
├── content.js            # Content script (runs on web pages)
├── background.js         # Background service worker
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

### Key Technologies
- **Manifest V3**: Latest Chrome extension format
- **Chrome Storage API**: For storing profiles and settings
- **Content Scripts**: For interacting with web pages
- **Service Workers**: For background processing
- **AI APIs**: Anthropic Claude or OpenAI GPT

## Future Enhancements

Potential features to add:
- [ ] Export/import profiles
- [ ] Cloud sync across devices
- [ ] Support for more AI providers
- [ ] Application tracking
- [ ] Cover letter generator
- [ ] Interview question preparation
- [ ] LinkedIn profile import
- [ ] Browser notifications for filled forms

## Contributing

Feel free to submit issues and pull requests!

## License

MIT License - feel free to modify and use as you like.

## Disclaimer

This extension is for personal use to streamline your job application process. Always review the information before submitting applications. The developers are not responsible for any issues arising from the use of this extension.

## API Costs

Note that using AI features will incur costs based on your chosen provider:
- **Anthropic Claude**: Pay-per-use based on tokens
- **OpenAI GPT**: Pay-per-use based on tokens

Monitor your usage to avoid unexpected costs.

## Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

**Happy job hunting! 🎯**
