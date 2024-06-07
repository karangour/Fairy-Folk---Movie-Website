const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config(); // To access environment variables
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})); //security feature and is critical

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate"); //Cache-control middleware to force browser not to cache the page and recall browser each time
  next();
});

app.use(express.json());

// This will setup a middleware to directly serve static image files directly via URLs like 'http://localhost:4000/assets/gallery/1.jpg'

app.use("/assets/", express.static("assets/"));

// This will send us to the router file. So app.use is the middleware here.

//READ gallery images (id, img address)
app.use("/assets/gallery", require("./routes/galleryData"));

//READ video_thumbnails, videos (id, location)
app.use("/assets/vid_thumbnails", require("./routes/videosData"));

//POST for finding and matching password at 'passwords.js' which is more secure than GET
app.use("/passwords", require("./routes/verifyPassword"));
//POST for creating a password and updating 'passwords.js' with new user data.
app.use("/passwords", require('./routes/createPassword'));



//POST for sending emails (GetInTouch (contact form), PayAsYouLike (password))
app.use("/email", cors({
  origin: '*',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}), require("./routes/email"));

// Middleware to log incoming requests.
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });


//POST for contribution amount
app.use("/contribution", require("./routes/contributionTotal"));

//POST for razorpay create order
app.use('/razorpay', require('./routes/razorPay'))

app.get('/razorpay/key', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID })
})






// This is to start the server when the run dev is started
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


