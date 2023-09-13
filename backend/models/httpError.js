class HttpError extends Error{
    constructor(message, code){
        super(message); // Add a message property
        this.code = code; // Adds a error property
    }
}

module.exports = HttpError;
