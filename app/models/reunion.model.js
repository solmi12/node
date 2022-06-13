module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
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
  const Reunion = mongoose.model("Reunion", schema);
  return Reunion;
};
