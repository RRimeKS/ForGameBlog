module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.redirect("/account/login?returnUrl=" + req.originalUrl);
    }
    if (!req.session.roles.includes("Admin") && !req.session.roles.includes("Moderator")) {
        req.session.message = {text: "Yetki alanının dışı.", class: "danger"}
        return res.redirect("/account/login?returnUrl=" + req.originalUrl);
    }
    next();
}