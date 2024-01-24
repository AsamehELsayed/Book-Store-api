const express = require("express");
const { notfound, errorHandler } = require("./middlewares/error");
const {dbconnect}=require("./config/db")
const app = express();
const logger =require("./middlewares/logger")
const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.PORT;
dbconnect();
app.use(express.json());
app.use(logger)
//routes
app.use("/",require("./routes/home"));
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth",  require("./routes/auth"));
app.use("/api/users",require("./routes/users"))
//errors
app.use(notfound);
app.use(errorHandler);

app.listen(Port, () => console.log(`Server is Running on port ${Port}`));
