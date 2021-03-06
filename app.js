const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
var fs = require('fs');

const userRoutes = require('./routes/user');
const verifierRoutes = require('./routes/verifier');
const adminRoutes = require('./routes/admin');


const app = express();





// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
/*app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).fields([{
      name: "photo",
      maxCount: 1
    },
    {
      name: "signature",
      maxCount: 1
    },
    {
      name: "pan",
      maxCount: 1
    },
    {
      name: "adhaar",
      maxCount: 2
    },
    {
      name: "birth",
      maxCount: 1
    },
  ])
);*/
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Docs");
  next();
});

app.use('/auth', userRoutes);
app.use('/verifier', verifierRoutes);
app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.hbyfu.mongodb.net/mec-gov?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err, db) {
    if (err) {
      console.log(process.env.MONGODB_USERNAME);
      console.log(err);
    } else {
      app.listen(8080);
    }
  }
);