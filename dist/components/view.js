'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
exports.View = View;
exports.Container = Container;
exports.GeneratedStyles = GeneratedStyles;

var _noImportant = require('aphrodite/no-important');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

var _spacing = require('../styles/spacing');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var Default = function Default(props) {
  var route = props.route,
      remote = props.remote,
      children = props.children,
      data = props.data;

  var target = route === 'home' ? '^/$' : route;
  return (0, _vhtml2.default)(
    'sc-view',
    { remote: remote, 'class': (0, _noImportant.css)(styles.View), route: target },
    (0, _vhtml2.default)(
      Container,
      { target: target },
      (0, _vhtml2.default)(
        _.Title,
        null,
        (0, _vhtml2.default)(
          _.Headline,
          { tag: 'h1' },
          ' ',
          data.headline,
          ' '
        ),
        data.subline && (0, _vhtml2.default)(
          _.Subline,
          { tag: 'h2' },
          data.subline
        )
      ),
      data.description && (0, _vhtml2.default)(
        _.Description,
        null,
        data.description
      ),
      children
    )
  );
};

function View(props) {
  var route = props.route,
      remote = props.remote,
      data = props.data;

  var target = route === 'home' ? '^/$' : '^/' + route + '/(.*)';
  if (data) {
    if (!data.template) {
      return (0, _vhtml2.default)(Default, { data: data, route: target });
    } else if (data.template === 'contact') {
      return (0, _vhtml2.default)(
        Default,
        { data: data, route: target },
        (0, _vhtml2.default)(_.ContactForm, null)
      );
    } else if (data.template === 'experience') {
      return (0, _vhtml2.default)(
        Default,
        { data: data, route: target },
        data.list.map(function (el, i) {
          return (0, _vhtml2.default)(_.Job, { data: el });
        })
      );
    }
  } else {
    return (0, _vhtml2.default)('sc-view', { remote: remote, 'class': (0, _noImportant.css)(styles.View), route: target });
  }
}

function Container(props) {
  var children = props.children;


  return (0, _vhtml2.default)(
    'div',
    { 'class': (0, _noImportant.css)(styles.Main) },
    (0, _vhtml2.default)(
      'div',
      { 'class': (0, _noImportant.css)(styles.Container) },
      children
    )
  );
}

function GeneratedStyles(props) {
  return (0, _vhtml2.default)(
    'script',
    { type: 'application/ld+json' },
    ' ',
    '__GENERATED_STYLES',
    ' '
  );
}

var styles = exports.styles = _noImportant.StyleSheet.create({
  View: {
    width: '100%',
    height: 'calc(100% - 69px)',
    right: 0,
    bottom: 0,
    position: 'fixed',
    contain: 'strict',
    opacity: '0',
    willChange: 'opacity',
    transition: 'opacity 0.3s cubic-bezier(0,0,0.3,1)',
    display: 'flex',
    pointerEvents: 'none',
    '-webkit-overflow-scrolling': 'touch'
  },
  Container: {
    margin: '0 auto',
    padding: '0 ' + _spacing.spacing.space2,
    maxWidth: '1320px',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    minHeight: '100%',
    '@media (min-width: 340px)': {
      padding: '0 ' + _spacing.spacing.space4,
      maxWidth: '1350px'
    },
    '@media (min-width: 768px)': {
      padding: '0 ' + _spacing.spacing.space5,
      maxWidth: '1410px'
    }
  },
  Main: {
    overflow: 'scroll',
    width: '100%'
  }
});