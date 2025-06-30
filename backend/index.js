const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");
const connection = require("./config/db");


app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));

connection();



app.use("/api/auth", authRoutes);
app.get("/",(req,res)=>{
    res.json("hii there!");
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
