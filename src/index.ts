/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {itemsRouter } from "./items/items.router";
import {messageRouter} from "./items/items.router"
import { networkInterfaces } from "os";

dotenv.config();


/**
 * App Variables
 */

if (!process.env.PORT){
    process.exit(1)
}


const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();



/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);
app.use(messageRouter)


/**
 * Server Activation
 */

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
    // console.log("Adwait this is all due the extreme uncertainity that is in your career and life.");
    // console.log("Adwait set up your career goals in a field and start going after them. You ll be golden in a certain amount of time.");
    // console.log("This is surely a difficult time and youll need to keep patience.");
    // console.log("------------------------------")
    console.log('Reload at', Date());
});


/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies : string[],
            callback?: (updateDependencies: ModuleId[])=>void,
        ):void;
        accept(dependency: string, callback?: () => void) : void;        
        accept(errHandler?: (err:Error)=> void): void;
        dispose(callback: (data: any) => void) : void;
    }
}

declare const module: WebpackHotModule; 

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(()=> server.close());
}




// interface WebpackHotModule {
//     hot?: {
//         data: any;
//         accept(
//             dependencies: string[],
//             callback?: (updatedDependencies: ModuleId[]) => void,
//         ): void;
//         accept(dependency: string, callback?: () => void): void;
//         accept(errHandler?: (err: Error) => void): void;
//         dispose(callback: (data: any) => void): void;
//     };
// }

// declare const module: WebpackHotModule;

// if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => server.close());
// }








