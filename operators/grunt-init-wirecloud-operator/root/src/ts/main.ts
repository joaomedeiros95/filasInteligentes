/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

/// <reference path="../../typings/MashupPlatform/MashupPlatform.d.ts"/>
{% if (ngsi) { %}/// <reference path="../../typings/NGSI/NGSI.d.ts"/>{% }%}

"use strict";

/* import-block */
import MashupPlatform = require("MashupPlatform");
{% if (ngsi) { %}import NGSI = require("NGSI");{% }%}
/* end-import-block */

export class {%= jsname %} {
    init() {
        console.log("Loaded!!");
    }
}
