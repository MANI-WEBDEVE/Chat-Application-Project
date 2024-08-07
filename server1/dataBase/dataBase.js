import mongoose from "mongoose";

export const dataBaseConnect = () => {
  mongoose.connect(process.env.DATABASE_URI, {})
  .then(() => {
    console.log('Data base connect sucessfully')
  }).catch(error => console.log(error))
};
