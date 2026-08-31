/* =========================================================
   TERRAVAULT — SCENE 07
   03:09–03:47
   Total duration: 38 seconds

   Clean documentary motion system.

   IMPORTANT:
   The warning path is aligned to the actual
   Birth Canal passage in cave-map.png.
   ========================================================= */

(function () {

  "use strict";


  /* =========================
     CONFIG
     ========================= */

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

      focusX: 70.5,
      focusY: 53,

      pushStart: 27,
      pushEnd: 37,

      startScale: 1,
      endScale: 1.28

    }

  };


  /* =========================
     DOM
     ========================= */

  const sceneEl =
    document.getElementById("scene-07");

  const cameraEl =
    document.getElementById("camera");

  const mapGroupEl =
    document.getElementById("mapGroup");

  const warningZoneEl =
    document.getElementById("warningZone");

  const incidentLayerEl =
    document.getElementById("incidentLayer");

  const incident01El =
    document.getElementById("incident01");

  const incident02El =
    document.getElementById("incident02");

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


  /* =========================
     UTILITIES
     ========================= */

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));


  const lerp = (a, b, t) =>
    a + (b - a) * t;


  const progress = (time, start, end) => {

    if (end === start) {
      return time >= end ? 1 : 0;
    }

    return clamp(
      (time - start) / (end - start),
      0,
      1
    );

  };


  const easeOutCubic = (t) =>
    1 - Math.pow(1 - t, 3);


  const easeInOutCubic = (t) => {

    return t < 0.5

      ? 4 * t * t * t

      : 1 -
        Math.pow(-2 * t + 2, 3) / 2;

  };


  /* =========================
     RESPONSIVE STAGE
     ========================= */

  function fitStage() {

    const scale =
      Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
      );

    sceneEl.style.transform =
      `scale(${scale})`;

  }


  window.addEventListener(
    "resize",
    fitStage
  );


  fitStage();


  /* =========================
     MAIN RENDER FUNCTION
     ========================= */

  function render(time) {

    const shots =
      sceneConfig.shots;


    /* =====================================================
       SHOT 1
       00:00–06:00
       Cave map + actual Birth Canal highlight
       ===================================================== */

    const warningProgress =
      progress(
        time,
        0.8,
        2.4
      );


    warningZoneEl.style.opacity =
      String(
        easeOutCubic(warningProgress)
      );


    if (time >= 0.8) {

      warningZoneEl.classList.add(
        "is-active"
      );

    } else {

      warningZoneEl.classList.remove(
        "is-active"
      );

    }


    /* =====================================================
       SHOT 2
       06:00–12:00
       Two tiny incident points
       ===================================================== */

    if (time >= 6) {

      incidentLayerEl.classList.add(
        "is-visible"
      );

    } else {

      incidentLayerEl.classList.remove(
        "is-visible"
      );

    }


    if (time >= 6.5) {

      incident01El.classList.add(
        "is-visible"
      );

    } else {

      incident01El.classList.remove(
        "is-visible"
      );

    }


    if (time >= 8.2) {

      incident02El.classList.add(
        "is-visible"
      );

    } else {

      incident02El.classList.remove(
        "is-visible"
      );

    }


    /* =====================================================
       MAP VISIBILITY
       ===================================================== */

    let mapOpacity = 1;


    /*
      Fade the map out just before
      comparison begins.
    */

    if (
      time >= 18.4 &&
      time < 19
    ) {

      const p =
        progress(
          time,
          18.4,
          19
        );

      mapOpacity =
        1 -
        easeOutCubic(p);

    }


    /*
      Map returns during Shot 5.
    */

    else if (
      time >= 25 &&
      time < 25.8
    ) {

      const p =
        progress(
          time,
          25,
          25.8
        );

      mapOpacity =
        easeOutCubic(p);

    }


    else if (
      time >= 19 &&
      time < 25
    ) {

      mapOpacity = 0;

    }


    mapGroupEl.style.opacity =
      String(mapOpacity);


    /* =====================================================
       SHOT 3
       12–19
       Scout vs John
       ===================================================== */

    let comparisonOpacity = 0;


    if (
      time >= 12 &&
      time < 18.4
    ) {

      const p =
        progress(
          time,
          12,
          12.8
        );

      comparisonOpacity =
        easeOutCubic(p);

    }


    else if (
      time >= 18.4 &&
      time < 19
    ) {

      const p =
        progress(
          time,
          18.4,
          19
        );

      comparisonOpacity =
        1 -
        easeOutCubic(p);

    }


    comparisonLayer.style.opacity =
      String(comparisonOpacity);


    if (comparisonOpacity > 0.01) {

      comparisonLayer.classList.add(
        "is-visible"
      );

    } else {

      comparisonLayer.classList.remove(
        "is-visible"
      );

    }


    /* =====================================================
       SHOT 4
       19–25
       Pulley + 14 HOURS
       ===================================================== */

    let pulleyOpacity = 0;


    if (
      time >= 19 &&
      time < 24.5
    ) {

      const p =
        progress(
          time,
          19,
          19.8
        );

      pulleyOpacity =
        easeOutCubic(p);

    }


    else if (
      time >= 24.5 &&
      time < 25
    ) {

      const p =
        progress(
          time,
          24.5,
          25
        );

      pulleyOpacity =
        1 -
        easeOutCubic(p);

    }


    pulleyLayer.style.opacity =
      String(pulleyOpacity);


    if (pulleyOpacity > 0.01) {

      pulleyLayer.classList.add(
        "is-visible"
      );

    } else {

      pulleyLayer.classList.remove(
        "is-visible"
      );

    }


    /* =========================
       14 HOURS
       ========================= */

    if (
      time >= 20.2 &&
      time < 24.5
    ) {

      hoursReadout.classList.add(
        "is-visible"
      );

    } else {

      hoursReadout.classList.remove(
        "is-visible"
      );

    }


    /* =====================================================
       SHOT 5
       25–38
       Slow camera push
       ===================================================== */

    const camera =
      sceneConfig.camera;


    const pushProgress =
      progress(
        time,
        camera.pushStart,
        camera.pushEnd
      );


    const cameraScale =
      lerp(
        camera.startScale,
        camera.endScale,
        easeInOutCubic(
          pushProgress
        )
      );


    cameraEl.style.transformOrigin =
      `${camera.focusX}% ${camera.focusY}%`;


    cameraEl.style.transform =
      `scale(${cameraScale})`;


    /* =====================================================
       DEBUG
       ===================================================== */

    if (
      btnDebug.checked
    ) {

      const activeShot =
        shots.find(
          shot =>
            time >= shot.start &&
            time < shot.end
        );


      debugHud.textContent =
        [
          "TERRAVAULT — SCENE 07",
          "",
          `Time: ${time.toFixed(2)}s`,
          `Shot: ${activeShot ? activeShot.id : "complete"}`,
          `Camera: ${cameraScale.toFixed(2)}x`,
          `Map opacity: ${mapOpacity.toFixed(2)}`
        ].join("\n");


      debugHud.classList.add(
        "is-active"
      );

    }

  }


  /* =========================
     PLAYBACK ENGINE
     ========================= */

  let playing = false;

  let currentTime = 0;

  let lastFrameTime = null;


  function formatTime(seconds) {

    const minutes =
      Math.floor(
        seconds / 60
      );


    const secs =
      (seconds % 60)
        .toFixed(1)
        .padStart(4, "0");


    return (
      `${String(minutes).padStart(2, "0")}:${secs}`
    );

  }


  function updateReadout() {

    timeReadout.textContent =
      `${formatTime(currentTime)} / ${formatTime(sceneConfig.duration)}`;


    scrubber.value =
      currentTime.toFixed(2);

  }


  function tick(now) {

    if (!playing) {
      return;
    }


    if (lastFrameTime === null) {
      lastFrameTime = now;
    }


    const delta =
      (now - lastFrameTime) / 1000;


    lastFrameTime = now;


    currentTime =
      clamp(
        currentTime + delta,
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


    requestAnimationFrame(
      tick
    );

  }


  /* =========================
     PLAY
     ========================= */

  btnPlay.addEventListener(
    "click",
    () => {

      if (playing) {

        playing = false;

        btnPlay.textContent =
          "Play";

        return;

      }


      playing = true;

      lastFrameTime = null;

      btnPlay.textContent =
        "Pause";


      requestAnimationFrame(
        tick
      );

    }
  );


  /* =========================
     RESTART
     ========================= */

  btnRestart.addEventListener(
    "click",
    () => {

      playing = false;

      currentTime = 0;

      lastFrameTime = null;

      btnPlay.textContent =
        "Play";

      render(0);

      updateReadout();

    }
  );


  /* =========================
     SCRUBBER
     ========================= */

  scrubber.addEventListener(
    "input",
    event => {

      playing = false;

      currentTime =
        parseFloat(
          event.target.value
        );

      render(currentTime);

      updateReadout();

    }
  );


  /* =========================
     DEBUG
     ========================= */

  btnDebug.addEventListener(
    "change",
    () => {

      if (!btnDebug.checked) {

        debugHud.classList.remove(
          "is-active"
        );

      }

    }
  );


  /* =========================
     INITIAL STATE
     ========================= */

  render(0);

  updateReadout();

})();