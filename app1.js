const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const fs = require('fs'); // For working with the credentials file

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public'))); 

// Replace with your Google Cloud Console project credentials
const credentialsPath = './credentials.json';
const tokenPath = './token.json'; // File to store access tokens 
 // Example scope

// Load credentials
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Generate the authorization URL (replace with your desired scopes)
const SCOPES = ['profile'];  // Requesting basic profile information for demonstration
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES
});

// Route to handle authorization code exchange (replace with your logic)
app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  if (code) {
    // Exchange authorization code for tokens (refer to Google API documentation)
    oAuth2Client.getToken(code, (err, tokens) => {
      if (err) {
        console.error('Error exchanging authorization code:', err);
        res.status(500).send('Authorization failed!');
      } else {
        console.log('Authorization successful! Tokens retrieved.');
        // You would typically store tokens securely (not shown here for brevity)
        res.redirect('/permissionGranted'); // Redirect to permission granted page
      }
    });
  } else {
    console.error('Authorization code not found in request.');
    res.status(400).send('Authorization failed!');
  }
});

// Simple route to display "Permission Granted" message
app.get('/permissionGranted', (req, res) => {
  res.send('Permission Granted!');
});

// Inside app.js, add a route to serve the authUrl:
app.get('/getAuthUrl', (req, res) => {
    res.json({ url: authUrl }); 
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

