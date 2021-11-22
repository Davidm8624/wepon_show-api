// const Job = require('../Models/Job Schema')
const { StatusCodes } = require('http-status-codes');
const { model } = require('mongoose');
const { BadRequsetError, BadRequestError } = require('../Error');
const WeaponSchema = require('../Models/Weapon-Schema');


const getAllEquipment = async (req, res) => {
    const weapons = await WeaponSchema.find({createdBy: req.user.userID }).sort('createdAt');
    // this is returned to the user as a JSON to be used with the data
    res.status(StatusCodes.OK).json({ weapons, count: weapons.length })
}


const getWeaponByName = async (req, res) => {
    
}
const getWeaponByAttributes = async (req, res) => {
    
}
const getWeaponByMaterial = async (req, res) => {
    
}
const getWeaponByPrice = async (req, res) => {
    
}
const getInCart = async (req, res) => {
    
}
const createWeapon = async (req, res) => {
    const weapon = await WeaponSchema.create(req.body);
    res.json({ method: req.method, weapon: weapon, body: req.body });

}
const EditWeapon = async (req, res) => {
    
}

const DeleteWeapon = async (req, res) => {
    const{
        User: {userID},
        params: {id: WeaponID},
    } = req

    const weapon = await WeaponSchema.findByIdAndRemove({
        _id: WeaponID,
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
    getWeaponByAttributes,
    getWeaponByMaterial,
    getWeaponByPrice,
    getInCart,
    createWeapon,
    EditWeapon,
    DeleteWeapon,
};