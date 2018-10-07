const express = require('express');
const hbs=require('hbs');

hbs.registerHelper('getCurrentYear',()=>{
	return "test";//new Date().getFullYear();

})
const fs=require('fs');
var app=express();
app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});
app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=console.log(`${now}:${req.method} ${req.url}`);
	fs.appendFile('server.log'+ '\n',(err)=>{
		if(err){
			console.log("cannot append file");
		}
	})
	
	next();
});
app.set('view engine','hbs');
app.get('/',(req,res)=>{
	res.send('hello express!');
});
hbs.registerPartials(__dirname+'/views/partials');
app.listen(3000);
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page'

	});
});

app.get('/home',(req,res)=>{
	res.render('home.hbs',{
		pageTitle: 'Hola Nidhi',
		currentYear: new Date().getFullYear(),
		welcomeMessage: "i'm proud of you  my child, Nidhi"
	});
});
