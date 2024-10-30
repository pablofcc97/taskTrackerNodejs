import { DataTypes, Model } from "sequelize";

class TaskAdvance extends Model{
    static associate(models) {
        this.belongsTo(models.tasks, { foreignKey: 'task_id' }); // Un avance de tarea pertenece a una tarea
        this.belongsToMany(models.users, { through: 'UserTaskAdvances', foreignKey: 'task_advance_id' });
        this.hasMany(models.observations, { foreignKey: 'task_advance_id', onDelete: 'CASCADE' });
        this.hasMany(models.photos, { foreignKey: 'task_advance_id', onDelete: 'CASCADE' });
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
                },
                date_hour_end: {
                    type: DataTypes.DATE,
                },
                minutes_worked: {
                    type: DataTypes.INTEGER,
                },
                personal_quantity: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                justification: DataTypes.STRING,
                state: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize,
                modelName: 'taskAdvances',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        )
    }
}

export default TaskAdvance