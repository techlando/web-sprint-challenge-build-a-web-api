// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {
    validateId,
    validateActions,
    validateProject
} = require('../projects/projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
    .then(stuff => {
        if(!stuff) {
            return '[]'
        } else {
            res.json(stuff)
        }
       
    })
    .catch(next)
    
  });

  
router.get('/:id', validateId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert({ name: req.name, description: req.description })
  .then(newProject => {
   res.status(201).json(newProject)
  })
  .catch(next)
   
})

// router.put('/:id', validateId, (req, res) => {
//     console.log('hello world')
// })

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
      } catch (err){
        next(err)
      }
})

router.get('/:id/actions', validateId, validateActions, async (req, res) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
        } catch (err) {
          next(err)
        }
   
})




module.exports = router;