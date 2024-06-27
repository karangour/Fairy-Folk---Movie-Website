const express = require("express");
const router = express.Router();

const vid_thumbnails = [
  {
    id: 1,
    title: "OFFICIAL TRAILER 1",
    location: "https://www.youtube.com/watch?v=lfOxA7NPJDg",
    thumbnail: "https://api.fairyfolkthefilm.com/assets/vid_thumbnails/1.jpg",
  },
  {
    id: 2,
    title: "OFFICIAL TRAILER 2",
    location: "https://www.youtube.com/watch?v=igLSVvzRYTU",
    thumbnail: "https://api.fairyfolkthefilm.com/assets/vid_thumbnails/2.jpg",
  },
  {
    id: 3,
    title: "AN IMPROV GAME",
    location: "https://www.youtube.com/watch?v=sStyEntLkW8",
    thumbnail: "https://api.fairyfolkthefilm.com/assets/vid_thumbnails/3.jpg",
  },
  {
    id: 4,
    title: "EMERGENCY",
    location: "https://www.youtube.com/watch?v=rkEm7rBzApY",
    thumbnail: "https://api.fairyfolkthefilm.com/assets/vid_thumbnails/4.jpg",
  },
  {
    id: 5,
    title: "DRINK UP!",
    location: "https://www.youtube.com/watch?v=SYAOAwXyUvA",
    thumbnail: "https://api.fairyfolkthefilm.com/assets/vid_thumbnails/5.jpg",
  },
];

router.route("/").get((req, res) => {
  res.status(200).json(vid_thumbnails);
});

module.exports = router;
