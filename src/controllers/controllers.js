import {modelLimit} from '../models/models.js';

// Import the necessary modules and dependencies

// Controller function to handle the request
const getData = async (req, res) => {
    try {
        // Get the limit value from the request query parameters
        const { limit } = req.query;

        // Set a default limit value if not provided
        const dataLimit = limit ? parseInt(limit) : 10;

        // Retrieve data from the model with the specified limit
        const data = await modelLimit(dataLimit);

        // Send the retrieved data as the response
        res.status(200).json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controller function
/* module.exports = {
    getData,
}; */

export default {getData};