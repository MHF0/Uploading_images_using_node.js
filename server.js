const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// App
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/images", express.static("uploads"));

// Routes
const uploadRouter = require("./routes/uploadImage");

app.use("/api/upload-image", uploadRouter);

// Listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
