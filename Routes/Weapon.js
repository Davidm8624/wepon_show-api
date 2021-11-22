const express = require("express");
const router = express.Router();

const {
    getAllEquipment,
    getWeaponByName,
    getWeaponByType,
    getWeaponByAttributes,
    getWeaponByMaterial,
    getWeaponByPrice,
    getInCart,
    createWeapon,
    EditWeapon,
    DeleteWeapon,
} = require('../Controllers/Weapons')

router.route("/").get(getAllEquipment).post(createWeapon)
router.route("/:id").put(EditWeapon).delete(DeleteWeapon)
router.route("/by").get(getWeaponByType)(getWeaponByName).get(getWeaponByAttributes).get(getWeaponByMaterial).get(getWeaponByPrice).get(getInCart)



module.exports = router;

