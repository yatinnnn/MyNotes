import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));


const KeeperSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Keeper = mongoose.model("Keeper", KeeperSchema);


app.get("/api/getAll", async (req, res) => {
  try {
    const keeperList = await Keeper.find({});
    res.status(200).json(keeperList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get keepers" });
  }
});


app.post("/api/addNew", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newKeeper = new Keeper({ title, description });
    await newKeeper.save();

    const keeperList = await Keeper.find({});
    res.status(200).json(keeperList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add keeper" });
  }
});


app.post("/api/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await Keeper.deleteOne({ _id: id });
    const keeperList = await Keeper.find({});
    res.status(200).json(keeperList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete keeper" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


