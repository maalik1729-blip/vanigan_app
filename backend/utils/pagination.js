/**
 * Pagination utility for API responses
 * @param {Object} model - Mongoose model
 * @param {Object} query - Query filters
 * @param {Object} options - Pagination options
 * @returns {Object} Paginated results with metadata
 */
const paginate = async (model, query = {}, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sort = options.sort || { createdAt: -1 };
  const select = options.select || '';
  const populate = options.populate || '';

  // Execute query with pagination
  const [results, totalCount] = await Promise.all([
    model
      .find(query)
      .select(select)
      .populate(populate)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    model.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    success: true,
    data: results,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null
    }
  };
};

/**
 * Extract pagination parameters from request query
 * @param {Object} req - Express request object
 * @returns {Object} Pagination options
 */
const getPaginationParams = (req) => {
  return {
    page: req.query.page,
    limit: req.query.limit,
    sort: req.query.sort ? JSON.parse(req.query.sort) : undefined,
    select: req.query.select,
    populate: req.query.populate
  };
};

module.exports = {
  paginate,
  getPaginationParams
};
