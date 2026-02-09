# Usage Guide - Job Application Autofill Extension

## Table of Contents
1. [Getting Started](#getting-started)
2. [Creating Your First Profile](#creating-your-first-profile)
3. [Configuring AI Features](#configuring-ai-features)
4. [Using the Extension](#using-the-extension)
5. [Advanced Features](#advanced-features)
6. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### First Time Setup

After installing the extension, click on the extension icon in your Chrome toolbar. You'll see three tabs:
- **Profiles**: Create and manage your application profiles
- **Autofill**: Configure AI settings and trigger autofill
- **Settings**: Customize extension behavior

---

## Creating Your First Profile

### Step 1: Basic Information

1. Click the extension icon
2. Go to **Profiles** tab
3. Click **+ New Profile**
4. Fill in the following:

**Profile Name**: Give it a descriptive name (e.g., "Software Engineer Profile", "Data Analyst Profile")
- This helps you organize multiple profiles for different job types

**Full Name**: Your legal name as it should appear on applications
- Example: `John Michael Doe`

**Email**: Your professional email
- Example: `john.doe@email.com`

**Phone**: Your contact number
- Example: `+1 (555) 123-4567`

**LinkedIn**: Your LinkedIn profile URL
- Example: `https://linkedin.com/in/johndoe`

**Portfolio/Website**: Your personal website (if applicable)
- Example: `https://johndoe.com`

**GitHub**: Your GitHub profile (for technical roles)
- Example: `https://github.com/johndoe`

### Step 2: Address Information

Fill in your current address:
- **Street Address**: `123 Main Street, Apt 4B`
- **City**: `New York`
- **State/Province**: `NY`
- **ZIP/Postal Code**: `10001`
- **Country**: `USA`

### Step 3: Work Experience

Click **+ Add Work Experience** for each position you want to include:

**Example Entry:**
- **Job Title**: `Senior Software Engineer`
- **Company**: `Tech Corp Inc.`
- **Start Date**: `2021-06` (June 2021)
- **End Date**: Leave blank if current, or `2023-08` (August 2023)
- **Description**: 
  ```
  Led development of microservices architecture serving 10M+ users. 
  Improved system performance by 40% through database optimization.
  Mentored team of 5 junior engineers.
  ```

**Tip**: Add your 2-3 most recent and relevant positions

### Step 4: Education

Click **+ Add Education** for each degree:

**Example Entry:**
- **School/University**: `Massachusetts Institute of Technology`
- **Degree**: `Bachelor of Science`
- **Field of Study**: `Computer Science`
- **Start Date**: `2015-09`
- **Graduation Date**: `2019-05`
- **GPA**: `3.8/4.0` (optional)

### Step 5: Skills

List your skills separated by commas:
```
JavaScript, Python, React, Node.js, AWS, Docker, Kubernetes, SQL, Git, Agile/Scrum
```

### Step 6: Additional Information

**Work Authorization**:
- Select from dropdown: U.S. Citizen, Green Card Holder, H-1B, etc.

**Veteran Status**:
- Select appropriate option or "Prefer Not to Say"

**Gender**: (optional)
- Select or choose "Prefer Not to Say"

**Race/Ethnicity**: (optional)
- Select or choose "Prefer Not to Say"

### Step 7: Save

Click **Save Profile** button at the bottom.

---

## Configuring AI Features

AI features allow the extension to answer open-ended questions like:
- "Why do you want to work at our company?"
- "Why are you a good fit for this role?"
- "Tell us about yourself"

### Option 1: Using Anthropic Claude (Recommended)

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key
6. In the extension:
   - Go to **Autofill** tab
   - Select **Anthropic (Claude)** from dropdown
   - Paste your API key
   - Click **Save API Configuration**

**Cost**: ~$0.003 per question (very affordable)

### Option 2: Using OpenAI GPT

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key
5. In the extension:
   - Go to **Autofill** tab
   - Select **OpenAI (GPT)** from dropdown
   - Paste your API key
   - Click **Save API Configuration**

**Cost**: ~$0.03 per question

### Uploading Your Resume

For best AI results:

1. Go to **Autofill** tab
2. Click **Upload Resume**
3. Select your resume file (PDF, DOCX, DOC, or TXT)
4. Wait for "Resume uploaded" confirmation

The AI will use your resume to craft personalized, relevant answers.

---

## Using the Extension

### Method 1: Extension Popup (Recommended)

1. Navigate to a job application page
2. Click the extension icon
3. **Select your profile** from the dropdown (if multiple profiles exist)
4. Go to **Autofill** tab
5. Click **Fill Current Page** button
6. Watch the magic happen! ✨

### Method 2: Right-Click Context Menu

1. Navigate to a job application page
2. Right-click on any input field
3. Select **Autofill with Job Assistant**
4. The extension uses your last selected profile

### What Gets Filled

The extension automatically detects and fills:

✅ **Basic Fields**:
- Name (full, first, last)
- Email, phone
- LinkedIn, GitHub, portfolio links

✅ **Address Fields**:
- Street address
- City, State, ZIP
- Country

✅ **Work Experience**:
- Current/previous job title
- Current/previous company
- Employment dates

✅ **Education**:
- School/university name
- Degree and major
- GPA

✅ **Additional Info**:
- Skills
- Work authorization
- Demographic information

✅ **AI-Powered Fields** (with API configured):
- "Why do you want to work here?"
- "Why are you a good fit?"
- "Tell us about yourself"
- Cover letter sections
- Any open-ended questions

---

## Advanced Features

### Managing Multiple Profiles

Create different profiles for different job types:

**Example Profiles**:
1. "Software Engineer - Backend": Emphasizes backend skills
2. "Software Engineer - Frontend": Emphasizes React, CSS, UX
3. "Data Scientist": Emphasizes Python, ML, statistics
4. "Freelance/Contract": Different address or work auth

**To Switch Profiles**:
1. Click extension icon
2. Select different profile from dropdown
3. Click **Fill Current Page**

### Settings Customization

Go to **Settings** tab:

**Auto-detect forms** (⚠️ Experimental):
- Automatically detects when you're on an application page
- Currently disabled by default

**Highlight fields**:
- Shows which fields were filled (blue border flash)
- Helpful for verifying what was filled
- Recommended: **ON**

**Fill Delay**:
- Time between filling each field (in milliseconds)
- Default: 100ms
- Lower = faster filling, but may look robotic
- Higher = more natural, but slower
- Recommended: **100-200ms**

### Editing a Profile

1. Click extension icon
2. Go to **Profiles** tab
3. Select the profile from dropdown
4. Make your changes
5. Click **Save Profile**

### Deleting a Profile

1. Click extension icon
2. Go to **Profiles** tab
3. Select the profile you want to delete
4. Click **Delete Profile** button (appears when profile is loaded)
5. Confirm deletion

---

## Tips & Best Practices

### 📝 Profile Tips

1. **Keep Information Current**: Update your profile regularly with new skills and experiences
2. **Use Multiple Profiles**: Create specialized profiles for different job types
3. **Complete Descriptions**: More detail = better AI responses
4. **Professional Tone**: Write work/education descriptions professionally

### 🤖 AI Tips

1. **Upload Current Resume**: Keep your resume upload current for best AI answers
2. **Review AI Responses**: Always review AI-generated text before submitting
3. **Customize After**: AI gives you a great starting point - personalize it further
4. **Monitor API Costs**: Check your API provider dashboard monthly

### ⚡ Usage Tips

1. **Review Before Submit**: Always review autofilled information
2. **Fill Early**: Don't wait until the last minute to apply
3. **Save Drafts**: Some platforms allow saving - fill, save, review later
4. **Test First**: Try the extension on a practice application first
5. **One Form at a Time**: Focus on one application, then move to next

### 🔒 Privacy Tips

1. **Different Emails**: Consider using different emails for different job types
2. **Local Storage**: Remember, all data is stored locally in your browser
3. **No Cloud Sync**: Data doesn't sync between devices (feature coming soon)
4. **API Keys**: Keep API keys secure, never share them

### ⚠️ Common Issues & Solutions

**Fields Not Filling?**
- Check that field labels match common patterns
- Some custom forms may not be detected
- Try manually starting to type in a field first

**AI Not Working?**
- Verify API key is correct
- Check you have credits/billing set up with provider
- Ensure resume is uploaded
- Check browser console (F12) for errors

**Extension Not Loading?**
- Verify all files are in correct location
- Check that icons folder exists with all 3 icons
- Try reloading the extension in chrome://extensions/

**Wrong Profile Data?**
- Verify correct profile is selected in dropdown
- Check profile for typos or outdated info
- Clear and re-enter problem fields

---

## Example Workflow

Here's a complete example of using the extension:

### Scenario: Applying for a Software Engineer position at Google

1. **Preparation** (one-time):
   - Created "Software Engineer - Backend" profile
   - Uploaded current resume
   - Configured Anthropic API

2. **Navigate to Google Careers**:
   - Find the job posting
   - Click "Apply"

3. **Use Extension**:
   - Click extension icon
   - Verify "Software Engineer - Backend" profile selected
   - Click **Fill Current Page**

4. **Review & Customize**:
   - Review all filled fields for accuracy
   - Read AI-generated "Why Google?" response
   - Customize it to mention specific Google products you admire
   - Add any additional information requested

5. **Submit**:
   - Double-check everything
   - Submit application
   - Keep confirmation email

6. **Track**:
   - Keep note of application date
   - Set reminder to follow up in 1-2 weeks

---

## Keyboard Shortcuts (Future Feature)

Coming soon:
- `Alt+Shift+F`: Fill current page
- `Alt+Shift+P`: Open profile selector
- `Alt+Shift+N`: Create new profile

---

## Support & Feedback

Found a bug? Have a suggestion?
- Check the README.md for troubleshooting
- Open an issue on GitHub
- Contact the developer

---

**Happy job hunting! Good luck with your applications! 🎯🚀**
