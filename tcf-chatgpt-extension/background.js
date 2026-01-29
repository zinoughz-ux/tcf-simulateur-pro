chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "OPEN_CHATGPT") {
      chrome.tabs.create({ url: "https://chat.openai.com/" });
    }
  });
  



