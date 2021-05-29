const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const homestattingcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const aboutcontent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const contactcontent = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

const app = express();

const BlogPosts = [];

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));



app.get('/', function(req, res){
    res.render('home',{con: homestattingcontent,BP : BlogPosts});
    
});

app.get('/about', function(req, res){
    res.render('about',{con: aboutcontent});
});

app.get('/contact', function(req, res){
    res.render('contact',{con:contactcontent});
});
app.get('/compose',function(req, res){
    res.render('compose')
});
app.post('/compose',function(req, res){
    
    const post = {
        title : req.body.postTitle,
        content : req.body.postBody
    };
    BlogPosts.push(post)
    
    res.redirect('/')

});
app.get('/posts/:postNames', function(req, res){
    const reqTitle = _.lowerCase(req.params.postNames);
    BlogPosts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === reqTitle) {
            console.log('Match found');
        }
        else{
            console.log('Match not found');
        }
        
    });
})

























app.listen(3000,function(err) {
    if(err) {
        console.log(err);
    }
    console.log("Server is running on port 3000");
})
