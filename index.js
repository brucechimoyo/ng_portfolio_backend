// app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Comment = require('./models/comment');


const app = express();
app.use(cors());

app.use(express.json());

// Route to create a new comment
app.post('/comments', async (req, res) => {
  try {
    console.log(req.body);
    const { content, author,blogId } = req.body;
    if (!content || !author || !blogId) {
      return res.status(400).json({ error: 'Content and author are required' });
    }
    const comment = await Comment.create({ content, author,blogId });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to get all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to get comments by blogId
app.get('/comments/:blogId', async (req, res) => {
  console.log("Endpoint hit!")
  try {
    const { blogId } = req.params;
    const comments = await Comment.findAll({ where: { blogId } });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});



const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
