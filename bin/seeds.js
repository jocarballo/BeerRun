const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://RFv3aO5lhHY1Gf0b:jRPbvZJRAw4oSWLv@cluster0.lyg7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((db) => console.log(`connected to database ${db.connections[0].name}`))
  .catch((err) => console.log(err));

const BeerRun = require("../models/BeerRun.model.js");

let beerRun = [
  {
    name: "BeerRun1",
    startPoint: [52.50309929298334, 13.43157042875576],
    endPoint: [52.49960772707184, 13.4193931726115],
    numberOfStops: 5,
    reviews: review,
  },

  {
    name: "BeerRun2",
    startPoint: [52.5252613057281, 13.39215680391063],
    endPoint: [52.52267266475351, 13.401576170360569],
    numberOfStops: 5,
    reviews: review,
  },
  {
    name: "BeerRun3",
    startPoint: [52.53175394484811, 13.38978399689208],
    endPoint: [52.5336887068357, 13.403021530991257],
    numberOfStops: 5,
    reviews: review,
  },
  {
    name: "BeerRun4",
    startPoint: [52.538148766714784, 13.396043286193349],
    endPoint: [52.53284918605485, 13.398965366946525],
    numberOfStops: 5,
    reviews: review,
  },
  {
    name: "BeerRun5",
    startPoint: [52.495047916255515, 13.387972919595343],
    endPoint: [52.48345322413479, 13.402396002053623],
    numberOfStops: 5,
    reviews: review,
  },
  {
    name: "BeerRun6",
    startPoint: [52.48928514446043, 13.407732351815554],
    endPoint: [52.496089519979215, 13.435932645286591],
    numberOfStops: 5,
    reviews: review,
  }
];

BeerRun.insertMany(beerRun)
  .then(beerRun => {
    console.log(`Success - added ${beerRun.length} beerRun to the db`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
