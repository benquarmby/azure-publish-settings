"use strict";

const aps = require("./index");
const path = require("path");
const publishSettingsPath = path.join(__dirname, "artifacts", "test.PublishSettings");

function readPublishSettings(publishSettingsPath, cb) {
    return function (done) {
        aps.read(publishSettingsPath, function (err, settings) {
            if (err) {
                return done(err);
            }

            cb(settings);
            done();
        });
    };
}

describe("azure-publish-settings", function () {
    describe("read", function () {
        let settings;

        beforeAll(readPublishSettings(publishSettingsPath, function (publishSettings) {
            settings = publishSettings;
        }));

        it("should return populated settings", function () {
            expect(settings).toBeTruthy();
        });
    });
});
