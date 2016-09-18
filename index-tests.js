"use strict";

const aps = require("./index");
const path = require("path");
const publishSettingsPath = path.join(__dirname, "artifacts", "test.PublishSettings");

describe("azure-publish-settings", function () {
    describe("read success", function () {
        let settings;

        beforeAll(function (done) {
            aps.read(publishSettingsPath, function (err, publishSettings) {
                if (err) {
                    return done(err);
                }

                settings = publishSettings;
                done();
            });
        });

        it("should return populated settings", function () {
            expect(settings).toBeTruthy();
            expect(settings.name).toBe("test");
            expect(settings.url).toBe("http://test.azurewebsites.net");
        });

        it("should contain two profiles", function () {
            let profiles = settings.profiles;

            expect(profiles).toBeTruthy();
            expect(profiles.length).toBe(2);
        });

        it("should contain correct web settings", function () {
            let web = settings.web;

            expect(web).toBeTruthy();
            expect(web.username).toBe("$test");
            expect(web.password).toBe("WEB-PASSWORD");
            expect(web.iisSite).toBe("test");
            expect(web.url).toBe("test.scm.azurewebsites.net:443");
        });

        it("should contain correct FTP settings", function () {
            let ftp = settings.ftp;

            expect(ftp).toBeTruthy();
            expect(ftp.username).toBe("test\\$test");
            expect(ftp.password).toBe("FTP-PASSWORD");
            expect(ftp.passive).toBe(true);
            expect(ftp.url).toBe("ftp://waws-test.ftp.azurewebsites.windows.net/site/wwwroot");
        });
    });

    describe("read failure", function () {
        it("should pass NOENT error to callback", function (done) {
            aps.read("non-existent.PublishSettings", function (err, settings) {
                expect(err.code).toBe("ENOENT");
                expect(settings).toBeFalsy();
                done();
            });
        });
    });

    describe("readAsync success", function () {
        let settings;

        beforeAll(function (done) {
            aps.readAsync(publishSettingsPath)
                .then(function (publishSettings) {
                    settings = publishSettings;
                    done();
                })
                .catch(done.fail);
        });

        it("should return populated settings", function () {
            expect(settings).toBeTruthy();
            expect(settings.name).toBe("test");
            expect(settings.url).toBe("http://test.azurewebsites.net");
            expect(settings.profiles.length).toBe(2);
            expect(settings.web).toBeTruthy();
            expect(settings.ftp).toBeTruthy();
        });
    });

    describe("readAsync failure", function () {
        it("should return ENOENT to catch", function (done) {
            aps.readAsync("non-existent.PublishSettings")
                .then(done.fail)
                .catch(function (err) {
                    expect(err.code).toBe("ENOENT");
                    done();
                });
        });
    });
});
