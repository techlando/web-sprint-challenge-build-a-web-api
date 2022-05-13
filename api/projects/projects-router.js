// Write your "projects" router here!
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('hello from project Router :)')
  });
  
router.get('/:id', (req, res) => {
    console.log('im using an ID!!!')
})

router.post('/', (req, res) => {
    console.log('hello world POST')
})

router.put('/:id', (req, res) => {
    console.log('hello world')
})

router.delete('/:id', (req, res) => {
    console.log('hello world')
})

router.get('/:id/actions', (req, res) => {
    console.log('hello world')
})

router.get('', (req, res) => {
    console.log('hello world')
})


module.exports = router;