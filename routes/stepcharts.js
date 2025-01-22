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
                    "href": `${process.env.HOST}/stepcharts/`
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

router.get('/:id', async (req, res) => {
    try {
        const stepchart = await Stepchart.findOne({_id: req.params.id})
        res.json({
            "id": stepchart.id,
            "title": stepchart.title,
            "difficulty": stepchart.difficulty,
            "type": stepchart.type,
            "_links": {
                "self": {
                    "href": `${process.env.HOST}/stepcharts/${stepchart.id}`
                },
                "collection": {
                    "href": `${process.env.HOST}/stepcharts/`
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Stepchart.deleteOne({_id: req.params.id});
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.json({error: error.message});
    }
});

router.options('/', async (req, res) => {
    try {
        res.header('ALLOW', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Methods', '*');
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
});

router.options('/:id', async (req, res) => {
    try {
        res.header('ALLOW', 'GET, PUT, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Methods', '*');
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
});

router.post('/seed', async (req, res) => {
    try {
        await Stepchart.deleteMany({});
        for (let i = 0; i < req.body.amount; i++) {
            await Stepchart.create({
                title: faker.word.adjective(),
                difficulty: faker.word.adjective(),
                type: faker.word.adjective(),
            });
        }
        res.json({message: 'Seeding is done :D'});
    } catch (error) {
        console.log(error);
        res.json({error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        await Stepchart.create({
            title: req.body.title,
            difficulty: req.body.difficulty,
            type: req.body.type,
        });
        res.status(201).json({message: "Created :D"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const stepchart = await Stepchart.findOne({_id: req.params.id})


        if (!req.body.title || !req.body.difficulty || !req.body.type) {
            return res.status(400).json({ message: "You didn't fill in all fields :(" });
        } else {
            await Stepchart.findByIdAndUpdate(
                stepchart.id,
                {
                    title: req.body.title,
                    difficulty: req.body.difficulty,
                    type: req.body.type,
                });
            await res.status(201).json({message: "Edited :D"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
});




export default router;