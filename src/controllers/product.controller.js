const { Product } = require("../models");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");

/**
 * POST /api/products/search
 * Search + Filter + Pagination
 */
exports.searchProducts = async (req, res, next) => {
  try {
    let {
      search = "",
      category = "",
      minPrice = 0,
      maxPrice = 0,
      page = 1,
      limit = 10,
    } = req.body;

    // Pagination
    page = Math.max(parseInt(page, 10), 1);
    limit = Math.min(Math.max(parseInt(limit, 10), 1), 50);
    const offset = (page - 1) * limit;

    const where = {};

    /* 🔍 Search */
    if (search && search.trim() !== "") {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    /* 📂 Category */
    if (category && category.trim() !== "") {
      where.category = category;
    }

    /* 💰 Price */
    if (Number(minPrice) > 0 || Number(maxPrice) > 0) {
      where.price = {};
      if (Number(minPrice) > 0) where.price[Op.gte] = Number(minPrice);
      if (Number(maxPrice) > 0) where.price[Op.lte] = Number(maxPrice);
    }

    const { rows, count } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      meta: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      },
      products: rows,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * GET /api/products/:id
 */
exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/products (Admin)
 */
exports.create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/products/:id (Admin)
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [updated] = await Product.update(req.body, { where: { id } });

    if (!updated) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/products/:id (Admin)
 */
exports.delete = async (req, res, next) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
