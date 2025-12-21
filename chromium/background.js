// Enable/disable the redirect ruleset based on storage
async function updateRedirectRule() {
	const { autoRedirect } = await chrome.storage.local.get({
		autoRedirect: false,
	})

	if (autoRedirect) {
		await chrome.declarativeNetRequest.updateEnabledRulesets({
			enableRulesetIds: ['redirect_rules'],
		})
	} else {
		await chrome.declarativeNetRequest.updateEnabledRulesets({
			disableRulesetIds: ['redirect_rules'],
		})
	}
}

// Listen for storage changes (when user toggles checkbox)
chrome.storage.onChanged.addListener((changes, area) => {
	if (area === 'local' && changes.autoRedirect) {
		updateRedirectRule()
	}
})

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ autoRedirect: false })
	updateRedirectRule()
})

// Sync ruleset state on startup
chrome.runtime.onStartup.addListener(() => {
	updateRedirectRule()
})
