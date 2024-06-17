// profileControllers.js
const Profile = require('./profile');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const storageClient = new Storage();
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.get(userId);
    if (!profile) {
      return res.status(404).send({
        error: true,
        message: 'Profile not found'
      });
    }
    const { firstName, lastName, email, photoUrl, about } = profile;
    return res.send({
      error: false,
      message: 'Profile fetched successfully',
      profile: {
        firstName,
        lastName,
        email,
        photoUrl,
        about
      }
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const updateAbout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { about } = req.body;
    await Profile.setAbout(userId, about);
    return res.send({
      error: false,
      message: 'Profile about updated successfully'
    });
  } catch (error) {
    console.error("Error updating profile about:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.get(userId);

    if (profile.photoUrl) {
      return res.status(400).send({
        error: true,
        message: 'Profile photo already exists. Please delete the existing photo before uploading a new one.'
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).send({
        error: true,
        message: 'No file uploaded'
      });
    }

    const filename = `${userId}-${Date.now()}-${file.originalname}`;
    const bucket = storageClient.bucket(bucketName);
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (err) => {
      console.error('Blob stream error:', err);
      return res.status(500).send({
        error: true,
        message: 'Error uploading file'
      });
    });

    blobStream.on('finish', async () => {
      const photoUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
      await Profile.setProfilePhoto(userId, photoUrl);
      return res.send({
        error: false,
        message: 'Profile photo updated successfully',
        photoUrl
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error updating profile photo:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.get(userId);

    if (!profile.photoUrl) {
      return res.status(400).send({
        error: true,
        message: 'No profile photo to delete'
      });
    }

    const photoUrl = profile.photoUrl;
    const filename = path.basename(photoUrl);
    const bucket = storageClient.bucket(bucketName);
    const file = bucket.file(filename);

    await file.delete();
    await Profile.deleteProfilePhoto(userId);

    return res.send({
      error: false,
      message: 'Profile photo deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting profile photo:", error.message);
    return res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getProfile,
  updateAbout,
  updateProfilePhoto,
  deleteProfilePhoto,
  upload
};
