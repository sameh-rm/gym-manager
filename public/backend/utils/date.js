const fixDate = (date) => {
  return new Date(date.getTime() + process.env.OFFSET * 3600 * 1000);
};

module.exports = { fixDate };
