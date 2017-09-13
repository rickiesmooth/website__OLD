'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;
exports.Header = Header;
exports.Nav = Nav;
exports.Logo = Logo;

var _noImportant = require('aphrodite/no-important');

var _vhtml = require('vhtml');

var _vhtml2 = _interopRequireDefault(_vhtml);

var _spacing = require('../styles/spacing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Header(props) {
  // const { children } = props
  return (0, _vhtml2.default)(
    'header',
    { 'class': (0, _noImportant.css)(styles.Header) },
    (0, _vhtml2.default)(Nav, null)
  );
} /** @jsx h */
function Nav(props) {
  // const { children } = props
  return (0, _vhtml2.default)(
    'sc-nav',
    { 'class': (0, _noImportant.css)(styles.Menu) },
    (0, _vhtml2.default)(Logo, null),
    (0, _vhtml2.default)(
      'a',
      { 'class': (0, _noImportant.css)(styles.menuLinks), href: '/about/' },
      'About'
    ),
    (0, _vhtml2.default)(
      'a',
      { 'class': (0, _noImportant.css)(styles.menuLinks), href: '/experience/' },
      'Experience'
    ),
    (0, _vhtml2.default)(
      'a',
      { 'class': (0, _noImportant.css)(styles.menuLinks), href: '/contact/' },
      'Contact'
    )
  );
}

function Logo(props) {
  return (0, _vhtml2.default)(
    'a',
    { 'class': (0, _noImportant.css)(styles.Home), id: 'logo', href: '/' },
    (0, _vhtml2.default)('div', { 'class': (0, _noImportant.css)(styles.Logo) }),
    (0, _vhtml2.default)(
      'span',
      { 'class': (0, _noImportant.css)(styles.LogoText) },
      'Rick Smit'
    )
  );
}

var styles = exports.styles = _noImportant.StyleSheet.create({
  Header: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    textAlign: 'left',
    boxShadow: '0 2px 2px -2px rgba(0,0,0,.15)',
    background: 'white',
    padding: '0 ' + _spacing.spacing.space4
  },
  Home: {
    marginRight: '18px',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      marginRight: '56px'
    }
  },
  Menu: {
    maxWidth: '630px',
    margin: '0 auto',
    display: 'flex'
  },
  Logo: {
    'border-radius': '50%',
    background: '#BDD655',
    marginRight: '15px',
    display: 'inline-block',
    transition: '250ms -webkit-filter linear',
    pointerEvents: 'none',
    height: 'calc(var(--logoSize) * 3)',
    width: 'calc(var(--logoSize) * 3)',
    filter: 'blur(calc(var(--logoSize)))'
  },
  LogoText: {
    pointerEvents: 'none',
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'inline-block'
    }
  },
  menuLinks: {
    marginRight: '18px',
    position: 'relative',
    padding: '20px 0px',
    display: 'inline-block',
    borderBottom: '1px solid transparent',
    willChange: 'transform',
    transition: 'transform .15s ease-out, border-bottom .3s ease-in-out',
    left: '-145px',
    transform: 'translateX(145px)',
    ':nth-child(3)': {
      left: '-125px',
      transform: 'translateX(125px)'
    },
    ':nth-child(4)': {
      left: '-105px',
      transform: 'translateX(105px)'
    },
    ':hover': {
      borderBottom: '1px solid rgba(0,0,0,.3)'
    },
    '@media (min-width: 768px)': {
      marginRight: '56px'
    }
  }
});