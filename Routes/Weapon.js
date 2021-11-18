const express = require("express");
const router = express.Router();

const {
    getAllEquipment,
    getWeaponbyName,
    getWeaponbyAttributes,
    getWeaponbyMaterial,
    createWeapon,
    editWeapon,
    deleteWeapon,
} = require('../Controllers/Jobs')

router.route("/").
router.route("/:id").


module.exports = router;

