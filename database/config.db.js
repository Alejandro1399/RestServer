const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Base de datos online")

    } catch (error) {
        throw new Error('Error al conectar con la base de datos')
    }



}

module.exports = { dbConnection };

