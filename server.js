const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./server/database/connection');
const userRoutes= require('./server/routes/userRoutes');
const slotRoutes = require('./server/routes/slotRoutes');


const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8181

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}))


app.get('/',(req, res)=>{
    return res.send("backend ....");
 })

app.use('/user',userRoutes);
app.use('/slot',slotRoutes);

app.listen(PORT,()=> { console.log(`Server is running on http://localhost:${PORT}`)});
