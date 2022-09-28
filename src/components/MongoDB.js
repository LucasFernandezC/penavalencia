const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://lucken99:Bariloche1@notas.ha5hfzh.mongodb.net/test";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);





//
//db.users.insert({ '_id': 1, 'nombre': 'Prueba', 'email': "mail@prueba.com", 'telefono': 611128436, 'socio': 123456, "sociofundador" : 123456, "fecha creacion": new Date('2014-03-01T08:00:00Z') },)

