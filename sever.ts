import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); 
import app from './index';

const dataURL = process.env.DATABASE;

// CONNECT DB
if(!dataURL){
    console.log('Can not found DB!');
}else{
    mongoose
    .connect(dataURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(db => console.log('Connect mongoDB successfully!'))
    .catch(err => console.log(err));
};


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listen running on port: ${port}`);
});