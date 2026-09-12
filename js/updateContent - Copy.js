/* ============================================================
   UPDATE CONTENT
   ------------------------------------------------------------
   This file handles LIVE / HOT updates from Hoxton.

   Hoxton gives us:

       item.name
       item.value

   Example:

       item.name  = "f1_copy_headline"
       item.value = "New Headline"

   This file decides:

       1. Do we need to update DOM only?
       2. Do we need to update CSS?
       3. Do we need to rebuild Creative.js timeline?
============================================================ */


/* ============================================================
   MAIN UPDATE FUNCTION
   ------------------------------------------------------------
   Hoxton calls:

       Creative.updateContent(item)

   whenever an editable field changes.
============================================================ */

Creative.updateContent = function (item)
{
    console.log(
        "Creative.updateContent()",
        item ? item.name : "unknown"
    );


    /* --------------------------------------------------------
       SAFETY CHECK
    -------------------------------------------------------- */

    if (!item || !item.name)
    {
        console.warn(
            "updateContent(): invalid item received"
        );

        return;
    }


    /* --------------------------------------------------------
       GET LATEST HOXTON DATA
       --------------------------------------------------------

       We always read the complete current state.

       Example:

       _dynamicData.f1_copy_headline
       _dynamicData.cta_variant
       _dynamicData.f1_panel_position
       etc.
    */

    refreshDynamicData();


    /* --------------------------------------------------------
       FIND THE HANDLER FOR THIS FIELD
    -------------------------------------------------------- */

    var handler = updateHandlers[item.name];


    /* --------------------------------------------------------
       RUN FIELD-SPECIFIC HANDLER
    -------------------------------------------------------- */

    if (handler)
    {
        handler();
    }
    else
    {
        handleDefaultUpdate(item);
    }
};


/* ============================================================
   GET CURRENT DYNAMIC DATA
============================================================ */

function refreshDynamicData()
{
    _dynamicData = hoxton.getState();

    console.log(
        "Updated Hoxton data:",
        _dynamicData
    );
}


/* ============================================================
   HANDLER TABLE
   ------------------------------------------------------------
   Each JSON field has one job.

   Example:

       f1_copy_headline
            ↓
       updateTextContent()
            ↓
       No timeline rebuild needed

   But:

       frame_holdTime
            ↓
       updateFrameTiming()
            ↓
       rebuildTimeline()
============================================================ */

