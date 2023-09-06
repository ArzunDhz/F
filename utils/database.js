import mongoose from "mongoose";

export const connectToDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://admin-arjun:9869579607Aa1@cluster0.ldmnk.mongodb.net/?retryWrites=true",
      { dbName: "FauroAi" }
    )
    .then(() => console.log("DataBase connected"))
    .catch((e) => console.log(e));
};
