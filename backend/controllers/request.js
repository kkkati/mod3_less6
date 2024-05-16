const Request = require("../models/request");

//add
async function addRequest(request) {
  const newRequest = await Request.create(request);

  await newRequest;

  return newRequest;
}

//get list
async function getRequests() {
  return Request.find();
}

module.exports = { addRequest, getRequests };
