import mongoose from 'mongoose'

export const connectToDB = async () => {
    try{
        const db = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Connected to ${db.connection.name} database`)
    }catch(err){
        console.log(err)
    }
}
