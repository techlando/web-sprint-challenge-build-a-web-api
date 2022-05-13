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

router.post('/', (req, res) => {
   const { project_id, description, notes} = req.body
   if(!project_id || !description || !notes) {
       res.status(400).json({
           message: 'please provied project id, description, and notes'
       })
   } else {
       Actions.insert({ project_id, description, notes})
       .then(stuff => {
           
           res.status(200).json(stuff)
       })
       .catch(err => {
           res.status(500).json({
               message: 'there is an error while saving action',
               err: err.message,
               stack: err.stack
           })
       })
   }
})

router.put('/:id', (req, res) => {
    const { project_id, description, notes} = req.body
    if(!project_id || !description || !notes) {
        res.status(400).json({
            message: 'please provied project id, description, and notes'
        })
    } else {
    Actions.get(req.params.id)
    .then(stuff => {
        if(!stuff){
            res.status(404).json({
                message: 'The post with the ID does not exist'
            })
        } else {
            return Actions.update(req.params.id, req.body)
        }
        
    })
    .then(data => {
        if(data){
            return res.json(data)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'there is an error while saving action',
            err: err.message,
            stack: err.stack
        })
    })
}
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
