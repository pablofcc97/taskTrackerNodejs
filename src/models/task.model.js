import { DataTypes, Model } from "sequelize";

class Task extends Model{
    static associate(models) {
        this.belongsTo(models.services, { foreignKey: 'service_id', onDelete: 'CASCADE' }); // Cambiado a 'service_id'
        this.hasOne(models.taskAdvances, { foreignKey: 'task_id' }); // Cada tarea tiene un avance de tarea
    }

    static init(sequelize){
        super.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement:true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                details: {
                    type: DataTypes.STRING,
                },
                date_hour_init: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                date_hour_end: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                minutes_worked: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                personal_quantity: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                state: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize,
                modelName: 'tasks',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        )
    }
}

export default Task