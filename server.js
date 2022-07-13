const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000);

const db = [
  {
    destination: "Eiffel Tower",
    location: "Paris, France",
    description: "",
  },
];

// POST destinations
// Handle a user creating a new destination
// Gets location, destination, description
// Uses location and destination to go to Unsplash and get a new image
// Save location, destination, description, and image from unsplash in DB
app.post("/destinations", async (req, res) => {
  // Get the destination info from the front-end
  // Store a new destination in the db
  //

  const { location, destination, description } = req.body;

  // Go to https://api.kanye.rest/ and get data from
  try {
    const { data } = await axios("https://api.kanye.rest/");
    const quote = data.quote;
    db.push({ location, destination, description, quote });
    res.redirect(303, "/destinations"); // POST/destinations
  } catch (err) {
    console.log(err);
  }

  // fetch("https://api.kanye.rest/")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {

  //   });
});

// GET /destinations
app.get("/destinations", (req, res) => {
  res.send(db);
});
