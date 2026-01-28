const express = require('express');
const router = express.Router();
const data = require('../models/dishModel');


router.get('/dishes', (req, res) => {
    const { category, price, name, isVegetarian } = req.query;

    const filteredDishes = data
        .filter(d =>
            !category || d.category.toLowerCase() === category.toLowerCase()
        )
        .filter(d =>
            !price || d.price <= parseFloat(price)
        )
        .filter(d =>
            !name || d.name.toLowerCase().includes(name.toLowerCase())
        )
        .filter(d =>
            isVegetarian === undefined ||
            d.isVegetarian === (isVegetarian === 'true')
        );

    if (filteredDishes.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No dishes found matching the criteria',
        });
    }

    res.status(200).json({
        status: 200,
        message: 'Retrieved dishes successfully',
        data: filteredDishes,
    });
});


router.post('/dishes', (req, res) => {
    const { name, price, category, isVegetarian } = req.body;

    if (
        !name ||
        price === undefined ||
        !category ||
        isVegetarian === undefined
    ) {
        return res.status(400).json({
            status: 400,
            message:
                'Bad Request: name, price, category, and isVegetarian are required',
        });
    }

    const newDish = {
        id: data.length + 1,
        name,
        price,
        category,
        isVegetarian,
    };

    data.push(newDish);

    res.status(201).json({
        status: 201,
        message: 'Dish created successfully',
        data: newDish,
    });
});


router.put('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with ID ${id} not found`,
        });
    }

    data[index] = { id, ...req.body };

    res.status(200).json({
        status: 200,
        message: 'Dish updated successfully',
        data: data[index],
    });
});


router.delete('/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(d => d.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: `Dish with ID ${id} not found`,
        });
    }

    data.splice(index, 1);

    res.status(200).json({
        status: 200,
        message: 'Dish deleted successfully',
    });
});

module.exports = router;
