const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());


let users = [
        {
            id: 1, //import that unique id thing.
            name: 'James Carpino', //string reqiured
            bio: 'A human. Who is also an idiot' //string required

    },
    {
        id: 2, //import that unique id thing.
        name: 'Another Name', //string reqiured
        bio: 'This exists for deleting' //string required

}
]

//gets
server.get('/', (req, res) =>{
    res.json({api: 'api working and running.'});
})
server.get('/api/users', (req, res)=>{
    if(!users){
        res.status(500).json({errorMessage: "This user information could not be retrieved."})
    }else{
    res.json(users)};
})

server.get('/api/users/:id', (req, res)=>{
    let id = Number(req.params.id);
    let userId = users.filter((usersF)=> usersF.id === id)

    if(!id){
        res.status(404).json({
            message: "The User with the specified ID does not exist."
        })
        
    // }else if(!users){
    //     res.status(500).json({ errorMessage: 'The user information could not be retrieved'});
    // }else{
    //     res.status(200).json(userId)
    }else{
        res.status(200).json(userId)
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
    const newUser = { 
        id: Number(shortid.generate()),
        ...req.body
    };

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
    let id = req.params.id;
    let usersDel = users.filter(usersD => usersD.id != id);
    
    if(id === undefined){
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
    
    else if(!users.id){
        res.status(500).json({errorMessage: "The user could not be removed"})

    }

    else{
        

    res.status(200).json(usersDel)
    }

})

//patch
server.patch('/api/users/:id', (req, res)=>{
    let patchID = Number(req.params.id);
    let newUser = req.body;

    newUser.id = shortid.generate();
    const userId = users.filter((id)=> id.id === id);

    if(newUser.id === users.id){
        res.status(404).json({message: "The User with the specified ID does not exist."})
    }
    else if(newUser.name === null || newUser.name ==='' || newUser.bio ==="" || newUser.bio ===null){
        res.status(400).json({errorMessage: 'Please provide a name and bio for user.'})
    }
    else if(!newUser.id)
        {
            res.status(500).json({errorMessage: 'The user information could not be modified'})
        }
        else{
            users.push(newUser)
            res.status(200).json(newUser);
        }


})

//server listening
server.listen(8000, ()=> console.log('\n== API IS RUNNING AND UP!==\n'))