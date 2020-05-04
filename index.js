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

server.get('/api/users:id', (req, res)=>{
    let id = req.params.id;

    if(id !== users.id ){
        res.status(404).json({
            message: "The User with the specified ID does not exist."
        })
    }else{
    
    res.json(id);
    }
})

// get('/:id', (req, res) => {
//     Guides.findById(req.params.id)
//     .then(guide => {
//         if (guide) {
//             res.json(guide);
//         } else {
//             res.status(404).json({ message: "Could not find a guide by that ID" });
//         }
//     })
//     .catch(err => {
//         res.status(500),json({ message: 'failed to get guides', err });
//     });
// });


//post
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

//delete
server.delete('/api/users/:id', (req, res)=>{
    let userId = req.params.id;

    if(userId !== users.id){
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
    
    else if(!usersId){
        res.status(500).json({errorMessage: "The user could not be removed"})

    }

    else{
        users = users.filter(users => users.id != id);

    res.status(200).json(users)
    }

})

//patch
server.patch('/api/users/:id', (req, res)=>{
    let patchID = req.body


})

//server listening
server.listen(8000, ()=> console.log('\n== API IS RUNNING AND WORKED UP!==\n'))