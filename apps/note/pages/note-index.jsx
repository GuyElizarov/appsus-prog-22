import { NoteService } from '../services/note-service.js'

import { NotesList } from '../cmps/notes-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
export class NoteApp extends React.Component {

    state = {
        filterBy: {
            txt: '',
            'note-type': null,

        },
        notes: [],
    }

    removeEvent;
    componentDidMount() {
        NoteService.query().then(res => this.setState((prevState) => ({ ...prevState, notes: [...res] })))
        eventBusService.on('update-notes', () => {
            console.log('poop')
            this.loadNotes()
        })

    }


    onAddNote = (note) => {
        NoteService.addNote(note)
        this.loadNotes()
    }

    loadNotes = () => {
        NoteService.query(this.state.filterBy).then(res => this.setState({ notes: null }, () => { this.setState({ notes: [...res] }) }))
        console.log('diareha')
    }
    onDeleteNote = (noteId) => {
        NoteService.remove(noteId).then(this.loadNotes)

    }
    onPinToTop = (noteId) => {
        NoteService.pinNoteToTop(noteId).then(this.loadNotes)
    }
    onChangeColor = (color, noteId) => {
        NoteService.changeNoteColor(color, noteId).then(this.loadNotes)
    }
    onDuplicateNote = (noteId) => {
        NoteService.duplicateNote(noteId).then(this.loadNotes)
    }

    onSetNoteFilter = (filter) => {
        this.setState({ filterBy: filter }, () => {
            console.log(this.state)
            this.loadNotes()
        })
    }
    // this.setState((prevState) => ({ filterBy: { ...prevState, txt: filter.txt } }),
    //      () => this.setState((prevState) => ({ filterBy: { ...prevState, txt: filter.txt } }), () => this.loadNotes))
    //     //   this.loadNotes)

    // }


    render() {
        const { notes } = this.state
        return <section className="note-app notes-layout flex column justify-center align-center">
            <h1>i AM The note app</h1>
            <NoteFilter setNoteFilter={this.onSetNoteFilter} />
            <AddNote onAddNote={this.onAddNote} />
            {(!notes || notes.length === 0) && <React.Fragment></React.Fragment>}
            <NotesList notes={notes} deleteNote={this.onDeleteNote} pinToTop={this.onPinToTop} changeColor={this.onChangeColor} duplicateNote={this.onDuplicateNote} />

        </section>
    }
}