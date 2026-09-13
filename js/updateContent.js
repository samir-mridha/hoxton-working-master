Creative.updateContent = function(item)
{
    console.log(
        "updateContent:",
        item.name
    );

    _dynamicData = hoxton.getState();

    switch(item.name)
    {
        /* COLORS */

            case "background_color":
            case "headline_color":
            case "subline_color":
            case "badge_color":
            case "cta_bg_color":
            case "cta_copy_color":
            case "panel_background":
            case "brand_logo_color":

                setTheme();
                break;


        /* TIMELINE */

        case "frame_holdTime":
        case "fadeInSpeed":
        case "fadeOutSpeed":
        case "frame_copy_animation":
        case "frame_bg_animation":
        case "playCount":
        case "repeatDelay":
        case "panel_visibility":
        case "cta_variant":
        case "exit_url":

            setDynamicNonDomData();

            Creative.startAd();

            return;
    }
};