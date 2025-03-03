require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(cors())

const JWT_SECRET = "your_secret_key"; 


app.post("/register", async (req, res) => {
  try {
    console.log("Received Data:", req.body); 

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ 
        where: {
             email 
            }
         });
    if (!user) {
        return res.status(401).json({ 
            message: "Invalid email or password" 
        })
}

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ 
            message: "Invalid email or password" 
        })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
        message: "Login successful", token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT =  3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
