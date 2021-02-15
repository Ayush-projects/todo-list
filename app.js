const express = require('express')
const app = express();
const mongo_url = require('./db/mongo');
const mongoose = require('mongoose');
const todos = require('./models/items')
const bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');
mongoose.connect(mongo_url, { useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{
    app.listen(PORT, ()=> {
        console.log("Database and Server is Running");
    });
})

app.get('/save', (req,res)=>{
    let data = new todos({
        listItem: "singing",
        _id: 3
    });
    data.save().then(response=>{
        res.send(response)
    });
})
app.get('/', (req, res)=>{
    
 todos.find().then(resp=>{
    res.render('index', {items: resp})
 }).catch(err=>{
        console.log(err);
    });
    
    //res.render('index',{items});
})
app.get('/add-item', (req, res)=>{
   
    res.render('add-item');

})

app.use(express.json());
app.use(
    express.urlencoded({
      extended: true
    })
  )
  var id = 0;
app.post('/data', (req, res)=>{
    
    console.log(req.body.todo)

    let data = new todos({
           listItem: req.body.todo
    })
    data.save().then(res=>{console.log(res)});
    res.redirect('/');
})
app.get('/delete/:id', (req, res)=>{
    console.log(req.params.id);
    todos.findByIdAndDelete(req.params.id).then((res)=>{console.log(res)});
    res.redirect('/');
})
app.use( (req, res)=>{
    res.render('error')
})