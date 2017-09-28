/*
 * {%= name %}
 * {%= homepage %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= vendor_title %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

/* exported {%= jsname %} */

var {%= jsname %} = (function () {

    "use strict";

    // =========================================================================
    // CLASS DEFINITION
    // =========================================================================

    var {%= jsname %} = function {%= jsname %}() {
        MashupPlatform.prefs.registerCallback(function (new_preferences) {

        }.bind(this));
    };

    // =========================================================================
    // PRIVATE MEMBERS
    // =========================================================================

    /* test-code */
    {%= jsname %}.prototype = {
    };

    /* end-test-code */

    return {%= jsname %};

})();
