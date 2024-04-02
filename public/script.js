/*const {authUrl} = require('./index');

document.addEventListener('DOMContentLoaded', function() { // Ensure page is loaded
    const connectGmailBtn = document.getElementById('connectGmailBtn');
    const authUrl_1 = authUrl; // Adjust this if your backend route for the OAuth2 callback is different

    connectGmailBtn.addEventListener('click', function() {
        window.location.href = authUrl_1; // Redirect the user to the authorization URL
    });
}); */

const loginButton = document.getElementById('loginButton');

const fetchAuthUrl = async () => {
    try {
        const response = await fetch('/getAuthUrl'); 
        const data = await response.json(); 

        if (data.url) {
            window.location.href = data.url; 
        } else {
            console.error('No authUrl received from backend');
        }
    } catch (err) {
        console.error('Error fetching authUrl:', err);
    }
};

loginButton.addEventListener('click', fetchAuthUrl); 
