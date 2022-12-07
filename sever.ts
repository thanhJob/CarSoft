import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); 
import app from './index';

const DB = process.env.DATABASE;
if(!DB) console.log('Data not found');
// CONNECT DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(db => console.log('Connect data successfully!'))
.catch(err => console.log(err));




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listen running on port: ${port}`);
});