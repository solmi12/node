const controller = require("../controllers/user.controller");
module.exports = app => {
    const reunion = require("../controllers/reunion.controller");
   
  
    var router = require("express").Router();
  
    router.post("/", reunion.create);
    
    router.get("/", reunion.findAll);
  
    router.get("/:id", reunion.findOne);
    router.get("/find/findonee", reunion.findOnee);
   
    
    router.put("/:id", reunion.update);

    router.delete("/:id", reunion.delete);

    router.delete("/", reunion.deleteAll);
  router.get("find/:rName", reunion.get);
    
    app.use('/api/reunion', router , controller.allAccess);
  };