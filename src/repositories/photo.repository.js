import Photo from '../models/photo.model.js'
import BaseRepository from './repository.js'

class PhotoRepository extends BaseRepository{
    constructor(){
        super(Photo)
    }

    //All custom DB requests
    

}

export default PhotoRepository