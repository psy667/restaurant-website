const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.json());

app.use(express.static('./client/build'));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/meals', require('./routes/api/meals'));
app.use('/api/reserves', require('./routes/api/reserves'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
