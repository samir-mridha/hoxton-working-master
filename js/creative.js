/* ==========================================================
   SAMIR MASTER HOXTON TEMPLATE
   creative.js

   RESPONSIBILITY
   ----------------------------------------------------------
   This file controls:

   1. GSAP timeline
   2. Frame animation
   3. Fade In / Fade Out
   4. Slide animation
   5. SplitText animation
   6. Zoom animation
   7. Static animation
   8. Frame timing
   9. Loop
   10. Exit
   11. Replay

   IMPORTANT
   ----------------------------------------------------------
   setDynamicContent.js
        ↓
   prepares configuration

   creative.js
        ↓
   uses configuration to build animation

   hoxton-v7.js
        ↓
   handles Hoxton data → DOM
========================================================== */


/* ==========================================================
   GSAP DEFAULTS
========================================================== */

gsap.defaults({
    overwrite: "auto",
    ease: "none"
});


/* ==========================================================
   GLOBAL CONFIGURATION
========================================================== */


/* ----------------------------------------------------------
   LOOP
---------------------------------------------------------- */

var _loopCount = 0;
var _loopDelay = 3;


/* ----------------------------------------------------------
   EXIT URL
---------------------------------------------------------- */

var _exitURL = "";


/* ----------------------------------------------------------
   GENERAL ANIMATION SPEED
---------------------------------------------------------- */

var _fadeInSpeed = 0.5;
var _fadeOutSpeed = 0.3;


/* ----------------------------------------------------------
   FRAME CONFIGURATION

   Example:

   [
      {
         enable: true,
         target: frame01,
         time: 3,
         animation: "fade"
      }
   ]
---------------------------------------------------------- */

var _frameConfig = [];


/* ----------------------------------------------------------
   CURRENT FRAME
---------------------------------------------------------- */

var _currentFrame = 0;


/* ----------------------------------------------------------
   HOT RELOAD

   Used when Hoxton changes content while
   banner is already running.
---------------------------------------------------------- */

var _hotReload = false;


/* ==========================================================
   DOM REFERENCES
========================================================== */

var container = getById("container");

var exitBtn = getById("exit_btn");

var replayBtn = getById("btn_replay");


/* ----------------------------------------------------------
   FRAME ELEMENTS
---------------------------------------------------------- */

var frame01 = getById("frame01");
var frame02 = getById("frame02");
var frame03 = getById("frame03");
var frame04 = getById("frame04");
var frame05 = getById("frame05");


/* ==========================================================
   CREATIVE OBJECT
========================================================== */

