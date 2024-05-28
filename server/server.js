const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config(); // To access environment variables



const app = express();
const port = process.env.PORT || 4001;

app.use(cors()); //security feature and is critical

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
app.use("/passwords/verify", require("./routes/verifyPassword"));

//POST for sending contact form from GetInTouch
app.use("/getintouch", require("./routes/getInTouch"))

// This is to start the server when the run dev is started
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//READ/WRITE passwords (email, password)
//READ/WRITE contribution (everything that cashfree sends)
