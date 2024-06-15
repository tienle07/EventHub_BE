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
    searchEvents,
    updateEvent,
    getEventsByCategoryId,
} = require('../controllers/eventController');

const eventRouter = Router();

eventRouter.post('/add-new', addNewEvent);
eventRouter.get('/get-events', getEvents);
eventRouter.post('/update-followers', updateFollowers);
eventRouter.get('/followers', getFollowers);
eventRouter.post('/create-category', createCategory);
eventRouter.get('/get-categories', getCategories);
eventRouter.get('/get-event', getEventById);
eventRouter.get('/search-events', searchEvents);
eventRouter.put('/update-event', updateEvent);
eventRouter.get('/get-events-by-categoryid', getEventsByCategoryId);

module.exports = eventRouter;