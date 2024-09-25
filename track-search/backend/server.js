require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", productRoutes);

const port = process.env.PORT || 8087;
app.listen(port, () => console.log(`Listening on port ${port}...`));
