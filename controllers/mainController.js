const { Op } = require("sequelize");
const Blog = require("../models/blog");
const Category = require("../models/category");

exports.get_blog_details = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findOne({
            where: {
                id: id
            }
        });
        res.render("main/blog-details", {
            title: blog.title,
            blog: blog
        });
    } catch (error) {
        console.log(error);
    }
}
exports.get_category_blogs = async (req, res) => {
    const size = 5;
    const { page = 0 } = req.query;
    const selectedCategoryId = req.params.id;
    const categories = await Category.findAll();
    const category = await Category.findByPk(selectedCategoryId);
    const showcase = await Blog.findAll({ where: { isShowcase: true } });
    const { rows, count } = await Blog.findAndCountAll({
        include: {
            model: Category,
            where: {
                id: selectedCategoryId
            }
        },
        raw: true,
        limit: size,
        offset: page / size
    });
    try {
        if (rows) {
            res.render("main/index", {
                title: category.categoryName,
                categories: categories,
                selectedCategory: selectedCategoryId,
                blogs: rows,
                blogVitrin: showcase,
                totalPages: Math.ceil(count / size),
                currentPage: page,
                totalItems: count
            });
        } else {
            res.render("main/blogn");
        }

    } catch (error) {
        console.log(error);
    }
}
exports.index = async (req, res) => {
    const size = 5;
    const { page = 0 } = req.query;
    const { rows, count } = await Blog.findAndCountAll({
        where: {
            isConfirm: { [Op.eq]: true },
            isHomepage: { [Op.eq]: true }
        },
        limit: size,
        offset: page * size,
        raw: true
    });
    const showcase = await Blog.findAll({ where: { isShowcase: true } });
    const categories = await Category.findAll();
    try {
        res.render("main/index", {
            title: "Anasayfa",
            blogs: rows,
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            blogVitrin: showcase,
            categories: categories,
            selectedCategory: null
        });
    } catch (error) {
        console.log(error);
    }
}