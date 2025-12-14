// Track tabs already redirected to prevent loops
const redirectedTabs = new Set()

// Listen for tab updates and redirect if auto-redirect is enabled
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	// Only process when navigation is committed (not just loading)
	if (changeInfo.status !== 'complete' || !tab.url) return

	const { autoRedirect } = await chrome.storage.local.get({
		autoRedirect: false,
	})

	if (!autoRedirect) return

	if (tab.url.includes('suttacentral.net')) {
		// Prevent loops
		if (redirectedTabs.has(tabId)) {
			redirectedTabs.delete(tabId)
			return
		}

		const newUrl = tab.url.replace('suttacentral.net', 'suttacentral.express')
		redirectedTabs.add(tabId)
		chrome.tabs.update(tabId, { url: newUrl })

		// Clean up tracking after a delay
		setTimeout(() => redirectedTabs.delete(tabId), 2000)
	}
})

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
	redirectedTabs.delete(tabId)
})

// Initialize storage with default value
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ autoRedirect: false })
})
