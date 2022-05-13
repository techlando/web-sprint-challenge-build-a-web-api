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

router.post('/', (req, res) => {
  const { name, description, completed} = req.body
  if(!name || !description) {
      res.status(400).json({
          message: 'please provied project name, and description.'
      })
  } else {
      Projects.insert({ name, description, completed})
      .then(stuff => {
          
          res.status(200).json(stuff)
      })
      .catch(err => {
          res.status(500).json({
              message: 'there is an error while saving project',
              err: err.message,
              stack: err.stack
          })
      })
  }
})

router.put('/:id', (req, res) => {
  const { name, description, completed} = req.body
  if(!name || !description || !completed) {
      res.status(400).json({
          message: 'please provied project name, and description.'
      })
  } else {
    Projects.get(req.params.id)
    .then(stuff => {
      if(!stuff){
        res.status(404).json({
          message: 'the post with that id doesnt exist'
        })
      } else {
        return Projects.update(req.params.id, req.body)
      }
    })
    .then(data => {
      //updated whole task//
      console.log(data)
      if(data){
        return res.json(data.name)
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'there is an error while updating project',
        err: err.message,
        stack: err.stack
    })
    })
  }
//   const { name, description, completed} = req.body
//   if(name === false || description === false || !completed) {
//       res.status(400).json({
//           message: 'please provied project name, description and completed.'
//       })
//   } else {
//   Projects.get(req.params.id)
//   .then(stuff => {
//       if(!stuff){
//           res.status(404).json({
//               message: 'The post with the ID does not exist'
//           })
//       } else {
//           return Projects.update(req.params.id, req.body)
//       }
      
//   })
//   .then(data => {
//       if(data){
        
//           return Projects.get(req.params.id)
//       }
//   })
//   .then(project => {
//     console.log(project)
//     res.json(project)
//   })
//   .catch(err => {
//       res.status(500).json({
//           message: 'there is an error while saving project',
//           err: err.message,
//           stack: err.stack
//       })
//   })
// }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
      } catch (err){
        next(err)
      }
})

router.get('/:id/actions', async (req, res) => {
  try {
    const action = await Projects.get(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'this action with this id does not exist'
      })
    } else {
      const stuff = await Projects.getProjectActions(req.params.id)
      res.json(stuff)
    }
  } catch (err){
    res.status(500).json({
      message: 'there is an error while getting project',
      err: err.message,
      stack: err.stack
  })
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