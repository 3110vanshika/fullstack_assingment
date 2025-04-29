const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 
const userRoute = require('./routes/userRoute')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute)

const port = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database');
    return sequelize.sync(); 
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Unable to connect to the database:', error);
  });
