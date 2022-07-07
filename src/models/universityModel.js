import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
    alphaTwoCode: String,
    domains: [String],
    country: String,
    webPages: [String],
    name: String,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    lastSave: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const University = mongoose.model('University', universitySchema);

export default University;
