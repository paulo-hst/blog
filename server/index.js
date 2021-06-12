const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const PORT = 3001
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/get', (req, res) =>{    
    db.query("SELECT * FROM posts", (err, result) => {
        if(err) console.log(err)

        res.send(result)
    })
})

app.get('/api/getFromId/:id', (req, res) => {
    const id = req.params.id

    db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
        if(err) console.log(err)

        res.send(result)
    })
})

app.post('/api/create', (req, res) => {
    const { user, title, text } = req.body

    db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)", 
        [title, text, user], 
        (err, result) => {
            if(err) console.log(err)
            console.log(result)
        }    
    )
})

app.post('/api/like/:id', (req, res) => {

    const id = req.params.id

    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", 
        id, 
        (err, result) => {
            if(err) console.log(err)
            console.log(result)
        }    
    )
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

