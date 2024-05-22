const sequelize = require('./config/database');
const Comment = require('./models/comment');

sequelize.sync({alter: true}).then(()=>{
    console.log("Database and tables created");
});