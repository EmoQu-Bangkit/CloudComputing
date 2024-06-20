# EmoQu - Your Personal Mood & Activity Companion - Cloud Computing

# Architercture Description
We designed the initial architecture and tested GCP demos for smooth operation. The Cloud Architect set up GCP, validated its usability, and configured IAM roles. The app runs on Cloud Run using Docker images from Artifact Registry, managed by a CI/CD pipeline in GitHub Actions.

# Cloud Architercture
<img src="https://github.com/EmoQu-Bangkit/CloudComputing/blob/main/assets/WhatsApp%20Image%202024-06-20%20at%2019.59.56.jpeg"  />

# API Description
The API Backend Programmer created REST APIs using Node.js, Express.js, and the Firebase Admin SDK, with Firestore as the database and Cloud Storage for file uploads, managed by multer. Dependencies include bcrypt for password encryption, jsonwebtoken for authentication, dotenv for environment variables, and moment-timezone for date management.

# <a name="api-url"></a>API URL
**[EmoQu API URL](https://emoqu-api-4urxdbcdla-et.a.run.app)**

# EmoQu API Documentation
**[EmoQu Endpoint Documentation](https://documenter.getpostman.com/view/34827171/2sA3Qzb9Hs)**

# How To Use The Endpoint
To use this endpoint, you need to get the API URL above and combine it with one of the endpoints in the API Documentation.
Some example:
- https://emoqu-api-4urxdbcdla-et.a.run.app/auth/register
- https://emoqu-api-4urxdbcdla-et.a.run.app/auth/login
- https://emoqu-api-4urxdbcdla-et.a.run.app/api/activity
