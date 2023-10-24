import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    password: String, 
});

export default mongoose.model("User", userSchema);