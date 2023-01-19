const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const pollController = require('./pollController');
const app = express();
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/create', pollController.createPollGetController);
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/poll/:id', pollController.viewPollGetController);
app.post('/poll/:id', pollController.viewPollPostController);
app.get('/polls', pollController.getAllPolls);
app.post('/create', pollController.createPollPostController);
mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb://0.0.0.0:27017/test')
  .then(() => {
    app.listen(8000, () => {
      console.log('Server listening in 8000');
    });
  })
  .catch((e) => {
    console.log(e);
  });
