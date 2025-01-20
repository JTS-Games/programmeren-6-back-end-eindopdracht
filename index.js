import express, {application} from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

//so JSON can be used
app.use(express.json());

// so that this fancy standard with a long name can be used
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json(
        {
            message: 'Looks like this works :D'
        }
    )
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('Server is running');
});