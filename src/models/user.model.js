import { DataTypes, Model } from "sequelize";

class User extends Model {
    static associate(models) {
        this.hasMany(models.services, { foreignKey: 'user_id' });
        this.belongsToMany(models.taskAdvances, { through: 'UserTaskAdvances', foreignKey: 'user_id' });
        //td: crear tabla intermedia
        

    }

    static init(sequelize){
        super.init(
            {
                id:{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement:true,
                },
                email:{
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                permissions: {
                    type: DataTypes.INTEGER,
                    defaultValue: 1,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                photo: {
                    type: DataTypes.STRING,
                    defaultValue: 'user.jpg',
                },
                ocupation: DataTypes.STRING,
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
            },{
                sequelize,
                modelName: 'users',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            }
        )
    }
}

export default User