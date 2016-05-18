/**
GPII Production Config tests

Copyright 2015 Raising the Floor - International

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

require("./ProductionTestDefs");
gpii.loadTestingSupport();

fluid.registerNamespace("gpii.tests.productionConfigTesting");

/*
 * ================================
 * production.with.logging
 * ================================
 */
module.exports = gpii.test.bootstrap({
    testDefs:  "gpii.tests.productionTestDefs.standard",
    configName: "productionTestsCI",
    configPath: path.resolve(__dirname, "./configs")
}, ["gpii.test.integration.deviceReporterAware.linux", "gpii.test.integration.testCaseHolder.linux"],
    module, require, __dirname);

/*
 * ================================
 * Testing of cloudBased.production
 * ================================
 */

// point all tests to specific testing configs (which will overwrite preferences server directive)
var testDefCopy = fluid.copy(gpii.tests.productionTestDefs.cloudBased);
fluid.each(testDefCopy, function (val) {
    if (val.config.configPath) {
        val.config.configPath = path.resolve(__dirname, "./configs");
    }
});

module.exports = gpii.test.cloudBased.bootstrap(testDefCopy, __dirname);
