// This method replaces try and catch is using the error.js in all routers
module.exports = function (handler) {

    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}