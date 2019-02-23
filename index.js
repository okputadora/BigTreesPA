const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

let selector = "tbody";

let counter = 0;

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
let index = 1;
let pageIndex = 1;
function recursiveScrape(index, pageIndex) {
  nightmare
    .goto("http://www.pabigtrees.com/view_tree.aspx")
    .evaluate(pageIndex => {
      let link = document.querySelector(
        `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${2}')"]`
      );
      if (link) link.click();
    }, pageIndex)
    .wait(1000)
    .evaluate(
      context => {
        let list = document.querySelector(context.selector).children;
        let index = 0;
        for (let item of list) {
          if (index === context.index) {
            // console.log(item);
            let cells = item.children;
            cells.item(0).children.item(0).className = "elToClick";
          }
          index++;
        }
        // get details page
        // console.log("EL: ", el);
        return list;
      },
      { selector: "tbody", index: index }
    )
    .click(".elToClick")
    .wait(1000)
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
      let counter = 0;
      for (let detail of addDetails.children) {
        let detailKey;
        let detailValue;
        if (counter > 0) {
          detailKey = detail.children
            .item(0)
            .innerText.split(" ")
            .join("");
          detailValue = detail.children.item(1).innerText;
          treeDetails[detailKey] = detailValue;
        }
        counter++;
      }
      // treeDetails.address = addDetails.children
      //   .item(1)
      //   .children.item(1).innerText;
      // treeDetails.measuringCrew = addDetails.children
      //   .item(2)
      //   .children.item(1).innerText;
      // treeDetails.originalNominator = addDetails.children
      //   .item(3)
      //   .children.item(1).innerText;
      // treeDetails.comments = addDetails.children
      //   .item(4)
      //   .children.item(1).innerText;
      // treeDetails.measuringTechnique = addDetails.children
      //   .item(5)
      //   .children.item(1).innerText;
      // treeDetails.yearNominated = addDetails.children
      //   .item(6)
      //   .children.item(1).innerText;
      // treeDetails.lastMeasured = addDetails.children
      //   .item(7)
      //   .children.item(1).innerText;

      return treeDetails;
      // return treeMeasurements;
    }, "#main")
    .then(tree => {
      console.log("page: ", pageIndex);
      console.log("tree: ", index);
      index += 1;
      if (index > 20) {
        pageIndex += 1;
        index = 1;
      }
      recursiveScrape(index, pageIndex);
    })
    .catch(error => {
      console.error("Search failed:", error);
    });
}

recursiveScrape(index, pageIndex);
