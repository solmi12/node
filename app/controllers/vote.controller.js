
const db = require("../models/index"); 
const Vote = db.vote
let express = require('express');
exports.estimer = (req, res) =>{


  if (!req.body.userStory) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
    const vote = new Vote({
      userStory : req.body.userStory,
      //name: req.body.name,
        //username : req.body.username,
    
      });
     
      vote
        .save(vote)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
}