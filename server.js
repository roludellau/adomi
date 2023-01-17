'use strict';

const Hapi = require('@hapi/hapi');
const { userInfo } = require('os');
const path = require('path');
const Connection = require('./dbconfig')
var folder = "";

const init = async () => {

    const server = Hapi.Server({
        host: 'localhost',
        port: 1234,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    });

    await server.register([{
        plugin: require("hapi-geo-locate"),
        options: {
            enabledByDefault: true
        }
    }, {
        plugin: require("@hapi/inert"),

    },
    {
        plugin: require("@hapi/vision")
    },
    {
        plugin: require("@hapi/basic")
    }
    ]);

    server.views({
        engines: {
            hbs: require("handlebars")
        },
        path: path.join(__dirname, 'views'),
        layout: 'default'
    })
    server.route([{
        method: 'GET',
        path: ('/'),
        handler: (request, h) => {

            return h.file('welcome.html');
        }
    },

    {
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {

            const userstest = await Connection.getUsers();

            return userstest;

        }
    },

    /*
        plugins:
        npm install @hapi/hapi
        npm install @hapi/inert
        npm install @hapi/vision
        npm install @hapi/basic
    */

    ]);

    await server.start();

    console.log(`Server started ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();

