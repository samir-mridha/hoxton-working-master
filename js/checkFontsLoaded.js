/* USE IF LOADED FONTS ARE CRITICAL BEFORE PROGRESSING */

var timeoutSecs = 2500;
var config      = { font:"sans-serif" , delay:50 , interval:timeoutSecs };
var arrFonts    = [];
var arrInterval = [];
var fontsLoaded = 0;
var eventLoadFontsComplete;
var testSpan;


/* CALL THIS FUNCTION - PARAMS ( FONT ARRAY - EVENT TO CALL ON LOAD COMPLETE ) */

function checkFontsLoaded( fontsToLoadArray , onLoadCompleteFunction )
{
    arrFonts                = fontsToLoadArray;
    eventLoadFontsComplete  = onLoadCompleteFunction;

        testSpan = document.createElement('span');
        testSpan.id                 = "test_sansSerif";
        testSpan.style.position     = 'absolute';
        testSpan.style.top          = '-9999px';
        testSpan.style.left         = '-9999px';
        testSpan.style.visibility   = 'hidden';
        testSpan.style.fontFamily   = "sans-serif";
        testSpan.style.fontSize     = '250px';
        testSpan.style['-webkit-font-smoothing'] = 'none';
        testSpan.style.letterSpacing = "4px;"
        testSpan.style["font-kerning"] = "none";
        testSpan.innerHTML          = "QW@HhsXJ";

    document.body.appendChild( testSpan );

    let testWidth = testSpan.offsetWidth;

    for ( let i = 0 ; i < arrFonts.length ; i++ )
    {
        let span = createEleToTestFont( i );
        
        span.style.fontFamily = arrFonts[ i ] + ',' + config.font;

        arrInterval[ i ] = setInterval( hasFontLoaded , config.delay , span , i , testWidth );
    }
}


function createEleToTestFont( index )
{
    let span = document.createElement('span');
        span.id                 = "test_"+ index;
        span.style.position     = 'absolute';
        span.style.top          = '-9999px';
        span.style.left         = '-9999px';
        span.style.visibility   = 'hidden';
        span.style.fontFamily   = config.font;
        span.style.fontSize     = '250px';
        span.style['-webkit-font-smoothing'] = 'none';
        span.style.letterSpacing = "4px;"
        span.style["font-kerning"] = "none";
        span.innerHTML          = "QW@HhsXJ";

    document.body.appendChild( span );

    return span;
}

function hasFontLoaded( span , index , testWidth )
{
    console.log("[INDEX: "+ index +"][FONT: "+ arrFonts[index] +"]");

    if ( span.offsetWidth === testWidth )
    {
        if ( config.interval < 0 )
        {
            console.log( "Font "+ arrFonts[index] +" failed to load");
            removeCheckFont( span , index );
        }
        else
        {
            console.log( "Font "+ arrFonts[index] +" still loading");
            config.interval -= config.delay;
        }
    }
    else
    {
        fontsLoaded++;

        console.log( "Font "+ arrFonts[ index ] +" loaded - "+ (timeoutSecs - config.interval) +"ms");
        removeCheckFont( span , index );

        if ( fontsLoaded === arrFonts.length )
        {
            eventLoadFontsComplete();
        }
    }
}

function removeCheckFont( span , index )
{
    clearInterval( arrInterval[ index ] );
    span.remove();
    testSpan.remove();
}
