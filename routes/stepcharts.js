import express from 'express';
import Stepchart from "../models/Stepchart.js";
import {faker} from "@faker-js/faker";


const router = express.Router();

//main path
router.get('/', async (req, res) => {
    try {
        const stepcharts = await Stepchart.find();
        res.json({
            "items": stepcharts,
            "_links": {
                "self": {
                    "href": `${process.env.HOST}/stepcharts/${stepcharts.id}`
                },
                "collection": {
                    "href": `${process.env.HOST}/stepcharts/`
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.json({error: error.message});
    }
});

// seeder
router.post('/seed', async (req, res) => {
    try {
        await Stepchart.deleteMany({});
        for (let i = 0; i < req.body.amount; i++) {
            await Stepchart.create({
                title: faker.word.adjective(),
                difficulty: Math.floor(Math.random() * 25),
                type: faker.word.adjective(),
            });
        }
        res.json({message: 'Seeding is done :D'});
    } catch (error) {
        console.log(error);
        res.json({error: error.message});
    }
});

export default router;