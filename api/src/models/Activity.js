const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
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
				allowNull: true,
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
