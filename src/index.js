import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import app from './app.js';
import config from './utils/config.js';
import { db } from './utils/database.js';
import './models/index.js';

const startServer = async () => {
    try{
        await db.authenticate()
        console.log('conecting to the database')

        if(config.env === 'development'){
            await db.sync({force: true})
            console.log('DB syncronized and reestablished')
        }

        // const swaggerDocument = await swaggerParser.bundle('src/swagger/swagger.yaml');
        // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        await app.listen(config.port, ()=> {
            console.log(`Listening on PORT ${config.port}`)
        })
    }catch(error){
        console.log(error);
    }
}

startServer()