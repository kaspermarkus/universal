/*!
 * Driver file for ProductionConfigTests
 *
 * Licensed under the New BSD license. You may not use this file except in
 * compliance with this License.
 *
 * You may obtain a copy of the License at
 * https://github.com/GPII/universal/blob/master/LICENSE.txt
 */

"use strict";

var fluid = require("infusion"),
    kettle = fluid.require("kettle");

require("universal");

kettle.loadTestingSupport();
kettle.config.makeConfigLoader({
    configName: kettle.config.getNodeEnv("GPIIProductionTests"),
    configPath: kettle.config.getConfigPath() || __dirname
});

require("../../tests/ProductionConfigTests.js");
