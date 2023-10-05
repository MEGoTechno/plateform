const notFound = ((req, res, next) => {
    const error = new Error("not found page at " + req.originalUrl)
    res.status(404)
    next(error)
})


const errorrHandler = ((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({ message: err.message })
})

module.exports = {notFound, errorrHandler}