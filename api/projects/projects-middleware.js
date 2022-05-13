// add middlewares here related to projects
const Projects = require('./projects-model');

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[ ${timestamp}], method: ${method}, from: ${url}`)
    next()
}

async function validateId( req, res, next) {
    try{
        const project = await Projects.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: 'sorry no such project, please try again'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding project'
        })
    }
}
function validateProject(req, res, next){
    const { name, description } = req.body
    if(!name || !description) {
        res.status(400).json({
            message: 'missing required name and description'
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}

function validateActions(req, res, next) {
    const { action } = req.body
    if(!action) {
        res.send('[]')
        }
     else {
        req.action = action
        next()
    }
}



module.exports = {
    logger,
    validateId,
    validateActions,
    validateProject
}