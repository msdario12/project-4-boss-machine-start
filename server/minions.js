const express = require('express')
const minionsRouter = express.Router({mergeParams: true})
const db = require('./db')
// We are nested inside of /api/minions/

minionsRouter.param('minionId', (req,res,next,id) => {

    const found = db.getFromDatabaseById('minions', id)

    if (!found) {
        res.status(404).send('Miniom not found!')
    } else {
        req.miniom = found;
        req.id = id;
        next()
    }
    
})

minionsRouter.get('/', (req,res,next) => {
    const arrayMinions = db.getAllFromDatabase('minions')
    res.status(200).send(arrayMinions)
})

minionsRouter.post('/', (req,res,next) => {
    const minion = req.body;
    let {name, title, salary} = minion
    salary = Number(salary)
    if (name && title && salary) {
        const newMinon = db.addToDatabase('minions', minion)
        res.status(201).send(newMinon)
    } else {
        res.status(404).send()
    }
})



minionsRouter.get('/:minionId', (req,res,next) => {

    res.status(200).send(req.miniom)
})

minionsRouter.put('/:minionId', (req,res,next) => {
    
    db.updateInstanceInDatabase('minions', req.body)
    res.status(200).send(req.miniom)

})

minionsRouter.delete('/:minionId', (req,res,next) => {
    db.deleteFromDatabasebyId('minions', req.id)
    res.status(204).send()
})





module.exports = minionsRouter