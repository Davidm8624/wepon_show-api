// const Job = require('../Models/Job Schema')
const { StatusCodes } = require("http-status-codes");
const { model } = require("mongoose");
const { BadRequsetError, BadRequestError } = require("../Error");
const WeaponSchema = require("../Models/Weapon-Schema");

const getAllEquipment = async (req, res) => {
  const { EquipmentType, name, Attribute1, Attribute2, Material, filters, cart } = req.query;
  // const userCart = { userID };

  let queryObject = {};

  if (EquipmentType) {
    queryObject.EquipmentType = EquipmentType;
  }
  if (Attribute1) {
    queryObject.Attribute1 = Attribute1;
  }
  if (Attribute2) {
    queryObject.Attribute2 = Attribute2;
  }
  if (Material) {
    queryObject.Material = Material;
  }
  if (name) {
    queryObject.name = { $regex: name, options: "i" };
  }


  // if (cart) {
  //   userCart

  //   let results = await WeaponSchema.find({}).sort("createdAt");

  // res.json({ results: results })
  // }

  if (filters) {
    const options = ["Price"];
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<=": "$lte",
      "<": "$It",
    };
    const re = /\b(<|>|<=|=|>=)\b/g;

    //filters=price>=30,rating>3
    let newFilters = filters.replace(re, (match) => `-${operatorMap[match]}-`);
    //filters=price-$gte-30,rating-$gt-3

    newFilters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      //field = price, operator = $gte,value = 30
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let results = await WeaponSchema.find(queryObject).sort("createdAt");

  res.json({ results })

};

// const AddToCart = async (req, res) => {
//   userCart = req.body
//   // const {userID} = req.user
//   const { id: weaponID } = req.params

//   const weapon = await WeaponSchema.findByIdAndUpdate(
//     { _id: weaponID, /*createdBy: userID */ },
//     { $push: { cart: req.body } },

//     { new: true, runValidators: true, }
//   )

//   res.status(StatusCodes.OK).json({ weapon })

// }

const createWeapon = async (req, res) => {
  const weapon = await WeaponSchema.create(req.body);
  res.json({ method: req.method, weapon: weapon, body: req.body });
};
// const EditWeapon = async (req, res) => { };

const DeleteWeapon = async (req, res) => {
  const {
    user: { userID },
    params: { id: weaponID },
  } = req;
  const weapon = await WeaponSchema.findByIdAndRemove({
    _id: weaponID,
    createdBy: userID,
  });
  if (!weapon) {
    throw new NotFoundError(`no weapon named ${weapon}`);
  }
  res.status(StatusCodes.OK).json({ weapon });
};



module.exports = {
  getAllEquipment,
  createWeapon,
  // AddToCart,
  DeleteWeapon,
};
