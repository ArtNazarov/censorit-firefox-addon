browser.runtime.onMessage.addListener((message) => {
    if (message.tags !== undefined) {
        console.log("Теги:", message.tags);
        browser.storage.local.set({ 'tags': message.tags }, () => {
        console.log('Value saved:', message.tags);
        });
    }
});
