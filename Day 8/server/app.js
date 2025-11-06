// server/app.js
import express from "express";
import { MongoClient } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const uri = "mongodb+srv://admin:Ashu%402002@eduprodb.0gv9y9n.mongodb.net/?appName=EduProDb";
const client = new MongoClient(uri);
const dbName = "realtime1";
const collectionName = "meterreadings";

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/analytics", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    const totalEnergy = await col.aggregate([
      { $group: { _id: "$meta.meterId", totalEnergy: { $sum: "$energy_kWh" } } },
      { $sort: { _id: 1 } }
    ]).toArray();

    const avgTemp = await col.aggregate([
      { $group: { _id: "$meta.location", avgTemp: { $avg: "$temperature_C" } } },
      { $sort: { _id: 1 } }
    ]).toArray();

    const hourlyTrend = await col.aggregate([
      {
        $group: {
          _id: { meterId: "$meta.meterId", hour: { $hour: "$timestamp" } },
          totalEnergy: { $sum: "$energy_kWh" }
        }
      },
      { $sort: { "_id.meterId": 1, "_id.hour": 1 } }
    ]).toArray();

    res.json({ totalEnergy, avgTemp, hourlyTrend });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => console.log(`🌍 Server running at http://localhost:${port}`));
