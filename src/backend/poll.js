if (module.hot) {

  setInterval(() => {

    switch (module.hot.status()) {
      case "idle":
        module.hot.check();
        break;

      case "check":
        break;

      case "watch-delay":
        break;

      case "prepare":
        break;

      case "ready":
        try {
          module.hot.apply();
        } catch (e) {
          console.log(e.message);
          process.exit(0);
        };
        break;

      case "dispose":
        break;

      case "apply":
        break;

      default: // abort or fail
        process.exit(1);
        break;
    };
  }, process.env.WEBPACK_POLL_MS || 500);
}