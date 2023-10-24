import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const login = async (req, res) => {
  try {
      const { email, password } = req.body
      const user = await User.findOne({ email });

      if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
      }
  
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SEC, {
        expiresIn: '3d', // Token expires in 3 days (adjust as needed)
      });

      const userObject = user.toObject()
      delete user.password
  
      res.status(200).json({ message: 'Authentication successful', token, user: userObject});

  } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" })
  }
}

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}