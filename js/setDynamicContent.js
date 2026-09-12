/* ============================================================
   SET DYNAMIC CONTENT
   ------------------------------------------------------------
   Responsibility:
   1. Get dynamic data from Hoxton
   2. Prepare non-DOM configuration
   3. Apply CSS variables / visibility / positions
   4. Prepare frame timing & looping
   5. Start Creative timeline

   IMPORTANT:
   hoxton-v7.js already handles:
   - image → DOM
   - text → DOM
   - textarea → DOM
   - array → selected value
   So this file should NOT duplicate those jobs.
============================================================ */


/* ============================================================
   GLOBAL DATA
============================================================ */

var _dynamicData = {};

const root = document.documentElement;


/* ============================================================
   CONNECT HOXTON WITH GSAP TIMELINE
============================================================ */

hoxton.timeline = Creative.tl;


/*
   Hoxton will call this function after:
   - manifest is loaded
   - dynamic data is available
   - images are preloaded
*/
hoxton.isInitialized = setDynamicContent;


/* ============================================================
   MAIN ENTRY POINT
   ------------------------------------------------------------
   This is the FIRST function we control.
============================================================ */

function setDynamicContent()
{
    console.log("setDynamicContent()");

    // 1. Get current Hoxton data
    getDynamicData();

    // 2. Prepare values that Creative.js needs
    setDynamicNonDomData();

    // 3. Show banner so width/height can be measured
    Creative.displayBanner();

    // 4. Apply current banner size
    setBannerSize();

    // 5. Build and start animation timeline
    Creative.startAd();
}


/* ============================================================
   GET HOXTON DATA
   ------------------------------------------------------------
   Hoxton converts manifest data into a simple state object.

   Example:

   hoxton.json
   headline_copy
        ↓
   hoxton.getState()
        ↓
   _dynamicData.headline_copy
============================================================ */

function getDynamicData()
{
    _dynamicData = hoxton.getState();

    console.log("_dynamicData:", _dynamicData);
}


/* ============================================================
   NON-DOM CONFIGURATION
   ------------------------------------------------------------
   These are values that Creative.js needs to run the banner.

   We keep this function simple and only CALL smaller functions.
============================================================ */

function setDynamicNonDomData()
{
    console.log("setDynamicNonDomData()");

    setTheme();
    setScale();
    setVisibility();
    setFrameTiming();
    setAnimationConfig();
    setLoopConfig();
    setExitURL();
}


/* ============================================================
   THEME
   ------------------------------------------------------------
   JSON → CSS custom properties

   Example:

   background_color = "color-ocean"

   becomes:

   --background-color: var(--color-ocean)
============================================================ */

function setTheme()
{
    setCSSVariable(
        "--background-color",
        _dynamicData.background_color
    );

    setCSSVariable(
        "--logo-color",
        _dynamicData.brand_logo_color
    );

    setCSSVariable(
        "--headline-color",
        _dynamicData.headline_copy_color
    );

    setCSSVariable(
        "--subline-color",
        _dynamicData.subline_copy_color
    );

    setCSSVariable(
        "--badge-color",
        _dynamicData.badge_copy_color
    );

    setCSSVariable(
        "--funding-color",
        _dynamicData.funding_copy_color
    );

    setCSSVariable(
        "--cta-copy-color",
        _dynamicData.cta_copy_color
    );

    setCSSVariable(
        "--cta-bg-color",
        _dynamicData.cta_bg_color
    );

    setCSSVariable(
        "--panel-bg-color",
        _dynamicData.panel_bg_color
    );
}


/* ============================================================
   CSS VARIABLE HELPER
============================================================ */

function setCSSVariable(variableName, value)
{
    if (!value) return;

    /*
       Ignore "Auto"
       because CSS should keep its existing/default value.
    */

    if (value.toString().toLowerCase() === "auto")
    {
        return;
    }

    /*
       Example:

       value = "color-white"

       output:

       var(--color-white)
    */

    root.style.setProperty(
        variableName,
        "var(--" + value + ")"
    );
}


/* ============================================================
   SCALE
   ------------------------------------------------------------
   JSON:
       scale = 1

   CSS:
       --scale: 1
============================================================ */

function setScale()
{
    var scale = Number(_dynamicData.scale);

    if (!Number.isFinite(scale) || scale <= 0)
    {
        scale = 1;
    }

    root.style.setProperty("--scale", scale);
}


/* ============================================================
   BANNER SIZE
   ------------------------------------------------------------
   Adds:

       size300x250

   to #container.

   Creative.js can then use:

       .size300x250
       .size728x90
       etc.
============================================================ */

function setBannerSize()
{
    var adWidth = container.offsetWidth;
    var adHeight = container.offsetHeight;

    container.className =
        "size" + adWidth + "x" + adHeight;
}


/* ============================================================
   VISIBILITY
   ------------------------------------------------------------
   Human-readable JSON values:

       Show
       Hide

   JavaScript internally converts them to:

       true
       false
============================================================ */

