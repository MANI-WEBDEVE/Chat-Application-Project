import { compare } from "bcrypt";
import User from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, user) => {
    return jwt.sign({ email, user}, process.env.JWT_KEY, { expiresIn: maxAge} )
}

//* singup route handler

export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password are required");
    }
    const user = await User.create({ email, password });
    response.cookie('jwt', createToken(email, user.id), {
        maxAge,
        secure:true,
        sameSite:"None"
    })
    //! console.log(user)
    return response.status(201).json({
        user:{
            id: user.id,
            email: user.email,
           
            profileSetup: user.profileSetup

        }
    })
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Servers Error");
  }
};

//* login route handler


export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User Not found please check Email");
    }
    const auth = await compare(password, user.password);  
    if (!auth) {
      return response.status(401).send("Invalid Password");
    }
    response.cookie('jwt', createToken(email, user.id), {
        maxAge,
        secure:true,
        sameSite:"None"
    })
    // console.log(user)
    return response.status(200).json({
        user:{
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color

        }
    })
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Servers Error");
  }
};
 
export const getUserInfo = async (req,res) => {
  try {
    const userData = await User.findById(req.userId)  ;
    if (!userData) {
      return res.status(404).send("User with the given id not found");
    }
    return res.status(200).json({
     
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color
      
    });

  } catch (error) {
    console.log(error)
  }
}
export const updateProfile = async (req,res) => {
  try {
    const {userId} = req;
    const {firstName, lastName, image, color} = req.body;
    
    if (!firstName || !lastName ) {
      return res.status(404).send("Firt name and last name are required");
    }
    const userData = await User.findByIdAndUpdate(userId, {firstName, lastName, image, color, profileSetup: true}, {new: true, runValidators:true})  ;


    return res.status(200).json({
     
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color: userData.color
      
    });

  } catch (error) {
    console.log(error)
  }
}