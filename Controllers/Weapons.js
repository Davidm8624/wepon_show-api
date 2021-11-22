// const Job = require('../Models/Job Schema')
const { StatusCodes } = require('http-status-codes');
const { model } = require('mongoose');
const { BadRequsetError, BadRequestError } = require('../Error');
const WeaponSchema = require('../Models/Weapon-Schema');


const getAllEquipment = async (req, res) => {

    const { EquipmentType, name, Attribute1, Attribute2, Material, Price } = req.query;
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
    
    }

    // const weapons = await WeaponSchema.find({createdBy: req.user.userID }).sort('createdAt');
    // // this is returned to the user as a JSON to be used with the data
    // res.status(StatusCodes.OK).json({ weapons, count: weapons.length })


// const getInCart = async (req, res) => {
    
// }
const createWeapon = async (req, res) => {
    const weapon = await WeaponSchema.create(req.body);
    res.json({ method: req.method, weapon: weapon, body: req.body });

}
const EditWeapon = async (req, res) => {
    
}

const DeleteWeapon = async (req, res) => {
    const{
        User: {userID},
        params: {id: weaponID},
    } = req

    const weapon = await WeaponSchema.findByIdAndRemove({
        _id: weaponID,
        createdBy: userID,
    })
    if (!weapon){
        throw new NotFoundError(`no weapon names ${weapon}`)
    }
    res.status(StatusCodes.OK).json({weapon})
}


module.exports = {
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
};