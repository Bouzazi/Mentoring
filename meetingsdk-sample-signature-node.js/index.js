const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

ZOOM_JWT_API_KEY = "_4T6qvC7QdKgOurpoF7pzA"
ZOOM_JWT_API_SECRET = "FHILbREo17ZjJtP1nM86jDC0VE20hOeJ3LIA"

app.use(bodyParser.json(), cors());
app.options("*", cors());

app.post("/", (req, res) => {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    ZOOM_JWT_API_KEY +
    req.body.meetingNumber +
    timestamp +
    req.body.role
  ).toString("base64");
  const hash = crypto
    .createHmac("sha256", ZOOM_JWT_API_SECRET)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`
  ).toString("base64");

  res.json({
    signature: signature,
  });
});

app.listen(port, () =>
  console.log(`Zoom Web Meeting SDK Sample Signature Node.js on port ${port}!`)
);
