const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  if (!req.body.username) {
    return res.json({ logged: false });
  }
  if (!req.body.password) {
    return res.json({ logged: false });
  }
  return res.json({ logged: true });
});

app.listen(5000, () => {
  console.log("Server up!");
});
