import { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import ThemeToggle from './ThemeToggle';


function Sidebar({setSelectedNote}){
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getnotes?username=${localStorage.getItem('username')}`);
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className='w-1/4 bg-blue-500 dark:bg-blue-500 text-white p-4 rounded-md'>
      <h3 className="font-bold mb-4">Your Notes</h3>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.note_id} className="mb-2 p-2 bg-blue-400 dark:bg-blue-600 rounded cursor-pointer hover:opacity-90 transition-opacity">
            <div className="font-semibold"onClick={()=>setSelectedNote(note)}>{note.note_title}</div>
            <div className="text-sm opacity-75 truncate">{note.note_text}</div>
          </div>
        ))
      ) : (
        <p className="opacity-75">No notes yet</p>
      )}
    </div>
  )
}
function NotesPage() {
  const [note_title, setNote_title] = useState('');
  const [note_text, setNote_text] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  async function fetchNotes(){
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://localhost:3000/users/getnotes?username=${username}`);
      
      console.log('Fetched notes:', response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  
  const addNotes = async () => {
    try {
      const username = localStorage.getItem('username');
      console.log('Adding note for user:', username);
      console.log('Note data:', { note_title, note_text });

      if (!username) {
        alert('Please login first!');
        return;
      }

      const response = await axios.post(`http://localhost:3000/users/${username}/newnotes`, {
        note_title: note_title,
        note_text: note_text
      });
      fetchNotes();

      console.log('Response:', response.data);
      alert('Note added successfully!');
      setNote_title('');
      setNote_text('');
      // Refresh the page to show new notes in sidebar
      window.location.reload();
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Error adding note: ' + error.message);
    }
  }
  return (
  
    <div className='w-full min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300'>
        <ThemeToggle />
        <h1 className='text-center text-gray-900 dark:text-white text-3xl font-bold py-4'>Notes APP</h1>
        <div className='px-5 pb-5 flex justify-center items-center gap-4'>
          {selectedNote && (
            <>
            <button className='bg-blue-400 dark:bg-blue-300 text-white px-5 py-3 rounded-md hover:opacity-90 transition-opacity' onClick={()=>setSelectedNote(null)}>Close</button>
            </>
          )}
            <button className='bg-blue-400 dark:bg-blue-300 text-white px-5 py-3 rounded-md hover:opacity-90 transition-opacity' onClick={addNotes}>Save Notes</button>
            <input type="text" placeholder="add title" className='rounded-md py-2 text-center w-64 bg-white text-gray-900 border border-gray-300 dark:border-transparent' value={note_title} onChange={(e)=>setNote_title(e.target.value)}/>
          
        
        </div>
      <div className='flex w-full gap-4 px-4 min-h-screen'>
        <Sidebar setSelectedNote={setSelectedNote}/>
        {selectedNote ? (
          <div className='w-3/4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-gray-900 dark:text-white transition-colors duration-300'>
            <h2 className='text-2xl font-bold mb-4'>{selectedNote.note_title}</h2>
            <p className='whitespace-pre-wrap'>{selectedNote.note_text}</p>
          </div>
        
        ) : (
          <input type="text" id='notes' placeholder="Add your notes" className='w-3/4 top-0 py-2 text-center rounded-md bg-white text-gray-900 border border-gray-300 dark:border-transparent' value={note_text} onChange={(e)=>setNote_text(e.target.value)}/>
        )}
      </div>
    </div>
  )
}

export default NotesPage;
