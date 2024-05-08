import { createReadStream } from "fs";
import { parseStream } from "fast-csv";

const options = {
  objectMode: true,
  delimiter: ",",
  quote: null,
  headers: false,
  renameHeaders: false,
};

const data = [];

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

    data.push(record);
  })
  .on("end", (rowCount) => {
    console.log(rowCount);
    console.log(data[506670]);
  });
