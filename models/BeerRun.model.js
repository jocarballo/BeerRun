const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const beerRunSchema = new Schema(
  {
    name: String,
    bars: [Map],
    startLocation: [Number],
    endLocation: [Number],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const BeerRun = model("BeerRun", beerRunSchema);

module.exports = BeerRun;
