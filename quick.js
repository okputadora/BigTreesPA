const mongoose = require("mongoose");
const Tree = require("./Tree");
let mongoURI = "mongodb://localhost/bigtrees";
mongoose.connect(mongoURI, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESS" + mongoURI);
    Tree.find({}).then(trees => {
      Promise.all(
        trees.map(tree => {
          if (tree.geometry.location) {
            let { lat, lng } = tree.geometry.location;
            tree.lat = lat;
            tree.lng = lng;
            delete tree.geometry;
            return tree.save();
          }
        })
      ).then(() => {
        console.log("all trees updated");
      });
    });
  }
});
