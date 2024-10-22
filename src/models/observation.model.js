import { DataTypes, Model } from "sequelize";

class Observation extends Model{
    static associate(models) {
        this.belongsTo(models.taskAdvances, { foreignKey: 'task_advance_id' });
      }

    static init(sequelize){
        super.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement:true,
                },
                content: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize,
                modelName: 'observations',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        )
    }
}

export default Observation