import './index.css';
import NotesPage from './notespage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Signup';







function App(){
 return( <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
     
      <Route path="/newnotes" element={<NotesPage/>}/>
    </Routes>
    </BrowserRouter>
  </div>
 )
}


export default App;