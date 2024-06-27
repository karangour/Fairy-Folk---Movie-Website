const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config(); // To access environment variables
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "https://www.fairyfolkthefilm.com",
      "https://karangour.github.io",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); //security feature and is critical

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate"); //Cache-control middleware to force browser not to cache the page and recall browser each time
  next();
});

app.use(express.json());

// This will setup a middleware to directly serve static image files directly via URLs like 'http://localhost:4000/assets/gallery/1.jpg'

app.use("/assets", express.static("assets/"));

// This will send us to the router file. So app.use is the middleware here.

//READ gallery images (id, img address)
app.use("/assets/gallery", require("./routes/galleryData"));

//READ video_thumbnails, videos (id, location)
app.use("/assets/vid_thumbnails", require("./routes/videosData"));

//POST for finding and matching password at 'passwords.js' which is more secure than GET
app.use("/passwords", require("./routes/verifyPassword"));
//POST for creating a password and updating 'passwords.js' with new user data.
app.use("/passwords", require("./routes/createPassword"));

//POST for sending emails (GetInTouch (contact form), PayAsYouLike (password))
app.use(
  "/email",
  cors({
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
  require("./routes/email")
);

//POST for contribution amount
app.use("/contribution", require("./routes/contributionTotal"));

//POST for razorpay create order
app.use("/razorpay", require("./routes/razorPay"));

app.get("/razorpay/key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

// GET for USD Conversion rate NOTE: router file was not working

const filePath = path.join(__dirname, "routes", "usdConversion.json");

app.get("/conversionrate", (req, res) => {
  console.log("Received request at /conversionrate");
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  try {
    console.log("Reading file:", filePath);
    let inrToUsd = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    console.log("File content:", inrToUsd);
    const today = new Date();

    if (today - new Date(inrToUsd.date) > 86400000 || isEmptyObject(inrToUsd)) {
      console.log("Fetching new conversion rate...");
      fetch(
        "https://v6.exchangerate-api.com/v6/8754ac39dfd66aa10bf5b1c0/latest/USD"
      )
        .then((response) => {
          if (!response.ok) {
            console.log("Fetch response not ok:", response.statusText);
            return response.json().then((err) => {
              throw new Error(err.result);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch data:", data);
          try {
            inrToUsd = { date: today, ...data };
            console.log("Writing to file:", filePath);
            fs.writeFileSync(filePath, JSON.stringify(inrToUsd), "utf-8");
            res.json(inrToUsd);
          } catch (error) {
            console.error("Error writing to file:", error);
            res
              .status(500)
              .json({ error: "Server error while processing the request" });
          }
        })
        .catch((fetchError) => {
          console.error("Fetch error:", fetchError);
          res.status(500).json({ error: "Error fetching conversion rate!" });
        });
    } else {
      res.json(inrToUsd);
    }
  } catch (error) {
    console.error("Error reading file:", error);
    res
      .status(500)
      .json({ error: "Could not fetch from INR to USD Conversion!" });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// This is to start the server when the run dev is started
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
