const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load env wars 
dotenv.config({ path: './config/config.js' });

//load models
const Bootcamp = require('./models/Bootcamp');
const Courses = require('./models/Course');
const Users = require('./models/User');
const Reviews = require('./models/Review');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});

//read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const review = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));

//import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Courses.create(courses);
    await Users.create(users);
    await Reviews.create(review);

    console.log('Data Imported...'.green.inverse);
  } catch (err) {
    console.log(err);
  }
}
//delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Courses.deleteMany();
    await Users.deleteMany();
    await Reviews.deleteMany();
  
    console.log('Data Deleted...'.red.inverse);
  } catch (err) {
    console.log(err);
  }
}

if(process.argv[2] === '-i') {
  importData();
} else if(process.argv[2] === '-d') {
  deleteData();
}
