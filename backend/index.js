const express = require("express");

const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: "*", // use your actual domain name (or localhost), using * is not recommended
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
      "token",
    ],
    credentials: true,
  })
);

app.use(bodyparser.json());

mongoose
  .connect(
    "mongodb+srv://vasudevgarg7:vasudevgarg7@cluster0.ucwxkxw.mongodb.net/"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });

const admin_lib = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
});
const book = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  cover_image: String,
  genre: Array,
  publication_year: Number,
  
  
});

const user_lib = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    books: [
      {
        bookID: String,
        count: Number,
      },
    ],
  });

const Admin = new mongoose.model("Admin", admin_lib);
const Book = new mongoose.model("book", book);



const User = new mongoose.model("User", user_lib);

const secret = "secret";

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    jwt.sign({ username, password }, secret, async (err, token) => {
      try {
        if (username === "admin") {
          const admin = new Admin({
            username: username,
            password: password,
            token: token,
          });
          await admin.save();
          res.send("user created");
        } else {
          const user = new User({
            username: username,
            password: password,
            token: token,
            courses: [],
          });
  
          await user.save();
          res.send({
            user: user,
          });
        }
      } catch {
        res.send("error");
      }
    });
  });
  
  app.post("/login", async (req, res) => {
    console.log(req.body.username);
    const { username, password } = req.body;
    console.log(username + " " + password);
    try {
      
      if (username === "admin") {
          let val = await Admin.findOne({ username, password });
        res.send({
          token: val.token,
          type: "admin",
        });
      } else {
          let val1 = await User.findOne({ username, password });
        res.send({
          token: val1.token,
          type: "user",
        });
      }
    } catch {}
  });

  app.get("/admin/books", async (req, res)=>{
    let books= await Book.find();
    res.send(books);
  })


  app.post("/admin/uploadbook", async (req, res)=>{
    let {title, description,author, cover_image, genre , publication_year}= req.body;
    let book= new Book({title, description,author, cover_image, genre , publication_year});
    await book.save();

    res.send({
        "message": "course created",
        "book": book
    })
  });

  app.put("/admin/editbook/:id", async (req, res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        let { title, description, author, publication_year } = req.body;
    
        const val = Book.findOne({ _id: id });
    
        if (title == "") {
          title = val.title;
        } else if (description === "") {
          description = val.description;
        } else if (author === "") {
          author = val.author;
        } else if (publication_year == "") {
          publication_year = val.publication_year;
        }
    
        await Book.findOneAndUpdate(
          { _id: id },
          { title, description, author, publication_year }
        );
        let arr = await Book.find();
        console.log(arr);
        res.send({ message: "item updated", arr: arr });
      } catch {
        res.status(401).send("error");
      }
  });

  app.delete("/admin/deletebook/:id", async (req, res)=>{
    const id= req.params.id;
    await Book.findOneAndDelete({_id: id}, (err,book1)=>{
        if(err){
            res.send("error");
        }else{
            res.send({
                "deleted item": book1
            })
        }
    })
  });

  app.get("/admin/getbook/:id", async (req, res)=>{
    const id= req.params.id;
    let book= await Book.findOne({_id: id});
    res.send(book);
  })

  app.listen(5002, ()=>console.log("connected to 5002"));