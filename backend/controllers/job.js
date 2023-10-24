import Job from "../models/Job.js"
import User from "../models/User.js"

export const getAllJobs = async (req, res) => {
    try {
        const page = req.query.page || 1
        const jobs = await Job.find({})
        .limit(5)
        .skip((page - 1) * 5)
        .select('title company type salary')

        const response = {
            page: page,
            jobs: jobs
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getJobDetails = async (req, res) => {
    try {
        const jobId = req.params.id

        const job = await Job.findById(jobId)

        if (!job) return res.status(404).json({ error: 'Job not found' });

        res.status(200).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const applyToJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.applications.includes(jobId)) return res.status(400).json({ message: 'User has already applied for this job' });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        user.applications.push(job);
        await user.save();
    
        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}