module.exports = (err,req,res,next) => {
    if(err){

        !err["status"] ? res.json(err) : res.status(err.status).json({
            status: err.status,
            message: err.message
        });

    };
};