var Creative = {

    /* ------------------------------------------------------
       MASTER GSAP TIMELINE
    ------------------------------------------------------ */

    tl: gsap.timeline({
        paused: true
    }),


    /* ======================================================
       EXIT
    ====================================================== */

    setExitURL: function(url)
    {
        _exitURL = url || "";
    },


    onExit: function()
    {
        hoxton.exit(
            "Exit",
            _exitURL
        );
    },


    /* ======================================================
       REPLAY
    ====================================================== */

    onReplay: function()
    {
        console.log(
            "Creative.onReplay()"
        );

        _hotReload = false;

        Creative.rebuildTimeline();
    },


    /* ======================================================
       BUTTON EVENTS
    ====================================================== */

    createButtons: function()
    {
        if (exitBtn)
        {
            exitBtn.addEventListener(
                "click",
                Creative.onExit,
                false
            );
        }

        if (replayBtn)
        {
            replayBtn.addEventListener(
                "click",
                Creative.onReplay,
                false
            );
        }
    },


    /* ======================================================
       DISPLAY BANNER
    ====================================================== */

    displayBanner: function()
    {
        if (!container)
        {
            return;
        }

        container.style.display = "block";
        container.style.opacity = "1";
    },


    /* ======================================================
       SETUP TIMELINE
    ====================================================== */

    setupTimeline: function()
    {
        Creative.tl.repeat(
            _loopCount
        );

        Creative.tl.repeatDelay(
            _loopDelay
        );
    },


    /* ======================================================
       RESET
    ====================================================== */

    resetFrames: function()
    {
        gsap.set(
            ".frame",
            {
                autoAlpha: 0
            }
        );
    },


    /* ======================================================
       RESET FRAME ELEMENTS
    ====================================================== */

    resetFrameElements: function()
    {
        gsap.set(
            ".frame-content",
            {
                clearProps: "all"
            }
        );
    },


    /* ======================================================
       FRAME VISIBILITY
    ====================================================== */

    showFrame: function(frame)
    {
        if (!frame)
        {
            return;
        }

        Creative.tl.to(
            frame,
            {
                duration: _fadeInSpeed,
                autoAlpha: 1
            }
        );
    },


    hideFrame: function(frame)
    {
        if (!frame)
        {
            return;
        }

        Creative.tl.to(
            frame,
            {
                duration: _fadeOutSpeed,
                autoAlpha: 0
            }
        );
    },


    /* ======================================================
       HOLD
    ====================================================== */

    holdFrame: function(seconds)
    {
        var duration = Number(seconds);

        if (!Number.isFinite(duration))
        {
            duration = 3;
        }

        Creative.tl.to(
            {},
            {
                duration: duration
            }
        );
    },


    /* ======================================================
       FADE IN
       ------------------------------------------------------
       Content simply fades in.
    ====================================================== */

    fadeIn: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                autoAlpha: 1
            }
        );
    },


    /* ======================================================
       FADE OUT
       ------------------------------------------------------
       Content fades out.
    ====================================================== */

    fadeOut: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.to(
            target,
            {
                duration:
                    Number(duration) || _fadeOutSpeed,

                autoAlpha: 0
            }
        );
    },


    /* ======================================================
       SLIDE FROM LEFT
    ====================================================== */

    slideFromLeft: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                x: "-100%",
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                x: "0%",
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       SLIDE FROM RIGHT
    ====================================================== */

    slideFromRight: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                x: "100%",
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                x: "0%",
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       SLIDE FROM TOP
    ====================================================== */

    slideFromTop: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                y: "-100%",
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                y: "0%",
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       SLIDE FROM BOTTOM
    ====================================================== */

    slideFromBottom: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                y: "100%",
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                y: "0%",
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       SCALE IN
    ====================================================== */

    scaleIn: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                scale: 0.8,
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                scale: 1,
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       ZOOM IN
    ====================================================== */

    zoomIn: function(target, duration)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.fromTo(
            target,
            {
                scale: 1,
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                scale: 1.08,
                autoAlpha: 1,

                ease: "power1.out"
            }
        );
    },


    /* ======================================================
       STATIC
       ------------------------------------------------------
       No entrance animation.
    ====================================================== */

    staticIn: function(target)
    {
        if (!target)
        {
            return;
        }

        Creative.tl.set(
            target,
            {
                autoAlpha: 1
            }
        );
    },


    /* ======================================================
       SPLIT TEXT
       ------------------------------------------------------
       Requires SplitText.min.js

       Expected target:

       .headline

       Example:

       SplitText(target, {
           type: "chars"
       })
    ====================================================== */

    splitTextIn: function(target, duration)
    {
        if (!target)
        {
            return;
        }


        /*
           Check that SplitText exists.
        */

        if (typeof SplitText === "undefined")
        {
            console.warn(
                "SplitText.min.js is not loaded."
            );

            Creative.fadeIn(
                target,
                duration
            );

            return;
        }


        /*
           Create SplitText instance.
        */

        var split = new SplitText(
            target,
            {
                type: "chars,words"
            }
        );


        /*
           Animate characters.
        */

        Creative.tl.fromTo(
            split.chars,
            {
                y: 20,
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                y: 0,
                autoAlpha: 1,

                stagger: 0.03,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       SLIDE + FADE
    ====================================================== */

    slideFadeIn: function(
        target,
        direction,
        duration
    )
    {
        if (!target)
        {
            return;
        }


        var x = 0;
        var y = 0;


        switch(
            String(direction || "left")
                .toLowerCase()
        )
        {
            case "left":
                x = "-50%";
                break;

            case "right":
                x = "50%";
                break;

            case "top":
                y = "-50%";
                break;

            case "bottom":
                y = "50%";
                break;
        }


        Creative.tl.fromTo(
            target,
            {
                x: x,
                y: y,
                autoAlpha: 0
            },
            {
                duration:
                    Number(duration) || _fadeInSpeed,

                x: 0,
                y: 0,
                autoAlpha: 1,

                ease: "power2.out"
            }
        );
    },


    /* ======================================================
       APPLY ENTRANCE ANIMATION
       ------------------------------------------------------
       This function decides which animation function
       should be called.

       JSON:

       fade
       slide-left
       slide-right
       slide-top
       slide-bottom
       split
       scale
       zoom
       static
    ====================================================== */

    applyEntranceAnimation: function(
        target,
        animation,
        duration
    )
    {
        if (!target)
        {
            return;
        }


        var type =
            String(animation || "fade")
                .trim()
                .toLowerCase();


        switch(type)
        {
            case "fade":
            case "fade-in":

                Creative.fadeIn(
                    target,
                    duration
                );

                break;


            case "slide-left":

                Creative.slideFromLeft(
                    target,
                    duration
                );

                break;


            case "slide-right":

                Creative.slideFromRight(
                    target,
                    duration
                );

                break;


            case "slide-top":

                Creative.slideFromTop(
                    target,
                    duration
                );

                break;


            case "slide-bottom":

                Creative.slideFromBottom(
                    target,
                    duration
                );

                break;


            case "scale":

            case "scale-in":

                Creative.scaleIn(
                    target,
                    duration
                );

                break;


            case "zoom":

            case "zoom-in":

                Creative.zoomIn(
                    target,
                    duration
                );

                break;


            case "split":

            case "split-text":

                Creative.splitTextIn(
                    target,
                    duration
                );

                break;


            case "static":

            case "none":

                Creative.staticIn(
                    target
                );

                break;


            default:

                console.warn(
                    "Unknown animation:",
                    animation,
                    "→ Using fade"
                );

                Creative.fadeIn(
                    target,
                    duration
                );
        }
    },


    /* ======================================================
       APPLY EXIT ANIMATION
    ====================================================== */

    applyExitAnimation: function(
        target,
        animation,
        duration
    )
    {
        if (!target)
        {
            return;
        }


        var type =
            String(animation || "fade")
                .trim()
                .toLowerCase();


        switch(type)
        {
            case "fade":

            case "fade-out":

                Creative.fadeOut(
                    target,
                    duration
                );

                break;


            case "slide-left":

                Creative.tl.to(
                    target,
                    {
                        duration:
                            Number(duration) ||
                            _fadeOutSpeed,

                        x: "-50%",
                        autoAlpha: 0,

                        ease: "power2.in"
                    }
                );

                break;


            case "slide-right":

                Creative.tl.to(
                    target,
                    {
                        duration:
                            Number(duration) ||
                            _fadeOutSpeed,

                        x: "50%",
                        autoAlpha: 0,

                        ease: "power2.in"
                    }
                );

                break;


            case "slide-top":

                Creative.tl.to(
                    target,
                    {
                        duration:
                            Number(duration) ||
                            _fadeOutSpeed,

                        y: "-50%",
                        autoAlpha: 0,

                        ease: "power2.in"
                    }
                );

                break;


            case "slide-bottom":

                Creative.tl.to(
                    target,
                    {
                        duration:
                            Number(duration) ||
                            _fadeOutSpeed,

                        y: "50%",
                        autoAlpha: 0,

                        ease: "power2.in"
                    }
                );

                break;


            default:

                Creative.fadeOut(
                    target,
                    duration
                );
        }
    },


    /* ======================================================
       BUILD ONE FRAME
       ------------------------------------------------------
       This is the main frame builder.

       frame object:

       {
           target: frame01,
           time: 3,
           animation: "fade"
       }
    ====================================================== */

    buildFrame: function(frame)
    {
        if (!frame || !frame.enable)
        {
            return;
        }


        var target =
            frame.target;


        var duration =
            frame.animationSpeed ||
            _fadeInSpeed;


        var time =
            Number(frame.time);


        if (!Number.isFinite(time))
        {
            time = 3;
        }


        /* --------------------------------------------------
           FRAME ENTRANCE
        -------------------------------------------------- */

        Creative.applyEntranceAnimation(
            target,
            frame.animation,
            duration
        );


        /* --------------------------------------------------
           FRAME HOLD
        -------------------------------------------------- */

        Creative.holdFrame(
            time
        );


        /* --------------------------------------------------
           FRAME EXIT
        -------------------------------------------------- */

        if (
            frame.exitAnimation &&
            frame.exitAnimation !== "none"
        )
        {
            Creative.applyExitAnimation(
                target,
                frame.exitAnimation,
                _fadeOutSpeed
            );
        }
        else
        {
            Creative.fadeOut(
                target,
                _fadeOutSpeed
            );
        }
    },


    /* ======================================================
       BUILD ALL FRAMES
    ====================================================== */

    buildTimeline: function()
    {
        Creative.resetFrames();

        Creative.resetFrameElements();


        if (
            !Array.isArray(_frameConfig)
        )
        {
            return;
        }


        _frameConfig.forEach(
            function(frame)
            {
                Creative.buildFrame(
                    frame
                );
            }
        );


        Creative.tl.addLabel(
            "end"
        );
    },


    /* ======================================================
       REBUILD TIMELINE
       ------------------------------------------------------
       Used by:
       - Hoxton updateContent
       - Replay
       - Dynamic changes
    ====================================================== */

    rebuildTimeline: function()
    {
        console.log(
            "Creative.rebuildTimeline()"
        );


        /* --------------------------------------------------
           Remember current time
        -------------------------------------------------- */

        var currentTime =
            Creative.tl.time();


        /* --------------------------------------------------
           Remove old animation
        -------------------------------------------------- */

        Creative.tl.clear();


        /* --------------------------------------------------
           Apply loop configuration
        -------------------------------------------------- */

        Creative.setupTimeline();


        /* --------------------------------------------------
           Build new animation
        -------------------------------------------------- */

        Creative.buildTimeline();


        /* --------------------------------------------------
           Determine start position
        -------------------------------------------------- */

        if (!_hotReload)
        {
            currentTime = 0;
        }


        if (
            currentTime >
            Creative.tl.duration()
        )
        {
            currentTime =
                Creative.tl.duration();
        }


        /* --------------------------------------------------
           Play
        -------------------------------------------------- */

        Creative.tl
            .seek(
                currentTime,
                false
            )
            .play();
    },


    /* ======================================================
       START AD
    ====================================================== */

    startAd: function()
    {
        console.log(
            "Creative.startAd()"
        );


        Creative.createButtons();

        Creative.displayBanner();

        Creative.rebuildTimeline();
    },


    /* ======================================================
       CURRENT FRAME
       ------------------------------------------------------
       Optional helper for CSS:
       size300x250 curr-frame-1
    ====================================================== */

    setCurrentFrame: function(index)
    {
        if (!container)
        {
            return;
        }


        var frameClasses = [
            "curr-frame-1",
            "curr-frame-2",
            "curr-frame-3",
            "curr-frame-4",
            "curr-frame-5"
        ];


        frameClasses.forEach(
            function(className)
            {
                container.classList.remove(
                    className
                );
            }
        );


        if (
            index >= 1 &&
            index <= 5
        )
        {
            container.classList.add(
                "curr-frame-" + index
            );

            _currentFrame = index;
        }
    }


};


/* ==========================================================
   FRAME CONFIG HELPERS
========================================================== */


/* ----------------------------------------------------------
   Add frame configuration
---------------------------------------------------------- */

function addFrameConfig(
    target,
    time,
    animation,
    enable,
    exitAnimation
)
{
    _frameConfig.push(
        {
            target:
                target,

            time:
                Number(time) || 3,

            animation:
                animation || "fade",

            animationSpeed:
                _fadeInSpeed,

            exitAnimation:
                exitAnimation || "fade",

            enable:
                enable !== false
        }
    );
}


/* ==========================================================
   GET ELEMENT BY ID
========================================================== */

function getById(id)
{
    return document.getElementById(id);
}