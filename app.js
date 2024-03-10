const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const moongoose = require("mongoose");
const listing = require ("./models/listing.js");
const path = require ("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
// const session = require("express-session");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const { date } = require("joi");

main().then(() => {
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderhub');
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// const sessionOptions = {
//     secret: "mysupersecretcode",
//     resave: false,
//     saveuninitialized: true,
//     cookie:{
//         expires: Date.now() + 7 * 24 * 60 *60 * 1000,
//         maxAge: 7 * 24 * 60 *60 * 1000,
//         httpOnly: true
//     }
// }
// app.use(session(sessionOptions));

app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews);



app.get("/", (req, res) =>{
    res.send("server is working well")
})

app.listen(8080, (req, res)=>{
    console.log("server is listening : 8080");
})

app.all("*", (req, res, next) => {
    next(new expressError (404, "page not found!"));
})
app.use((err, req, res, next) => {
    let {status=500 , message="somthing went wrong!"} = err;
    res.status(status).render("error.ejs",{message});
    console.log(err);
})

