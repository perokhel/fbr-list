import { createReadStream } from "fs";
import { parseStream } from "fast-csv";

// initialize list from csv file
const fbrList = getListFromFile();

// displayTest("khan jatt");

export function searchRecords(req, res) {
  let searchStr = req.body.searchFor;
  res.json(findInTheList(searchStr));
}

function displayTest(str) {
  // wait for getListFromFile() to initialize the list from csv
  setTimeout(() => {
    console.log(findInTheList(str));
  }, 3000);
}

function getListFromFile() {
  const readableStream = createReadStream("./data/fbrlist.csv");
  const list = [];
  const options = {
    objectMode: true,
    delimiter: ",",
    quote: null,
    headers: false,
    renameHeaders: false,
  };
  // read records from csv file and copy into list array
  parseStream(readableStream, options)
    .on("error", (error) => {
      console.log(error);
    })
    .on("data", (row) => {
      let record = {
        serial_no: row[0],
        id: row[1],
        name: row[2],
      };

      list.push(record);
    })
    .on("end", (rowCount) => {});
  return list;
}

export default function findInTheList(searchString) {
  return fbrList.filter((obj) => {
    for (const key in obj) {
      //if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const valueString = typeof value === "string" ? value : String(value); // Convert non-strings to strings
      if (valueString.toLowerCase().includes(searchString.toLowerCase())) {
        return true;
      }
      //}
    }
    return false;
  });
}
