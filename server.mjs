import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { searchRecords } from "./fbrlist.mjs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(express.static("public"));

app.get("/time", (req, res) => {
  res.send("Current Time is:" + new Date().getTime());
});

app.post("/fbr", (req, res) => searchRecords(req, res));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
