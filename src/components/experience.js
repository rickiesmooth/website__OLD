
/** @jsx h */
import { StyleSheet, css } from 'aphrodite/no-important'
import h from 'vhtml'
import { Heading } from './text'
import { spacing } from '../styles/spacing'
// import { styles as fonts } from './text'

export function Job (props) {
  const jobInfo = props.data
  return (
    <div class={css(styles.Job)}>
      <div class={css(styles.JobContainer)}>
        <div class={css(styles.Header)}>
          <span class={css(styles.Titles)}>
            <Heading tag='h3'>{jobInfo.title}</Heading>
            <Heading tag='h4'>{`${jobInfo.company}, ${jobInfo.location}`}</Heading>
            <Heading tag='h4'>{jobInfo.period}</Heading>
          </span>
          <img class={css(styles.Logo)} src={jobInfo.logo} />
        </div>
        <p class={css(styles.Description)}>{jobInfo.work.description}</p>
        {jobInfo.work.responsibilties.map((el, i) => (<li>{el}</li>))}
      </div>
    </div>)
}

export const styles = StyleSheet.create({
  Job: {
    border: '1px solid rgba(0,0,0,.1)',
    borderRadius: '2px',
    fontSize: '14px',
    padding: spacing.space3,
    marginBottom: spacing.space3,
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
    margin: `${spacing.space1} 0`
  },
  Logo: {
    maxHeight: '45px'
  }
})
