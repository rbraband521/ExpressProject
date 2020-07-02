//requiring the necessary dependencies
const express = require('express');
const data  = require('./data.json').data;

const app = express();
//setting up middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//routes for the home page, about page and project page
app.get('/', (req, res) => {
    const projects = data.projects;
    const templateData = { projects };
    res.render('index', templateData);
})

app.get('/about', (req, res) => {
    res.render('about');
})
//project page changes dynamically based on the id 
app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const localProject = data.projects[id];
    res.render('project', { localProject });
});
//Error handling - this is the 404 Not Found coe
app.use((req, res, next) => {
    const err = new Error('Oh No! We couldn\'t find the page!');
    err.status = 404;
    console.log('Sorry, we couldn\'t find the page you were looking for!');
    next(err);
});
//this renders the error message, status and stack on an error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});







//sets the app to listen on port 3000 as well as logs out a a message to the console for user friendliness


app.listen(3000, () => {
    console.log('The application is running on localhost: 3000')

});
