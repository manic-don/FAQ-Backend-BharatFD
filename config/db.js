const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase Connected Successfully!!");
    } catch (error) {
        console.error("DataBase Connection Error:", error);
        process.exit(1); 
    }
};

module.exports = connectDB;
