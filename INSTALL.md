# Quick Installation Guide

## Step 1: Create Icons

Before loading the extension, you need to create icon files. Here's how:

### Option A: Create Simple Placeholder Icons

Create a folder called `icons` in the extension directory, then create three simple colored PNG files:

1. Create a file called `create-icons.html` and open it in your browser:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Create Icons</title>
</head>
<body>
    <h2>Icon Generator</h2>
    <button onclick="generateIcons()">Generate & Download Icons</button>
    
    <script>
        function generateIcons() {
            [16, 48, 128].forEach(size => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                
                // Draw gradient background
                const gradient = ctx.createLinearGradient(0, 0, size, size);
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, size, size);
                
                // Draw letter "J" for Job
                ctx.fillStyle = 'white';
                ctx.font = `bold ${size * 0.6}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('J', size / 2, size / 2);
                
                // Download
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `icon${size}.png`;
                    a.click();
                });
            });
            
            alert('Icons will be downloaded. Save them in the icons/ folder.');
        }
    </script>
</body>
</html>
```

### Option B: Use Any Logo/Image

1. Create an `icons` folder in the extension directory
2. Add three PNG files named exactly:
   - `icon16.png` (16x16 pixels)
   - `icon48.png` (48x48 pixels)
   - `icon128.png` (128x128 pixels)

## Step 2: Load Extension in Chrome

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `job-autofill-extension` folder
6. The extension should now appear in your toolbar!

## Step 3: Set Up Your First Profile

1. Click the extension icon
2. Go to "Profiles" tab
3. Click "+ New Profile"
4. Fill in your information
5. Click "Save Profile"

## Step 4: (Optional) Configure AI

1. Go to "Autofill" tab
2. Select AI provider (Anthropic or OpenAI)
3. Enter your API key
4. Click "Save API Configuration"

## Step 5: Test It Out

1. Go to any job application website
2. Click the extension icon
3. Select your profile
4. Go to "Autofill" tab
5. Click "Fill Current Page"

## You're Done! 🎉

The extension is now ready to help you apply to jobs faster!

## Need Help?

- Check the full README.md for detailed information
- Make sure all files are in the correct directory
- Check the Chrome console (F12) for any error messages
- Verify your API keys are correct (if using AI features)
