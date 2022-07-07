const { isValidRequestBody, isValidObjectId, isValidData } = require("../validator/validation")


const check = function (req, res, next) {
    try {

        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Request body is empty!! Please provide the college details" })
        }

        const { bookId, reviewedBy, reviewedAt, rating, review } = requestBody;

        //check if each mandatory field is present in request body
        let invalidParam = "";

        if (!isValidObjectId(bookId)) {
            invalidParam = "bookId"
        }
        if (!isValidData(reviewedBy)) {
            invalidParam = invalidParam + "reviewedBy"

        }
        if (!isValidData(reviewedAt)) {
            invalidParam = invalidParam + " " + "reviewedAt"

        }
        if (!rating || typeof rating != Number || rating < 1 || rating > 5) {
            invalidParam = invalidParam + "rating"
        }


        if (invalidParam) {
            let message = invalidParam + " : invalid input parameters "
            return res.status(400).send({ status: false, msg: message })
        }

        //validating other constraints
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "Invalid bookId" })
        }

        // if(rating<1 || rating > 5){
        //     return res.status(400).send({ status: false, msg: "Rating should be 1 to 5" })
        // }

        //review is optional parameter, but if provided it should be a non-empty string
        if (review) {
            if (!isValidData(review))
                return res.status(400).send({ status: false, msg: "Review type must be string and can't provide empty" })
        }


        //if all validations are correct then go to controller
        next()

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

}

module.exports = {check}