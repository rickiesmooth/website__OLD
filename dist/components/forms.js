'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
exports.ContactForm = ContactForm;

var _noImportant = require('aphrodite/no-important');

var _spacing = require('../styles/spacing');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { styles as fonts } from './text'
function Input(props) {
  return (0, _vhtml2.default)(
    'p',
    { 'class': (0, _noImportant.css)(styles.Span) },
    (0, _vhtml2.default)(
      'label',
      { 'class': (0, _noImportant.css)(styles.Placeholder) },
      props.placeholder
    ),
    (0, _vhtml2.default)('input', {
      'class': (0, _noImportant.css)(styles.Input),
      name: props.name,
      type: props.type ? props.type : null,
      required: true
    })
  );
} /** @jsx h */


function MessageArea(props) {
  return (0, _vhtml2.default)(
    'p',
    { 'class': (0, _noImportant.css)(styles.Span) },
    (0, _vhtml2.default)(
      'label',
      { 'class': (0, _noImportant.css)(styles.Placeholder) },
      props.placeholder
    ),
    (0, _vhtml2.default)('textarea', { name: props.name, 'class': (0, _noImportant.css)(styles.Input) })
  );
}

function ContactForm(props) {
  return (0, _vhtml2.default)(
    'sc-form',
    null,
    (0, _vhtml2.default)(
      'form',
      { success: (0, _noImportant.css)(styles.Success), action: '/contact', method: 'post', 'class': (0, _noImportant.css)(styles.Form) },
      (0, _vhtml2.default)(Input, { name: 'name', placeholder: 'Your name' }),
      (0, _vhtml2.default)(Input, { name: 'email', placeholder: 'Your email', type: 'email' }),
      (0, _vhtml2.default)(MessageArea, { name: 'message', placeholder: 'Message' }),
      (0, _vhtml2.default)(
        'button',
        { 'class': (0, _noImportant.css)(styles.Button) },
        'Submit'
      )
    )
  );
}

var styles = exports.styles = _noImportant.StyleSheet.create({
  Form: {
    // maxWidth: '430px',
    maxWidth: '630px',
    margin: _spacing.spacing.space2
  },
  Success: {
    border: '1px solid green'
  },
  Span: {
    float: 'left',
    position: 'relative',
    marginBottom: '12px',
    ':not(:last-child):not(:nth-last-child(2))': {
      width: 'calc(50% - 6px)'
    },
    ':nth-last-child(2)': {
      width: '100%',
      height: '100px',
      resize: 'vertical',
      boxShadow: 'none'
    },
    ':nth-child(even):not(:last-child )': {
      float: 'right'
    }
  },
  Placeholder: {
    position: 'absolute',
    color: '#6f7c82',
    padding: '7px 9px',
    display: 'block',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    lineHeight: '1.5em',
    zIndex: '5'
  },
  Button: {
    float: 'right',
    background: 'linear-gradient(#5db6e8,#168eda 85%,#168eda 90%,#1d93dd)',
    padding: _spacing.spacing.space0 + ' ' + _spacing.spacing.space3,
    cursor: 'pointer',
    borderRadius: '5px',
    border: 0,
    color: 'white',
    lineHeight: 'inherit',
    fontSize: 'inherit',
    ':hover': {
      background: '#1d93dd'
    }
  },
  Input: {
    border: '1px solid #f2f2f2;',
    borderRadius: '5px',
    width: '100%',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    transition: 'border-color .3s ease',
    padding: '8px',
    height: 'inherit',
    ':focus': {
      border: '1px solid #5db6e8'
    }
  }
});