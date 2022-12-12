

export const errorMiddleware = (err, _, res, next) => {
    res.status(err.status || 500);

    res.json({
        type: err.type || "error",
        status: err.status,
        message: err.message
    })
}