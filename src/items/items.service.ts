/**
 * Data Model Interfaces
 */

//Item is the mongoose model, IItem is the interface that represents the item object
import Item, {IItem} from "../models/item.model" 
const mongoose = require('mongoose');


/**
 * Service Methods
 */


export const findAll = async (): Promise<IItem[]> => {
    console.log('Find all items');
    const items = Item.find((err: any, items: any) => {
        if (err) {
            throw new Error(err);
        } else {

            return items;
        }

    })
    return items;

};



export const find = async (id: String): Promise<IItem> => {

    let item:any = await Item.findOne({ "_id": mongoose.Types.ObjectId(id) }, (err, item) => {
        if (err) {
            throw new Error("No record found");
        }

        return item;
    });

    return item;


};


export const create = async (newItem: IItem): Promise<any> => {

    return new Promise((resolve: any, reject: any) => {
        console.log("Creating..")

        Item.create(newItem, (err: any, it: any) => {
            if (err) {
                console.log("mongo db error", err)
                reject(err);
            }
            console.log('created in service', it)
            resolve(it);
        });
    });
}



//service to update item
export const update = async (updatedItem: IItem): Promise<void> => {

    Item.findByIdAndUpdate(updatedItem._id, updatedItem, (err:any, data:any)=>{
        if (err){
            throw new Error(err);    
        } 
    });
};


//Service to delete item
export const remove = async (id: String): Promise<any> => {
    // throw new Error('deliberately raised error');
    return new Promise((resolve: any, reject: any) => {

        Item.deleteOne({ _id: mongoose.Types.ObjectId(id) })
            .then((result: any) => {
                resolve(result);
            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });
    })
}


