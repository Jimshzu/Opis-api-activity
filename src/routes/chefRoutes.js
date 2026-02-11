const express = require('express');
const router = express.Router();
const Chef = require('../models/chefModel');
const { 
    createChef 
} = require('../controllers/chefController');

router.post('/chefs', createChef);
router.get('/chefs', async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
