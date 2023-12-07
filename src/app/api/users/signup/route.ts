import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json();

        const {username, email, password} = requestBody;
        console.log(requestBody);

        // check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: 'User already exists'}, {status:400});
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create user in a database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({message: 'User saved successfully!', success: true, savedUser});
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}