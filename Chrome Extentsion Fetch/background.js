const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/youtube';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.match(/^https:\/\/www\.youtube\.com\/watch\?/)
  ) {
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url }),
    });
  }
});
