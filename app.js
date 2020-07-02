const express = require('express');
const data  = require('./data.json').data;

const app = express();
app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    const projects = data.projects;
    const templateData = { projects };
    res.render('index', templateData);
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res, next) => {
    const id = req.params.id;
    const localProject = data.projects[id];
    res.render('project', { localProject });
});

app.use((req, res, next) => {
    const err = new Error('Oh No! We couldn\'t find the page!');
    err.status = 404;
    console.log('Sorry, we couldn\'t find the page you were looking for!');
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});










app.listen(3000, () => {
    console.log('The application is running on localhost: 3000')

});