require("dotenv").config();
const express = require("express");
const { MessageRouter } = require("./routers/messages");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/messages", MessageRouter)



app.get("/", (req, res) => {
  res.send("hello");
});











app.listen(8080);
