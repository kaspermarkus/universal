/**
Copyright 2015, 2016 Raising the Floor - International

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

The research leading to these results has received funding from the European Union's
Seventh Framework Programme (FP7/2007-2013) under grant agreement no. 289016.

You may obtain a copy of the License at
https://github.com/GPII/universal/blob/master/LICENSE.txt
*/

/*global require*/

"use strict";
var fluid = require("universal"),
    path = require("path"),
    gpii = fluid.registerNamespace("gpii");

gpii.loadTestingSupport();

fluid.registerNamespace("gpii.tests.productionTestDefs");

/*
 * ================================
 * standard production
 * ================================
 */
gpii.tests.productionTestDefs.standard = [
    {
        name: "Testing os_common using Flat matchmaker",
        userToken: "MikelVargas",
        settingsHandlers: {
            "gpii.gsettings": {
                "some.app.id": [{
                    "settings": {
                        "stickykeys-enable": true,
                        "slowkeys-enable": true,
                        "slowkeys-delay": 400,
                        "bouncekeys-enable": true,
                        "bouncekeys-delay": 200,
                        "mousekeys-enable": true,
                        "mousekeys-init-delay": 120,
                        "mousekeys-max-speed": 850,
                        "mousekeys-accel-time": 800
                    },
                    "options": {
                        "schema": "org.gnome.desktop.a11y.keyboard"
                    }
                }]
            }
        },
        processes: [],
        deviceReporters: {
            "gpii.packageKit.find": {
                "expectInstalled": ["gsettings-desktop-schemas"]
            }
        }
    }
];
/*
 * ================================
 * cloudbased
 * ================================
 */
gpii.tests.productionTestDefs.cloudBased = [
    {
        name: "Example acceptance test with 'cloudbased' flow manager using gnome keyboard settings",
        userToken: "MikelVargas",
        OSid: "linux",
        solutionId: "org.gnome.desktop.a11y.keyboard",
        config: {
            configName: "cloudBased.production",
            configPath: path.resolve(__dirname, "../gpii/configs")
        },
        expected: {
            "org.gnome.desktop.a11y.keyboard": {
                "slowkeys-delay": 400,
                "slowkeys-enable": true,
                "bouncekeys-delay": 200,
                "mousekeys-enable": true,
                "stickykeys-enable": true,
                "bouncekeys-enable": true,
                "mousekeys-max-speed": 850,
                "mousekeys-init-delay": 120,
                "mousekeys-accel-time": 800
            }
        }
    }
];