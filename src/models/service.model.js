import { DataTypes, Model } from "sequelize";

class Service extends Model{
    static associate(models) {
        this.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
        this.hasMany(models.tasks, { foreignKey: 'service_id' });
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
                state: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'planificado',
                },
                percent_advance: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                date_hour_init: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                date_hour_end: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },
            {
                sequelize,
                modelName: 'services',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        )
    }
}

export default Service