function setVisibility()
{
    setElementVisibility(
        "#brand_logo_container",
        _dynamicData.brand_logo_visibility
    );

    setElementVisibility(
        "#funding_container",
        _dynamicData.funding_visibility
    );

    setElementVisibility(
        "#cta_container",
        _dynamicData.cta_visibility
    );

    setElementVisibility(
        "#panel",
        _dynamicData.panel_visibility
    );

    setElementVisibility(
        "#legal_trigger_container",
        _dynamicData.legal_trigger_visibility
    );
}


/* ============================================================
   ELEMENT VISIBILITY HELPER
============================================================ */

function setElementVisibility(selector, value)
{
    var element = document.querySelector(selector);

    if (!element)
    {
        return;
    }

    var normalizedValue =
        String(value || "")
            .trim()
            .toLowerCase();


    /*
       Show
       Enable
       On
       Visible
    */

    if (
        normalizedValue === "show" ||
        normalizedValue === "enable" ||
        normalizedValue === "on" ||
        normalizedValue === "visible"
    )
    {
        element.style.display = "block";
        return;
    }


    /*
       Hide
       Disable
       Off
       Hidden
    */

    if (
        normalizedValue === "hide" ||
        normalizedValue === "disable" ||
        normalizedValue === "off" ||
        normalizedValue === "hidden"
    )
    {
        element.style.display = "none";
    }
}


/* ============================================================
   FRAME TIMING
   ------------------------------------------------------------
   We use one JSON value:

       frame_holdTime = "3,3,3,3"

   Four values are enough because frame 5 is the final frame.
============================================================ */

function setFrameTiming()
{
    var defaultTime = 3;

    var value = _dynamicData.frame_holdTime;

    if (!value)
    {
        _arrFrameWaits = [
            defaultTime,
            defaultTime,
            defaultTime,
            defaultTime
        ];

        return;
    }


    var values = value
        .toString()
        .split(",");


    _arrFrameWaits = [
        getNumber(values[0], defaultTime),
        getNumber(values[1], defaultTime),
        getNumber(values[2], defaultTime),
        getNumber(values[3], defaultTime)
    ];


    /*
       If all frame times are zero,
       Creative.js treats the banner as static.
    */

    _isStatic =
        _arrFrameWaits[0] === 0 &&
        _arrFrameWaits[1] === 0 &&
        _arrFrameWaits[2] === 0 &&
        _arrFrameWaits[3] === 0;
}


/* ============================================================
   NUMBER HELPER
============================================================ */

function getNumber(value, fallback)
{
    var number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
}


/* ============================================================
   ANIMATION CONFIG
   ------------------------------------------------------------
   These variables belong to Creative.js.

   JSON values are only used to configure them.
============================================================ */

function setAnimationConfig()
{
    _fadeInSpeed =
        getNumber(
            _dynamicData.fadeInSpeed,
            0.5
        );

    _fadeOutSpeed =
        getNumber(
            _dynamicData.fadeOutSpeed,
            0.3
        );
}


/* ============================================================
   LOOP CONFIG
   ------------------------------------------------------------
   JSON:

       loopingProps = "2,4,show"

   means:

       total loops   = 2
       delay          = 4 sec
       replay button  = show
============================================================ */

function setLoopConfig()
{
    var value = _dynamicData.loopingProps;

    if (!value)
    {
        _totalLoops = 0;
        _endFrameDelay = 4;
        _useReplayBtn = true;

        return;
    }


    var values = value
        .toString()
        .split(",");


    _totalLoops =
        getNumber(values[0], 0);


    _endFrameDelay =
        getNumber(values[1], 4);


    _useReplayBtn =
        isEnabled(values[2], true);
}


/* ============================================================
   HUMAN-READABLE ON / OFF HELPER
   ------------------------------------------------------------
   JSON can say:

       Show
       Hide

   JS internally gets:

       true
       false
============================================================ */

function isEnabled(value, defaultValue)
{
    if (value === undefined || value === null)
    {
        return defaultValue;
    }

    var normalized =
        value.toString()
            .trim()
            .toLowerCase();


    if (
        normalized === "show" ||
        normalized === "enable" ||
        normalized === "enabled" ||
        normalized === "on" ||
        normalized === "yes"
    )
    {
        return true;
    }


    if (
        normalized === "hide" ||
        normalized === "disable" ||
        normalized === "disabled" ||
        normalized === "off" ||
        normalized === "no"
    )
    {
        return false;
    }


    return defaultValue;
}


/* ============================================================
   EXIT URL
============================================================ */

function setExitURL()
{
    var exitURL = _dynamicData.exit_url;

    if (!exitURL)
    {
        return;
    }

    Creative.setExitURL(exitURL);
}


/* ============================================================
   UTILITY
   ------------------------------------------------------------
   Remove whitespace and safely return text.
============================================================ */

function getText(value)
{
    return value === undefined ||
           value === null
        ? ""
        : value.toString().trim();
}