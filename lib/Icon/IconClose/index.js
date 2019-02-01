"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./close-icon.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconClose = function IconClose(_ref) {
  var iconType = _ref.iconType,
      onClick = _ref.onClick;
  return _react2.default.createElement("span", { onClick: onClick, className: "icon-close icon-close-" + iconType });
};

exports.default = IconClose;