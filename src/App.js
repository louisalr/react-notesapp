import './App.css';
import React from "react"
import Sidebar from ".//components/Sidebar"
import Editor from "./components/Editor"
import { data } from ".//data"
import Split from "react-split"
import {nanoid} from "nanoid"


function App() {

  //State for an array of notes
  //lazy state intialization to not reach to local storage everytime the component is re-render
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []) //check if there is elements in localStorage

  const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || "" //notes[0] check if at least one element exists in the array OR empty
  )
  
  //Lazy initialization example
  const [state, setState] = React.useState(() => console.log("One time initialization")) //check if there is elements in localStorage
  
  //LocalStorage is not a part of React so we use it
  React.useEffect( () => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]) //everytime notes change, the effect run
    
  function createNewNote() {
        console.log("Ajout d'une note")
        const newNote = {
            id: nanoid(), //Generate id for the notes
            body: "# Type your markdown note's title here" //Generate body for the notes
        }
        setNotes(prevNotes => [newNote, ...prevNotes])  //Add the new note to the array

        setCurrentNoteId(newNote.id) //Let currentNoteId to know on which note we're working
  }
    
  function updateNote(text) {
        console.log("Mise à jour de la note")
        setNotes(oldNotes => oldNotes.map(oldNote => {

            console.log(text)

            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
  }
  
  //Determine what the current note is
  function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
  }
    
    return (
        <main>
          
        {/* if user as already one note or more*/}
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            : /* Else display a single button to add a new note*/
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote} //create
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

export default App;


//mettre des console log

//json stringify

//json parse