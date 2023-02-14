/**
 * Skeletal implementation of Agent controller for backing resource.
 */

const Agent = require("../models/agent.model")

//build our controller that will have our CRUD and other methods for our users
const agentController = {

    //method to get all users using async/await syntax
    getAgents: async function(req, res){
    },
    //method to create a new agent
    createAgent: async function(req, res){
    },
    //method to update a agent
    updateAgent: async function(req, res, next){
    },
    //method to get all users using async/await syntax
    getAgent: async function(req, res){
    }
}

module.exports = agentController;
