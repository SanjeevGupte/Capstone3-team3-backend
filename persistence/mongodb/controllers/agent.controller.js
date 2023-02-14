//Import our model so we can us it to interact with the realated data in MongoDB
const Agent = require("../models/agent.model") 

//build our controller that will have our CRUD and other methods for our agents
const agentController = {

    //method to get all agents using async/await syntax
    getAgents: async function(req, res){
        console.log (" In get Agents")
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
            
            //use our model to find agents that match a query.
            //{} is the current query which really mean find all the agents
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allAgents = await Agent.find(query)
            
            //return all the agents that we found in JSON format
            res.json(allAgents)
            
        } catch (error) {
            console.log("error getting all agents: " + error)
            //if any code in the try block fails, send the agent a HTTP status of 400 and a message stating we could not find any agents
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to create a new sagent
    createAgent: async function(req, res){

        try {

            //store agent data sent through the request
            const agentData = req.body;

            //pass the agentData to the create method of the agent model
            let newAgent = await Agent.create(agentData)

            //return the newly created agent
            res.status(201).json(await Agent.findById(newAgent._id))
            
        } catch (error) {
            //handle errors creating agent
            console.log("failed to create agent: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to update a agent
    updateAgent: async function(req, res, next){

        try {

            //get the agent email from the request params
            const email = req.params.email;

            //store agent data sent through the request
            const newAgentData = req.body;

            //try to find our agent by the email provided in the request params
            const agent = await Agent.findOne({email: email})

            //update the agent if we found a match and save or return a 404
            if(agent){
                Object.assign(agent, newAgentData)
                await agent.save()
            }else{
                res.status(404).send({message: "Agent not found", statusCode: res.statusCode});
            }

            //respond with updated agent
            res.json(await Agent.findById(agent._id))
            
        } catch (error) {
            console.log("failed to update agent: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to get all agents using async/await syntax
    getAgent: async function(req, res){

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //get the state of the agent from the url parameters
            const agentState = req.params.state;
            
            //use our model to find the agent that match a query.
            //{email: some@email.com} is the current query which really mean find the agent with that email
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let foundAgent = await Agent.findOne({state: agentState})

            //if we found the agent, return that agent otherwise return a 404
            if(foundAgent){
                res.json(foundAgent)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Agent Not Found!"
                })
            }
            
        } catch (error) {
            console.log("error getting agent: " + error)
            //if any code in the try block fails, send the agent a HTTP status of 400 and a message stating we could not find the agent
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    }
    

}

module.exports = agentController;
