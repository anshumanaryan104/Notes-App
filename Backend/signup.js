import express from 'express';
import cors from 'cors';
const app = express();
import supabase from '../SupabaseClient.js';
app.use(cors());
app.use(express.json());


app.post('/signup', async (req, res) => {
   console.log('Signup request received:', req.body);

   const {data: user, error} = await supabase.from('users').select('*').eq('username', req.body.username);
   if(user && user.length > 0){
    res.json({message: 'user already existed'});
   }else{
        const{data, error} = await supabase.from('users').insert({'username': req.body.username, 'password': req.body.password}).select();
            if(error){
                console.error('Supabase error:', error);
                res.json({message: 'error creating user', error: error.message});
            }else{
                console.log('User created:', data);
                res.json({message: 'user created successfully', user: data[0]});
            }
        }
   }
);
app.post('/users/:username/newnotes', async(req, res) => {
    const username = req.params.username;  
    const note_title = req.body.note_title;
    const note_text = req.body.note_text;

    
    const {data: user, error: userError} = await supabase
        .from('users')
        .select('user_id')
        .eq('username', username);

    if(userError || !user || user.length === 0){
        res.json({message: 'User not found'});
        return;
    }

    const user_id = user[0].user_id;

    
    const insertData = {
        note_title: note_title,
        note_text: note_text,
        user_id: user_id
    };
    

    const{data,error} = await supabase.from('user_notes').insert(insertData).select();
    if(error){
        console.error('Note error:', error);
        res.json({message: "error while adding note", error: error.message});
    }else{
        console.log('Note inserted successfully:', data);
        res.json({message: 'note added successfully', data: data});
    }
});
app.get('/users/getnotes', async(req, res)=>{
    const username = req.query.username;
    const {data: user} = await supabase.from('users').select('*').eq('username', username);
    if(!user || user.length === 0){
        res.json({ message: 'user not found' });
        return;
    }
    const user_id = user[0].user_id;
    const {data: notes, error} = await supabase.from('user_notes').select('*').eq('user_id', user_id);
    if(notes.length > 0){
        res.json({ notes });
    } else {
        res.json({ message: 'no notes found' });
    }
});






app.listen(3000);