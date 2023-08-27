const { Op } = require("sequelize");
const sequelize = require("../data/db");
const Blog = require("../models/blog");
const Category = require("../models/category");
const User = require("../models/user");
const fs = require('fs');
const Role = require("../models/role");


//blog-delete
exports.get_blog_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByPk(id);
        console.log(blog);
        res.render("admin/blog-delete", {
            title: blog.title + " | siliniyor... |",
            blog: blog
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_blog_delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Blog.destroy({
            where: {
                id: id
            }
        });
        return res.redirect("/admin/blogs");
    } catch (error) {
        console.log(error);
    }
}
exports.get_category_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        res.render("admin/category-delete", {
            title: category.categoryName + " | siliniyor... |",
            category: category
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_category_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.destroy({
            where: {
                id: id
            }
        });

        return res.redirect("/admin/categories");
    } catch (error) {
        console.log(error);
    }
}
//blog-edit
exports.get_blog_edit = async (req, res) => {
    const id = req.params.id;
    try {
        const categories = await Category.findAll();
        const blog = await Blog.findOne({
            where: {
                id: id
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        res.render("admin/blog-edit", {
            title: blog.dataValues.title,
            blog: blog.dataValues,
            categories: categories
        })
    } catch (error) {
        console.log(error);
    }
}
exports.post_blog_edit = async (req, res) => {
    const blogid = req.body.blogId;
    const blog = await Blog.findOne({
        where: {
            id: blogid
        },
        include: {
            model: Category,
            attributes: ["id"]
        }
    });
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    let image = req.body.image;
    if (req.file) {
        image = req.file.filename

        fs.unlink("./public/img/" + req.body.file, err => {
            console.log(err);
        });
    } else {
        image = blog.image;
    }
    const categoryIds = req.body.categories;
    const isConfirm = req.body.isConfirm == "on" ? 1 : 0;
    const isHomepage = req.body.isHomepage == "on" ? 1 : 0;
    const isShowcase = req.body.isShowcase == "on" ? 1 : 0;
    try {


        if (blog) {
            blog.title = title,
                blog.subtitle = subtitle;
            blog.desc = desc;
            blog.image = image;
            blog.isConfirm = isConfirm;
            blog.isHomepage = isHomepage;
            blog.isShowcase = isShowcase;

            if (categoryIds == undefined) {
                await blog.removeCategories(blog.categories);
            } else {
                await blog.removeCategories(blog.categories);
                const selectedCategory = await Category.findAll({
                    where: {
                        id: { [Op.in]: categoryIds }
                    }
                });
                await blog.addCategories(selectedCategory);
            }

            await blog.save();
            return res.redirect("/admin/blogs");
        }
    } catch (error) {
        console.log(error);
    }
}
exports.get_category_edit = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findOne({
        raw: true,
        where: {
            id: id
        }
    });
    const blogs = await Blog.findAll({
        raw: true,
        include: {
            model: Category,
            where: {
                id: id
            }
        }
    });
    try {
        res.render("admin/category-edit", {
            title: category.categoryName,
            category: category,
            blogs: blogs
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_category_edit = async (req, res) => {
    const id = req.params.categoryId;
    const name = req.body.name;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            category.categoryName = name

            await category.save();
            return res.redirect("/admin/categories");
        }
    } catch (error) {
        console.log(error);
    }
}
//Blog-create 
exports.get_blog_create = async function (req, res) {
    try {
        const categories = await Category.findAll();

        res.render("admin/blog-create", {
            title: "add blog",
            categories: categories
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.post_blog_create = async function (req, res) {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    const categoryIds = req.body.categories;
    let image = req.body.image;
    if (req.file) {
        image = req.file.filename;
        fs.unlink("./public/img" + req.body.file, err => {
            console.log(err);
        });
    }
    const isHomepage = req.body.isHomepage == "on" ? 1 : 0;
    const isShowcase = req.body.isShowcase == "on" ? 1 : 0;
    const isConfirm = req.body.isConfirm == "on" ? 1 : 0;

    const blog = await Blog.findOne({
        include: {
            model: Category,
            attributes: ["id"]
        }
    });

    try {
        const createdBlog = await Blog.create({
            title: title,
            subtitle: subtitle,
            desc: desc,
            image: image,
            isHomepage: isHomepage,
            isConfirm: isConfirm,
            isShowcase: isShowcase,
        });

        const addCategory = async () => {
            for (let i = 0; i < categoryIds.length; i++) {
                const cate = await sequelize.query(`insert into blogCategories (categoryId, blogId) values ( ${categoryIds[i]}, ${createdBlog.id})`);
            }
        }

        addCategory();

        res.redirect("/admin/blogs?action=create");
    }
    catch (err) {
        console.log(err);
    }
}
exports.get_category_create = async (req, res) => {
    try {
        res.render("admin/category-create", {
            title: "Kategori olştur"
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_category_create = async (req, res) => {
    try {
        await Category.create({
            categoryName: req.body.categoryName
        });
        res.redirect("/admin/categories");
    } catch (error) {
        console.log(error);
    }
}
//blog-list | category-list
exports.get_blogs = async (req, res) => {
    try {
        const isAdmin = req.session.roles.includes("Admin");
        const isModerator = req.session.roles.includes("Moderator");
        const isGuest = req.session.roles.includes("Guest");
        const blogs = await Blog.findAll({
            attributes: ["id","image","title","subtitle"],
            include: {
                model: Category
            },
            where: isModerator && !isAdmin ? {userId: req.session.userId} : null
        });
        const blogCount = await Blog.count();
        res.render("admin/blog-list", {
            title: "Bloglar",
            blogs: blogs,
            blogCount: blogCount
        });
    } catch (error) {
        console.log(error);
    }
}
exports.get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll({ raw: true });
        const categoryCount = await Category.count();
        res.render("admin/category-list", {
            title: "Kategoriler",
            categories: categories,
            categoryCount: categoryCount
        });
    } catch (error) {
        console.log(error);
    }
}


// --===== USERS =====--

//create
exports.get_user_delete = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    try {
        res.render("admin/user-delete", {
            title: user.fullname + " adlı kullanıcı siliniyor...",
            user: user
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_user_delete = async (req, res) => {
    const userid = req.body.userid;
    try {
        const user = await User.findOne({ where: { id: userid } });
        if (user) {
            await User.destroy({ where: { id: userid } })
            req.session.message = { text: "Kullanıcı başarıyla silindi", class: "success" }
            return res.redirect("/admin/users");
        }

        req.session.message = { text: "Kullanıcı bulunamadı", class: "danger" }
        return res.redirect("/admin/users");
    } catch (error) {
        console.log(error);
    }
}
// update
exports.get_user_edit = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({
        where: {
            id: id
        },
        include: {
            model: Role
        }
    })
    const roles = await Role.findAll();
    try {
        res.render("admin/user-edit", {
            title: user.fullname,
            user: user,
            roles: roles
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_user_edit = async (req, res) => {
    const id = req.body.userid;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const roles = req.body.roles;
    try {
        const user = await User.findOne({
            where: {
                id: id
            },
            include: {
                model: Role
            }
        });

        if (user) {
            user.fullname = fullname;
            user.email = email;

            if (roles == undefined) {
                await user.removeRoles(user.roles);
            } else {
                await user.removeRoles(user.roles);
                const selectedRoles = await Role.findAll({
                    where: {
                        id: { [Op.in]: roles }
                    }
                });
                await user.addRoles(selectedRoles);
            }
            await user.save();
        }
        res.redirect("/admin/users");
    } catch (error) {
        console.log(error);
    }
}
// read
exports.get_users = async (req, res) => {
    const users = await User.findAll();
    const userCount = await User.count();
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render("admin/user-list", {
            title: "Kullanıcılar",
            users: users,
            userCount: userCount,
            message: message
        });
    } catch (error) {
        console.log(error);
    }
}

// --===== ROLE =====--

//edit
exports.get_role_edit = async (req, res) => {
    const roles = await Role.findOne({ where: {id: req.params.id }});
    const users = await roles.getUsers();
    try {
        res.render("admin/role-edit", {
            title: roles.name + " adlı rol güncelleniyor ",
            users: users,
            role: roles
        });
    } catch (error) {
        console.log(error);
    }
}
exports.post_role_edit = async (req, res) => {
    const id = req.body.roleId;
    const roles = await Role.findOne({ where: {id: id }});
    try {
        if (roles) {
            roles.name = req.body.roleName;
            await roles.save();
            req.session.message = {text: "Rol başarıyla güncellendi", class:"success"}
            return res.redirect("/admin/roles");
        }
    } catch (error) {
        console.log(error);
    }
}
//read
exports.get_role = async (req, res) => {
    const roleCount = await Role.count();
    const roles = await Role.findAll({ raw: true });
    try {
        res.render("admin/role-list", {
            title: "Roller",
            roles: roles,
            roleCount: roleCount
        });
    } catch (error) {
        console.log(error);
    }
}