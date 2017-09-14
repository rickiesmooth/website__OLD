/** @jsx h */
import { StyleSheet, css } from 'aphrodite/no-important'
import h from 'vhtml'
import { spacing } from '../styles/spacing'

export function View (props) {
  const { children, route, remote } = props
  const target = (route === 'home') ? '^/$' : `^/${route}/(.*)`
  return <sc-view remote={remote} class={css(styles.View)} route={target}>{children}</sc-view>
}

export function Container (props) {
  const { children } = props

  return <div class={css(styles.Main)}><div class={css(styles.Container)}>{children}</div></div>
}

export const styles = StyleSheet.create({
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
    margin: `0 auto`,
    padding: `0 ${spacing.space2}`,
    maxWidth: '1320px',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    minHeight: '100%',
    '@media (min-width: 340px)': {
      padding: `0 ${spacing.space4}`,
      maxWidth: '1350px'
    },
    '@media (min-width: 768px)': {
      padding: `0 ${spacing.space5}`,
      maxWidth: '1410px'
    }
  },
  Main: {
    overflow: 'scroll',
    width: '100%'
  }
})
