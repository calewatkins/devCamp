const advancedResults = (model, populate) => async (req, res, next) => {
  let { select, sort, page, limit, ...query } = { ...req.query };

  query = JSON.parse(
      JSON.stringify(query).replace(/\b(gt|lt|gte|lte|ne|in)\b/g, (match) => `$${match}`)
  );
  
  select = select && select.replaceAll(',', ' ');
  sort = sort ? sort.replace(/,/g, ' ') : '-createdAt';

  
  //pagination
  page = parseInt(req.query.page, 10) || 1;
  limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  const results = await model
                      .find(query, select)
                      .populate(populate)
                      .sort(sort)
                      .limit(limit)
                      .skip(startIndex);

  //pagination result
  const pagination = {};

  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next();

};

module.exports = advancedResults;