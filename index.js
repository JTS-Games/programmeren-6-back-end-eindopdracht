import express, {application} from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connect(`http://localhost:8080`);

//so JSON can be used
app.use(express.json());

// so that this fancy standard can be used
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json(
        {
            message: 'Hello there :D'
        }
    )
});