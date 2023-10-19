// content.js

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'applyFont') {
    const fontDataUrl = message.fontDataUrl;

    // Create a style element to apply the custom font
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'CustomFont';
        src: url(${fontDataUrl});
      }
      body {
        font-family: 'CustomFont', sans-serif;
      }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(style);

    // Send a response back to the popup
    sendResponse({ success: true });
  }
});
