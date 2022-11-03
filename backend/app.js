import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-router';
import router from './routes/user-routes';

const app = express();

app.use(express.json())

app.use("/api/user",router)
app.use("/api/blog",blogRouter)

// app.use("/api",(req,res,next)=>{
//     res.send("hello word")
// })
mongoose.connect(
    'mongodb+srv://admin:mongopassword@cluster0.g7lbilz.mongodb.net/Blog?retryWrites=true&w=majority'
).then(()=>app.listen(3000)).then(()=>console.log("Connected to Database and listeing to localhost 3000"))
.catch((err)=>console.log(err))

// mongopassword