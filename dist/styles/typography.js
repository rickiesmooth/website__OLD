'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fontSize = exports.fontSize = {
  // heading
  displayLarge: {
    initial: '28px',
    tablet: '32px',
    desktop: '52px'
  }, // 32
  displayMedium: {
    initial: '22px',
    tablet: '26px',
    desktop: '28px'
  },
  displaySmall: {
    initial: '16px',
    tablet: '16px',
    desktop: '16px'
  }, // 20
  heading: '14px', // 18
  subheading: '12px',

  // body
  body: '18px',
  caption: '16px'
};

var fontWeight = exports.fontWeight = {
  bold: 700,
  semibold: 600,
  normal: 400,
  light: 200
};

var tagMapping = exports.tagMapping = {
  h1: 'displayLarge',
  h2: 'displayMedium',
  h3: 'displaySmall',
  h4: 'heading',
  h5: 'subheading',
  p: 'body'
};

var lineHeight = exports.lineHeight = {
  // heading
  displayLarge: 1,
  displayMedium: 1,
  displaySmall: 1.5,
  heading: 1.5,
  subheading: 1.5,

  // body
  body: '1.58',
  caption: '1.58'

  // line-height: 1.58;
  // font-size: 18px;

};