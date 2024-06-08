
const Router = require('express');
const { getAllUsers, getEventsFollowed, updateFcmToken, getProfile, getFollowers } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/get-all', getAllUsers);
userRouter.get('/get-followed-events', getEventsFollowed);
userRouter.post('/update-fcmtoken', updateFcmToken);
userRouter.get('/get-profile', getProfile);
userRouter.get('/get-followers', getFollowers);

module.exports = userRouter;