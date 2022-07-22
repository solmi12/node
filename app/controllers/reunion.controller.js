const db = require("../models/index"); 
const Reunion = db.reunion
let express = require('express');
let app = express();




exports.create = (req, res) => {
  // Validate request
  if (!req.body.rName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const reunion = new Reunion({
    
    rName: req.body.rName,
    suite: req.body.suite,
   
  });
 
  reunion
    .save(reunion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findAll = (req, res) => {
  const rName = req.query.rName;
  var condition = rName ? { rName: { $regex: new RegExp(rName), $options: "i" } } : {};
  Reunion.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reunions."
      });
    });
};

exports.findOnee = async (req,res) =>{

  
  let insertion = await Reunion.create({
        
    rName: req.body.rName,
    suite: req.body.suite,
   
    createdAt: new Date()
  });
  let data = {};
  if (insertion.acknowledged) {
    // ... prepare the data
    data = await reunions.findOne({_id: insertion.insertedId});
  }
  
  
  res.send(data);
}

exports.findOne = (req, res) => {
  const id = req.params.id;
  Reunion.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Reunion with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Reunion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Reunion with id=${id}. Maybe Reunion was not found!`
        });
      } else res.send({ message: "Reunion was updated successfully." });
    })
  
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Reunion.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete reunion with id=${id}. Maybe reunion was not found!`
        });
      } else {
        res.send({
          message: "reunion was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
exports.deleteAll = (req, res) => {
  Reunion.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.get = async (req,resp)=>{

  let data = await Reunion.find(
      {
          "$or":[
              {rName:{$regex:req.params.rName}}
            
          ]
      }
  )
  resp.send(data);
}