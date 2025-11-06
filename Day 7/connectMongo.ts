import { MongoClient } from "mongodb";

// Replace this with your MongoDB connection string
const uri = "mongodb+srv://admin:Ashu%402002@eduprodb.0gv9y9n.mongodb.net/"; // e.g., ""

async function connectToMongoDB() {
  const client = new MongoClient(uri);

  try {
    console.log("⏳ Attempting connection...");
    await client.connect();
    console.log(" Successfully connected to MongoDB!");

    // Optional: check available databases
    const dbList = await client.db().admin().listDatabases();
    console.log("📚 Databases:");
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await client.close();
    console.log("👋 Connection closed.");
  }
}

connectToMongoDB();
