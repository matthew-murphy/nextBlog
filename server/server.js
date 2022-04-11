const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//environment
require('dotenv').config();

//bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middle-wares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middle-ware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});