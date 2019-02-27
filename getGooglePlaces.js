const axios = require("axios");
const mongoose = require("mongoose");
const Tree = require("./Tree");
let mongoURI = "mongodb://localhost/bigtrees";
mongoose.connect(mongoURI, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESS" + mongoURI);
    Tree.find({}).then(trees => {
      recursiveAddressSearch(trees);
    });
  }
});

let API_KEY = "AIzaSyCY8_463d-VzkTmrtHvqLXYsXP1QiMwFzc";

function recursiveAddressSearch(trees) {
  if (trees.length > 0) {
    let tree = trees.pop();
    let address = tree.Address + ", Pennsylvania";
    console.log(address);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${address}&inputtype=textquery`
      )
      .then(res => {
        if (res.data.candidates.length > 0) {
          // we found an address
          return axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
              res.data.candidates[0].place_id
            }&key=${API_KEY}`
          );
        } else return null;
      })
      .then(async place => {
        if (place) {
          tree.googleAddress = place.data.result.formatted_address;
          tree.geometry = place.data.result.geometry;
          console.log(tree.googleAddress);
          await tree.save();

          recursiveAddressSearch(trees);
        } else {
          recursiveAddressSearch(trees);
        }
      })
      .catch(err => {
        console.log(err);
        recursiveAddressSearch(trees);
      });
  } else {
    console.log("done");
    mongoose.connection.close();
  }
}
