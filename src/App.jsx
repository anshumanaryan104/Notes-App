import './index.css';
import NotesPage from './notespage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Signup';
import ThemeProvider from './ThemeProvider';







function App(){
 return(
  <ThemeProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
     
      <Route path="/newnotes" element={<NotesPage/>}/>
    </Routes>
    </BrowserRouter>
  </ThemeProvider>
 )
}


export default App;