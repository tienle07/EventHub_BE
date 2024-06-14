/** @format */

const Router = require('express');
const {
    addNewEvent,
    getEvents,
    updateFollowers,
    getFollowers,
    createCategory,
    getCategories,
    getEventById,
} = require('../controllers/eventController');

const eventRouter = Router();

eventRouter.post('/add-new', addNewEvent);
eventRouter.get('/get-events', getEvents);
eventRouter.post('/update-followers', updateFollowers);
eventRouter.get('/followers', getFollowers);
eventRouter.post('/create-category', createCategory);
eventRouter.get('/get-categories', getCategories);
eventRouter.get('/get-event', getEventById);

module.exports = eventRouter;