const express = require("express");
const router = express.Router();

const {
  getAllEquipment,
  createWeapon,
  AddToCart,
  DeleteWeapon,
} = require("../Controllers/Weapons");

router.route("/").get(getAllEquipment).post(createWeapon);
//   .get(getWeaponByType)
//   .get(getWeaponByName)
//   .get(getWeaponByAttributes)
//   .get(getWeaponByMaterial)
//   .get(getWeaponByPrice)
//   .get(getInCart);
router.route("/:id").put(AddToCart).delete(DeleteWeapon);

module.exports = router;
