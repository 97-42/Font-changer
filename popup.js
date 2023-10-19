// popup.js

document.getElementById('fontFileInput').addEventListener('change', (event) => {
  const fontFile = event.target.files[0];
  if (fontFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fontDataUrl = event.target.result;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: applyFont,
          args: [fontDataUrl],
        });
      });
    };
    reader.readAsDataURL(fontFile);
  }
});

function applyFont(fontDataUrl) {
  chrome.runtime.sendMessage({ action: 'applyFont', fontDataUrl }, (response) => {
    if (response && response.success) {
      alert('Custom font applied to the current webpage!');
    }
  });
}
