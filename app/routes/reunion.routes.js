module.exports = app => {
    const reunion = require("../controllers/reunion.controller");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", reunion.create);
    
    router.get("/", reunion.findAll);
  
    router.get("/:id", reunion.findOne);
    // Update a Tutorial with id
    router.put("/:id", reunion.update);
    // Delete a Tutorial with id
    router.delete("/:id", reunion.delete);
    // Create a new Tutorial
    router.delete("/", reunion.deleteAll);
    app.use('/api/reunion', router);
  };