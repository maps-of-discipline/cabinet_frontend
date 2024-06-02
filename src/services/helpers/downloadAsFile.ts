const downloadAsFile = (data, filename) => {
	const file = new Blob([data])

	const link = document.createElement('a')
	link.download = filename
	link.href = URL.createObjectURL(file)
	link.style.display = 'none'
	document.body.appendChild(link)
	link.click()
	URL.revokeObjectURL(link.href)
}

export default downloadAsFile
