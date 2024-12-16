const express = require('express');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();

app.use(bodyParser.json())
// Define an endpoint in Express that will make an HTTP request
app.get('/', async (req, res) => {
    const externalUrl = 'http://ec2-13-60-37-104.eu-north-1.compute.amazonaws.com:5000'; // replace with your target service URL
    try {
        // Make the HTTP request to the external service
        const response = await fetch(externalUrl);
        const resp = await response.json()
        console.log(resp)
        // Send back the data received from the external service
        res.status(200).json(resp);
    } catch (error) {
        // Handle any errors that occur during the HTTP request
        console.error('Error fetching data from external service:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/detect_fruit', async (req, res) => {
    const { image_url } = await req.body || {}; // Destructure with fallback to prevent errors if req.body is undefined
    
    if (!image_url) {
        // If image_url is not provided, return a 400 error
        return res.status(400).json({ error: 'image_url is required' });
    }
        const externalUrl = 'http://ec2-13-60-37-104.eu-north-1.compute.amazonaws.com:5000/detect_fruit'; // replace with your target service URL
    console.log(image_url)
    try {
        const formData = new FormData();
        formData.append('image_url', image_url);
        // Make the HTTP request to the external service
        const response = await fetch(externalUrl, {
            method: 'POST',  // Use POST method
            
            body: formData // Send image_url as part of the JSON body
        });
        //image_url
        const resp = await response.json()
        console.log(resp, "response")
        // Send back the data received from the external service
        res.status(200).json(resp);
    } catch (error) {
        // Handle any errors that occur during the HTTP request
        console.error('Error fetching data from external service:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(3002, ()=> {
    console.log('Running on port', 3002)
})