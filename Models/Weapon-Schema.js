const mongoose = require("mongoose")


const WeaponSchema = new mongoose.Schema({
    EquipmentType: {
        type: String,
        required: [true, 'must choose weapon'],
        enum:{
            values: ['claymore', 'longsword', 'shortsword', 'rapier', 'saber', 
                'knife', 'dagger', 'spear', 'halberd', 'trident', 'club', 'mace', 
                'morning star', 'boomerang', 'throwing star', 'throwing Knife', 
                'longbow', 'shortbow', 'crossbow', 'whip', 'tomahawk', 'battle axe', 
                'knuckles', 'ring sword', 'katana', 'swallow', 'scythe', 'staff', 
                'sickle', 'parasol', 'sai'],
            message: '{VALUE} is not supported'

        }
    },
    Attribute1: {
        type: String,
        required: [true, 'must choose a Attribute or select "none"'],
        enum:{
            values: [ 'none','fire', 'water', 'wind', 'earth', 'light', 'dark', 'poison', 'ice', 'electricity', 'ichor'],
            message: '{VALUE} is not supported'
        },
        default: "none",
    },
    Attribute2: {
        type: String,
        required: [true, 'must choose a Attribute or select "none".'],
        enum:{
            values: ['none','fire', 'water', 'wind', 'earth', 'light', 'dark', 'poison', 'ice', 'electricity', 'ichor'],
            message: '{VALUE} is not supported'
        },
        default: "none",
    },
    Material: {
        type: String,
        required: [true, 'must choose a Material'],
        enum:{
            values: ['wood', 'stone', 'leather', 'iron', 'bone', 'tungsten', 'steel', 'titanium', 'Meteorite', 'crimtane', 'mythril', 'orichalcum', 'adamantite', 'Netherite'],
            message: '{VALUE} is not supported'
        }
    },
    Description: {
        type: String,
    },
    Price:{
        type: Number,
        required: [true, 'Must set Price'],
        minimum: 1
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    },


})
module.exports = mongoose.model("Weapons", WeaponSchema)