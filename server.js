const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors());

// read and write JSON 
const readDB = () => {
    const data = fs.readFileSync("./api/db.json", "utf-8");
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync("./api/db.json", JSON.stringify(data, null, 2));
};



app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const db = readDB();
//
    if (db.users.find(user => user.email === email)) {
        return res.status(400).json({ message: "Email ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword };

    db.users.push(newUser);
    writeDB(db);
    res.json({ message: "User registered successfully" });
});


// Login
app.post("/login", async (req, res) => {
    // debugger
    const { email, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email);

    console.log("Stored hashed password:", user.password);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isPasswordMatch);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, id: user.id });
});

app.get('/blogs', (req, res) => {
    try {
        const dbData = readDB();
        const blogs = dbData.blogs; 
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error });
    }
});


app.post("/createblog", (req, res) => {
    const { token, title, description } = req.body;

    // Check if the token is provided
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Read the database
        const data = readDB();

        // Ensure the blogs array exists
        if (!data.blogs) {
            data.blogs = []; // Initialize if it doesn't exist
        }

        // Create a new blog entry
        const newBlog = {
            id: data.blogs.length + 1, // Unique ID for the blog
            title,
            description,
            userId: decoded.id
        };

        // Add the new blog to the array
        data.blogs.push(newBlog);

        // Write the updated data back to the database
        writeDB(data);

       
        return res.status(201).json({ message: "Blog created successfully", blog: newBlog });

    } catch (error) {
        console.error("Error", error);
        
        // token verify
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        return res.status(500).json({ message: "Error creating the blog", error: error.message });
    }
});

  
app.get("/userblogs", (req, res) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "No tokengiven" });
    }

    const token = authHeader.split(" ")[1];
    try {        
        const decoded = jwt.verify(token, SECRET_KEY);
        const dbData = readDB();
        const blogs = dbData.blogs;

        const userBlogs = blogs.filter(blog => blog.userId === decoded.id);

        return res.json(userBlogs);
    } catch (error) {
        console.error("Tokenerror:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});
  

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});