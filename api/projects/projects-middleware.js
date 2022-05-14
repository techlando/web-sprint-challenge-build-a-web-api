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
    if(req.body.name && req.body.description && req.body.completed !== undefined){
        next()
    } else {
        next({
            status: 400,
            message: 'please provide name, description, and completed'
        });
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