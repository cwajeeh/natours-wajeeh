const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const Router = express.Router({ mergeParams: true });

Router.use(authController.protect);

Router.route('/')
  .get(authController.protect, reviewController.getallreview)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setUserTorIds,
    reviewController.createreview
  );

Router.route('/:id')
  .get(reviewController.getReview)
  .delete( authController.restrictTo('user','admin'),reviewController.deleteReview)
  .patch( authController.restrictTo('user','admin'),reviewController.updateReview);

module.exports = Router;
