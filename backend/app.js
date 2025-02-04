import express from "express";
import cookieParser from    "cookie-parser";
import cors from "cors";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"
import messageRouter from "./routes/message.route.js"
import dotenv from "dotenv";
dotenv.config();

const app=express();
const PORT=8800;
app.use(express.json());
app.use(cors(
    {
    origin:process.env.CLIENT_URL,
    credentials:true
    }
));

app.use(cookieParser())
app.get("/",(req,res)=>{res.send("server is running")})
app.use("/api/posts",postRouter);
app.use ("/api/auth",authRouter);
app.use("/api/test",testRouter);
app.use("/api/users",userRouter);
app.use("/api/chats",chatRouter);
app.use("/api/messages",messageRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})