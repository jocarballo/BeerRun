const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: String,
    profilePicture: String,
    beerRuns: {type: mongoose.Schema.Types.ObjectId, ref: 'BeerRun'},
    favorites: {type: mongoose.Schema.Types.ObjectId, ref: 'BeerRun'},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
