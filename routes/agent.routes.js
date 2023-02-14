const express = require('express');
const router = express.Router();

//import the user controller to handle our user routes
const agentController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/agent.controller`
)

//post route to create a agent (New Agent)
router.post("/", agentController.createAgent)

//get route to return all agents 
router.get("/", agentController.getAgents)

// get route to return all agents in a specific state (no auth)
router.get("/:state", agentController.getAgent)

//put route to update a agent (requires auth)
router.put("/:email", agentController.updateAgent)

module.exports = router;
