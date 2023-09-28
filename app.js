require("dotenv").config(); //keep everything in evn to process.env
const express = require("express");
const cors = require("cors");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");

//pass request body by express
const app = express(); //create a server

//app.use(cors()) //allow every origin
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use("/todo", todoRoute);
app.use("/auth", authRoute);

//not found middleware will handel path that doens't have in server
app.use(notFoundMiddleware);
//if has some error the res will send a error message to clients
app.use(errorMiddleware);

//if port a cannot execute then work at 8000
const PORT = process.env.PORT || 8000;
//server working at
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
