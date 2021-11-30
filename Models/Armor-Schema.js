const mongoose = require("mongoose");

const armorSchema = new mongoose.Schema({
  EquipmentType: {
    type: String,
    required: [true, "must choose a armor piece"],
    enum: {
      values: ["helment", "breastplate", "leggings", "Gauntlet", "boots"],
      message: "{VALUE} is not supported",
    },
  },
  name: {
    type: String,
    default: "unnamed",
  },
  resistance: {
    type: String,
    required: [true, 'must choose a Attribute or select "none"'],
    enum: {
      values: [
        "none",
        "fire",
        "water",
        "wind",
        "earth",
        "light",
        "dark",
        "poison",
        "ice",
        "electricity",
      ],
      message: "{VALUE} is not supported",
    },
    default: "none",
    Material: {
      type: String,
      required: [true, "must choose a Material"],
      enum: {
        values: [
          "wood",
          "stone",
          "leather",
          "iron",
          "bone",
          "tungsten",
          "steel",
          "titanium",
          "Meteorite",
          "crimtane",
          "mythril",
          "orichalcum",
          "adamantite",
          "Netherite",
        ],
        message: "{VALUE} is not supported",
      },
    },
    Description: {
      type: String,
    },
    Price: {
      type: Number,
      required: [true, "Must set Price"],
      minimum: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

module.exports = mongoose.model("Armor", armorSchema);
