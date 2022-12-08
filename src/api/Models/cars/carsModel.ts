import mongoose, { Document, Model } from 'mongoose';
import { Schema } from 'mongoose';
import Cars from './interface';

const carSchemal = new Schema<Cars>({
    name: {
        type: String,
        require: [true, 'A car must have a name'],
        uniqe: true,
        maxLength: [50, 'A tour must have less of equal then 30 characters'],
        minLength: [10, 'A tour must have less of less then 10 characters']
    },
    price: {
        type: Number,
        required: [true, 'A car must have a price']
    },
    seri: {
        type: Number,
        required: [true, 'A car must have a seri']
    },
    exterior: {
        type: String,
        required: [true, 'A car must have a exterior']
    },
    furniture: {
        type: String,
        required: [true, 'A car must have a furniture']
    },
    engine: String,
    capacity: Number,
    maximumCapacity: String,
    maxSpeed: String,
    weight: String,
    color: [String],
    image: [String],
    brand: {
        type: String,
        required: [true, 'A car must have a brand']
    },
    description: {
        type: String,
        required: [true, 'A car must have a description']
    },
    classify: String
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Cars = mongoose.model<Cars & mongoose.Document>('Cars', carSchemal);
export default Cars;