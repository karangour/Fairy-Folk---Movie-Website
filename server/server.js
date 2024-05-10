const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// This will send us to the router file. So app.use is the middleware here.
app.use("/api/contacts", require("./routes/contactRoutes"));

// This is to start the server when the run dev is started
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//READ gallery_data.json (id, img address)
//READ videos_data.json (id, title, location, thunbnail location)
//READ/WRITE passwords (email, password)
//READ/WRITE contribution (everything that cashfree sends)
