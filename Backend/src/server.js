import express from "express";
import bodyParser from "body-parser";
import webRouter from "./routes/index.js";
import "dotenv/config";
import cors from "cors";
import { cloudinaryConfiguration } from "./config/cloudinaryConfig.js";
const app = express();
const port = process.env.PORT || 8080;

// CORS configuration
app.use(cors({ credentials: true, origin: true }));

// Cloudinary configuration
cloudinaryConfiguration();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json());

// Routes init
webRouter(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
