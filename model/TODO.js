import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
})

export const TODO = mongoose.models.TODO || mongoose.model('TODO', todoSchema)

