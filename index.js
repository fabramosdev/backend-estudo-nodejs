const express = require('express')

const server = express()

server.use(express.json())

/**
 * Query Params = ?teste=1
 * Route Params = /users/1
 * Request Body = { "name":"Fabiano", "email":"fabiano.suporteinfo@gmail.com" }
 */

 const users = ['Fabiano','Diego','Marcio']

server.use((req, res, next) => {
    console.log(`Método: ${req.method}, URL: "${req.url}"`)
    return next()
})

function checkUserExists(req, res, next) {
    if(!req.body.name) {
        return res.status(400).json({ error: 'User name is required' })
    }

    return next()
}

function checkUsersInArray(req, res, next) {
    const user = users[req.params.index]

    if(!user) {
        return res.status(400).json({ error: 'User does not exists' })
    }
    req.user = user
}


 server.get('/users', (req, res) => {
     return res.json(users)
 })

server.get('/users/:index', checkUsersInArray, (req, res) => {
    return res.json(req.user)
})

server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body

    users.push(name)

    return res.json(users)
})

server.put('/users/:index', checkUsersInArray, checkUserExists, (req, res) => {
    const { index } = req.params
    const { name } = req.body

    users[index] = name

    return res.json(users)
})

server.delete('/users/:index', checkUsersInArray, (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send()
})

server.listen(3000)
