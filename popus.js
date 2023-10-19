document.getElementById('applyFont').addEventListener('click', () => {
  const fontFileInput = document.getElementById('fontFileInput');
  const fontFile = fontFileInput.files[0];

  if (fontFile) {
    const fileType = fontFile.type || fontFile.name.split('.').pop();
    if (isFontFileType(fileType)) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: applyFont,
          args: [fontFile.name, fontFile.type],
        });
      });
    } else {
      alert('Please upload a valid font file (e.g., .ttf, .otf, .woff, .woff2, .eot)');
    }
  }
});

function isFontFileType(fileType) {
  const validExtensions = ['.ttf', '.otf', '.woff', '.woff2', '.eot'];
  return validExtensions.includes('.' + fileType.toLowerCase());
}

function applyFont(fileName, fileType) {
  const fontUrl = URL.createObjectURL(new Blob([fileName], { type: fileType }));
  document.body.style.fontFamily = `CustomFont, sans-serif`;
  document.head.innerHTML += `<style>@font-face { font-family: 'CustomFont'; src: url('${fontUrl}') format('${fileType}'); }</style>`;
}
