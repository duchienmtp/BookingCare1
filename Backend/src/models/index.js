"use strict";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import configFile from "../config/config.json" assert { type: "json" };
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.includes(".test.js")
  );

const modelImports = modelFiles.map((file) => {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  return import(modelPath).then((module) => {
    const model = module.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
});

Promise.all(modelImports)
  .then(() => {
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  })
  .catch((error) => {
    console.error("Error loading models:", error);
  });

// Export the db object
export default db;
