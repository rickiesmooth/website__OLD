
/** @jsx h */
import { StyleSheet, css } from 'aphrodite/no-important'
import h from 'vhtml'
import { Heading, Paragraph } from '../text'
import { spacing } from '../../styles/spacing'
// import { styles as fonts } from './text'
import { AbnAmroLogo, VigourLogo, GoogleLogo, AmexLogo } from './logos'

function Job (props) {
  const jobInfo = props.data
  return (
    <div class={css(styles.Job)}>
      <div class={css(styles.Header)}>
        <span class={css(styles.Titles)}>
          <Heading tag='h3'>{jobInfo.jobTitle}</Heading>
          <Heading tag='h4'>{`${jobInfo.employer}`}</Heading>
          <Heading tag='h4'>{jobInfo.period}</Heading>
        </span>
        {
          jobInfo.logo === 'vigour' && <VigourLogo /> ||
          jobInfo.logo === 'abn' && <AbnAmroLogo /> ||
          jobInfo.logo === 'google' && <GoogleLogo /> ||
          jobInfo.logo === 'amex' && <AmexLogo />
        }
      </div>
      <div class={css(styles.Description)}>
        <Paragraph text={jobInfo.description} />
      </div>
      <Heading tag='h4'>My work:</Heading>
      <ul class={css(styles.List)}>
        {jobInfo.responsibilities.map((el, i) => (<li>{el}</li>))}
      </ul>
    </div>)
}

export function Experience (props) {
  return props.jobs.map((el, i) =>
    <Job data={el} />)
}

export const styles = StyleSheet.create({
  Job: {
    border: '1px solid rgba(0,0,0,.1)',
    borderRadius: '2px',
    fontSize: '14px',
    padding: spacing.space3,
    boxShadow: 'none',
    maxWidth: '630px',
    ':not(:last-child)': {
      marginBottom: spacing.space4
    }
  },
  Description: {
    marginBottom: spacing.space3
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.space3
  },
  Titles: {
    flexDirection: 'column',
    flex: 2
  },
  List: {
    listStylePosition: 'inside',
    display: 'inline-block'
  }
})
