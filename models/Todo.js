const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    state: { type: String, value: ["pending", "completed", "deleted"], default:"pending" },
    // user_id:[{type:Schema.Types.ObjectId, ref:"users"}]
    createdAt: { type: Date,},
    updatedAt: { type: Date, },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = new mongoose.model("Todo", TodoSchema);