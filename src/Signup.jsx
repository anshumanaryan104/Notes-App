import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ThemeToggle from './ThemeToggle';



function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const next = async () => {
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                'username': username,
                'password': password
            });
            console.log('Signup response:', response.data);

            // Store the actual username, not the string
            localStorage.setItem('username', username);

            navigate('/newnotes');
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error during signup: ' + error.message);
        }
    }
    
    return(
        <div className='w-full min-h-screen bg-gray-100 dark:bg-black flex justify-center items-center px-24 transition-colors duration-300'>
         <ThemeToggle />
         <div className='w-1/2 justify-center items-center'>
                <h1 className='text-gray-900 dark:text-white text-5xl font-bold'>Notes App</h1>
         </div>
         <div className='w-1/2 w-full justify-center items-center flex gap-4'>
              <div className='justify-center items-center'>
                <input type="text" placeholder="Enter Username" className='rounded-md py-4 text-center w-64 bg-white dark:bg-white text-gray-900 border border-gray-300 dark:border-transparent' value ={username} onChange={
                    (e)=>setUsername(e.target.value)
                }/>
              </div>
              <div className='justify-center items-center'>
                  <input type="text" placeholder="Enter Password" className='rounded-md py-4 text-center w-64 bg-white dark:bg-white text-gray-900 border border-gray-300 dark:border-transparent' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='justify-center items-center py-4'>
                  <button onClick={next} className='bg-blue-500 hover:bg-blue-600 text-white px-5 py-5 rounded-md transition-colors'>signup</button>
                </div>
         </div>
        </div>
    )
}
export default Signup;