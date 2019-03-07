"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Popup = require("../Popup");

var _Popup2 = _interopRequireDefault(_Popup);

var _Loader = require("../Loader");

var _Loader2 = _interopRequireDefault(_Loader);

var _SliderContent = require("../Slider/SliderContent");

var _SliderContent2 = _interopRequireDefault(_SliderContent);

var _IconContent = require("../Icon/IconContent");

var _IconContent2 = _interopRequireDefault(_IconContent);

var _Title = require("../Title");

var _Title2 = _interopRequireDefault(_Title);

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _HorizontalLineRegular = require("../HorizontalLines/HorizontalLineRegular");

var _HorizontalLineRegular2 = _interopRequireDefault(_HorizontalLineRegular);

var _Description = require("../Description");

var _Description2 = _interopRequireDefault(_Description);

var _IconClose = require("../Icon/IconClose");

var _IconClose2 = _interopRequireDefault(_IconClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtensionDetailPopup = function (_React$Component) {
  _inherits(ExtensionDetailPopup, _React$Component);

  function ExtensionDetailPopup() {
    _classCallCheck(this, ExtensionDetailPopup);

    return _possibleConstructorReturn(this, (ExtensionDetailPopup.__proto__ || Object.getPrototypeOf(ExtensionDetailPopup)).apply(this, arguments));
  }

  _createClass(ExtensionDetailPopup, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onCloseClicked = _props.onCloseClicked,
          modalDetails = _props.modalDetails,
          onVersionClicked = _props.onVersionClicked,
          onDeleteClicked = _props.onDeleteClicked,
          onUpdateClicked = _props.onUpdateClicked,
          onInstallClicked = _props.onInstallClicked,
          loading = _props.loading;

      if (modalDetails === null) {
        return null;
      }
      return _react2.default.createElement(
        _Popup2.default,
        { popupType: "big" },
        loading ? _react2.default.createElement(_Loader2.default, { fullContent: true }) : null,
        _react2.default.createElement(
          _SliderContent2.default,
          { images: modalDetails.images || [] },
          modalDetails.version.installed && modalDetails.version.outdated ? _react2.default.createElement(_IconContent2.default, {
            iconContentType: "update",
            iconContentColor: "orange white",
            onClick: function onClick() {
              onUpdateClicked(modalDetails.id, modalDetails.type);
            }
          }) : null,
          modalDetails.version.installed ? _react2.default.createElement(_IconContent2.default, {
            iconContentType: "delete",
            iconContentColor: "red white",
            onClick: function onClick() {
              onDeleteClicked(modalDetails.id, modalDetails.type);
            }
          }) : _react2.default.createElement(_IconContent2.default, {
            iconContentType: "add",
            iconContentColor: "green white",
            onClick: function onClick() {
              onInstallClicked(modalDetails.id, modalDetails.type);
            }
          })
        ),
        _react2.default.createElement(
          "div",
          { "class": "popup-header" },
          _react2.default.createElement(_Title2.default, { label: modalDetails.title }),
          _react2.default.createElement(_Subtitle2.default, { label: modalDetails.label }),
          _react2.default.createElement(_Button2.default, {
            onClick: function onClick() {
              onVersionClicked(modalDetails.id);
            },
            label: "Available " + modalDetails.version.available,
            buttonType: "regular",
            color: "blue"
          }),
          _react2.default.createElement(_Button2.default, {
            label: modalDetails.stability,
            buttonType: "bordered",
            color: "gray",
            style: { margin: "15px" }
          }),
          _react2.default.createElement(_Button2.default, {
            label: modalDetails.license,
            buttonType: "bordered",
            color: "orange"
          })
        ),
        _react2.default.createElement(_HorizontalLineRegular2.default, null),
        _react2.default.createElement(
          "div",
          { "class": "popup-body" },
          _react2.default.createElement(_Description2.default, {
            date: "Last update " + modalDetails.last_update
          }),
          _react2.default.createElement(_Description2.default, { title: "Description:" }),
          _react2.default.createElement(_Description2.default, { text: modalDetails.description })
        ),
        _react2.default.createElement(_HorizontalLineRegular2.default, null),
        _react2.default.createElement(
          "div",
          { className: "popup-footer" },
          _react2.default.createElement(_Description2.default, { note: modalDetails.release_note })
        ),
        _react2.default.createElement(_IconClose2.default, { iconType: "big", onClick: onCloseClicked })
      );
    }
  }]);

  return ExtensionDetailPopup;
}(_react2.default.Component);

exports.default = ExtensionDetailPopup;