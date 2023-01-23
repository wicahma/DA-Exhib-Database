const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://da-exhib.vercel.app",
      "https://da-exhib-diama.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/arts", require("./routes/artRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`));
