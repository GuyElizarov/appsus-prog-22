import { NoteButtons } from './note-buttons.jsx'
const { Link } = ReactRouterDOM
export function NoteTodos({ note }) {
    const { label, todos } = note.info
    function onDeleteNote(noteId) {
    }
    return <div className="note"><Link to={`/note/${note.id}`}>
        <h2>{label}</h2>
        <ul>
            {todos.map(todo => {
                return <li key={todo.todoId}>{todo.txt}</li>
            })}
        </ul>
    </Link>
        <NoteButtons noteId={note.id} deleteNote={onDeleteNote} />
    </div>
}