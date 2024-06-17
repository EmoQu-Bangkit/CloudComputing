// report-routes.js
const express = require('express');
const {
  createReport,
  getReport,
  listReports,
  updateReport
} = require('./reportControllers');
const { verifyToken } = require('./verifyToken');

const router = express.Router();

router.post('/report', verifyToken, createReport);
router.get('/report/:reportId', verifyToken, getReport);
router.get('/reports', verifyToken, listReports);
router.patch('/report/:reportId', verifyToken, updateReport);

module.exports = {
  routes: router
};
