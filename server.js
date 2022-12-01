const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// App
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes

// Listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
