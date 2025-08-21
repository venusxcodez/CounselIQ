const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CounselIQ", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connected")).catch(err => console.log("MongoDB connection error:", err));

const resourceSchema = new mongoose.Schema({
    name: String,
    link: String,
});

const stageSchema = new mongoose.Schema({
    stage_name: String,
    duration_years: Number,
    key_skills: [String],
    resources: [resourceSchema],
});

const careerSchema = new mongoose.Schema({
    career_name: { type: String, required: true, unique: true },
    description: String,
    stages: [stageSchema],
    tips: [String],
});

mongoose.pluralize("null");
const Career = mongoose.model("Careers", careerSchema);

app.get("/api/careers/:career_name", async(req,res)=>{
    try{
        const careerName = req.params.career_name;
        const career = await Career.findOne({ career_name: careerName });

        if (!career) {
            return res.status(404).json({ message: "Career not found" });
        }

        res.json(career);
    } catch(error) {
        res.status(500).json({message: "Server error", error});
    }
})

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});