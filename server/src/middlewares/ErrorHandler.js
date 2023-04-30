class UserError extends Error{
    constructor(message,status){
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Generic error handler.
 * Error Object: {Message, Status}
 * @param {Error} error 
 * @param {Request} req 
 * @param {Result} res 
 * @param {Callback} next 
 */
const ErrorHandler = (error,req,res,next)=>{
    let ErrorOb;
    if(error.constructor.name === 'Error') ErrorOb = {Message: 'Server Error' , status: 500 };
    else ErrorOb = {Message: error.message , status: error.status };
    return res.status(error.status || 500).send(ErrorOb);
}

module.exports = {ErrorHandler,UserError};