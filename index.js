const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());


let users = [
        {
            id: shortid.generate(), //import that unique id thing.
            name: 'James Carpino', //string reqiured
            bio: 'A human. Who is also an idiot' //string required

    }
]

//gets
server.get('/', (req, res) =>{
    res.json({api: 'api working and running.'});
})
server.get('/api/users', (req, res)=>{
    res.json(users);
})

server.post('/api/users', (req, res)=>{
    const newUser = req.body;

    if( newUser.name === null || newUser.bio === null || newUser.name === '' || newUser.bio === ""){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }else if(!newUser){
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }else{
    users.push(newUser);

    res.status(201).json(newUser);
}
})



server.listen(8000, ()=> console.log('\n== API IS RUNNING AND WORKED UP!==\n'))