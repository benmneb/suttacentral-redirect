chrome.storage.local.get({ autoRedirect: false }, (data) => {
	document.getElementById('autoRedirect').checked = data.autoRedirect
})

document.getElementById('autoRedirect').addEventListener('change', (e) => {
	chrome.storage.local.set({ autoRedirect: e.target.checked })
})

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const tab = tabs[0]
	const url = new URL(tab.url)
	const btn = document.getElementById('redirectBtn')

	if (url.hostname === 'suttacentral.net') {
		btn.textContent = 'Switch to .express'
		btn.disabled = false
	} else if (url.hostname === 'suttacentral.express') {
		btn.textContent = 'Switch to .net'
		btn.disabled = false
	} else {
		btn.textContent = 'Only works on SuttaCentral sites'
		btn.disabled = true
	}
})

document.getElementById('redirectBtn').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0]
		const currentUrl = tab.url
		let newUrl

		if (currentUrl.includes('://suttacentral.net')) {
			newUrl = currentUrl.replace(
				'://suttacentral.net',
				'://suttacentral.express'
			)
		} else if (currentUrl.includes('://suttacentral.express')) {
			newUrl = currentUrl.replace(
				'://suttacentral.express',
				'://suttacentral.net'
			)
		}

		if (newUrl) {
			chrome.tabs.update(tab.id, { url: newUrl })
			window.close() // Close popup after redirect
		}
	})
})
