import express, {application} from 'express';
import mongoose from 'mongoose';

const app = express();
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
