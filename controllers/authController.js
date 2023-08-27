const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require("express-session");
const mailSender = require("../helpers/mail-send");
const config = require("../config");
const { Op } = require("sequelize");

exports.get_resetPassword = async (req, res) => {
    try {
        res.render("auth/reset-password", {
            title: "Şifremi Unuttum"
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_resetPassword = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            req.session.message = { text: "Girdiğiniz eposta adresi ile eşleşen kullanıcı bulunamadı!", class: "warning" }
            return res.redirect("/account/login");
        }

        const token = await crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + (1000 * 60 * 60);
        await user.save();

        req.session.message = { text: "Sıfırlama bağlantınız eposta adresinize gönderildi.", class: "success" }
        mailSender.sendMail({
            from: config.email.from,
            to: user.email,
            subject: "Parola Sıfırlama Bağlantısı",
            html: `Parolanızı sıfırlamak için aşağıdaki bağlantıyı kullanınız. </br> <a href="http://localhost:5000/account/new-password/${token}">Parolamı sıfırla</a>`
        });
        return res.redirect("/account/login");

    } catch (error) {
        console.log(error);
    }
}
exports.get_newPassword = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: Date.now() }
            }
        });
        res.render("auth/new-password", {
            title: "Parolamı Yenile",
            userId: user.id,
            token: token
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_newPassword = async (req, res) => {
    const userId = req.body.userId;
    const token = req.body.token;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: {
                    [Op.gt]: Date.now()
                }
            }
        });

        if (!user) {
            req.session.message = { text: "Bağlantı geçerliliğini kaybetti, yeni bir bağlantı oluşturunuz", class: "danger" }
            return res.redirect("/account/login");
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = null;
        user.resetTokenExpiration = null;

        await user.save();

        req.session.message = { text: "Parolanız başarıyla sıfırlandı", class: "success" }
        return res.redirect("/account/login");

    } catch (error) {
        console.log(error);
    }
}

exports.get_register = async (req, res) => {
    try {
        res.render("auth/register", {
            title: "Kayıt ol"
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_register = async (req, res) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            req.session.message = { text: "Kayıt olmaya çalıştığınız eposta adresiyle kayıtlı kullanıcı bulunmaktadır.", class: "warning" }
            return res.redirect("/account/login");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            fullname: fullname
        });

        mailSender.sendMail({
            from: config.email.from,
            to: newUser.email,
            subject: "Hesabınız Oluşturulmuştur",
            html: `Merhaba <h1>${newUser.fullname}</h1>, <br> Bu maili görüyorsan kayıt işlemin başarıyla tamamlanmıştır seni aramızda görmekten mutluluk duyarız. `
        });

        req.session.message = { text: "Kullanıcı kayıdı başarıyla oluşturulmuştur", class: "success" }
        return res.redirect("/account/login");

    } catch (error) {
        console.log(error);
    }
}

exports.get_login = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render("auth/login", {
            title: "Giriş yap",
            message: message
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        const roles = await user.getRoles({
            attributes: ["name"],
            raw: true
        });

        if (!user) {
            req.session.message = { text: "Giriş yapmaya çalıştığınız eposta adresiyle kayıtlı kullanıcı bulunmaktadır.", class: "warning" }
            return res.redirect("/account/login");
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.isAuth = true;
            req.session.fullname = user.fullname;
            req.session.roles = roles.map((rol) => rol["name"]);
            req.session.userId = user.id;
            const url = req.query.returnUrl || "/";

            return res.redirect(url);
        }
        req.session.message = { text: "Hatalı parola", class: "warning" }
        return res.redirect("/account/login");

    } catch (error) {
        console.log(error);
    }
}

exports.get_logout = async (req, res) => {
    try {
        await req.session.destroy();
        return res.redirect("/account/login");
    } catch (error) {
        console.log(error);
    }
}