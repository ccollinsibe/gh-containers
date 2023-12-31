import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
//const uri2 = `mongodb://abc:${dbPassword}@ac-hvwu9tf-shard-00-00.ldmnxb4.mongodb.net:27017,ac-hvwu9tf-shard-00-01.ldmnxb4.mongodb.net:27017,ac-hvwu9tf-shard-00-02.ldmnxb4.mongodb.net:27017/?ssl=true&replicaSet=atlas-rbju6t-shard-0&authSource=admin&retryWrites=true&w=majority`
//const client = new MongoClient(uri2);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  process.exit(1);
}

const database = client.db(dbName);

export default database;
