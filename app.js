const express = require('express');
const app = express();
const path = require('path'); //npm install -S path in your console to install path.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const port = 5000;
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
  extended: true
})); //extended : true will just allows us to post nested objects.
app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname + '/static')));
posts = [];
var _ = require('lodash');
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

const itemSchema = {
  title: String,
  content: String
};
const Item1 = mongoose.model("Item1", itemSchema);

const item1 = new Item1({
  title: "homecontent",
  content: homeStartingContent
});
const item2 = new Item1({
  title: "aboutcontent",
  content: aboutContent
});
const item3 = new Item1({
  title: "contactcontent",
  content: contactContent
});

const defaultItems = [item1, item2, item3];
app.get('/', (req, res) => {
  Item1.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item1.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items");
        }
      });
      res.redirect("/");
    }else{
      res.render("home",{p1:foundItems[0],hi:foundItems});
    }
  });
  // res.render("home", {
  //   p1: homeStartingContent,
  //   hi: posts
  // });
  posts.forEach(function(element) {
    console.log(element);
  });
  // Item1.find({},function(err,foundItems){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     for (var i = 3; i<foundItems.length;i++){
  //       posts.push(foundItems);
  //     }
  //   }
  // });
});
app.get('/about', (req, res) => {
  Item1.find({}, function(err, foundItems){
    res.render("about", {
      p1: foundItems[1]
    });
  });

});
app.get('/contact', (req, res) => {
  Item1.find({}, function(err, foundItems){
    res.render("contact", {
      p1: foundItems[2]
    });
  });
  // res.render("contact", {
  //   p1: contactContent
  // });
});
app.get('/compose', (req, res) => {
  res.render("compose");
});
app.post('/compose', (req, res) => {

  var post = {
    title: req.body.compose1,
    content: req.body.compose2
  };
  var post1 = new Item1({
    title: req.body.compose1,
    content: req.body.compose2
  });

  post1.save();
  posts.push(post);
  res.redirect("/");
});
// app.get('/posts/:topic',(req,res)=>{  //express routing parameters
//   var a = req.params.topic;
//   a = _.lowerCase(a); //  according to lodash documentation
//    for(var i=0;i<posts.length;i++){
//      if(a == posts[i].title){
//        var ll = posts[i].content;
//        console.log('matched')
//        res.render("post",{t1:posts[i].title,p1:ll});
//      }
//   }
// });
app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  Item1.find({}, function(err, foundItems){
    posts11 = foundItems;
    posts11.forEach(function(post) {
      const storedTitle = _.lowerCase(post.title);

      if (storedTitle === requestedTitle) {

        res.render("post", {
          title: post.title,
          content: post.content
        });
      }
    });
  });



});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
