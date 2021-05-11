const expressAsyncHandler = require("express-async-handler");
const pageLimit = 10;

const paginate = expressAsyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit || pageLimit);
  const startIndex = (page - 1) * limit;
  const endIndex = page + limit;
  req.page = page;
  req.limit = limit;
  req.startIndex = startIndex;
  req.endIndex = endIndex;
  next();
});

const paginateResults = (req, model, result) => {
  if (req.endIndex < model.length) {
    result.next = {
      page: req.page + 1,
      limit: req.limit,
    };
  }

  if (req.startIndex > 0) {
    result.prev = {
      page: req.page - 1,
      limit: req.limit,
    };
  }
  return result;
};
module.exports = { paginate, paginateResults };
