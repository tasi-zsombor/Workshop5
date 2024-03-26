import bodyParser from "body-parser";
import express from "express";
import { BASE_NODE_PORT } from "../config";
import { Value } from "../types";
import { NodeState } from "../types";

export async function node(
  nodeId: number, // the ID of the node
  N: number, // total number of nodes in the network
  F: number, // number of faulty nodes in the network
  initialValue: Value, // initial value of the node
  isFaulty: boolean, // true if the node is faulty, false otherwise
  nodesAreReady: () => boolean, // used to know if all nodes are ready to receive requests
  setNodeIsReady: (index: number) => void, // this should be called when the node is started and ready to receive requests
  initialState: NodeState // initial state of the node
  ) {

  const node = express();
  node.use(express.json());
  node.use(bodyParser.json());


  // Define the current state of the node
  let currentState: NodeState = { ...initialState };

  // TODO implement this
  // this route allows retrieving the current status of the node
  // node.get("/status", (req, res) => {});


 
  node.get("/status", (req, res) => {
    if (isFaulty) {
      res.status(500).send("faulty");
    } else {
      res.status(200).send("live");
    }
  });

  /*
let currentState: NodeState = {
  killed: false,
  x: null,
  decided: null,
  k: null
};
*/



  // TODO implement this
  // this route allows the node to receive messages from other nodes
  // node.post("/message", (req, res) => {});



node.post("/message", (req, res) => {
  // Check if the request body contains a message
  if (req.body && req.body.message) {
    const message = req.body.message;

    // Respond with a success message
    res.status(200).send("Message received successfully");
  } else {
    // Respond with an error if the message is missing
    res.status(400).send("Missing message in request body");
  }
});



  // TODO implement this
  // this route is used to start the consensus algorithm
  // node.get("/start", async (req, res) => {});



node.get("/start", async (req, res) => {
  // Start the algorithm
  // You can implement the logic to start the algorithm here

  // Respond with a success message
  res.status(200).send("Consensus algorithm started successfully");
});



  // TODO implement this
  // this route is used to stop the consensus algorithm
  // node.get("/stop", async (req, res) => {});



node.get("/stop", async (req, res) => {
  // Stop any activity
  // You can implement the logic to stop any activity here

  // Respond with a success message
  res.status(200).send("Consensus algorithm stopped successfully");
});



  // TODO implement this
  // get the current state of a node
  // node.get("/getState", (req, res) => {});



node.get("/getState", (req, res) => {
  let currentState: NodeState = { ...initialState };
  
  if (isFaulty) {
    
    currentState.x = null;
    currentState.decided = null;
    currentState.k = null;
  }



  // Send the current state of the node as the response
  res.json(currentState);
});

  
  // start the server
  const server = node.listen(BASE_NODE_PORT + nodeId, async () => {
    console.log(
      `Node ${nodeId} is listening on port ${BASE_NODE_PORT + nodeId}`
    );

    // the node is ready
    setNodeIsReady(nodeId);
  });

  
  return server;
}
