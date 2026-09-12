/* ============================================================
   SET DYNAMIC CONTENT
   ------------------------------------------------------------
   Responsibility:
   1. Get dynamic data from Hoxton
   2. Prepare non-DOM configuration
   3. Apply dynamic CSS variables
   4. Prepare frame timing & looping
   5. Start Creative timeline

   IMPORTANT:
   hoxton-v7.js already handles:
   - image -> DOM
   - text -> DOM
   - textarea -> DOM
   - array -> selected value

   This file only handles the values that need extra logic.
============================================================ */


/* ============================================================
   GLOBAL DATA
============================================================ */

var _dynamicData = {};

var root = document.documentElement;


/* ============================================================
   CONNECT HOXTON WITH GSAP TIMELINE
============================================================ */

hoxton.timeline = Creative.tl;


/*
   Hoxton calls this function after the manifest has been
   loaded and image assets have been preloaded.
*/
hoxton.isInitialized = setDynamicContent;


/* ============================================================
   MAIN ENTRY POINT
============================================================ */

function setDynamicContent()
{
    console.log("setDynamicContent()");

    // Step 1: get current Hoxton state
    getDynamicData();

    // Step 2: prepare values used by Creative.js
    setDynamicNonDomData();

    // Step 3: show banner so size can be measured
    Creative.displayBanner();

    // Step 4: apply current banner size class
    setBannerSize();

    // Step 5: build and start the GSAP timeline
    Creative.startAd();
}


/* ============================================================
   GET HOXTON DATA
============================================================ */

function getDynamicData()
{
    _dynamicData = hoxton.getState();

    console.log("_dynamicData:", _dynamicData);
}


/* ============================================================
   NON-DOM CONFIGURATION
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
   IMPORTANT:
   The CSS uses these variables:

       --color-background
       --color-brand-logo
       --color-headline
       --color-subline
       --color-badge
       --color-funding
       --color-cta-background
       --color-cta-text
       --color-panel-background

   Therefore JS must update THESE variables.
============================================================ */

function setTheme()
{
    setThemeVariable(
        "--color-background",
        _dynamicData.background_color
    );

    setThemeVariable(
        "--color-brand-logo",
        _dynamicData.brand_logo_color
    );

    setThemeVariable(
        "--color-headline",
        _dynamicData.headline_copy_color
    );

    setThemeVariable(
        "--color-subline",
        _dynamicData.subline_copy_color
    );

    setThemeVariable(
        "--color-badge",
        _dynamicData.badge_copy_color
    );

    setThemeVariable(
        "--color-funding",
        _dynamicData.funding_copy_color
    );

    setThemeVariable(
        "--color-cta-background",
        _dynamicData.cta_bg_color
    );

    setThemeVariable(
        "--color-cta-text",
        _dynamicData.cta_copy_color
    );

    setThemeVariable(
        "--color-panel-background",
        _dynamicData.panel_bg_color
    );
}


/* ============================================================
   THEME VARIABLE HELPER
   ------------------------------------------------------------
   Example:

       input:
       --color-background
       color-dell-blue

       output:
       --color-background: var(--color-dell-blue)
============================================================ */

function setThemeVariable(variableName, colorToken)
{
    if (!colorToken)
    {
        return;
    }

    var value = colorToken.toString().trim();

    if (!value)
    {
        return;
    }

    /*
       "Auto" means keep the CSS default.
    */

    if (value.toLowerCase() === "auto")
    {
        return;
    }

    /*
       If a raw color is supplied, use it directly.

       Example:
       #0672CB
    */

    if (value.charAt(0) === "#")
    {
        root.style.setProperty(
            variableName,
            value
        );

        return;
    }

    /*
       Token value:

       color-dell-blue

       becomes:

       var(--color-dell-blue)
    */

    root.style.setProperty(
        variableName,
        "var(--" + value + ")"
    );
}


/* ============================================================
   SCALE
============================================================ */

function setScale()
{
    var scale = Number(
        _dynamicData.scale
    );

    if (!Number.isFinite(scale) || scale <= 0)
    {
        scale = 1;
    }

    root.style.setProperty(
        "--scale",
        scale
    );
}


/* ============================================================
   BANNER SIZE
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
============================================================ */

function setVisibility()
{
    setElementVisibility(
        "brand_logo_container",
        _dynamicData.brand_logo_visibility
    );

    setElementVisibility(
        "funding_container",
        _dynamicData.funding_visibility
    );

    setElementVisibility(
        "cta_container",
        _dynamicData.cta_visibility
    );

    setElementVisibility(
        "panel",
        _dynamicData.panel_visibility
    );

    setElementVisibility(
        "legal_trigger_container",
        _dynamicData.legal_trigger_visibility
    );
}


/* ============================================================
   ELEMENT VISIBILITY HELPER
============================================================ */

function setElementVisibility(id, value)
{
    var element = document.getElementById(id);

    if (!element)
    {
        return;
    }

    var state = String(value || "")
        .trim()
        .toLowerCase();

    if (
        state === "show" ||
        state === "enable" ||
        state === "enabled" ||
        state === "on" ||
        state === "yes"
    )
    {
        element.style.display = "block";
        element.style.visibility = "visible";
        return;
    }

    if (
        state === "hide" ||
        state === "disable" ||
        state === "disabled" ||
        state === "off" ||
        state === "no"
    )
    {
        element.style.display = "none";
        element.style.visibility = "hidden";
    }
}


/* ============================================================
   FRAME TIMING
   ------------------------------------------------------------
   Frame 1-4 use the timing array.
   Frame 5 is the end frame.

   Example:
       "3,3,3,4"
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

        _isStatic = false;
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
============================================================ */

function setAnimationConfig()
{
    _fadeInSpeed = getNumber(
        _dynamicData.fadeInSpeed,
        0.5
    );

    _fadeOutSpeed = getNumber(
        _dynamicData.fadeOutSpeed,
        0.3
    );
}


/* ============================================================
   LOOP CONFIG
   ------------------------------------------------------------
   Example:

       "2,4,Show"

       2 = repeat count
       4 = repeat delay
       Show = replay button enabled
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

    _totalLoops = getNumber(
        values[0],
        0
    );

    _endFrameDelay = getNumber(
        values[1],
        4
    );

    _useReplayBtn = isEnabled(
        values[2],
        true
    );
}


/* ============================================================
   HUMAN-READABLE ON / OFF
============================================================ */

function isEnabled(value, defaultValue)
{
    if (
        value === undefined ||
        value === null
    )
    {
        return defaultValue;
    }

    var normalized = value
        .toString()
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
    if (!Creative || !Creative.setExitURL)
    {
        return;
    }

    Creative.setExitURL(
        _dynamicData.exit_url || ""
    );
}
