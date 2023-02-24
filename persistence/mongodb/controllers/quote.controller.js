//Import our model so we can us it to interact with the realated data in MongoDB
const Quote = require("../models/quote.model") 

//build our controller that will have our CRUD and other methods for our quotes
const quoteController = {

    //method to get all quotes using async/await syntax
    getQuotes: async function(req, res){
        console.log (" In get Quotes")
        //create base query
        let query = {}

        //if firstName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.firstName){
            const regex = new RegExp(`.*${req.query.firstName}.*$`, "i")
            query.firstName = {'$regex':regex}
        }

        //if lastName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.lastName){
            const regex = new RegExp(`.*${req.query.lastName}.*$`, "i")
            query.lastName = {'$regex':regex}
        }

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find quotes that match a query.
            //{} is the current query which really mean find all the quotes
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allQuotes = await Quote.find(query)
            
            //return all the quotes that we found in JSON format
            res.json(allQuotes)
            
        } catch (error) {
            console.log("error getting all quotes: " + error)
            //if any code in the try block fails, send the quote a HTTP status of 400 and a message stating we could not find any quotes
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to create a new squote
    createQuote: async function(req, res){

        try {

            //store quote data sent through the request
            const quoteData = req.body;

            //pass the quoteData to the create method of the quote model
            let newQuote = await Quote.create(quoteData)

            //return the newly created quote
            res.status(201).json(await Quote.findById(newQuote._id))
            
        } catch (error) {
            //handle errors creating quote
            console.log("failed to create quote: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to update a quote
    updateQuote: async function(req, res, next){

        try {

            //get the quote email from the request params
            const email = req.params.email;

            //store quote data sent through the request
            const newQuoteData = req.body;

            //try to find our quote by the email provided in the request params
            const quote = await Quote.findOne({email: email})

            //update the quote if we found a match and save or return a 404
            if(quote){
                Object.assign(quote, newQuoteData)
                await quote.save()
            }else{
                res.status(404).send({message: "Quote not found", statusCode: res.statusCode});
            }

            //respond with updated quote
            res.json(await Quote.findById(quote._id))
            
        } catch (error) {
            console.log("failed to update quote: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to get all quotes using async/await syntax
    getQuote: async function(req, res){

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //get the email address of the quote from the url parameters
            const quoteEmail = req.params.email;
            
            //use our model to find the quote that match a query.
            //{email: some@email.com} is the current query which really mean find the quote with that email
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let foundQuote = await Quote.find({email: quoteEmail})

            //if we found the quote, return that quote otherwise return a 404
            if(foundQuote){
                res.json(foundQuote)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Quote Not Found!"
                })
            }
            
        } catch (error) {
            console.log("error getting quote: " + error)
            //if any code in the try block fails, send the quote a HTTP status of 400 and a message stating we could not find the quote
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    }
    

}

module.exports = quoteController;
