const router = require("express").Router();
const Todo = require("../models/Todo");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const {logger} = require("./logger");
const { log } = require("winston");
require('dotenv');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token =  req.cookies.token;
  
    if(!token) {
      return res.status(401).json({message: 'You are not signed in'});
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json( { message: 'unauthorized' });
    }
};

// GET - Login
router.get('/login', async (req, res) => {
    try {
      res.render('login', {});
    } catch (error) {
      console.log(error);
    }
});

//POST - Check login

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        console.log('error', 'invalid user');
        return res.status(401).json({ message: 'Invalid username or password'})
      }

      const isPasswordValid = await bcrypt.compare( password, user.password );

      if (!isPasswordValid) {
        console.log('error', 'invalid password');
        return res.status(401).json({ message: 'Invalid password' })
      }

      const token = jwt.sign( { userId: user._id}, jwtSecret );
      res.cookie( 'token', token, {httpOnly: true } );
      res.redirect( '/admin' );
      console.log("login successful");
    //   logger.userLogger.log('info', 'login successful');
      // return res.status(200).json({ message: 'Login successful' })
      
    //   res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
    //   logger.userLogger.log('error', 'login unsuccessful');
    console.log(error);
    }
});

router.get('/signup', (req, res) => {
    try {
      res.render('signup', {});
    } catch (error) {
      console.log(error);
    }
});

// POST - admin signup

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      

      try {
        
        const user = await User.create({ username, password:hashedPassword });
        // res.status(201).json({ message: 'User created successfully', user});
        // alert('User created successfully')
        // res.json({ message: 'User created successfully', user });
        console.log('User created successfully');
        res.redirect('/login');
      } catch (error) {
        if (error.code === 11000 ) {
            res.status(409).json({ message: 'User already exists' })
        }
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
      }


    } catch (error) {
      console.log('error', error)
    }
});

// routes
// POST - add todo
router.post("/add/todo", async (req, res) => {
    const { todo } = req.body;
    const newTodo = await new Todo({ todo });

    // save the todo
    await newTodo
      .save()
      .then(() => {
        console.log("Successfully added todo!");
        // logger.todoLogger.log('info', "Successfully added todo!");
        res.redirect("/admin");
      })
      .catch((err) => console.log('error', err));
});

//GET - Edit todo
router.get("/edit-todo/:id", async(req, res) => {
    const authorId = req.userId;
    const user = await User.findOne({ _id: authorId });
    
    const oneTodo = await Todo.findOne({ _id: req.params.id });
    res.render("edit-todo", {todo: oneTodo})
})

// PUT - Edit Todo

router.put('/complete-todo/:id', authMiddleware, async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, {
          state: 'completed'
        });
          console.log('info', 'ToDo successfully completed');
          res.redirect(`/admin`);
      } catch (error) {
      console.log('error', error)
    }
  
});

router.put('/renew-todo/:id', authMiddleware, async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, {
          state: 'pending'
        });
          console.log('info', 'ToDo successfully completed');
          res.redirect(`/admin`);
      } catch (error) {
      console.log('error', error)
    }
  
});

//GET - Delete Todo

router.get("/delete/todo/:_id", (req, res) => {
    const { _id } = req.params;
    Todo.deleteOne({ _id })
      .then(() => {
        console.log("Deleted Todo Successfully!");
        console.log('info', "Successfully deleted todo!");
        res.redirect("/admin");
      })
      .catch((err) => console.log('error', err));
});

module.exports = router;