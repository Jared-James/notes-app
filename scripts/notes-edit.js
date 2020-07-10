'use strict'
const titleElement = document.getElementById('note-title')
const bodyElement = document.getElementById('body-title')
const lastEdited = document.getElementById('last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()

let note = notes.find(note => note.id === noteId)

if (!note) {
  location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
lastEdited.textContent = callEdit(note.updatedAt)


titleElement.addEventListener('input', (e) => {
  note.title = e.target.value
  note.updatedAt = moment().valueOf()
  lastEdited.textContent = callEdit(note.updatedAt)
  saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
  note.body = e.target.value
  note.updatedAt = moment().valueOf()
  lastEdited.textContent = callEdit(note.updatedAt)
  saveNotes(notes)
})

document.getElementById('remove-note').addEventListener('click', (e) => {
  removeNote(note.id)
  lastEdited.textContent = callEdit(note.updatedAt)
  location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
   notes = JSON.parse(e.newValue)
   let note = notes.find(note => note.id === noteId)
  if (!note) {
    location.assign('/index.html')
  }
  
  titleElement.value = note.title
  bodyElement.value = note.body
  lastEdited.textContent = callEdit(note.updatedAt)
  }
})



