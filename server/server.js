const express = require("express");
const cors = require("cors");
require("dotenv").config();

const factRoutes = require("./routes/factRoutes");

const app = express();


app.use(cors({origin: "*"}));
app.use(express.json());

app.use(
    "/api/facts",
    factRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});