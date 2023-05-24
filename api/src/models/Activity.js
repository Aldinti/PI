const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	sequelize.define(
		"Activity",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.STRING,
				validate: {
					min: 1,
					max: 5,
				},
				allowNull: true,
			},
			duration: {
				type: DataTypes.STRING,
				validate: {
					min: 1,
					max: 24,
				},
				allowNull: true,
			},
			season: {
				type: DataTypes.ENUM("Invierno", "Otoño", "Primavera", "Verano"),
				allowNull: true,
			},
		},
		{ timestamps: false },
	);
};
