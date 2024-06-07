import { createReadStream } from "fs";
import { parseStream } from "fast-csv";

const options = {
  objectMode: true,
  delimiter: ",",
  quote: null,
  headers: false,
  renameHeaders: false,
};

const fbrList = [];

const readableStream = createReadStream("./data/fbrlist.csv");

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

    fbrList.push(record);
  })
  .on("end", (rowCount) => {
    console.log(rowCount);
    console.log(fbrList[506670]);
  });

console.log(find);

export default function findInTheList(searchString) {
  return fbrList.filter((obj) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const valueString = typeof value === "string" ? value : String(value); // Convert non-strings to strings
        if (valueString.toLowerCase().includes(searchString.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  });
}
