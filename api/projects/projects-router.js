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

router.put('/:id', validateId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description })
    .then(() => {
      return Projects.get(req.params.id)
     
    })
    .then(project => {
      res.json(project)
    })
    .catch(next)
})

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
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: 'something horriblle has happened',
        err: err.message,
        stack: err.stack
    })
})





module.exports = router;