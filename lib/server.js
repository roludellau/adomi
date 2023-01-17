'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Hapi = require('@hapi/hapi');
const { userInfo } = require('os');
const path = require('path');
//const Connection = require('./dbconfig')
const User = require('./Models/User.js');
var folder = "";
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = Hapi.Server({
        host: 'localhost',
        port: 1234,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    });
    yield server.register([{
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
    });
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
            handler: (request, h) => __awaiter(void 0, void 0, void 0, function* () {
                const userstest = yield User.getUsers();
                return userstest;
            })
        },
        /*
            plugins:
            npm install @hapi/hapi
            npm install @hapi/inert
            npm install @hapi/vision
            npm install @hapi/basic
        */
    ]);
    yield server.start();
    console.log(`Server started ${server.info.uri}`);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
