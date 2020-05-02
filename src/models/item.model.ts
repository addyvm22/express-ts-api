import * as mongoose from 'mongoose';


let Schema = mongoose.Schema;


export interface IItem extends mongoose.Document {
    name: string;
    price: number;
    description: string;
    image: string;
}

export const ItemSchema = new Schema({
    name: {type: String, required:true},
    price: {type: Number },
    description: { type: String},
    image: { type: String }
});

const Item = mongoose.model<IItem>("Item", ItemSchema);

export default Item;