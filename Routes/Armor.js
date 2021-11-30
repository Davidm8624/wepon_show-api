const express = require("express");
const router = express.Router();

const {
    getAllArmor,
    createArmor,
    DeleteArmor,
} = require("../Controllers/Armor");

router.route("/").get(getAllArmor).post(createArmor);

router.route("/:id").delete(DeleteArmor);

module.exports = router;