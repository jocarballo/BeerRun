const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema(
  {
    comment: String,
    rating: Number,
    photos: Array,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
