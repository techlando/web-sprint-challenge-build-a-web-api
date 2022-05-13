// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model');
const router = express.Router();
const { validateId, validateActions } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Actions.get()
    .then(stuff => {
        if(!stuff) {
            return '[]'
        } else {
            res.json(stuff)
        }
    })
    .catch(next)
    
})

router.get('/:id', validateId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateActions, (req, res) => {
    Actions.insert({
        notes: req.notes,
        description: req.description,
        project_id: req.project_id
    })
    .then(newAction => {
        console.log(newAction)
    //  res.status(201).json(newAction)
    })
    // .catch(next)
})

router.put('/:id', (req, res) => {
    console.log('hello from actions router')
})

router.delete('/:id', validateId, async  (req, res) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
      } catch (err){
        next(err)
      }
})





module.exports = router;
