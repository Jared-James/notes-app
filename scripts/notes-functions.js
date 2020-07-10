'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem('notes')
  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
}

// Save the notes to local storage
const saveNotes = notes => {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// remove note from list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id)

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1)
  }
}

// Generate the DOM structure for the note
const generateNoteDom = note => {
  const noteElement = document.createElement('a')
  const textElement = document.createElement('p')
  const status = document.createElement('p')

  // setup the note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title
  } else {
    textElement.textContent = 'Unnamed note'
  }

  textElement.classList.add('list-item__title')

  noteElement.appendChild(textElement)

  noteElement.setAttribute('href', `/edit.html#${note.id}`)
  noteElement.classList.add('list-item')

  status.textContent = callEdit(note.updatedAt)
  status.classList.add('list-item__subtitle')
  noteElement.appendChild(status)

  return noteElement
}

//sort your notes by 1 of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
   } else if (sortBy === 'alphabetical') {
     return notes.sort((a, b) => {
       if (a.title.toLowerCase() < b.title.toLowerCase()) {
         return -1
       } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
         return 1
       } else {
         return 0
       }
     })
   } else {
      return notes
    }
  }


// Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector('#notes')
  notes = sortNotes(notes, filters.sortBy)
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

  notesEl.innerHTML = ''

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(note => {
      const noteElement = generateNoteDom(note)
      notesEl.appendChild(noteElement)
    })
  } else {
    const emptyMesssage = document.createElement('p')
    emptyMesssage.textContent = "No notes to show"
    emptyMesssage.classList.add('empty-message')
    notesEl.appendChild(emptyMesssage)
  }
}

// Gerate the last edited messsage
const callEdit = timeStamp => `Last edited ${moment(timeStamp).fromNow()}`
 

 