var updateHandlers =
{

    /* ========================================================
       TEXT / COPY
    ======================================================== */

    f1_copy_campaign_badge: function ()
    {
        updateTextContent(
            "f1_copy_campaign_badge",
            _dynamicData.f1_copy_campaign_badge
        );

        updateElementVisibility(
            "f1_copy_campaign_badge",
            _dynamicData.f1_copy_campaign_badge
        );
    },


    f1_copy_headline: function ()
    {
        updateTextContent(
            "f1_copy_headline",
            _dynamicData.f1_copy_headline
        );
    },


    f1_copy_subline: function ()
    {
        updateTextContent(
            "f1_copy_subline",
            _dynamicData.f1_copy_subline
        );
    },


    f2_copy_campaign_badge: function ()
    {
        updateTextContent(
            "f2_copy_campaign_badge",
            _dynamicData.f2_copy_campaign_badge
        );
    },


    f2_copy_headline: function ()
    {
        updateTextContent(
            "f2_copy_headline",
            _dynamicData.f2_copy_headline
        );
    },


    f2_copy_subline: function ()
    {
        updateTextContent(
            "f2_copy_subline",
            _dynamicData.f2_copy_subline
        );
    },


    f3_copy_campaign_badge: function ()
    {
        updateTextContent(
            "f3_copy_campaign_badge",
            _dynamicData.f3_copy_campaign_badge
        );
    },


    f3_copy_headline: function ()
    {
        updateTextContent(
            "f3_copy_headline",
            _dynamicData.f3_copy_headline
        );
    },


    f3_copy_subline: function ()
    {
        updateTextContent(
            "f3_copy_subline",
            _dynamicData.f3_copy_subline
        );
    },


    f4_copy_campaign_badge: function ()
    {
        updateTextContent(
            "f4_copy_campaign_badge",
            _dynamicData.f4_copy_campaign_badge
        );
    },


    f4_copy_headline: function ()
    {
        updateTextContent(
            "f4_copy_headline",
            _dynamicData.f4_copy_headline
        );
    },


    f4_copy_subline: function ()
    {
        updateTextContent(
            "f4_copy_subline",
            _dynamicData.f4_copy_subline
        );
    },


    f5_copy_campaign_badge: function ()
    {
        updateTextContent(
            "f5_copy_campaign_badge",
            _dynamicData.f5_copy_campaign_badge
        );
    },


    f5_copy_headline: function ()
    {
        updateTextContent(
            "f5_copy_headline",
            _dynamicData.f5_copy_headline
        );
    },


    f5_copy_subline: function ()
    {
        updateTextContent(
            "f5_copy_subline",
            _dynamicData.f5_copy_subline
        );
    },


    /* ========================================================
       PRODUCT NAME
    ======================================================== */

    f1_product_name: function ()
    {
        updateTextContent(
            "f1_product_name",
            _dynamicData.f1_product_name
        );
    },


    f2_product_name: function ()
    {
        updateTextContent(
            "f2_product_name",
            _dynamicData.f2_product_name
        );
    },


    f3_product_name: function ()
    {
        updateTextContent(
            "f3_product_name",
            _dynamicData.f3_product_name
        );
    },


    f4_product_name: function ()
    {
        updateTextContent(
            "f4_product_name",
            _dynamicData.f4_product_name
        );
    },


    f5_product_name: function ()
    {
        updateTextContent(
            "f5_product_name",
            _dynamicData.f5_product_name
        );
    },


    /* ========================================================
       CTA
    ======================================================== */

    cta_copy: function ()
    {
        updateTextContent(
            "cta",
            _dynamicData.cta_copy
        );
    },


    cta_variant: function ()
    {
        updateCtaVariant();

        /*
           CTA variant can affect:
           - CSS class
           - appearance
           - layout

           Timeline normally does not need
           to be rebuilt.
        */
    },


    cta_visibility: function ()
    {
        updateElementVisibility(
            "cta_container",
            _dynamicData.cta_visibility
        );
    },


    cta_position: function ()
    {
        updateCtaPosition();
    },


    cta_bg_color: function ()
    {
        updateCSSVariable(
            "--cta-bg-color",
            _dynamicData.cta_bg_color
        );
    },


    cta_copy_color: function ()
    {
        updateCSSVariable(
            "--cta-copy-color",
            _dynamicData.cta_copy_color
        );
    },


    exit_url: function ()
    {
        updateExitURL();
    },


    /* ========================================================
       BRAND / LOGO
    ======================================================== */

    brand_logo_visibility: function ()
    {
        updateElementVisibility(
            "brand_logo_container",
            _dynamicData.brand_logo_visibility
        );
    },


    brand_logo_position: function ()
    {
        updateBrandLogoPosition();
    },


    brand_logo_color: function ()
    {
        updateCSSVariable(
            "--logo-color",
            _dynamicData.brand_logo_color
        );
    },


    brand_logo_width: function ()
    {
        updateBrandLogoWidth();
    },


    /* ========================================================
       FUNDING
    ======================================================== */

    funding_logo: function ()
    {
        updateImageSource(
            "funding_logo",
            _dynamicData.funding_logo
        );
    },


    funding_copy: function ()
    {
        updateTextContent(
            "funding_copy",
            _dynamicData.funding_copy
        );
    },


    funding_visibility: function ()
    {
        updateElementVisibility(
            "funding_container",
            _dynamicData.funding_visibility
        );
    },


    funding_position: function ()
    {
        updateFundingPosition();
    },


    funding_logo_width: function ()
    {
        updateFundingLogoWidth();
    },


    funding_copy_color: function ()
    {
        updateCSSVariable(
            "--funding-color",
            _dynamicData.funding_copy_color
        );
    },


    /* ========================================================
       PANEL
    ======================================================== */

    panel_visibility: function ()
    {
        updateElementVisibility(
            "panel",
            _dynamicData.panel_visibility
        );

        rebuildTimeline();
    },


    panel_bg_color: function ()
    {
        updateCSSVariable(
            "--panel-bg-color",
            _dynamicData.panel_bg_color
        );
    },


    f1_panel_size: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f1_panel_position: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f2_panel_size: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f2_panel_position: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f3_panel_size: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f3_panel_position: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f4_panel_size: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f4_panel_position: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f5_panel_size: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    f5_panel_position: function ()
    {
        updatePanelConfiguration();
        rebuildTimeline();
    },


    /* ========================================================
       FRAME COPY POSITION
    ======================================================== */

    f1_copy_position: function ()
    {
        updateCopyPosition(
            "f1_copy_container",
            _dynamicData.f1_copy_position
        );
    },


    f2_copy_position: function ()
    {
        updateCopyPosition(
            "f2_copy_container",
            _dynamicData.f2_copy_position
        );
    },


    f3_copy_position: function ()
    {
        updateCopyPosition(
            "f3_copy_container",
            _dynamicData.f3_copy_position
        );
    },


    f4_copy_position: function ()
    {
        updateCopyPosition(
            "f4_copy_container",
            _dynamicData.f4_copy_position
        );
    },


    f5_copy_position: function ()
    {
        updateCopyPosition(
            "f5_copy_container",
            _dynamicData.f5_copy_position
        );
    },


    /* ========================================================
       COLORS
    ======================================================== */

    headline_copy_color: function ()
    {
        updateCSSVariable(
            "--headline-color",
            _dynamicData.headline_copy_color
        );
    },


    subline_copy_color: function ()
    {
        updateCSSVariable(
            "--subline-color",
            _dynamicData.subline_copy_color
        );
    },


    badge_copy_color: function ()
    {
        updateCSSVariable(
            "--badge-color",
            _dynamicData.badge_copy_color
        );
    },


    /* ========================================================
       BACKGROUND
    ======================================================== */

    background_color: function ()
    {
        updateCSSVariable(
            "--background-color",
            _dynamicData.background_color
        );
    },


    /* ========================================================
       LEGAL
    ======================================================== */

    legal_trigger_visibility: function ()
    {
        updateElementVisibility(
            "legal_trigger_container",
            _dynamicData.legal_trigger_visibility
        );
    },


    legal_trigger_copy: function ()
    {
        updateTextContent(
            "legal_trigger_copy",
            _dynamicData.legal_trigger_copy
        );
    },


    legal_copy: function ()
    {
        updateTextContent(
            "legal_copy",
            _dynamicData.legal_copy
        );

        updateLegalState();
    },


    legal_close: function ()
    {
        updateTextContent(
            "legal_close",
            _dynamicData.legal_close
        );
    },


    /* ========================================================
       FRAME TIMING
    ======================================================== */

    frame_holdTime: function ()
    {
        updateFrameTiming();

        rebuildTimeline();
    },


    /* ========================================================
       ANIMATION SETTINGS
    ======================================================== */

    fadeInSpeed: function ()
    {
        updateAnimationSettings();

        rebuildTimeline();
    },


    fadeOutSpeed: function ()
    {
        updateAnimationSettings();

        rebuildTimeline();
    },


    frame_copy_animation: function ()
    {
        updateAnimationSettings();

        rebuildTimeline();
    },


    frame_bg_animation: function ()
    {
        updateAnimationSettings();

        rebuildTimeline();
    },


    /* ========================================================
       LOOP SETTINGS
    ======================================================== */

    playCount: function ()
    {
        updateLoopSettings();

        rebuildTimeline();
    },


    repeatDelay: function ()
    {
        updateLoopSettings();

        rebuildTimeline();
    },


    replay_visibility: function ()
    {
        updateElementVisibility(
            "btn_replay_container",
            _dynamicData.replay_visibility
        );
    },


    /* ========================================================
       GLOBAL SCALE
    ======================================================== */

    scale: function ()
    {
        updateScale();
    },


    /* ========================================================
       SAFE AREA / GENERAL LAYOUT
    ======================================================== */

    content_margin: function ()
    {
        updateContentMargin();
    },


    safe_area: function ()
    {
        updateSafeArea();
    }

};


