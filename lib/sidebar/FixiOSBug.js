"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _document = document,
    body = _document.body;
var _default = {
  computed: {
    device: function device() {
      return this.$_isMobile() ? 'mobile' : 'desktop';
    }
  },
  mounted: function mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS();
  },
  methods: {
    $_isMobile: function $_isMobile() {
      var rect = body.getBoundingClientRect();
      return rect.width - 1 < 992;
    },
    fixBugIniOS: function fixBugIniOS() {
      var _this = this;

      var $subMenu = this.$refs.subMenu;

      if ($subMenu) {
        var handleMouseleave = $subMenu.handleMouseleave;

        $subMenu.handleMouseleave = function (e) {
          if (_this.device === 'mobile') {
            return;
          }

          handleMouseleave(e);
        };
      }
    }
  }
};
exports.default = _default;