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
    handleAddNewBillDetail,
    handleUpdatePaymentSuccess,
    updateCategory,
    getCategoryDetail,
} = require('../controllers/eventController');

const eventRouter = Router();

eventRouter.post('/add-new', addNewEvent);
eventRouter.get('/get-events', getEvents);
eventRouter.post('/update-followers', updateFollowers);
eventRouter.get('/followers', getFollowers);
eventRouter.post('/create-category', createCategory);
eventRouter.get('/get-categories', getCategories);
eventRouter.put('/update-category', updateCategory)
eventRouter.get('/get-category', getCategoryDetail)
eventRouter.get('/get-event', getEventById);
// eventRouter.get('/search-events', searchEvents);
eventRouter.put('/update-event', updateEvent);
eventRouter.get('/get-events-by-categoryid', getEventsByCategoryId);
eventRouter.post('/buy-ticket', handleAddNewBillDetail);
eventRouter.get('/update-payment-success', handleUpdatePaymentSuccess);

module.exports = eventRouter;