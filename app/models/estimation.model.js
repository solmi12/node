const mongoose = require("mongoose");
const estimationSchema = new mongoose.Schema(
    {
      name:{
       type:String,
       required:true,
      },
      value:{
        type:Number,
       
      },
      etat:{
        type:Boolean,
        default:false,
        required:true,
      },
      Idreunion: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "reunions"
        }
      ],
     
  },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("estimation", estimationSchema);