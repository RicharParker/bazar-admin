const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const CryptoJS = require("crypto-js");
const cors = require("cors");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/bazar");
    console.log("Conectado a mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("desconectado", () => {
  console.log("mongoDB desconectado!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Algo salio mal!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const createDefaultAdmin = async () => {
  try {
    const existingUser = await User.findOne({ username: "admin" });
    if (!existingUser) {
      const newUser = new User({
        username: "admin",
        email:"admin@gmail.com",
        password: CryptoJS.AES.encrypt(
          "123",
          process.env.PASS_SEC
        ).toString(),
        isAdmin: true,
      });

      await newUser.save();
      console.log("Default admin user created successfully");
    }
  } catch (err) {
    console.error("Error creating default admin user:", err);
  }
};

const startServer = async () => {
  try {
    await connect();
    await createDefaultAdmin();

    app.listen(5000, () => {
      console.log("Conectado al backend en el puerto 5000.");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

// Llamar a la función para iniciar el servidor
startServer();