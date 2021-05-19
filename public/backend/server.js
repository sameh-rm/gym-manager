const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes.js");
const memberRoutes = require("./routes/member.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const memberShipRoutes = require("./routes/membership.routes.js");
const uploadRoutes = require("./routes/upload.routes.js");
const dotenv = require("dotenv");

var cors = require("cors");

const { paginate } = require("./middlewares/pagination.Middlewares.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();
// Routes
app.use(cors());
app.use(express.json());
// app.use(paginate);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => res.send("Api running"));
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/memberships", memberShipRoutes);

app.use("/api/upload", uploadRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);
app.listen(5000, () => console.log("server is running on port 5000"));
