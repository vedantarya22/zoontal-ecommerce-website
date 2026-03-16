const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addSlug = require("../middlewares/slug.middleware");

const collectionSchema = new Schema({
    collectionName: {
        type:String,
        required: true,
        lowercase:true,
        trim:true
    },
    thumbnail:{
        type:String,
        default : "https://shorturl.at/sJzll", // if image is undefined
        set : (v) => v === "" ? "https://shorturl.at/sJzll" : v, // v = value // for client side if does not provide the image
    },
    description:{
        type:String,

    },

    slug: {
             type: String,
          unique: true 
    },

    season :{
        type:String,
        enum: ["summer","winter"],
        required: true
    }



})


// attach middleware (handles save + findByIdAndUpdate)
addSlug(collectionSchema, "collectionName");

const Collection = mongoose.model("Collection",collectionSchema);
module.exports = Collection;