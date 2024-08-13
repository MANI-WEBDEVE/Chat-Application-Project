import bcrypt from "bcrypt";
import User from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

//! token age
const maxAge = 3 * 24 * 60 * 60 * 1000;

// craete Token
const createToken = (email, user) => {
  return jwt.sign({ email, user }, process.env.JWT_KEY, { expiresIn: maxAge });
};

//* SignUp Route

export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    console.log(email);
    if (!email || !password) {
      return response.status(400).send("Email and Password are required");
    }
    const user = await User.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    //! console.log(user)
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Servers Error");
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if ((!email, !password)) {
      return response.status(400).send("Email and Password are required");
    }
    const user = await User.findOne({ email });
    const authanticationPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!authanticationPassword) {
      return response.status(400).send("Invalid PASSWORD");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Servers Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({
        
          id: userData.id,
          email: userData.email,
          profileSetup: userData.profileSetup,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image,
          color: userData.color,
      });
  } catch (error) {
    console.log({error})
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
