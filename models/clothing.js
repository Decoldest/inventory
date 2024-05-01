const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClothingSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  description: { type: String, required: true, minLength: 2, maxLength: 200 },
  price: { type: Number, required: true, min: 0 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  stock: { type: Number, required: true, min: 0 },
});

ClothingSchema.virtual("url").get(function () {
  return `/inventory/clothing/${this._id}`;
});

module.exports = mongoose.model("Clothing", ClothingSchema);
