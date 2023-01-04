const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("diet",{
        dietName:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};