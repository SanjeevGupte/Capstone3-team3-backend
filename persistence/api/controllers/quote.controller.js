/**
 * Skeletal implementation of Quote controller for backing resource.
 */

const Quote = require("../models/quote.model")

//build our controller that will have our CRUD and other methods for our users
const quoteController = {

    //method to get all users using async/await syntax
    getQuotes: async function(req, res){
    },
    //method to create a new quote
    createQuote: async function(req, res){
    },
    //method to update a quote
    updateQuote: async function(req, res, next){
    },
    //method to get all users using async/await syntax
    getQuote: async function(req, res){
    }
}

module.exports = quoteController;
