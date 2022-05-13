// add middlewares here related to actions
const Actions = require('./actions-model');


async function validateId( req, res, next) {
    try{
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'sorry no such action, please try again'
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}
function validateActions(req, res, next){
    const { notes, description, project_id } = req.body
    if(!notes || !description || !project_id) {
        res.status(400).json({
            message: 'missing required notes and description and project_id'
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id.trim()
        next()
    }
}


module.exports = {
    validateActions,
    validateId
}
