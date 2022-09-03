const Review = require('./../models/reviewModel');
const factory = require('./handlerFactory');


exports.setUserTorIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getallreview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createreview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
