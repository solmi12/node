const crypto = require("crypto");
module.exports = mongoose => {
  var schema = mongoose.Schema(
   
    {
      id: {
        type: String,
        default: crypto.randomBytes(12).toString('hex'),
        unique: true
    },
      rName: String,
      suite: String,
      membres:[],
    },
    { timestamps: true }
  );
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Reunion = mongoose.model("reunion", schema);
  return Reunion;
};
