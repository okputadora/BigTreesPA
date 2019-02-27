const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const mongoose = require("mongoose");
const Tree = require("./Tree.js");
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

let index = 9;
let pageIndex = 81;
let mongoURI = "mongodb://localhost/bigtrees";
mongoose.connect(mongoURI, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESS" + mongoURI);
    recursiveScrape(index, pageIndex);
  }
});

function recursiveScrape(index, pageIndex) {
  let treeDetails = {};
  nightmare
    .goto("http://www.pabigtrees.com/view_tree.aspx")
    .evaluate(pageIndex => {
      console.log("are we here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 11) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${11}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 21) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${21}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 31) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${31}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 41) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${41}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 51) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${51}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 61) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${61}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 71) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${71}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(pageIndex => {
      console.log("shouldbe in here");
      // window.__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${')
      if (pageIndex > 81) {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${81}')"]`
        );
        return link.click();
      } else {
        let link = document.querySelector(
          `[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$GridView1','Page$${pageIndex}')"]`
        );
        if (link) {
          return link.click();
        }
      }
    }, pageIndex)
    .wait(1500)
    .evaluate(
      context => {
        console.log("are we here?");
        let list = document.querySelector(context.selector).children;
        let index = 0;
        for (let item of list) {
          if (index === context.index) {
            // console.log(item);
            let cells = item.children;
            // context.treeDetails.county = cells.item(4).innerText;
            cells.item(0).children.item(0).className = "elToClick";
            // context.treeDetails.county = cells
            //   .item(0)
            //   .children.item(4).innerText;
          }
          index++;
        }
        // get details page
        // console.log("EL: ", el);
        return list;
      },
      { selector: "tbody", index, treeDetails }
    )
    .click(".elToClick")
    .wait(1500)
    .evaluate(
      context => {
        console.log("or here");
        let { selector, treeDetails } = context;
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
        treeDetails.link = window.location.href;

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
            detailKey = detailKey.replace(":", "");
            detailValue = detail.children.item(1).innerText;
            treeDetails[detailKey] = detailValue;
          }
          counter++;
        }

        return treeDetails;
        // return treeMeasurements;
      },
      { selector: "#main", treeDetails }
    )
    .then(tree => {
      console.log("are we re");
      Tree.create(tree)
        .then(res => {
          console.log(tree);
          console.log("page: ", pageIndex);
          console.log("tree: ", index);
          index += 1;
          if (index > 20) {
            pageIndex += 1;
            index = 1;
          }
          if (pageIndex === 82) {
            console.log("start over with page 82");
            return mongoose.connection.close();
          }
          return recursiveScrape(index, pageIndex);
        })
        .catch(err => console.log("ERROR ", err));
    })
    .catch(error => {
      console.error("Search failed:", error);
    });
}
