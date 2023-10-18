const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    state: { type: String, value: ["pending", "completed", "deleted"], default:"pending" },
    user_id:[{type:Schema.Types.ObjectId, ref:"users"}]
});

module.exports = new mongoose.Model("Todo", TodoSchema);