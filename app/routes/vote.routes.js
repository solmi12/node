const controller = require("../controllers/user.controller");
module.exports = app => {
    const vote = require("../controllers/vote.controller");
   
  
    var router = require("express").Router();
  
    router.post("/", vote.estimer);
  
  
    
    app.use('/api/vote', router ,  controller.allAccess);
  };