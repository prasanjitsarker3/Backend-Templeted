import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.dataBaseUrl as string); //config.dataBaseUrl || "mongodb://127.0.0.1:27017/course-project"
    app.listen(config.port, () => {
      console.log(`Blog Server listening Port On ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
