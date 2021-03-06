let notes = getSavedNotes()

const filters = {
	searchText: '',
	sortBy: 'byEdited'
}

renderNotes(notes, filters)


document.getElementById('create-note').addEventListener('click', (e) => {
	const id = uuidv4()
	const timeStamp = moment().valueOf()
	notes.push({
		id: id,
		title: e.target.value,
		body: e.target.value,
		createdAt: timeStamp,
		updatedAt: timeStamp
	})


	saveNotes(notes)
	location.assign(`/edit.html#${id}`)

})


document.getElementById('search-text').addEventListener('input', (e) => {
	filters.searchText = e.target.value
	renderNotes(notes, filters)
})

document.getElementById('filterBy').addEventListener('change',  (e) => {
	filters.sortBy = e.target.value
	renderNotes(notes, filters)
})


window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		let notes = JSON.parse(e.newValue)
		renderNotes(notes, filters)
	}
})

