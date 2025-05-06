# Deployment Guide for Mentor App

This document provides instructions for deploying the Mentor app to production environments.

## Backend Deployment (AWS Elastic Beanstalk)

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Elastic Beanstalk CLI installed

### Steps

1. **Prepare Environment Variables**

   Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=production
   PORT=8080
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   OPENAI_API_KEY=<your-openai-api-key>
   FIREBASE_API_KEY=<your-firebase-api-key>
   ```

2. **Initialize Elastic Beanstalk Application**

   ```bash
   cd mentor-app/server
   eb init mentor-app --platform node.js --region us-east-1
   ```

3. **Create Elastic Beanstalk Environment**

   ```bash
   eb create mentor-app-prod --instance_type t2.micro --single
   ```

4. **Deploy Application**

   ```bash
   eb deploy mentor-app-prod
   ```

5. **Configure Environment Variables in AWS Console**

   - Go to AWS Elastic Beanstalk Console
   - Select your environment
   - Go to Configuration > Software
   - Add all environment variables from your `.env` file

## Web App Deployment

### Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- S3 bucket created for hosting
- CloudFront distribution configured (optional, for better performance)

### Steps

1. **Build the Web Application**

   ```bash
   cd mentor-app/client/web
   npm run build
   ```

2. **Deploy to S3**

   ```bash
   aws s3 sync build/ s3://mentor-app-web --delete
   ```

3. **Create CloudFront Invalidation (if using CloudFront)**

   ```bash
   aws cloudfront create-invalidation --distribution-id <your-distribution-id> --paths "/*"
   ```

## Mobile App Deployment (Android)

### Prerequisites
- Google Play Developer Account
- Android Studio installed
- Keystore file for signing the app

### Steps

1. **Configure Environment**

   Create a `.env` file in the mobile directory with the following variables:
   ```
   API_URL=<your-backend-api-url>
   FIREBASE_API_KEY=<your-firebase-api-key>
   OPENAI_API_KEY=<your-openai-api-key>
   ```

2. **Build the Release APK**

   ```bash
   cd mentor-app/client/mobile
   npx expo build:android -t apk
   ```

3. **Test the APK on Real Devices**

   Install the APK on multiple Android devices to ensure compatibility.

4. **Create a Release on Google Play Console**

   - Log in to Google Play Console
   - Create a new release
   - Upload the signed APK
   - Fill in release details
   - Submit for review

## Mobile App Deployment (iOS)

### Prerequisites
- Apple Developer Account
- Xcode installed on a Mac
- Provisioning profiles and certificates configured

### Steps

1. **Configure Environment**

   Create a `.env` file in the mobile directory with the same variables as for Android.

2. **Build the iOS App**

   ```bash
   cd mentor-app/client/mobile
   npx expo build:ios
   ```

3. **Test on iOS Devices**

   Test the app on multiple iOS devices using TestFlight.

4. **Submit to App Store**

   - Open App Store Connect
   - Create a new iOS app version
   - Upload the build
   - Fill in app details
   - Submit for review

## Continuous Deployment

The repository includes a GitHub Actions workflow file (`.github/workflows/ci-cd.yml`) that automates the testing and deployment process. When code is pushed to the main branch, it:

1. Runs backend tests
2. Runs frontend tests
3. Performs E2E tests
4. Deploys to production if all tests pass

To use this workflow, you need to configure the following secrets in your GitHub repository:

- `JWT_SECRET`: Secret key for JWT authentication
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `CLOUDFRONT_DISTRIBUTION_ID`: ID of your CloudFront distribution
- `SLACK_WEBHOOK`: Webhook URL for Slack notifications (optional)

## Monitoring and Maintenance

After deployment, monitor the application using:

- AWS CloudWatch for backend logs and metrics
- Firebase Analytics for mobile app usage
- Google Analytics for web app usage
- Sentry for error tracking

Regularly check for:
- Security vulnerabilities in dependencies
- Performance issues
- User feedback and bug reports

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify MongoDB connection string
   - Check network security groups and IP whitelisting

2. **API Endpoint Failures**
   - Check API logs in CloudWatch
   - Verify environment variables are correctly set

3. **Mobile App Crashes**
   - Review Sentry error reports
   - Test on different device models

For additional support, contact the development team at support@mentorapp.example.com.
