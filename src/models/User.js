const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const {hash_password} = require("../utils/encryption/hash_password");

const User = database.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		phone: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},

		date_Of_Birth: {
			type: DataTypes.DATE,
		},

		school: {
			type: DataTypes.STRING,
		}
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

User.beforeCreate(async (user, options) => {
	user.password = await hash_password(user.password);
});

module.exports = User;
