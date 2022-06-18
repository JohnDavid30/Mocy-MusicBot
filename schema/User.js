const { Schema, model} = require('mongoose');

const User= new Schema({
    userId: String,
   count:{type:Number,default:0},
   badge: {
    dev :{type:Boolean,default:false},
    owner :{type:Boolean,default:false},
    suppoter :{type:Boolean,default:false},
    bug :{type:Boolean,default:false},
    premium:{type:Boolean,default:false},
    }

})

module.exports = model("user", User)