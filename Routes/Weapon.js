const express = require("express");
const router = express.Router();

const {
    getAllEquipment,
    getWeaponByName,
    getWeaponByAttributes,
    getWeaponByMaterial,
    getWeaponByPrice,
    getInCart,
    createWeapon,
    EditWeapon,
    DeleteWeapon,
} = require('../Controllers/Weapons')

router.route("/").get(getAllEquipment),post(createWeapon)
router.route("/:id").put(EditWeapon).delete(DeleteWeapon)
router.route("/:byname").get(getWeaponByName)
router.route("/:byattributes").get(getWeaponByAttributes)
router.route("/:bymaterial").get(getWeaponByMaterial)
router.route("/:byprice").get(getWeaponByPrice)
router.route("/:cart").get(getInCart)


module.exports = router;

