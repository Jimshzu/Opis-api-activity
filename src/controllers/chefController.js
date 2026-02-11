const Chef = require('../models/chefModel');


// ✅ GET all chefs
exports.getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ✅ GET one chef
exports.getChefById = async (req, res) => {
    try {
        const chef = await Chef.findById(req.params.id);

        if (!chef) {
            return res.status(404).json({ message: "Chef not found" });
        }

        res.json(chef);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ✅ CREATE chef
exports.createChef = async (req, res) => {
    try {
        const chef = new Chef(req.body);
        const savedChef = await chef.save();
        res.status(201).json(savedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// ✅ UPDATE chef
exports.updateChef = async (req, res) => {
    try {
        const updatedChef = await Chef.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedChef) {
            return res.status(404).json({ message: "Chef not found" });
        }

        res.json(updatedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// ✅ DELETE chef
exports.deleteChef = async (req, res) => {
    try {
        const deletedChef = await Chef.findByIdAndDelete(req.params.id);

        if (!deletedChef) {
            return res.status(404).json({ message: "Chef not found" });
        }

        res.json({ message: "Chef deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
