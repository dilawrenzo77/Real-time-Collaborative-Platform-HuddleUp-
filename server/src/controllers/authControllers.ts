import { Request, Response, NextFunction } from "express";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenExpiredError, JsonWebTokenError,  JwtPayload  } from 'jsonwebtoken';


const prisma = new PrismaClient();

export const UserSignUp = async (request: Request, response: Response) => {
    const {name, email, nickName, role , phone, password} = request.body;

    try {
        //check if empty
        if(!name || !email || !nickName || !role || !phone || !password){
            response.status(400).json({ mesagge: "Fields must not be empty"})
        }
        //check if the email already exist
        const ExistingUser =  await prisma.user.findUnique({
            where: {email: email}
        })
        if(ExistingUser){
            response.status(400).json({ mesagge:" Email already in use"})
        }

        //hashpassword
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {name: name, email: email, phone: phone, password: hashpassword, nickName: nickName, role: role}
        });

        response.status(201).json({ message: 'User created successfully', newlyCreatedUser: newUser});
    } catch (error) {
        response.status(400).json({ mesagge: "Error While trying to register user"})
    }
};

export const Login = async (request: Request, response: Response) => {
    const {email, password} = request.body;


    try {
        //check if empty
        if(!email || !password){
            return response.status(400).json({ mesagge: "Fields must not be empty"})
        }

        //confirm Email
        const ExistingUser =  await prisma.user.findUnique({
            where: {email: email}
        })

        //check if the email already exist
        if (!ExistingUser) {
            return response.status(400).json({ message: 'Invalid Email' });
        }

        //Verify password
        const verifiedPassword  = await bcrypt.compare(password, ExistingUser?.password);
        if(!verifiedPassword){
            return response.status(400).json({message: "Invalid Password"})
        }

        //Create a token
        const userToken = jwt.sign({ 
            id: ExistingUser.id, 
            email: ExistingUser.email,
            name: ExistingUser.name,
            nickName: ExistingUser.nickName,
            role: ExistingUser.role
        },"secret Key", { expiresIn: "72hr"})

        response.cookie("userToken",userToken,{
            httpOnly: false,
            secure: true,       // Required for HTTPS
            sameSite: "none",   // Required for cross-origin
            domain: "https://real-time-collaborative-platform-hu-five.vercel.app", // Or your specific domain
            maxAge: 72 * 60 * 60 * 1000, // 72 hours
            path: "/"           // Available on all paths
        });

        return response.status(200).json({
            message: "Successfully Logged In ",
            token: userToken,
            user: { 
                id: ExistingUser.id, 
                email: ExistingUser.email,
                name: ExistingUser.name,
                nickName: ExistingUser.nickName,
                role: ExistingUser.role
            }
        });

        
    } catch (error) {
        response.status(400).json({message: "error while trying to login"})
    }
};

export const Logout = (request: Request, response: Response) => {
    response.clearCookie("userToken");

    return response.status(200).json({message: "Successfully Logged Out User"})
}

export const CheckAuth = (request: Request, response: Response) => {
    try {
        // Check if user is authenticated using your custom cookie
        const userCookieToken = request.cookies.userToken;
        if(!userCookieToken){
            return response.status(200).json({ message: 'No Existing User' });
        }

        const decodeUser = jwt.verify(userCookieToken,"secret Key");

        return response.status(200).json({
            message: "Yes this user is authenticated",
            user: decodeUser
        })
        
    } catch (error) {
        return response.status(401).json({ error: 'Invalid token' });
    }
};

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {

  const token = request.cookies.jwt;
  
  if (!token) {
    return response.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, "secret Key");
    (request as Request & { user: string | JwtPayload }).user= decoded;
    
    next();
  } catch (error) {
     if (error instanceof TokenExpiredError) {
    return response.status(401).json({ message: 'Token expired' });
  }
  
  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: 'Invalid token' });
  }
    
    return response.status(400).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

export const Profile = async (request: Request, response: Response) => {
    const { userEmail } = request.body;
    if (!userEmail || typeof userEmail !== 'string' || !userEmail.includes('@')) {
        return response.status(400).json({
            message: "Valid email is required",
            success: false
        });
    }


    try {
        // get user details based on email
        const ExistingUser =  await prisma.user.findUnique({
            where: {email: userEmail}
        })


        const userDetails = {
            name: ExistingUser?.name,
            nickName: ExistingUser?.nickName,
            email: ExistingUser?.email,
            phone: ExistingUser?.phone,
            role: ExistingUser?.role,
            createdAt: ExistingUser?.createdAt,
        }

        return response.status(200).json(
            {
                mesaage: "user profile successfully fetched",
                success: true,
                user: userDetails
            }
        )
    } catch (error) {
        console.error(error)
        return response.status(401).json(
            {
                mesaage: "user profile not successfully fetched",
                success: false,
            }
        )
    }

}