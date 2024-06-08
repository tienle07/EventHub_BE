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

module.exports = { getAllUsers, getEventsFollowed, updateFcmToken };