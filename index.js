import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: [
        "http://localhost:5173",
    ],
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

const connection = mongoose
    .connect(process.env.MONGODB_URI, {
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB");
        console.log(err);
    });


// Routes 
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import userRouter from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRouter);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});