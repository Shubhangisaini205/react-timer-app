const express = require("express")
const dbConnect = require("./config/dbConnect")
const router = require("./routes/timer.routes")
const app = express()
app.use(express.json());
app.get("/",(req, res)=>{
    return res.json("Api is up and running")
})

app.use("/api/v1/timer",router)



app.listen(8080,()=>{
    dbConnect();
    console.log(`Server is running on PORT 8080`)
})