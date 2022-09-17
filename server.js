const cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");

var PORT = process.env.PORT || 8001;

// Path to build directory
const clientDirPath = path.resolve(__dirname, "build");

// Path to index.html file
const clientIndexHtml = path.join(clientDirPath, "index.html");

// Init express
const app = express();
const serveRouter = express.Router();

// Enable cors
serveRouter.use(cors());

// Function to check if compressed file exists
const fileExists = (url) =>
  fs.existsSync(path.join(clientDirPath, url + ".gz").split("?")[0]);

// For each request for .js file return the compressed version .gz
app.get("*.js", function (req, res, next) {
  try {
    // Check if .gz file exists
    if (fileExists(req.url)) {
      // Change the requested .js to return the compressed version - filename.js.gz
      if (req.url.includes("?")) req.url = req.url.split("?").join(".gz?");
      else req.url = req.url + ".gz?";
      // Tell the browser the file is compressed and it should decompress it. You will get a blank screen without this header because it will try to parse the compressed file.
      res.set("Content-Encoding", "gzip");
      res.set("Content-Type", "text/javascript");
    }
  } catch (err) {
    console.error(err);
  }
  console.log(req.url);
  next();
});

// For each request for .css file return the compressed version .gz
app.get("*.css", function (req, res, next) {
  try {
    // Check if .gz file exists
    if (fileExists(req.url)) {
      // Change the requested .js to return the compressed version - filename.js.gz
      if (req.url.includes("?")) req.url = req.url.split("?").join(".gz?");
      else req.url = req.url + ".gz?";
      // Tell the browser the file is compressed and it should decompress it. You will get a blank screen without this header because it will try to parse the compressed file.
      res.set("Content-Encoding", "gzip");
      res.set("Content-Type", "text/css");
    }
  } catch (err) {
    console.error(err);
  }
  console.log(req.url);
  next();
});

// For each request for .map file return the compressed version .gz
app.get("*.map", function (req, res, next) {
  // try {
  //   // Check if .gz file exists
  //   if (fileExists(req.url)) {
  //     // Change the requested .js to return the compressed version - filename.js.gz
  //     if (req.url.includes("?")) req.url = req.url.split("?").join(".gz?");
  //     else req.url = req.url + ".gz?";
  //     // Tell the browser the file is compressed and it should decompress it. You will get a blank screen without this header because it will try to parse the compressed file.
  //     res.set("Content-Encoding", "gzip");
  //     res.set("Content-Type", "text/javascript");
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
  next();
});

// Set the static files root directory from which it should serve the files from.

app.use(express.static(clientDirPath));

// Always send the index.html file to the client

app.get("*", (req, res) => {
  res.sendFile(clientIndexHtml);
});

app.listen(PORT, () => console.log(`Frontend is running on port ${PORT}`));
