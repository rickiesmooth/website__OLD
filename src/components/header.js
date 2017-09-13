/** @jsx h */
import { StyleSheet, css } from 'aphrodite/no-important'
import h from 'vhtml'
import { spacing } from '../styles/spacing'

export function Header (props) {
  // const { children } = props
  return <header class={css(styles.Header)}><Nav /></header>
}

export function Nav (props) {
  // const { children } = props
  return (
    <sc-nav class={css(styles.Menu)}>
      <Logo />
      <a class={css(styles.menuLinks)} href='/about/'>About</a>
      <a class={css(styles.menuLinks)} href='/experience/'>Experience</a>
      <a class={css(styles.menuLinks)} href='/contact/'>Contact</a>
    </sc-nav>
  )
}

export function Logo (props) {
  return <a class={css(styles.Home)} id='logo' href='/'>
    <div class={css(styles.Logo)} />
    <span class={css(styles.LogoText)}>Rick Smit</span>
  </a>
}

export const styles = StyleSheet.create({
  Header: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    textAlign: 'left',
    boxShadow: '0 2px 2px -2px rgba(0,0,0,.15)',
    background: 'white',
    padding: `0 ${spacing.space4}`
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
})
