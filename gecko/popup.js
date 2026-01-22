const relevantDomains = [
	'suttacentral.net',
	'suttacentral.now',
	'suttacentral.express',
]
const altFrontends = ['suttacentral.now', 'suttacentral.express']

chrome.storage.local.get(
	{ autoRedirect: true, preferredFrontEnd: '.now' },
	(data) => {
		document.getElementById('auto-redirect').checked = data.autoRedirect
		document.getElementById('fe-select').value = data.preferredFrontEnd
		updateGoToOfficialState()
	},
)

document.getElementById('fe-select').addEventListener('change', (e) => {
	chrome.storage.local.set({ preferredFrontEnd: e.target.value })
})

document.getElementById('auto-redirect').addEventListener('change', (e) => {
	chrome.storage.local.set({ autoRedirect: e.target.checked })
	updateGoToOfficialState()
})

function updateGoToOfficialState() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = new URL(tabs[0].url)
		const autoRedirect = document.getElementById('auto-redirect')
		const goToOfficialBtn = document.getElementById('go-to-official')

		if (altFrontends.includes(url.hostname)) {
			goToOfficialBtn.disabled = autoRedirect.checked
		} else {
			goToOfficialBtn.disabled = true
		}
	})
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const url = new URL(tabs[0].url)
	const refreshBtn = document.getElementById('refresh-btn')
	refreshBtn.disabled = !relevantDomains.includes(url.hostname)
})

document.getElementById('refresh-btn').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = new URL(tabs[0].url)
		const preferredFrontEnd = document.getElementById('fe-select').value

		if (relevantDomains.includes(url.hostname)) {
			url.hostname = `suttacentral${preferredFrontEnd}`
			chrome.tabs.update(tabs[0].id, { url: url.href.replace(/\/$/, '') })
			window.close()
		}
	})
})

document.getElementById('go-to-official').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const url = new URL(tabs[0].url)

		if (altFrontends.includes(url.hostname)) {
			url.hostname = 'suttacentral.net'
			chrome.tabs.update(tabs[0].id, { url: url.href.replace(/\/$/, '') })
			window.close()
		}
	})
})
