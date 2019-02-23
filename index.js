const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

let selector = "tbody";

let dataTemplate = {
  genus: "",
  species: "",
  commonName: "",
  circumference: 0,
  height: 0,
  spread: 0,
  points: 0,
  address: "",
  county: "",
  measuringCrew: "",
  originalNominator: "",
  comments: "",
  measuringTechnique: "",
  yearNominated: "",
  lastMeasured: "",
  link: ""
};

let newTree = {};
function recursiveScrape(newTree) {
  nightmare
    .goto("http://www.pabigtrees.com/view_tree.aspx")
    .evaluate(selector => {
      let list = document.querySelector(selector).children;
      let index = 0;
      let cellIndex = 0;
      for (let item of list) {
        if (index === 1) {
          // console.log(item);
          let cells = item.children;
          cells.item(0).children.item(0).className = "elToClick";
        }
        index++;
      }
      window.county = "hello";
      // get details page
      // console.log("EL: ", el);
      return list;
    }, "tbody")
    .click(".elToClick")
    .wait(2000)
    .evaluate(selector => {
      let treeDetails = {};
      let content = document.querySelector(selector).children;
      let scientific = content
        .item(0)
        .children.item(0)
        .children.item(0)
        .children.item(0)
        .innerText.split(",");
      treeDetails.genus = scientific[0].trim();
      treeDetails.species = scientific[1].trim();
      // console.log(genus, species);
      treeDetails.commonName = content
        .item(0)
        .children.item(0)
        .children.item(0)
        .children.item(1).innerText;
      // console.log(commonName);

      let details = content.item(0).children.item(2);
      // console.log(details);
      let measurements = details.children
        .item(0)
        .children.item(0)
        .children.item(0)
        .children.item(0)
        .children.item(0)
        .children.item(0).children;
      //   .children;
      // console.log(measurements);
      let m1 = measurements.item(0);
      let m2 = measurements.item(1);
      // console.log(m1, m2);
      // let treeMeasurements = {};
      treeDetails.circumference = m1.children.item(1).innerText;
      treeDetails.spread = m1.children.item(3).innerText;
      treeDetails.height = m2.children.item(1).innerText;
      treeDetails.points = m2.children.item(3).innerText;

      let addDetails = details.children.item(0).children.item(0);

      treeDetails.address = addDetails.children
        .item(1)
        .children.item(1).innerText;
      treeDetails.measuringCrew = addDetails.children
        .item(2)
        .children.item(1).innerText;
      treeDetails.originalNominator = addDetails.children
        .item(3)
        .children.item(1).innerText;
      treeDetails.comments = addDetails.children
        .item(4)
        .children.item(1).innerText;
      treeDetails.measuringTechnique = addDetails.children
        .item(5)
        .children.item(1).innerText;
      treeDetails.yearNominated = addDetails.children
        .item(6)
        .children.item(1).innerText;
      treeDetails.lastMeasured = addDetails.children
        .item(7)
        .children.item(1).innerText;

      return treeDetails;
      // return treeMeasurements;
    }, "#main")
    .then(tree => {})
    .catch(error => {
      console.error("Search failed:", error);
    });
}

recursiveScrape(newTree);
