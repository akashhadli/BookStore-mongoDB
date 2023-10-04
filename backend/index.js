import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS Policy
// Option 1: Allow all Origins with Default of cors(*)
// app.use(cors());

// Option 2: Allow Custom Origins
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type'],
	})
);

app.get('/', (request, response) => {
	console.log(request);
	return response.status(234).send('Welcome');
});

app.use('/books', booksRoute);

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log('App connected to Database');
		app.listen(PORT, () => {
			console.log(`App is listening at port: ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
