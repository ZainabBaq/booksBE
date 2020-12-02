// Error handler
exports.errorMiddleware = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || "Internal server error!" });
};

exports.notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "Path not found!" });
};
