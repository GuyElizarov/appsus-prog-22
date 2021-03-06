import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/storage-service.js"

export const NoteService = {
    query,
    addNote,
    remove,
    pinNoteToTop,
    changeNoteColor,
    getById,
    duplicateNote,
    editNote

}

const NOTES_KEY = 'notesDB'
const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#cf7676"
        },
        prevIndex: null
    }, {
        id: "n104",
        type: "note-img",
        isPinned: false,
        info: {
            url: "http://cdn.shopify.com/s/files/1/0062/8794/9922/files/impasta_large.png?v=1593114167",
            txt: "Bobi and Me"
        },
        style: {
            backgroundColor: "#cf7676"
        }
        , prevIndex: null
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            txt: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null, todoId: utilService.makeId() },
                { txt: "Coding power", doneAt: 187111111, todoId: utilService.makeId() }
            ]
        },
        style: {
            backgroundColor: "#cf7676"
        },
        prevIndex: null

    },
    {
        id: "n102",
        type: "note-video",
        isPinned: false,
        info: {
            url: "https://www.youtube.com/embed/CYVBfaot8tU",
            txt: "prepare to laugh"
        },
        style: {
            backgroundColor: "#cf7676"
        },
        prevIndex: null
    }
]


function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }

    if (filterBy) {
        console.log(filterBy)
        const text = filterBy.txt
        const type = filterBy.noteType
        console.log(text, type)
        if (type === '') notes = notes.filter(note => note.info.txt.includes(text))
        else notes = notes.filter(note => note.info.txt.includes(text) && note.type === type)

    }
    return Promise.resolve(notes)
}

function addNote(note) {
    var notes = _loadFromStorage()
    const newNote = _createNote(note)
    notes = [newNote, ...notes]
    _saveToStorage(notes)
}

function _createNote(note) {
    return {
        id: utilService.makeId(),
        type: note.type,
        isPinned: false,
        prevIndex: null,
        info: note.note,
        style: {
            backgroundColor: '#e0e0e0'
        }
    }
}

function remove(noteId) {
    var notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function pinNoteToTop(noteId) {
    var notes = _loadFromStorage()
    const requestedNoteIdx = notes.findIndex(note => note.id === noteId)
    const requestedNote = notes.find(note => note.id === noteId)

    if (!requestedNote.isPinned) {
        requestedNote.prevIndex = requestedNoteIdx
        requestedNote.isPinned = true
        const note = notes.splice(requestedNoteIdx, 1)[0]
        notes.unshift(note)
        _saveToStorage(notes)
        return Promise.resolve()
    } else if (requestedNote.isPinned) {
        notes.splice(requestedNoteIdx, 1)
        notes.splice(requestedNote.prevIndex, 0, requestedNote)
        requestedNote.isPinned = false
        requestedNote.prevIndex = null
        _saveToStorage(notes)
        return Promise.resolve()
    }
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}


function changeNoteColor(color, noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.style.backgroundColor = color
    _saveToStorage(notes)
    return Promise.resolve()


}
function duplicateNote(noteId) {
    let notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    const newNote = { ...note }

    newNote.id = utilService.makeId()
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)

}
function editNote(noteReceived) {
    const notes = _loadFromStorage()
    console.log(noteReceived)
    const requestedNote = notes.find(note => note.id === noteReceived.noteId)
    requestedNote.info = noteReceived.note
    _saveToStorage(notes)
    return Promise.resolve(notes)


}




function _saveToStorage(notes) {
    storageService.saveToStorage(NOTES_KEY, notes)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(NOTES_KEY)
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}
