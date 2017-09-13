'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
exports.Job = Job;

var _noImportant = require('aphrodite/no-important');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

var _text = require('./text');

var _spacing = require('../styles/spacing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { styles as fonts } from './text'

/** @jsx h */
function Job(props) {
  var jobInfo = props.data;
  return (0, _vhtml2.default)(
    'div',
    { 'class': (0, _noImportant.css)(styles.Job) },
    (0, _vhtml2.default)(
      'div',
      { 'class': (0, _noImportant.css)(styles.JobContainer) },
      (0, _vhtml2.default)(
        'div',
        { 'class': (0, _noImportant.css)(styles.Header) },
        (0, _vhtml2.default)(
          'span',
          { 'class': (0, _noImportant.css)(styles.Titles) },
          (0, _vhtml2.default)(
            _text.Heading,
            { tag: 'h3' },
            jobInfo.title
          ),
          (0, _vhtml2.default)(
            _text.Heading,
            { tag: 'h4' },
            jobInfo.company + ', ' + jobInfo.location
          ),
          (0, _vhtml2.default)(
            _text.Heading,
            { tag: 'h4' },
            jobInfo.period
          )
        ),
        (0, _vhtml2.default)('img', { 'class': (0, _noImportant.css)(styles.Logo), src: jobInfo.logo })
      ),
      (0, _vhtml2.default)(
        'p',
        { 'class': (0, _noImportant.css)(styles.Description) },
        jobInfo.work.description
      ),
      jobInfo.work.responsibilties.map(function (el, i) {
        return (0, _vhtml2.default)(
          'li',
          null,
          el
        );
      })
    )
  );
}

var styles = exports.styles = _noImportant.StyleSheet.create({
  Job: {
    border: '1px solid rgba(0,0,0,.1)',
    borderRadius: '2px',
    fontSize: '14px',
    padding: _spacing.spacing.space3,
    marginBottom: _spacing.spacing.space3,
    boxShadow: 'none',
    maxWidth: '630px'
  },
  ExperienceContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Titles: {
    flexDirection: 'column',
    flex: 2
  },
  Description: {
    margin: _spacing.spacing.space1 + ' 0'
  },
  Logo: {
    maxHeight: '45px'
  }
});