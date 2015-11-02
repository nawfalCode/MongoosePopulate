/**
 * Created by Nawfal on 03-Nov-15.
 */

var mongoose = require('mongoose');
var schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost/myapp');

//First define new Schema "Person
var personSchema = new schema({
    name   : String,
    age    : Number,
    stories: [{type: schema.ObjectId, ref: 'storyModel'}]
});

//define the second schema

var storySchema = new schema({
    _creator: {type: schema.ObjectId, ref: 'personModel'},
    title   : String,
    fans    : [{fan: {type: schema.ObjectId, ref: 'fanModel'}}]
});

var fanSchema = new schema({name2: String, age: Number});

//Now the model

var personModel = mongoose.model('personModel', personSchema);
var storyModel  = mongoose.model('storyModel', storySchema);
var fanModel    = mongoose.model('fanModel', fanSchema);

var person1 = new fanModel({name2: 'Reem', age: 27});

var aaron = new personModel({name: 'Nawfal', age: 35});
aaron.save(function (error) {
    if (error) {
        console.log('We got an error' + error);
    }
    else {
        var story1 = new storyModel({
            _creator: aaron._id,
            title   : 'The Story of Node.js'
        });
        story1.fans.push(person1._id);
        story1.save(function (errorStory) {
            if (errorStory) {
                console.log('We go an error at Saveing the Story ' + errorStory);
            } else {
                console.log('Done');
                retriveData();

            }
        })
    }

});
function retriveData() {
    storyModel
        .findOne({title: /Node/i}, function (error, data) {
            console.log(data);
        });
    storyModel
        .findOne({title: /Node/i})
        .populate('_creator')
        .exec(function (error, data) {
            console.log(' the author of the story is ' + data._creator.name + ' and the title is ' + data.title);
        });
}