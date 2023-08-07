import { TODO } from "@/model/TODO"
import { connectToDB } from "@/DB/connectDB"

export async function DELETE(req, {params: {id}}) {
    try {
        await connectToDB();
        await TODO.findByIdAndDelete(id);
        return new Response('deleted', {status: 200}); // NextResponse is not needed here + doesnt even work for dynamic routes (yet)
    } catch (err) {
        console.log(err);
    } 
}


export async function PUT(req, {params: {id}}){
    const {title} = await req.json()
    try{
        await connectToDB()
        const updatedTitle = await TODO.findByIdAndUpdate(id,{title})
        return new Response(updatedTitle)
    } catch (err) {
        console.log(err)
    }
}
