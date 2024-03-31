import {modelLimit, modelFilter} from '../models/models.js';
import prepareHateoas from '../helpers/helpers.js';

// Controller function to handle the request
const getDataWithQuery = async (req, res) => {
    try {
        // Get the limit value from the request query parameters
        const { limits, page, order_by } = req.query;

        // Retrieve data from the model with the specified limit
        const data = await modelLimit(limits, page, order_by);

        // Send the retrieved data as the response
        res.status(200).json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getAllData = async (req, res) => {
    try {
        const { limits, page, order_by } = req.query;
        const data = await modelLimit(limits, page, order_by);
        //hateoas
        const dataHateo= await prepareHateoas('joyas', data);

        // Send the retrieved data as the response
        res.status(200).json(dataHateo);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDataFiltered = async (req, res) => {
    try {
        // Get the limit value from the request query parameters
        const { precio_max, precio_min, categoria, metal, limits, page } = req.query;

        // Retrieve data from the model with the specified limit
        const data = await modelFilter(precio_max,precio_min, categoria, metal, limits,page);

        // Send the retrieved data as the response
        res.status(200).json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Export the controller function
/* module.exports = {
    getData,
}; */

export default {getDataWithQuery, getAllData, getDataFiltered};