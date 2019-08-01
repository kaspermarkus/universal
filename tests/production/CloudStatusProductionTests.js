/**
GPII Production Config tests

Requirements:
* an internet connection
* a cloud based flow manager
* a preferences server
* a CouchDB server

---

Copyright 2015 Raising the Floor - International
Copyright 2018, 2019 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

The research leading to these results has received funding from the European Union's
Seventh Framework Programme (FP7/2007-2013) under grant agreement no. 289016.

You may obtain a copy of the License at
https://github.com/GPII/universal/blob/master/LICENSE.txt

WARNING:  Do not run these tests directly.  They are called from within the
"vagrantCloudBasedContainers.sh" after it has initialized the environment.
*/

"use strict";

var fluid = require("infusion"),
    gpii = fluid.registerNamespace("gpii");

fluid.require("%gpii-universal");

gpii.loadTestingSupport();

fluid.registerNamespace("gpii.tests.productionConfigTesting");

require("../shared/DevelopmentTestDefs.js");
require("./ProductionTestsUtils.js");

// Flowmanager tests for:
// /user/%gpiiKey/login and /user/%gpiiKey/logout (as defined in gpii.tests.development.testDefs),
// /health,
// /ready,
gpii.tests.productionConfigTesting.testDefs = fluid.transform(gpii.tests.development.testDefs, function (testDefIn) {
    var testDef = fluid.extend(true, {}, testDefIn, {
        name: "Flow Manager production tests",
        config: gpii.tests.productionConfigTesting.config,
        expect: 4,
/*        expect: 6, */ // Left login/lougout tests our for now.
        components: {
            healthRequest: {
                type: "kettle.test.request.http",
                options: {
                    host: gpii.tests.productionConfigTesting.cloudUrl.hostname,
                    hostname: gpii.tests.productionConfigTesting.cloudUrl.hostname,
                    path: "/health",
                    method: "GET",
                    expectedStatusCode: 200,
                    expectedPayload: {"isHealthy": true}
                }
            },
            readyRequest: {
                type: "kettle.test.request.http",
                options: {
                    host: gpii.tests.productionConfigTesting.cloudUrl.hostname,
                    hostname: gpii.tests.productionConfigTesting.cloudUrl.hostname,
                    path: "/ready",
                    method: "GET",
                    expectedStatusCode: 200,
                    expectedPayload: {"isReady": true}
                }
            }
        },
        sequenceGrade: "gpii.tests.productionConfigTesting.cloudStatusSequence"
    });
    return testDef;
});

fluid.log("gpii.tests.productionConfigTesting.testDefs[0].components = '" + JSON.stringify(gpii.tests.productionConfigTesting.testDefs[0].components, null, "\t") + "'");

fluid.defaults("gpii.tests.productionConfigTesting.cloudStatus", {
    gradeNames: ["fluid.test.sequenceElement"],
    sequence: [
        { funcName: "fluid.log", args: ["Cloud status tests:"]},
        {
            func: "{healthRequest}.send"
        }, {
            event: "{healthRequest}.events.onComplete",
            listener: "gpii.tests.productionConfigTesting.testResponse"
        }, {
            func: "{readyRequest}.send"
        }, {
            event: "{readyRequest}.events.onComplete",
            listener: "gpii.tests.productionConfigTesting.testResponse"
        },
        { funcName: "fluid.log", args: ["Cloud status tests end"]}
    ]
});

fluid.defaults("gpii.tests.productionConfigTesting.cloudStatusSequence", {
    gradeNames: ["gpii.test.standardServerSequenceGrade"],
    sequenceElements: {
/*
        loginLogout: {
            gradeNames: "gpii.tests.development.loginLogout",
            priority: "after:startServer"
        },
*/
        cloudStatus: {
            gradeNames: "gpii.tests.productionConfigTesting.cloudStatus",
            priority: "after:loginLogout"
        }
    }
});

gpii.test.runServerTestDefs(gpii.tests.productionConfigTesting.testDefs);
