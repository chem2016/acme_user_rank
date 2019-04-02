const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, models } = require('./db');
const { User } = models;
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=>{
    User.findAll()
        .then(users=>res.send(users))
        .catch(next)
})

app.post('/api/users/create', (req, res, next)=>{
    const user = req.body
    User.create(user)
        .then(user=>res.send(user))
        .catch(next)
})

app.put('/api/users/:id', (req, res, next)=>{
    User.findByPk(req.params.id)
        .then(user=>user.update(req.body))
        .then(user=>res.send(user))
        .catch(next)
})

// app.put('/api/users/:id',(req, res, next)=>{
//     return User.update(
//         req.body,
//         {where: {id: req.params.id}},
//     )
//     .then(user=>res.send(user))
//     .catch(next)
// })

// router.put(‘/book/:bookId’, function (req, res, next) {
//     Book.update(
//       {title: req.body.title},
//       {returning: true, where: {id: req.params.bookId} }
//     )
//     .then(function([ rowsUpdate, [updatedBook] ]) {
//       res.json(updatedBook)
//     })
//     .catch(next)
//    })


app.delete('/api/users/:id', (req, res, next)=>{
    User.destroy({
        where: {id: req.params.id}
    })
        .then(()=>res.sendStatus(204))
        .catch(next)
})


app.use((error, req, res, next)=>{
    console.log(error)
    res.status(error.status || 500).send({error})
})



syncAndSeed();

app.listen(port, ()=> console.log(`listening on port ${port}`))
