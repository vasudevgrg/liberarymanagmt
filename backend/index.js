const express = require("express");

const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = require("@mui/icons-material");
const multer= require("multer");
const path= require("path");

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
const user_lib = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
const User_Lib = new mongoose.model("User", user_lib);

const book = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  cover_image: String,
  genre: Array,
  publication_year: Number,
  // current_reader: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User_Lib",
  // },
  current_reader:{type:mongoose.Schema.Types.ObjectId},
  date_time: Date
});



const Admin = new mongoose.model("Admin", admin_lib);
const Book = new mongoose.model("book", book);


const imageSchema= new mongoose.Schema({
  name: String,
  contentType:String, 
  imageUrl: String
});

const imageModel= new mongoose.model("Image", imageSchema);

const secret = "secret";


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })


// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file);
  
// })

const upload = multer({ dest: 'uploads/' })



app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  try{
    res.send({message:"file uploaded"});
  }catch{
    res.send({message:"error in uploading file"});
  }
})

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
        const user = new User_Lib({
          username: username,
          password: password,
          token: token,
          books: [],
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
      let val1 = await User_Lib.findOne({ username, password });
      res.send({
        token: val1.token,
        id: val1._id,
        type: "user",
      });
    }
  } catch {
    res.send({"message":"false credincials..!!"});
  }
});

app.get("/admin/books", async (req, res) => {
  let books = await Book.find();
  res.send(books);
});

app.post("/admin/uploadbook", async (req, res) => {
  let { title, description, author, cover_image, genre, publication_year, current_reader, date_time } =
    req.body;
  let book = new Book({
    title,
    description,
    author,
    cover_image,
    genre,
    publication_year,
    current_reader,
    date_time
  });
  await book.save();

  res.send({
    message: "course created",
    book: book,
  });
});

//api to update which user is currently holding that book.
app.put("/admin/updateuser/:id", async (req, res)=>{
  try{
    const id= req.params.id;
    console.log(req.body);
    let {current_reader, date_time}= req.body;
    console.log(current_reader+ " "+ date_time);
    const book1= await Book.findOne({_id: id});
   
    await Book.updateOne({_id: id}, {current_reader:current_reader, date_time: date_time}, {
      new: true
    });
 
    await book1.save();
    res.send({"message": "book updated", "book updated": book1});
  }catch{
    res.send("error in updating");
  }
})

app.put("/admin/editbook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let { title, description, author, publication_year , current_reader, date_time} = req.body;

    const val = Book.findOne({ _id: id });

    if (title == "") {
      title = val.title;
    } else if (description === "") {
      description = val.description;
    } else if (author === "") {
      author = val.author;
    } else if (publication_year == "") {
      publication_year = val.publication_year;
    }else if(current_reader==""){
      current_reader= val.current_reader
    }else if(date_time==""){
        date_time= val.date_time
    }

    await Book.findOneAndUpdate(
      { _id: id },
      { title, description, author, publication_year, current_reader, date_time }
    );
    let arr = await Book.find();
    console.log(arr);
    res.send({ message: "item updated", arr: arr });
  } catch {
    res.status(401).send("error");
  }
});

app.delete("/admin/deletebook/:id", async (req, res) => {
  const id = req.params.id;
  await Book.findOneAndDelete({ _id: id }, (err, book1) => {
    if (err) {
      res.send("error");
    } else {
      res.send({
        "deleted item": book1,
      });
    }
  });
});

app.get("/admin/getbook/:id", async (req, res) => {
  const id = req.params.id;
  let book = await Book.findOne({ _id: id });
  res.send(book);
});

app.get("/user/allusers", async (req, res) => {
  let users = await User_Lib.find({});
  res.send(users);
});

app.put("/user/addbook/:id", async (req, res) => {
  let id = req.params.id; //userid
  let bookid = req.body.id;
  
  try {
    let user = await User_Lib.findOne({ _id: id });
    // console.log(user);  we are fetching user correctly
 await User_Lib.updateOne({ _id: id }, { books: [...user.books, bookid] }, {
    new: true
   });

   await user.save();
    res.json({
      "message":"updated",
      "user": user
    })
  } catch {
    res.send({"message":"err"});
  }
});

app.get("/user/books",async(req, res)=>{
  let books= await Book.find({});
  try{
    res.json({
      "books": books
    })
  }catch{
    res.json({
      "books":"books not found"
    });
  }
});

app.put("/user/updatebook/:id", async(req, res)=>{
  try{
    const id= req.params.id;

    let {current_reader, date_time}= req.body;
    console.log(current_reader);
    const book1= await Book.findOne({_id: id});
   
    await Book.updateOne({_id: id}, {current_reader: current_reader, date_time: date_time}, {
      new: true
    });
    console.log(book1);
    await book1.save();
    res.send({"message": "book updated"});
  }catch{
    res.send("error in updating");
  }
})

app.listen(5002, () => console.log("connected to 5002"));
