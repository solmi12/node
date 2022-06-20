module.exports = app => {
    const reunion = require("../controllers/reunion.controller");
    const user = require("../controllers/user.controller");
  
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
  router.get("find/:rName", reunion.get);
    
    router.get("/find/findall", user.findAll);
    app.use('/api/reunion', router);
  };