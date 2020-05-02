/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import {IItem} from '../models/item.model';

/**
 * Router Definition
 */

export const itemsRouter = express.Router()
export const messageRouter = express.Router()

/**
 * Controller Definitions
 */


// GET items/

itemsRouter.get("/", async (req: Request, res: Response) => {

    try {
        const items: IItem[] = await ItemService.findAll();
        res.status(200).send(items);

    } catch (e) {
        res.status(404).send(e.message);
    }
});


// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {

    try {
        const item: IItem = await ItemService.find(req.params.id);

        res.status(200).send(item);

    } catch (e) {
        res.status(404).send(e.message);
    }

})

// POST items/
itemsRouter.post("/create", async (req: Request, res: Response) => {
    try {
        console.log("Controller Creating....")
        const item: IItem = req.body.item;

        ItemService.create(item).then((item:any)=>{
            // console.log('then block in router', item)
            if(item) res.status(200).json(item._id)
            else res.status(200).send(item)
        }); 

    } catch (e) {
        res.status(404).send(e.message);
    }

});


// PUT items
//update an item
itemsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const item: IItem = req.body.item;
        await ItemService.update(item);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


// DELETE items/:id
// delete a record
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        ItemService.remove(req.params.id)
            .then((re) => {
                res.status(200).send(re);
            })
            .catch((e) => {
                res.status(500).send(e);
            });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

messageRouter.get("/gm", async (req: Request, res: Response) => {
    res.status(200).send("Good Morning Mr Adwait!!!");
});

