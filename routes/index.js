const router = require("express").Router()
const Todo = require("../models/Todo");
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// routes will be here....
router.get("/", async(req, res) => {
    const allTodo = await Todo.find();
    res.render("index", {todo: allTodo})
})

router.get("/admin", authMiddleware, async(req, res) => {
    const authorId = req.userId;
    const user = await User.findOne({ _id: authorId });
    // const username = `${user.username}`;
    //console.log(user.username);
    const allTodo = await Todo.find(
        {
            author: authorId,
        }
    );
    res.render("admin", {todo: allTodo})
})

//GET - Edit todo
// router.get("/edit-todo/:id", async(req, res) => {
//     const oneTodo = await Todo.findOne({ _id: req.params.id });
//     res.render("/edit-todo", {todo: oneTodo})
// });


module.exports = router;