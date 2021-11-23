const express = require("express");
const router = express.Router();

const {
  getAllEquipment,
  createWeapon,
  EditWeapon,
  DeleteWeapon,
} = require("../Controllers/Weapons");

router
  .route("/")
  .get(getAllEquipment)
  .post(createWeapon)
//   .get(getWeaponByType)
//   .get(getWeaponByName)
//   .get(getWeaponByAttributes)
//   .get(getWeaponByMaterial)
//   .get(getWeaponByPrice)
//   .get(getInCart);
router.route("/:id").put(EditWeapon).delete(DeleteWeapon);

module.exports = router;
