"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Wrapper = require("../Wrapper");

var _Wrapper2 = _interopRequireDefault(_Wrapper);

var _HorizontalLineContent = require("../HorizontalLines/HorizontalLineContent");

var _HorizontalLineContent2 = _interopRequireDefault(_HorizontalLineContent);

var _Card = require("../Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardItem = require("../Card/CardItem");

var _CardItem2 = _interopRequireDefault(_CardItem);

var _IconInfo = require("../Icon/IconInfo");

var _IconInfo2 = _interopRequireDefault(_IconInfo);

var _Title = require("../Title");

var _Title2 = _interopRequireDefault(_Title);

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Button = require("../Button");

var _Button2 = _interopRequireDefault(_Button);

var _IconContent = require("../Icon/IconContent");

var _IconContent2 = _interopRequireDefault(_IconContent);

var _ButtonAction = require("../Button/ButtonAction");

var _ButtonAction2 = _interopRequireDefault(_ButtonAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtensionsHolder = function (_React$Component) {
  _inherits(ExtensionsHolder, _React$Component);

  function ExtensionsHolder() {
    _classCallCheck(this, ExtensionsHolder);

    return _possibleConstructorReturn(this, (ExtensionsHolder.__proto__ || Object.getPrototypeOf(ExtensionsHolder)).apply(this, arguments));
  }

  _createClass(ExtensionsHolder, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          titleIcon = _props.titleIcon,
          entities = _props.entities,
          onCardClicked = _props.onCardClicked,
          onDelete = _props.onDelete,
          titleColor = _props.titleColor,
          onInstall = _props.onInstall,
          onUpdate = _props.onUpdate,
          updating = _props.updating,
          installing = _props.installing,
          type = _props.type;

      return _react2.default.createElement(
        _Wrapper2.default,
        null,
        _react2.default.createElement(_HorizontalLineContent2.default, { hrTitle: title }),
        _react2.default.createElement(
          _Card2.default,
          null,
          _react2.default.createElement(
            "div",
            { className: "container__row" },
            entities.map(function (entity) {
              return _react2.default.createElement(
                "div",
                {
                  onClick: onCardClicked.bind(_this2, entity.id),
                  className: "container__col-md-3 container__col-sm-6 container__col-xs-12"
                },
                _react2.default.createElement(
                  _CardItem2.default,
                  _extends({
                    itemBorderColor: entity.version.installed ? !entity.version.outdated ? "green" : "orange" : "gray"
                  }, entity.licence && entity.licence != "N/A" ? { itemFooterColor: "red" } : {}, entity.licence && entity.licence != "N/A" ? { itemFooterLabel: entity.licence } : {}),
                  entity.version.installed ? _react2.default.createElement(_IconInfo2.default, { iconName: "state green" }) : null,
                  _react2.default.createElement(
                    "div",
                    { className: "custom-title-heading" },
                    _react2.default.createElement(_Title2.default, {
                      titleColor: titleColor,
                      icon: titleIcon,
                      label: entity.description
                    }),
                    _react2.default.createElement(_Subtitle2.default, { label: "by " + entity.label })
                  ),
                  _react2.default.createElement(
                    _Button2.default,
                    {
                      onClick: function onClick(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var id = entity.id;
                        var version = entity.version;

                        if (version.outdated && !updating[entity.id]) {
                          onUpdate(id, type);
                        } else if (!version.installed && !installing[entity.id]) {
                          onInstall(id, type);
                        } else {
                          onCardClicked(id);
                        }
                      },
                      style: installing[entity.id] || updating[entity.id] ? {
                        opacity: "0.5"
                      } : {},
                      buttonType: entity.version.installed ? entity.version.outdated ? "regular" : "bordered" : "regular",
                      color: entity.version.installed ? entity.version.outdated ? "orange" : "blue" : "green",
                      label: "Available " + entity.version.available
                    },
                    !entity.version.installed ? _react2.default.createElement(_IconContent2.default, {
                      iconContentColor: "white",
                      iconContentType: "" + (installing[entity.id] ? "update" : "add"),
                      loading: installing[entity.id]
                    }) : entity.version.outdated ? _react2.default.createElement(_IconContent2.default, {
                      iconContentColor: "white",
                      iconContentType: "update",
                      loading: updating[entity.id]
                    }) : null
                  ),
                  entity.version.installed ? _react2.default.createElement(_ButtonAction2.default, {
                    buttonActionType: "delete",
                    buttonIconType: "delete",
                    iconColor: "gray",
                    onClick: function onClick(e) {
                      e.preventDefault();
                      e.stopPropagation();

                      onDelete(entity, type);
                    }
                  }) : null
                )
              );
            })
          )
        )
      );
    }
  }]);

  return ExtensionsHolder;
}(_react2.default.Component);

exports.default = ExtensionsHolder;