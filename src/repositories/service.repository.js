import Service from '../models/service.model.js'
import BaseRepository from './repository.js'

class ServiceRepository extends BaseRepository{
    constructor(){
        super(Service)
    }

    //All custom DB requests
    async getByIdWithResponsable(id) {
        return this.model.findByPk(id, {
            attributes: { exclude: ['user_id'] },
            include: {
                model: this.model.sequelize.models.users, 
                as: 'user', 
                attributes: {
                    exclude: ['password', 'permissions', 'created_at', 'updated_at'] 
                }, 
              },
        });
      }

}

export default ServiceRepository