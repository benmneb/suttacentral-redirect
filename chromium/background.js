async function updateRedirectRule() {
	const { autoRedirect, preferredFrontEnd } = await chrome.storage.local.get({
		autoRedirect: true,
		preferredFrontEnd: '.now',
	})

	// Remove existing rules first
	await chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [1, 2],
	})

	// Only add rules if auto-redirect is enabled
	if (autoRedirect) {
		await chrome.declarativeNetRequest.updateDynamicRules({
			addRules: [
				{
					id: 1,
					priority: 1,
					action: {
						type: 'redirect',
						redirect: {
							transform: {
								host: `suttacentral${preferredFrontEnd}`,
							},
						},
					},
					condition: {
						urlFilter: '||suttacentral.net',
						resourceTypes: ['main_frame'],
					},
				},
				{
					id: 2,
					priority: 2,
					action: {
						type: 'allow',
					},
					condition: {
						urlFilter: '||suttacentral.net/api/',
						resourceTypes: ['main_frame'],
					},
				},
			],
		})
	}
}

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && (changes.autoRedirect || changes.preferredFrontEnd)) {
		updateRedirectRule()
	}
})

// Handle one-time override from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'overrideOnce') {
		const tabId = message.tabId

		chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: [1, 2],
		}).then(() => {
			sendResponse({ ok: true })

			function onUpdated(updatedTabId, changeInfo) {
				if (updatedTabId === tabId && changeInfo.status === 'complete') {
					chrome.tabs.onUpdated.removeListener(onUpdated)
					chrome.tabs.onRemoved.removeListener(onRemoved)
					updateRedirectRule()
				}
			}

			function onRemoved(removedTabId) {
				if (removedTabId === tabId) {
					chrome.tabs.onUpdated.removeListener(onUpdated)
					chrome.tabs.onRemoved.removeListener(onRemoved)
					updateRedirectRule()
				}
			}

			chrome.tabs.onUpdated.addListener(onUpdated)
			chrome.tabs.onRemoved.addListener(onRemoved)
		})

		return true // keep message channel open for async sendResponse
	}
})

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ autoRedirect: true, preferredFrontEnd: '.now' })
	updateRedirectRule()
})

// Sync on startup
chrome.runtime.onStartup.addListener(() => {
	updateRedirectRule()
})
