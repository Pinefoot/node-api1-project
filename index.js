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