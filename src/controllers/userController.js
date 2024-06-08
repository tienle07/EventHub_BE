const asyncHandle = require('express-async-handler');
const UserModel = require('../models/userModel');
const { query } = require('express');
const EventModel = require('../models/eventModel');
const http = require('http');

const getAllUsers = asyncHandle(async (req, res) => {
    const users = await UserModel.find({});

    const data = [];
    users.forEach((item) =>
        data.push({
            email: item.email ?? '',
            name: item.name ?? '',
            id: item.id,
        })
    );

    await handleSendNotification();

    res.status(200).json({
        message: 'Get users successfully!!!',
        data,
    });
});

const getEventsFollowed = asyncHandle(async (req, res) => {
    const { uid } = req.query;

    if (uid) {
        const events = await EventModel.find({ followers: { $all: uid } });

        const ids = [];

        events.forEach((event) => ids.push(event.id));

        res.status(200).json({
            message: 'fafa',
            data: ids,
        });
    } else {
        res.sendStatus(401);
        throw new Error('Missing uid');
    }
});

const getProfile = asyncHandle(async (req, res) => {
    const { uid } = req.query;

    if (uid) {
        const profile = await UserModel.findOne({ _id: uid });

        console.log(profile);

        res.status(200).json({
            message: 'Get Profile Success',
            data: {
                uid: profile._id,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
                name: profile.name ?? '',
                givenName: profile.givenName ?? '',
                familyName: profile.familyName ?? '',
                email: profile.email ?? '',
                photoUrl: profile.photoUrl ?? '',
                bio: profile.bio ?? '',
                following: profile.following ?? [],
            },
        });
    } else {
        res.sendStatus(401);
        throw new Error('Missing uid');
    }
});

const updateFcmToken = asyncHandle(async (req, res) => {
    const { uid, fcmTokens } = req.body;

    await UserModel.findByIdAndUpdate(uid, {
        fcmTokens,
    });

    res.status(200).json({
        message: 'Fcmtoken updated',
        data: [],
    });
});

const handleSendNotification = async () => {
    var request = require('request');
    var options = {
        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'key=AAAAnKIvrOQ:APA91bFtj72CcrMpUbhsHUl1-PBH0_y1S3siw0yLpPDba59f0y5tahPYOBJO-lkAOOhlTIvazrEPfiO66d262bkX3k4rd6UlxX3h3enhovVQkW24jApw9K3YwZ0EwAbnh5xWI-zpha1Q',
        },
        body: JSON.stringify({
            registration_ids: [
                'fWyuCvaXRa6k7n_oNzMwwC:APA91bFrPpAoBbnnrg3d5HyGEDFk7BjJd4r5lccOqLE0Fger6AaSfzelDPL2NzcWH7gmKqL9-BdL0rwpBfId_QqQeKeEV5kZTVQUrJJQqMU9ql1Ho5gZhZnWyCr8gzEF_X-vNXIz2wfK',
            ],
            notification: {
                title: 'title',
                subtitle: 'sub title',
                body: 'content of message',
                sound: 'default',
            },
            contentAvailable: 'true',
            priority: 'high',
            apns: {
                payload: {
                    aps: {
                        contentAvailable: 'true',
                    },
                },
                headers: {
                    'apns-push-type': 'background',
                    'apns-priority': '5',
                    'apns-topic': '',
                },
            },
        }),
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};

const getFollowers = asyncHandle(async (req, res) => {
    const { uid } = req.query;

    if (uid) {
        const users = await UserModel.find({ following: { $all: uid } });

        const ids = [];

        if (users.length > 0) {
            users.forEach((user) => ids.push(user._id));
        }

        res.status(200).json({
            message: '',
            data: ids,
        });
    } else {
        throw new Error('can not find uid');
        res.sendStatus(404);
    }
});

const updateProfile = asyncHandle(async (req, res) => {
    const body = req.body;
    const { uid } = req.query;

    if (uid && body) {
        await UserModel.findByIdAndUpdate(uid, body);

        res.status(200).json({
            message: 'Update profile successfully!!',
            data: [],
        });
    } else {
        res.sendStatus(401);
        throw new Error('Missing data');
    }
});

module.exports = { getAllUsers, getEventsFollowed, updateFcmToken, getProfile, getFollowers, updateProfile };