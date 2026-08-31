/* =========================================================
   TERRAVAULT — SCENE 07 TIMELINE ENGINE (v2)

   Refs:
   TERRAVAULT_TIMELINE_SYSTEM.md
   TERRAVAULT_CODE_ENGINE.md
   ANIMATION_PRINCIPLES.md

   One master clock drives every layer.
   Deterministic: the same time input always produces
   the same visual state.
   ========================================================= */

(function () {
  "use strict";


  const DEBUG = false;


  const sceneConfig = {

    duration: 38,

    shots: [

      {
        id: "shot-1",
        start: 0,
        end: 6
      },

      {
        id: "shot-2",
        start: 6,
        end: 12
      },

      {
        id: "shot-3",
        start: 12,
        end: 19
      },

      {
        id: "shot-4",
        start: 19,
        end: 25
      },

      {
        id: "shot-5",
        start: 25,
        end: 38
      }

    ],


    camera: {

      focus: {
        x: 69.97,
        y: 52.55
      },

      pushStart: 27,

      pushEnd: 37,

      startScale: 1.0,

      endScale: 1.22

    },


    hoursRevealAt: 20.5

  };


  // ========================================================
  // DOM REFERENCES
  // ========================================================

  const sceneEl =
    document.getElementById("scene-07");

  const cameraEl =
    document.getElementById("camera");

  const mapGroupEl =
    document.getElementById("mapGroup");

  const warningZoneEl =
    document.getElementById("warningZone");

  const tick01El =
    document.getElementById("tick01");

  const tick02El =
    document.getElementById("tick02");

  const comparisonLayer =
    document.getElementById("comparisonLayer");

  const pulleyLayer =
    document.getElementById("pulleyLayer");

  const hoursReadout =
    document.getElementById("hoursReadout");

  const btnPlay =
    document.getElementById("btnPlay");

  const btnRestart =
    document.getElementById("btnRestart");

  const scrubber =
    document.getElementById("scrubber");

  const timeReadout =
    document.getElementById("timeReadout");

  const btnDebug =
    document.getElementById("btnDebug");

  const debugHud =
    document.getElementById("debugHud");


  // NEW: RECORD MODE BUTTON
  const btnRecordMode =
    document.getElementById("btnRecordMode");


  // ========================================================
  // UTILITIES
  // ========================================================

  const clamp = (v, a, b) =>
    Math.max(a, Math.min(b, v));


  const lerp = (a, b, t) =>
    a + (b - a) * t;


  const progress = (t, start, end) =>
    clamp(
      (t - start) / (end - start),
      0,
      1
    );


  const easeOutCubic = (t) =>
    1 - Math.pow(1 - t, 3);


  const easeInOutCubic = (t) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;


  const setClass = (el, name, on) =>
    el.classList.toggle(name, !!on);


  function fitStage() {

    const scale =
      Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
      );

    sceneEl.style.setProperty(
      "--stage-scale",
      scale.toFixed(4)
    );

  }


  window.addEventListener(
    "resize",
    fitStage
  );


  fitStage();


  // ========================================================
  // RENDER
  // Pure function of time.
  // ========================================================

  function render(t) {

    const shots =
      sceneConfig.shots;


    // ======================================================
    // SHOT 1
    // 0–6s
    // ======================================================

    setClass(
      warningZoneEl,
      "is-drawn",
      t >= 1.4
    );


    // ======================================================
    // SHOT 2
    // 6–12s
    // ======================================================

    setClass(
      tick01El,
      "is-visible",
      t >= 6.6 &&
      t < shots[3].start
    );


    setClass(
      tick02El,
      "is-visible",
      t >= 8.4 &&
      t < shots[3].start
    );


    // ======================================================
    // MAP GROUP VISIBILITY
    // ======================================================

    const mapFadeOutStart =
      shots[3].start - 0.5;

    const mapFadeIn0 =
      shots[4].end - 0.6;


    const fadeOutP =
      progress(
        t,
        mapFadeOutStart,
        shots[3].start
      );


    const fadeInP =
      progress(
        t,
        mapFadeIn0,
        shots[4].end
      );


    let mapOpacity;


    if (
      t <
      mapFadeOutStart
    ) {

      mapOpacity = 1;

    }

    else if (
      t <
      shots[3].start
    ) {

      mapOpacity =
        1 -
        easeOutCubic(
          fadeOutP
        );

    }

    else if (
      t <
      mapFadeIn0
    ) {

      mapOpacity = 0;

    }

    else {

      mapOpacity =
        easeOutCubic(
          fadeInP
        );

    }


    mapGroupEl.style.opacity =
      String(mapOpacity);


    // ======================================================
    // SHOT 3
    // 12–19s
    // Comparison
    // ======================================================

    const compInP =
      progress(
        t,
        shots[2].start,
        shots[2].start + 0.7
      );


    const compOutP =
      progress(
        t,
        shots[3].start - 0.5,
        shots[3].start
      );


    let compOpacity = 0;


    if (
      t >= shots[2].start &&
      t < shots[3].start - 0.5
    ) {

      compOpacity =
        easeOutCubic(
          compInP
        );

    }

    else if (
      t >= shots[3].start - 0.5 &&
      t < shots[3].start
    ) {

      compOpacity =
        1 -
        easeOutCubic(
          compOutP
        );

    }


    comparisonLayer.style.opacity =
      String(compOpacity);


    setClass(
      comparisonLayer,
      "is-visible",
      compOpacity > 0.02
    );


    // ======================================================
    // SHOT 4
    // 19–25s
    // Pulley + 14 HOURS
    // ======================================================

    const pulleyInP =
      progress(
        t,
        shots[3].start,
        shots[3].start + 0.6
      );


    const pulleyOutP =
      progress(
        t,
        shots[4].start - 0.5,
        shots[4].start
      );


    let pulleyOpacity = 0;


    if (
      t >= shots[3].start &&
      t < shots[4].start - 0.5
    ) {

      pulleyOpacity =
        easeOutCubic(
          pulleyInP
        );

    }

    else if (
      t >= shots[4].start - 0.5 &&
      t < shots[4].start
    ) {

      pulleyOpacity =
        1 -
        easeOutCubic(
          pulleyOutP
        );

    }


    pulleyLayer.style.opacity =
      String(pulleyOpacity);


    setClass(
      pulleyLayer,
      "is-visible",
      pulleyOpacity > 0.02
    );


    setClass(
      hoursReadout,
      "is-visible",
      t >= sceneConfig.hoursRevealAt &&
      t < shots[4].start
    );


    // ======================================================
    // SHOT 5
    // 25–38s
    // Camera push toward warning zone
    // ======================================================

    const cam =
      sceneConfig.camera;


    const pushP =
      progress(
        t,
        cam.pushStart,
        cam.pushEnd
      );


    const scale =
      lerp(
        cam.startScale,
        cam.endScale,
        easeInOutCubic(pushP)
      );


    cameraEl.style.transformOrigin =
      `${cam.focus.x}% ${cam.focus.y}%`;


    cameraEl.style.transform =
      `scale(${scale.toFixed(4)})`;


    // ======================================================
    // DEBUG
    // ======================================================

    if (
      DEBUG ||
      debugHud.classList.contains("is-active")
    ) {

      const activeShot =
        shots.find(
          s =>
            t >= s.start &&
            t < s.end
        ) ||
        shots[shots.length - 1];


      debugHud.textContent =
        `SCENE 07\n` +
        `t = ${t.toFixed(2)}s / ${sceneConfig.duration}s\n` +
        `shot: ${activeShot.id}\n` +
        `map opacity: ${mapOpacity.toFixed(2)}\n` +
        `camera scale: ${scale.toFixed(3)}`;

    }

  }


  // ========================================================
  // MASTER CLOCK / PLAYBACK CONTROLLER
  // ========================================================

  let playing = false;

  let currentTime = 0;

  let lastFrameAt = null;


  function formatTime(s) {

    const m =
      Math.floor(s / 60);

    const sec =
      (s % 60)
        .toFixed(1)
        .padStart(4, "0");


    return (
      `${String(m).padStart(2, "0")}:${sec}`
    );

  }


  function updateReadout() {

    timeReadout.textContent =
      `${formatTime(currentTime)} / ${formatTime(sceneConfig.duration)}`;


    scrubber.value =
      currentTime.toFixed(2);

  }


  function tick(now) {

    if (!playing) return;


    if (
      lastFrameAt == null
    ) {

      lastFrameAt = now;

    }


    const dt =
      (now - lastFrameAt) /
      1000;


    lastFrameAt = now;


    currentTime =
      clamp(
        currentTime + dt,
        0,
        sceneConfig.duration
      );


    render(currentTime);

    updateReadout();


    if (
      currentTime >=
      sceneConfig.duration
    ) {

      playing = false;

      btnPlay.textContent =
        "Play";

      return;

    }


    requestAnimationFrame(tick);

  }


  // ========================================================
  // PLAY
  // ========================================================

  btnPlay.addEventListener(
    "click",
    () => {

      if (playing) {

        playing = false;

        btnPlay.textContent =
          "Play";

      }

      else {

        playing = true;

        lastFrameAt = null;

        btnPlay.textContent =
          "Pause";

        requestAnimationFrame(
          tick
        );

      }

    }
  );


  // ========================================================
  // RESTART
  // ========================================================

  btnRestart.addEventListener(
    "click",
    () => {

      currentTime = 0;

      render(currentTime);

      updateReadout();

    }
  );


  // ========================================================
  // SCRUBBER
  // ========================================================

  scrubber.addEventListener(
    "input",
    (e) => {

      currentTime =
        parseFloat(
          e.target.value
        );

      render(currentTime);

      updateReadout();

    }
  );


  // ========================================================
  // DEBUG
  // ========================================================

  btnDebug.addEventListener(
    "change",
    (e) => {

      debugHud.classList.toggle(
        "is-active",
        e.target.checked
      );

    }
  );


  // ========================================================
// RECORD MODE
//
// Hides all preview controls WITHOUT stopping the animation.
// ========================================================

btnRecordMode.addEventListener(
  "click",
  () => {

    const devPanel =
      document.getElementById("devPanel");


    // Hide all preview controls
    if (devPanel) {

      devPanel.style.display =
        "none";

    }


    // Hide debug HUD
    debugHud.classList.remove(
      "is-active"
    );

    debugHud.style.display =
      "none";


    // IMPORTANT:
    // Do NOT stop playback here.
    //
    // If the animation was already playing,
    // it continues playing normally.
    //
    // If it was paused, it remains paused.
    //
    // No timeline, scene, camera or animation
    // values are changed.

  }
);


  // ========================================================
  // INITIAL STATE
  // ========================================================

  render(0);

  updateReadout();

})();