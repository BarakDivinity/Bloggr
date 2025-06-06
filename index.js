import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const title = [];
const content = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended: true} ));

app.get("/", (req,res) => {
    res.render("index.ejs", { titleView: title, contentView: content });
});

app.get("/create", (req,res) => {
    res.render("create.ejs");
});

app.get("/edit/:id", (req,res) => {
    const postId = +req.params.id; //params.id gets the id from the URL and + converts the string to integer
    res.render("edit.ejs", {id: postId, title: title[postId], content: content[postId] });
});

app.post("/edit/:id", (req,res) => { //:id describes the variable needed
    const postId = +req.params.id; //params.id (route parameters) gets the id from the URL and + converts the string to integer
    title[postId] = req.body.title;
    content[postId] = req.body.content;
    res.redirect("/");
});

app.post("/delete/:id", (req,res) => {
    const postId = +req.params.id;
    title.splice(postId,1);
    content.splice(postId,1);
    res.redirect("/");
})

app.post("/create", (req,res) => {
    title.push(req.body["title"]);
    content.push(req.body["content"]);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server ${port} is running`);
});