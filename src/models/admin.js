const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const {hash_password, compare} = require("../utils/encryption/hash_password");

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *           uniqueItems: true
 *         email:
 *           type: string
 *           uniqueItems: true
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - phone
 *         - email
 *         - password
 *         - role
 */
const Admin = database.define(
	"Admin",
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
			is: /((\+|(00))88)?01[3-6][0-9]{8}/g,
		},

		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
			validate: {
				isEmail: true,
			},
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		role: {
			type: DataTypes.STRING,
			allowNull: false,
			isIn: ["Super-admin", "Admin"],
		},
	},

	{
		freezeTableName: true,
		timestamps: true,
	}
);

Admin.beforeCreate(async (user, options) => {
	user.password = await hash_password(user.password);
});

module.exports = Admin;
