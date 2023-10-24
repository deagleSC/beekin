import mongoose from "mongoose"

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    salary: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        enum: ['Full-time', 'Internship', 'Part-time', 'Contract', 'Freelance'],
        required: true,
    }
}, {timestamps: true});

export default mongoose.model("Job", jobSchema);