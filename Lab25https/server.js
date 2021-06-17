const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("LAB.key").toString(),
  cert: fs.readFileSync("LAB.crt").toString(),
};

https
.createServer(options, (req, res) => {
  console.log("https");
  res.end("https");
})
.listen(3443);