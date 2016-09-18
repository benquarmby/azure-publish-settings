# azure-publish-settings
Reads Azure publish settings for use with Web Deploy, FTP, Git and Kudu. Includes first class support for working with [kudu-api](https://github.com/itsananderson/kudu-api).

## Installation
```
npm install azure-publish-settings --save
```

## Usage
```JavaScript
var aps = require("azure-publish-settings");

// Traditional
aps.read("path/to/MySite.PublishSettings", function (err, settings) {
    var iisSite = settings.web.iisSite;
    var username = settings.web.username;
    var password = settings.web.password;

    // Use settings with Web Deploy etc.
});

// Promise
aps.readAsync("path/to/MySite.PublishSettings")
    .then(function (settings) {
        var ftpUrl = settings.ftp.url;
        var username = settings.ftp.username;
        var password = settings.ftp.password;

        // Use settings with an FTP client
    });

// Integration with kudu-api
var kuduApi = require("kudu-api");

aps.read("path/to/MySite.PublishSettings", function (err, settings) {
    // Use the "kudu" property to pass credentials directly to kudu-api
    var api = kuduApi(settings.kudu);

    // Use kudu-api to manage an Azure web app
});
```

## Schema
The following schema describes the output.

```JSON
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "The DNS friendly name of the web app."
        },
        "url": {
            "type": "string",
            "description": "The full URL of the web app."
        },
        "web": {
            "type": "object",
            "description": "The primary profile using the method 'web'.",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The profile name"
                },
                "url": {
                    "type": "string",
                    "description": "The URL for web publishing."
                },
                "username": {
                    "type": "string",
                    "description": "The username for web publishing."
                },
                "password": {
                    "type": "string",
                    "description": "The password for web publishing."
                },
                "iisSite": {
                    "type": "string",
                    "description": "The IIS site name."
                }
            }
        },
        "ftp": {
            "type": "object",
            "description": "The primary profile using the method 'ftp'.",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The profile name"
                },
                "url": {
                    "type": "string",
                    "description": "The URL for FTP publishing."
                },
                "username": {
                    "type": "string",
                    "description": "The username for FTP publishing."
                },
                "password": {
                    "type": "string",
                    "description": "The password for FTP publishing."
                },
                "passive": {
                    "type": "boolean",
                    "description": "True if passive mode should be used."
                }
            }
        },
        "profiles": {
            "type": "array",
            "description": "The list of all profiles in the publish settings file.",
            "items": {
                "type": "object",
                "properties": {
                    "method": {
                        "type": "string",
                        "description": "The publish method. Either 'web' or 'ftp'."
                    },
                    "name": {
                        "type": "string",
                        "description": "The profile name"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL for the publish method."
                    },
                    "username": {
                        "type": "string",
                        "description": "The username for the publish method."
                    },
                    "password": {
                        "type": "string",
                        "description": "The password for the publish method."
                    },
                    "iisSite": {
                        "type": "string",
                        "description": "Only for method 'web'. The IIS site name."
                    },
                    "passive": {
                        "type": "boolean",
                        "description": "Only for the method 'ftp'. True if passive mode should be used."
                    }
                }
            }
        }
    }
}
```
