/** @jsx h */
import { tagMapping, fontSize, fontWeight, lineHeight } from '../styles/typography'
import { StyleSheet, css } from 'aphrodite/no-important'
import { spacing } from '../styles/spacing'
import h from 'vhtml'

export function Heading (props) {
  const { children, tag: Tag } = props
  return <Tag class={css(styles[tagMapping[Tag]])}>{children}</Tag>
}

export function Headline (props) {
  const { children } = props
  return <h1 class={css(styles.displayLarge, styles.Headline)}>{children}</h1>
}

export function Subline (props) {
  const { children } = props
  return <h2 class={css(styles.displayMedium, styles.Subline)}>{children}</h2>
}

export function Title (props) {
  const { children } = props
  return <div class={css(styles.Title)}>{children}</div>
}

export function Description (props) {
  const { children } = props
  return <p class={css(styles.Description)}>{children}</p>
}

export const styles = StyleSheet.create({
  Title: {
    maxWidth: '630px',
    width: '100%',
    margin: `${spacing.space2} 0`
  },
  Headline: {
    marginBottom: spacing.space0
  },
  Subline: {
    color: 'rgba(162,164,181,.8)',
    fontWeight: fontWeight.light,
    lineHeight: '1.5',
    marginBottom: spacing.space0
  },
  Description: {
    maxWidth: '630px'
  },
  displayLarge: {
    fontSize: fontSize.displayLarge.initial,
    '@media (min-width: 768px)': {
      fontSize: fontSize.displayLarge.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: fontSize.displayLarge.desktop
    },
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.displayLarge
  },
  displayMedium: {
    fontSize: fontSize.displayMedium.initial,
    '@media (min-width: 768px)': {
      fontSize: fontSize.displayMedium.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: fontSize.displayMedium.desktop
    },
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.displayLarge
  },
  displaySmall: {
    fontSize: fontSize.displaySmall.initial,
    '@media (min-width: 768px)': {
      fontSize: fontSize.displaySmall.tablet
    },
    '@media (min-width: 1280px)': {
      fontSize: fontSize.displaySmall.desktop
    },
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.displaySmall
  },
  heading: {
    fontSize: fontSize.heading,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.heading
  },
  subheading: {
    fontSize: fontSize.subheading,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.subheading
  }
})
