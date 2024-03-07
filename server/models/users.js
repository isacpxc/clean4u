const { DataTypes } = require("sequelize");
const database = require("../db/connection");

const Users = database.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },

    name: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    tel: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    codx: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cody: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Users.sync({force: false});

module.exports = Users;