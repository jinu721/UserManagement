const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017/userMangment');


async function connectMongo(){
    try{
        await client.connect()
        console.log("Connected")
    }catch(err){
        console.log('Mongo connection error : ',err)
    }
}

connectMongo();

const users = client.db('userMangment').collection('users');

module.exports = users;