/* ============================================================
   TEXT UPDATE
============================================================ */

function updateTextContent(id, value)
{
    var element = document.getElementById(id);

    if (!element)
    {
        console.warn(
            "updateTextContent(): element not found:",
            id
        );

        return;
    }

    element.innerHTML = value || "";
}


/* ============================================================
   IMAGE UPDATE
============================================================ */

function updateImageSource(id, value)
{
    var element = document.getElementById(id);

    if (!element)
    {
        console.warn(
            "updateImageSource(): element not found:",
            id
        );

        return;
    }

    if (value)
    {
        element.src = value;
    }
}


/* ============================================================
   VISIBILITY
   ------------------------------------------------------------
   Supports human-readable values:

       Show
       Hide
       Enable
       Disable
       On
       Off
============================================================ */

function updateElementVisibility(id, value)
{
    var element = document.getElementById(id);

    if (!element)
    {
        return;
    }


    var state =
        String(value || "")
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
   CSS VARIABLE
============================================================ */

function updateCSSVariable(variableName, value)
{
    if (!value)
    {
        return;
    }


    var normalizedValue =
        String(value)
            .trim();


    /*
       "Auto" means:

       Keep the CSS default.
    */

    if (
        normalizedValue.toLowerCase() === "auto"
    )
    {
        return;
    }


    /*
       Example:

       color-white

       becomes:

       var(--color-white)
    */

    root.style.setProperty(
        variableName,
        "var(--" + normalizedValue + ")"
    );
}


/* ============================================================
   CTA VARIANT
============================================================ */

function updateCtaVariant()
{
    var element =
        document.getElementById("cta");

    if (!element)
    {
        return;
    }


    /*
       Remove previous CTA variant classes.
    */

    element.classList.remove(
        "cta-primary",
        "cta-secondary",
        "cta-outline",
        "cta-pill"
    );


    var variant =
        String(
            _dynamicData.cta_variant || ""
        )
        .trim()
        .toLowerCase();


    /*
       Add new variant class.
    */

    if (variant)
    {
        element.classList.add(
            "cta-" + variant
        );
    }
}


/* ============================================================
   EXIT URL
============================================================ */

function updateExitURL()
{
    if (
        typeof Creative.setExitURL === "function"
    )
    {
        Creative.setExitURL(
            _dynamicData.exit_url || ""
        );
    }
}


/* ============================================================
   BRAND LOGO POSITION
============================================================ */

function updateBrandLogoPosition()
{
    var element =
        document.getElementById(
            "brand_logo_container"
        );

    if (!element)
    {
        return;
    }


    /*
       Remove previous position classes.
    */

    removePositionClasses(element);


    var position =
        String(
            _dynamicData.brand_logo_position || ""
        )
        .trim()
        .toLowerCase();


    if (position)
    {
        element.classList.add(
            "logo-" + position
        );
    }
}


/* ============================================================
   COPY POSITION
============================================================ */

function updateCopyPosition(id, position)
{
    var element =
        document.getElementById(id);

    if (!element)
    {
        return;
    }


    removePositionClasses(element);


    var normalized =
        String(position || "")
            .trim()
            .toLowerCase();


    if (normalized)
    {
        element.classList.add(
            "copy-" + normalized
        );
    }
}


/* ============================================================
   CTA POSITION
============================================================ */

function updateCtaPosition()
{
    var element =
        document.getElementById(
            "cta_container"
        );

    if (!element)
    {
        return;
    }


    removePositionClasses(element);


    var position =
        String(
            _dynamicData.cta_position || ""
        )
        .trim()
        .toLowerCase();


    if (position)
    {
        element.classList.add(
            "cta-" + position
        );
    }
}


/* ============================================================
   FUNDING POSITION
============================================================ */

function updateFundingPosition()
{
    var element =
        document.getElementById(
            "funding_container"
        );

    if (!element)
    {
        return;
    }


    removePositionClasses(element);


    var position =
        String(
            _dynamicData.funding_position || ""
        )
        .trim()
        .toLowerCase();


    if (position)
    {
        element.classList.add(
            "funding-" + position
        );
    }
}


/* ============================================================
   REMOVE POSITION CLASSES
============================================================ */

function removePositionClasses(element)
{
    element.classList.remove(

        "top-left",
        "top-center",
        "top-right",

        "center-left",
        "center-center",
        "center-right",

        "bottom-left",
        "bottom-center",
        "bottom-right",

        "left",
        "right",
        "top",
        "bottom"
    );
}


/* ============================================================
   SCALE
============================================================ */

function updateScale()
{
    var scale =
        Number(_dynamicData.scale);


    if (
        !Number.isFinite(scale) ||
        scale <= 0
    )
    {
        scale = 1;
    }


    root.style.setProperty(
        "--scale",
        scale
    );
}


/* ============================================================
   PANEL CONFIGURATION
   ------------------------------------------------------------
   These values belong to Creative.js.

   updateContent.js only prepares them.

   Creative.js then uses them while rebuilding.
============================================================ */

function updatePanelConfiguration()
{
    if (
        typeof panelConfig === "undefined"
    )
    {
        return;
    }


    panelConfig[0] = {
        size:
            _dynamicData.f1_panel_size || "0%",

        position:
            _dynamicData.f1_panel_position || "none"
    };


    panelConfig[1] = {
        size:
            _dynamicData.f2_panel_size || "0%",

        position:
            _dynamicData.f2_panel_position || "none"
    };


    panelConfig[2] = {
        size:
            _dynamicData.f3_panel_size || "0%",

        position:
            _dynamicData.f3_panel_position || "none"
    };


    panelConfig[3] = {
        size:
            _dynamicData.f4_panel_size || "0%",

        position:
            _dynamicData.f4_panel_position || "none"
    };


    panelConfig[4] = {
        size:
            _dynamicData.f5_panel_size || "0%",

        position:
            _dynamicData.f5_panel_position || "none"
    };
}


/* ============================================================
   FRAME TIMING
============================================================ */

function updateFrameTiming()
{
    if (
        typeof setFrameTiming === "function"
    )
    {
        setFrameTiming();
    }
}


/* ============================================================
   ANIMATION SETTINGS
============================================================ */

function updateAnimationSettings()
{
    if (
        typeof setAnimationConfig === "function"
    )
    {
        setAnimationConfig();
    }
}


/* ============================================================
   LOOP SETTINGS
============================================================ */

function updateLoopSettings()
{
    if (
        typeof setLoopConfig === "function"
    )
    {
        setLoopConfig();
    }
}


/* ============================================================
   LEGAL STATE
============================================================ */

function updateLegalState()
{
    /*
       This function is intentionally
       separated from updateContent.

       If your Creative.js contains:

           checkLegal()

       use it here.
    */

    if (
        typeof checkLegal === "function"
    )
    {
        checkLegal();
    }
}


/* ============================================================
   FUNDING LOGO WIDTH
============================================================ */

function updateFundingLogoWidth()
{
    var element =
        document.getElementById(
            "funding_logo"
        );

    if (!element)
    {
        return;
    }


    var width =
        Number(
            _dynamicData.funding_logo_width
        );


    if (
        !Number.isFinite(width)
    )
    {
        return;
    }


    root.style.setProperty(
        "--funding-logo-size",
        width + "px"
    );


    element.style.width =
        width + "px";
}


/* ============================================================
   BRAND LOGO WIDTH
============================================================ */

function updateBrandLogoWidth()
{
    var element =
        document.getElementById(
            "brand_logo_primary"
        );

    if (!element)
    {
        return;
    }


    var width =
        Number(
            _dynamicData.brand_logo_width
        );


    if (
        !Number.isFinite(width)
    )
    {
        return;
    }


    element.style.width =
        width + "px";
}


/* ============================================================
   CONTENT MARGIN
============================================================ */

function updateContentMargin()
{
    if (
        !_dynamicData.content_margin
    )
    {
        return;
    }


    root.style.setProperty(
        "--content-margin",
        _dynamicData.content_margin
    );
}


/* ============================================================
   SAFE AREA
============================================================ */

function updateSafeArea()
{
    if (
        !_dynamicData.safe_area
    )
    {
        return;
    }


    root.style.setProperty(
        "--safe-area",
        _dynamicData.safe_area
    );
}


/* ============================================================
   REBUILD TIMELINE
   ------------------------------------------------------------
   This is the most important function in this file.

   Why rebuild?

   Some values are read by Creative.js
   ONLY when Creative.init() builds the GSAP timeline.

   Example:

       frame_holdTime
       fadeInSpeed
       fadeOutSpeed
       panel size
       animation type
       frame timing

   Therefore:

       update data
            ↓
       rebuild timeline
            ↓
       Creative.startAd()
============================================================ */

function rebuildTimeline()
{
    console.log(
        "updateContent.js → rebuildTimeline()"
    );


    /*
       Tell Creative.js to preserve
       current position when possible.
    */

    if (
        typeof Creative.startAd === "function"
    )
    {
        Creative.startAd();
    }
}


/* ============================================================
   DEFAULT UPDATE
   ------------------------------------------------------------
   If a field has no special handler:

       - Hoxton has already updated its DOM
       - We do nothing
       - We avoid unnecessary timeline rebuild
============================================================ */

function handleDefaultUpdate(item)
{
    console.log(
        "No custom update handler:",
        item.name
    );
}