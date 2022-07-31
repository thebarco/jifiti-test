const cors = require("cors");
const express = require("express");
const https = require("https");

const app = express();
app.use(cors());

const AUTH_KEY = process.env.AUTH_KEY;
const BASE_URL = "https://rpnszaidmg.execute-api.eu-west-1.amazonaws.com/Prod";

app.get("/auth", (req, res) => {
  res.send('Auth key: ' + AUTH_KEY);
});

app.get("/application/list", (req, res) => {
  const applicationsReq = https.get(
    BASE_URL + "/applications",
    {
      headers: { Authorization: AUTH_KEY },
    },
    (getRes) => {
      getRes.on("data", (d) => {
        res.end(d);
      });
    }
  );

  applicationsReq.end();
});

app.get("/cards/:appId", (req, res) => {
  const appId = req.params?.appId;
  if (!appId) {
    res.end('Couldn\'t get application id');
  } else {
    const applicationsReq = https.get(
      BASE_URL + "/cards/" + appId,
      {
        headers: { Authorization: AUTH_KEY },
      },
      (getRes) => {
        getRes.on("data", (d) => {
          res.end(d);
        });
      }
    );
  
    applicationsReq.end();
  }
});

app.get("/trans/:appId", (req, res) => {
  const appId = req.params?.appId;
  if (!appId) {
    res.end('Couldn\'t get application id');
  } else {
    const applicationsReq = https.get(
      BASE_URL + "/trans/" + appId,
      {
        headers: { Authorization: AUTH_KEY },
      },
      (getRes) => {
        getRes.on("data", (d) => {
          res.end(d);
        });
      }
    );
  
    applicationsReq.end();
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
