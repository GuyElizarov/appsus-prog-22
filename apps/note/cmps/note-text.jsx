import { NoteButtons } from './note-buttons.jsx'
const { Link } = ReactRouterDOM
export class NoteText extends React.Component {
    state = {
        note: null,
        style: {
            backgroundColor: 'blue'
        }
    }
    componentDidMount() {
        const { note } = this.props
        const backgroundColor = note.style
        console.log('hh')
        this.setState({ note: note })
        this.setState((prevState) => ({ style: { backgroundColor: backgroundColor } }))
    }
    onDeleteNote = (noteId) => {
        this.props.deleteNote(noteId)
    }

    render() {
        console.log('yy')
        const { note } = this.state
        const { style } = this.state
        if (!note) return <React.Fragment></React.Fragment>
        const backgroundColor = style.backgroundColor
        return <div style={style} className="note" > <Link to={`/note/${note.id}`}>
            <p>{note.info.txt}</p>
        </Link>
            <NoteButtons noteId={note.id} deleteNote={this.onDeleteNote} />
        </div>
    }


}
{/* <div className="buttons-wrapper"> <label htmlFor="backgroundColor">
    🎨<input type="color" style={{ visibility: 'hidden' }} id="backgroundColor" name="backgroundColor" />
</label></div> */}