'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
exports.Heading = Heading;
exports.Headline = Headline;
exports.Subline = Subline;
exports.Title = Title;
exports.Description = Description;

var _typography = require('../styles/typography');

var _noImportant = require('aphrodite/no-important');

var _spacing = require('../styles/spacing');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function Heading(props) {
  var children = props.children,
      Tag = props.tag;

  return (0, _vhtml2.default)(
    Tag,
    { 'class': (0, _noImportant.css)(styles[_typography.tagMapping[Tag]]) },
    children
  );
}

function Headline(props) {
  var children = props.children;

  return (0, _vhtml2.default)(
    'h1',
    { 'class': (0, _noImportant.css)(styles.displayLarge, styles.Headline) },
    children
  );
}

function Subline(props) {
  var children = props.children;

  return (0, _vhtml2.default)(
    'h2',
    { 'class': (0, _noImportant.css)(styles.displayMedium, styles.Subline) },
    children
  );
}

function Title(props) {
  var children = props.children;

  return (0, _vhtml2.default)(
    'div',
    { 'class': (0, _noImportant.css)(styles.Title) },
    children
  );
}

function Description(props) {
  var children = props.children;

  return (0, _vhtml2.default)(
    'p',
    { 'class': (0, _noImportant.css)(styles.Description) },
    children
  );
}

var styles = exports.styles = _noImportant.StyleSheet.create({
  Title: {
    maxWidth: '630px',
    width: '100%',
    margin: _spacing.spacing.space2 + ' 0'
  },
  Headline: {
    marginBottom: _spacing.spacing.space0
  },
  Subline: {
    color: 'rgba(162,164,181,.8)',
    fontWeight: _typography.fontWeight.light,
    lineHeight: '1.5',
    marginBottom: _spacing.spacing.space0
  },
  Description: {
    maxWidth: '630px'
  },
  displayLarge: {
    fontSize: _typography.fontSize.displayLarge.initial,
    '@media (min-width: 768px)': {
      fontSize: _typography.fontSize.displayLarge.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: _typography.fontSize.displayLarge.desktop
    },
    fontWeight: _typography.fontWeight.bold,
    lineHeight: _typography.lineHeight.displayLarge
  },
  displayMedium: {
    fontSize: _typography.fontSize.displayMedium.initial,
    '@media (min-width: 768px)': {
      fontSize: _typography.fontSize.displayMedium.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: _typography.fontSize.displayMedium.desktop
    },
    fontWeight: _typography.fontWeight.normal,
    lineHeight: _typography.lineHeight.displayLarge
  },
  displaySmall: {
    fontSize: _typography.fontSize.displaySmall.initial,
    '@media (min-width: 768px)': {
      fontSize: _typography.fontSize.displaySmall.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: _typography.fontSize.displaySmall.desktop
    },
    fontWeight: _typography.fontWeight.bold,
    lineHeight: _typography.lineHeight.displaySmall
  },
  heading: {
    fontSize: _typography.fontSize.heading,
    fontWeight: _typography.fontWeight.bold,
    lineHeight: _typography.lineHeight.heading
  },
  subheading: {
    fontSize: _typography.fontSize.subheading,
    fontWeight: _typography.fontWeight.bold,
    lineHeight: _typography.lineHeight.subheading
  }
});