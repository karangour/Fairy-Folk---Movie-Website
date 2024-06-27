const express = require("express");
const router = express.Router();

const galleryImages = [
  {
    id: 1,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/1.jpg",
  },
  {
    id: 2,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/2.jpg",
  },
  {
    id: 3,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/3.jpg",
  },
  {
    id: 4,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/4.jpg",
  },
  {
    id: 5,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/5.jpg",
  },
  {
    id: 6,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/6.jpg",
  },
  {
    id: 7,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/7.jpg",
  },
  {
    id: 8,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/8.jpg",
  },
  {
    id: 9,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/9.jpg",
  },
  {
    id: 10,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/10.jpg",
  },
  {
    id: 11,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/11.jpg",
  },
  {
    id: 12,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/12.jpg",
  },
  {
    id: 13,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/13.jpg",
  },
  {
    id: 14,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/14.jpg",
  },
  {
    id: 15,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/15.jpg",
  },
  {
    id: 16,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/16.jpg",
  },
  {
    id: 17,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/17.jpg",
  },
  {
    id: 18,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/18.jpg",
  },
  {
    id: 19,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/19.jpg",
  },
  {
    id: 20,
    img: "https://api.fairyfolkthefilm.com/assets/gallery/20.jpg",
  },
];

router.route("/").get((req, res) => {
  res.status(200).json(galleryImages);
});

module.exports = router;
