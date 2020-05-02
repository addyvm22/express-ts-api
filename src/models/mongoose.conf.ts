const mongoose = require('mongoose');

export default function mongooseConf() {

    let uri: string = 'mongodb://127.0.0.1:27018/local';

    mongoose.connect(uri, (err:any) => {
        if (err){
            console.log('Error Connecting to mongodb');
            return
        }
        console.log("Successfully connected to mongodb instance!!!")

    })
}