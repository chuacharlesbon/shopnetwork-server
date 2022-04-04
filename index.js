const express = require('express');

const mongoose = require('mongoose');

//const cors = require('cors');

const userRoutes = require('./routes/userRoutes')

const productRoutes = require('./routes/productRoutes')

const app = express();

mongoose.connect("mongodb+srv://admin_chua:batch169@batch169chua.g8jtg.mongodb.net/ecommerceAPI169?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error'));

db.once('open', () => console.log('Connected to MongoDB'));

const port = 4000;

app.use(express.json());

//app.use(cors());

app.use('/users', userRoutes);

app.use('/products', productRoutes);

app.listen(port, () => console.log (`Server is now running at port ${port}`))