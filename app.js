const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port=80;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// app.use(express.static('static',options))
//express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//PUG specific stuff
app.set('view engine','pug') //set the templete engine as pug
app.set('views',path.join(__dirname,'views')) //set the views directory


//end points
app.get('/',(req,res)=>{
    const con ="This is the best content on the internet so far  so use wisely"
    const params={'title':'Pug is the best game','content':con}
    res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
    const con ="This is the best content on the internet so far  so use wisely"
    const params={'title':'Pug is the best game','content':con}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
   var myData=new Contact(req.body);
   myData.save().then(()=>{
   res.send("This Item has been saved to Database")
}).catch(()=>{
    res.status(400).send("Item was not saved to Database")

})});

//Start the server
app.listen(port,()=>{
    console.log('The application started sucessfully on port ${port}');
});