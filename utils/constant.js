//Constant variables are declared here.
const config = {
    "cryptoAlgorithm": "aes-256-ctr",
    "cryptoPassword": 'd6F3Efeq',
}
const messages = {
    "loginSuccess": "Logged in successfully.",
    "signupSuccess": "User registered successfully.",
    "logotSuccess":"User loged out successfully."
}
const statusCode = {
    "OK": 200,
    "Created": 201,
    "NoContent": 204,
    "BadRequest": 400,
    "Unauthorized": 401,
    "Forbidden": 403,
    "NotFound": 404,
    "RequestTimeout": 408,
    "InternalServerError": 500,
    "BadGateway": 502,
    "ServiceUnavailable": 503,
    "GatewayTimeout": 504,
}
const validationMessages = {
    "emailAlreadyExist": "Email ID already exists, please try again with another.",
    "userAlreadyExist": "User already exist, try with another.",
    "emailRequired": "Email is required.",
    "passwordRequired": "Password is required.",
    "dataFound":"Data found successfully.",
    "dataDeleted":"Data deleted successfully.",
    "successfullyUpdated":"Updated successfully.",
    "invalidEmail": "Invalid Email Given.",
    "invalidEmailOrPassword": "Invalid email or password.",
    "internalError": "Internal server error.",
    "requiredFieldsMissing": "Required fields missing.",
    "emailNotExist": "Email doesn't exist.",
    "userNotFound": "User not found.",
    "dataNotFound": "No record found.",
    "dataSaved":"Data saved successfully.",
    "messageAdded": "Message added successfully.",
    "messageDeleted":"Message deleted successfully",
    "notLogedIn": "User not loged in."
}

var obj = {
    config: config,
    statusCode:statusCode,
    messages: messages,
    validationMessages: validationMessages,
};
module.exports = obj