//express
const express = require('express');
const app = express();
let session = require("express-session");
let SequelizeStore = require("connect-session-sequelize")(session.Store);
const csurf = require('csurf');

//custom modules
const sequelize = require('./data/db');
const dummy = require("./data/dummy-data");
const locals = require("./middlewares/local");

//templating engine
app.set("view engine", "ejs");

//models
const Blog = require("./models/blog");
const Category = require("./models/category");
const User = require("./models/user");
const Role = require("./models/role");

//routes
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/libs", express.static(__dirname + "/node_modules"));

app.use(session({
    secret: '30772e1b-e3bb-4f68-9723-b9ceb9f18cfe',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use(csurf());
app.use(locals);

app.use("/account", authRoutes);
app.use("/admin", adminRoutes);
app.use(mainRoutes);

//server
(async () => {
    // await sequelize.sync({ force: true });
    // await dummy();
    // await User.sync();
})()

Category.belongsToMany(Blog, { through: "blogCategories" });
Blog.belongsToMany(Category, { through: "blogCategories" });

Blog.belongsTo(User);
User.hasMany(Blog);

Role.belongsToMany(User, { through: "userRoles" });
User.belongsToMany(Role, { through: "userRoles" });

app.listen(5000, () => {
    console.log("listening on port 5000");
});