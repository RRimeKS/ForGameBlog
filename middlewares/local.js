module.exports = (req, res, next) => {
    res.locals.isAuth = req.session.isAuth;
    res.locals.fullname = req.session.fullname;

    res.locals.isAdmin = req.session.roles ? req.session.roles.includes("Admin") : false;
    res.locals.isModerator = req.session.roles ? req.session.roles.includes("Moderator") : false;
    next();
}