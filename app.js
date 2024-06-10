const express = require("express");
const { notfound, errorHandler } = require("./middlewares/error");
const {dbconnect}=require("./config/db")
const app = express();
const logger =require("./middlewares/logger")
const dotenv = require("dotenv");
const path = require("path");
const { default: helmet } = require("helmet");
const cors =require("cors")
dotenv.config();
app.set("view engine","ejs")
const Port = process.env.PORT;
dbconnect();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"images")))
app.use(logger)
app.use(helmet())
app.use(cors())

//routes
app.use("/",require("./routes/home"));
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth",  require("./routes/auth"));
app.use("/api/users",require("./routes/users"))
app.use("/password",require("./routes/password"))
app.use("/upload",require("./routes/images"))
//errors
app.use(notfound);
app.use(errorHandler);

app.listen(Port, () => console.log(`Server is Running on port ${Port}`));
