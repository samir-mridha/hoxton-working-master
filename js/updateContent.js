/* =====================================================
   UPDATE CONTENT
===================================================== */

Creative.updateContent = function(item)
{
    console.log(
        "Creative.updateContent()",
        item.name
    );

    // Get latest Hoxton data
    _dynamicData = hoxton.getState();

    // Update all non-DOM values
    setDynamicNonDomData();

    // Do we need to rebuild GSAP timeline?
    var ifNeedsRebuilt = false;

    switch(item.name)
    {

        /* ==========================================
           FRAME TIMING
        ========================================== */

        case "frame_holdTime":

        /* ==========================================
           ANIMATION
        ========================================== */

        case "fadeInSpeed":
        case "fadeOutSpeed":
        case "frame_copy_animation":
        case "frame_bg_animation":

        /* ==========================================
           LOOPING
        ========================================== */

        case "playCount":
        case "repeatDelay":

        /* ==========================================
           PANEL
        ========================================== */

        case "f1_panel_size":
        case "f1_panel_position":

        case "f2_panel_size":
        case "f2_panel_position":

        case "f3_panel_size":
        case "f3_panel_position":

        case "f4_panel_size":
        case "f4_panel_position":

        case "f5_panel_size":
        case "f5_panel_position":

        /* ==========================================
           VISIBILITY
        ========================================== */

        case "panel_visibility":

        /* ==========================================
           CTA
        ========================================== */

        case "cta_variant":

        /* ==========================================
           EXIT URL
        ========================================== */

        case "exit_url":

            ifNeedsRebuilt = true;
            break;


        default:

            ifNeedsRebuilt = false;
            break;
    }


    /* ==========================================
       REBUILD TIMELINE IF REQUIRED
    ========================================== */

    if(ifNeedsRebuilt)
    {
        console.log(
            "Timeline Rebuild Required"
        );

        setDynamicNonDomData();

        Creative.startAd();
    }
};