const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors()); //security feature and is critical

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate"); //Cache-control middleware to force browser not to cache the page and recall browser each time
  next();
});

// This will setup a middleware to directly serve static image files directly via URLs like 'http://localhost:4000/assets/gallery/1.jpg'

app.use("/assets/gallery", express.static("assets/gallery"));

// This will send us to the router file. So app.use is the middleware here.

//READ gallery images (id, img address)
app.use("/assets/gallery", require("./routes/galleryData"));

// This is to start the server when the run dev is started
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//READ videos_data.json (id, title, location, thunbnail location)
//READ/WRITE passwords (email, password)
//READ/WRITE contribution (everything that cashfree sends)
