require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Import routes
const apiRoutes = require('./src/routes/apiRoutes');
const chefRoutes = require('./src/routes/chefRoutes');

// Use routes
app.use(BASE_URI, apiRoutes);
app.use(BASE_URI, chefRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Base URI: http://localhost:${PORT}${BASE_URI}/dishes`);
    console.log(`Base URI: http://localhost:${PORT}${BASE_URI}/chefs`);
});


/*PORT=3000
BASE_URI=/api/v1
MONGO_URI=mongodb+srv://opis_3D:opmay04@cluster0.d2yapza.mongodb.net/?appName=Cluster0
*/