const job = require('../models/jobModel');

const createJob = async (req, res) => {
    try {
        const { title, description, organization, skullRequired, stripend, location, mode, expiresAt } = req.body;

        const newJob = await job.create({
            title,
            description,
            organization,
            skillRequired,
            stipend,
            location,
            mode,
            expiresAt
        });

        res.status(201).json({
            message: "Job created successfully",
            job: newJob
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createJob
};