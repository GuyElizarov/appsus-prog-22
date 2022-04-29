
import { NoteCard } from './note-card.jsx'


export function NotesList({ notes, deleteNote, pinToTop, changeColor }) {
    if (!notes) return <React.Fragment></React.Fragment>

    function onChangeColor(color, noteId) {
        changeColor(color, noteId)
    }
    function onDeleteNote(noteId) {
        deleteNote(noteId)
    }
    function onPinToTop(noteId) {
        pinToTop(noteId)
    }
    return <div className="notes-list">
        {notes.map(note => {
            return <NoteCard key={note.id} note={note} deleteNote={onDeleteNote} pinToTop={onPinToTop} changeColor={onChangeColor} />
        })}
    </div>
}



