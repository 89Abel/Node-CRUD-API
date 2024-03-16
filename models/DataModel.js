// every time there is mongodb usage
const mongoose = require('mongoose')

// create a schema to determine type of data
const DataSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: [true, "Please enter a name"]
        },
        age: {
            type: Number,
            required: [true, "Please enter a age"]
        },
        gender: {
            type: String,
            required: [true, "Please enter a gender"]
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

// Create a Data Model
const DataModel = mongoose.model('DataModel', DataSchema);
module.exports = DataModel;