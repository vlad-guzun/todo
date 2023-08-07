import { connectToDB } from '@/DB/connectDB';
import { TODO } from '@/model/TODO';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    const todos = await TODO.find({});
    return NextResponse.json({allTodos:todos},{status: 200});
  } catch (err) {
    console.log(err);
  }
}


export async function POST(req) {
  const { title } = await req.json();
  try {
    await connectToDB();
    await TODO.create({title});
    return NextResponse.json({message: 'created', title},{status: 201})
  } catch (err) {
    console.log(err);
  } 
}

