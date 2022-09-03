const express = require('express');
const toursController = require('./../controllers/toursController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../Router/reviewRoutes');

const Router = express.Router();

Router.use('/:tourId/review', reviewRouter);

Router.route('/top-5-cheap').get(
  toursController.aliasTopTours,
  toursController.getalltours
);

Router.route('/tour-stats').get(toursController.getTourStats);
Router.route('/monthly-plan/:year').get(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  toursController.getMonthlyPlan
);

Router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(
  toursController.getToursWithin
);
Router.route('/distances/:latlng/unit/:unit').get(toursController.getDistances);


Router.route('/')
  .get(toursController.getalltours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.createTour
  );

Router.route('/:id')
  .get(toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.uploadTourImages,
    toursController.resizeTourImages,
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    toursController.deleteTour
  );

module.exports = Router;
