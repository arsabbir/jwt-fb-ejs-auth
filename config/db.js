import mongoose from "mongoose";

const mongDBConnect = () => {
    const connect = mongoose.connect(process.env.MONG_URI);
    console.log(`MongoDB connect successfull`.bgYellow.black);
}
export default mongDBConnect