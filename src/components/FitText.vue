<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
(function() {
  var addEvent = function(el, type, fn) {
    if (el.addEventListener) el.addEventListener(type, fn, false);
    else el.attachEvent("on" + type, fn);
  };

  var extend = function(obj, ext) {
    for (var key in ext) if (ext.hasOwnProperty(key)) obj[key] = ext[key];
    return obj;
  };

  window.fitText = function(el, kompressor, options) {
    var settings = extend(
      {
        minFontSize: -1 / 0,
        maxFontSize: 1 / 0
      },
      options
    );

    var fit = function(el) {
      var compressor = kompressor || 1;

      var resizer = function() {
        el.style.fontSize =
          Math.max(
            Math.min(
              el.clientWidth / (compressor * 10),
              parseFloat(settings.maxFontSize)
            ),
            parseFloat(settings.minFontSize)
          ) + "px";
      };

      // Call once to set.
      resizer();

      // Bind events
      // If you have any js library which support Events, replace this part
      // and remove addEvent function (or use original jQuery version)
      addEvent(window, "resize", resizer);
      addEvent(window, "orientationchange", resizer);
    };

    if (el.length) for (var i = 0; i < el.length; i++) fit(el[i]);
    else fit(el);

    // return set of elements
    return el;
  };
})();
export default {
  props: {
    targetLineCount: {
      default: 1,
      type: Number
    },
    unit: {
      default: "em",
      type: String
    },
    min: {
      default: 0.5,
      type: Number
    },
    max: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      observer: null
    };
  },
  methods: {
    calculate() {
      let element = this.$el;
      console.log("asdasd");
      window.fitText(element);
    }
  },
  mounted() {
    console.log("mounteds");
    this.calculate();
    if ("MutationObserver" in window && this.observer === null) {
      // Create the observer (and what to do on changes...)
      this.observer = new MutationObserver(this.calculate);
      // Setup the observer
      this.observer.observe(this.$el, { subtree: true, characterData: true });
    }
  },
  beforeDestroy: function() {
    // Clean up
    this.observer.disconnect();
  }
};
</script>