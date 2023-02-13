const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our user routes
const quoteController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/quote.controller`
)

//post route to create a quote (New Quote)
router.post("/", quoteController.createQuote)

//get route to return all quotes (requires auth)
router.get("/", validateJwtMiddleware, quoteController.getQuotes)

//get route to return a specific users (requires auth)
router.get("/:email", validateJwtMiddleware, quoteController.getQuote)

//put route to update a quote (requires auth)
router.put("/:email", validateJwtMiddleware, quoteController.updateQuote)

module.exports = router;
