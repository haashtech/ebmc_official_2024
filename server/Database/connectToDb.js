import mongoose from "mongoose";



const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database connected successfully");
    });
  } catch (err) {
    console.log(err);
  }
};
// LOCAL DB
// const connectToDb = () => {
//   try {
//     mongoose.connect(process.env.MONGO_LOCAL).then(() => {
//       console.log("Database connected successfully");
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
export default connectToDb;
