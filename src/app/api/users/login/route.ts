import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json();

        const {email, password} = requestBody;
        console.log(requestBody);

        // check if user already exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: 'User doesnot exist'}, {status:400});
        }

        // check the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: 'Invalid password'}, {status:400});
        }

        // create user in a database
        const tokenData = {
            id: user._id,
            email:user.email,
            username:user.username
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"}); //making a jwt token

        const response = NextResponse.json({ //setting the response object to set cookies with it
            message: "Login Success",
            success: true
        });

        response.cookies.set("token", token, { //setting the cookie in the user object
            httpOnly: true
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}