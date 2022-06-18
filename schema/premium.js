const { Schema, model} = require('mongoose');

let pro = new Schema({

    Guild: String,
    Expire: Number,
    Permanent: Boolean

})
module.exports = model('premium-guild', pro)