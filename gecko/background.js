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

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ autoRedirect: true, preferredFrontEnd: '.now' })
	updateRedirectRule()
})

// Sync on startup
chrome.runtime.onStartup.addListener(() => {
	updateRedirectRule()
})
