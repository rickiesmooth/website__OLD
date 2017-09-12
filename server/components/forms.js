/** @jsx h */
import { StyleSheet } from 'aphrodite/no-important'
import Css from '../styles/css'
// import { styles as fonts } from './text'
import { spacing } from '../styles/spacing'
import h from 'vhtml'

function Input (props) {
  return <p class={Css(styles.Span)}>
    <label class={Css(styles.Placeholder)}>{props.placeholder}</label>
    <input
      class={Css(styles.Input)}
      name={props.name}
      type={props.type ? props.type : null}
      required
    />
  </p>
}

function MessageArea (props) {
  return <p class={Css(styles.Span)} >
    <label class={Css(styles.Placeholder)} >{props.placeholder}</label>
    <textarea name={props.name} class={Css(styles.Input)} />
  </p>
}

export function ContactForm (props) {
  return <sc-form>
    <form success={Css(styles.Success)} action='/contact' method='post' class={Css(styles.Form)}>
      <Input name='name' placeholder='Your name' />
      <Input name='email' placeholder='Your email' type='email' />
      <MessageArea name='message' placeholder='Message' />
      <button class={Css(styles.Button)}>{'Submit'}</button>
    </form>
  </sc-form>
}

export const styles = StyleSheet.create({
  Form: {
    // maxWidth: '430px',
    maxWidth: '630px',
    margin: spacing.space2
  },
  Success: {
    border: '1px solid green'
  },
  Span: {
    float: 'left',
    position: 'relative',
    marginBottom: '12px',
    ':not(:last-child):not(:nth-last-child(2))': {
      width: `calc(50% - 6px)`
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
    padding: `${spacing.space0} ${spacing.space3}`,
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
})
