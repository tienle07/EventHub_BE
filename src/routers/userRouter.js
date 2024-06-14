
const Router = require('express');
const {

    getEventsFollowed,
    updateFcmToken,
    getProfile,
    getFollowers,
    updateProfile,
    updateInterests,
    toggleFollowing,
    getAllUsers
} = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/get-all', getAllUsers);
userRouter.get('/get-followed-events', getEventsFollowed);
userRouter.post('/update-fcmtoken', updateFcmToken);
userRouter.get('/get-profile', getProfile);
userRouter.get('/get-followers', getFollowers);
userRouter.put('/update-profile', updateProfile);
userRouter.put('/update-interests', updateInterests);
userRouter.put('/update-following', toggleFollowing);

module.exports = userRouter;