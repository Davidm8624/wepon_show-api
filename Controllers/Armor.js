const { StatusCodes } = require("http-status-codes");
const { model } = require("mongoose");
const { BadRequsetError, BadRequestError } = require("../Error");
const ArmorSchema = require("../Models/Armor-Schema");

const getAllArmor = async (req, res) => {
    const { EquipmentType, name, resistance, Material, filters } = req.query;

    let queryObject = {};

    if (EquipmentType) {
        queryObject.EquipmentType = EquipmentType;
    }
    if (resistance) {
        queryObject.resistance = resistance;
    }
    if (Material) {
        queryObject.Material = Material;
    }
    if (name) {
        queryObject.name = { $regex: name, options: "i" };
    }
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
    let results = await ArmorSchema.find(queryObject).sort("createdAt");

    res.json({ results })

}

const createArmor = async (req, res) => {
    const Armor = await ArmorSchema.create(req.body);
    res.json({ method: req.method, Armor: Armor, body: req.body });
};

const DeleteArmor = async (req, res) => {
    const {
        user: { userID },
        params: { id: ArmorID },
    } = req;
    const Armor = await ArmorSchema.findByIdAndRemove({
        _id: ArmorID,
        createdBy: userID,
    });
    if (!Armor) {
        throw new NotFoundError(`no Armor named ${Armor}`);
    }
    res.status(StatusCodes.OK).json({ Armor });
};

module.exports = {
    getAllArmor,
    createArmor,
    DeleteArmor
}