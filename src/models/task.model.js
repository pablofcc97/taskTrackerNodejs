import { DataTypes, Model } from "sequelize";

class Task extends Model{
    static associate(models) {
        this.belongsTo(models.services, { foreignKey: 'task_id' });
        this.hasOne(models.taskAdvances, { foreignKey: 'service_id' });
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
                    allowNull: false,
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
                    allowNull: false,
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