// profile-routes.js
const express = require('express');
const {
  getProfile,
  updateAbout,
  updateProfilePhoto,
  deleteProfilePhoto,
  upload
} = require('./profileControllers');
const { verifyToken } = require('./verifyToken');

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.patch('/profile/about', verifyToken, updateAbout);
router.post('/profile/photo', verifyToken, upload.single('photo'), updateProfilePhoto);
router.delete('/profile/photo', verifyToken, deleteProfilePhoto);

module.exports = {
  routes: router
};
