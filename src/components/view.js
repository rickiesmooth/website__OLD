/** @jsx h */
import { StyleSheet, css } from 'aphrodite/no-important'
import h from 'vhtml'
import { spacing } from '../styles/spacing'
import { Title, Headline, Subline, Description, ContactForm, Job } from './'

const Default = (props) => {
  const { route, remote, children, data } = props
  const target = (route === 'home') ? '^/$' : route
  return <sc-view remote={remote} class={css(styles.View)} route={target}>
    <Container target={target}>
      <Title>
        <Headline tag='h1'> { data.headline } </Headline>
        { data.subline &&
        <Subline tag='h2'>{ data.subline }</Subline> }
      </Title>
      { data.description &&
      <Description>{data.description}</Description> }
      { children }
    </Container>
  </sc-view>
}

export function View (props) {
  const { route, remote, data } = props
  const target = (route === 'home') ? '^/$' : `^/${route}/(.*)`
  if (data) {
    if (!data.template) {
      return <Default data={data} route={target} />
    } else if (data.template === 'contact') {
      return <Default data={data} route={target}><ContactForm /></ Default>
    } else if (data.template === 'experience') {
      return (
        <Default data={data} route={target}>{
          data.list.map((el, i) =>
            <Job data={el} />)
        }
        </Default>
      )
    }
  } else {
    return <sc-view remote={remote} class={css(styles.View)} route={target} />
  }
}

export function Container (props) {
  const { children } = props

  return <div class={css(styles.Main)}><div class={css(styles.Container)}>{children}</div></div>
}

export function GeneratedStyles (props) {
  return <script type='application/ld+json'> {'__GENERATED_STYLES'} </script>
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
