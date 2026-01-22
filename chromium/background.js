async function updateRedirectRule() {
	const { autoRedirect, preferredFrontEnd } = await chrome.storage.local.get({
		autoRedirect: true,
		preferredFrontEnd: '.now',
	})

	// Remove existing rule first
	await chrome.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [1],
	})

	// Only add rule if auto-redirect is enabled AND not targeting .net
	if (autoRedirect && preferredFrontEnd !== '.net') {
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
