// add middlewares here related to projects
function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[time: ${timestamp}], method: ${method}, from: ${url}`)
    next()
}
function validateId( req, res, next) {
    next()
}

function validateActions(req, res, next) {

}

module.exports = {
    logger,
    validateId,
    validateActions
}