const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose'); 
const Contact = require('./models/contact');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('frontend'));


app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from database');
            return;
        }

        return res.render('home', {
            title: "Contact List",
            contact_list : contacts
        });
    });


    
});

app.post('/create-contact', function(req, res){
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }

        // console.log('************', newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact', function(req, res){

    let id = req.query.id;
    // console.log(id);
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from Database');
            return;
        }

        return res.redirect('back');
    });
    
});


app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }
    console.log('port: ',port);
});