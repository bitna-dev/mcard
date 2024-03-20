import React, {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import Input from './Input'
import Text from './Text'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, onFocus, onBlur, helpMessage, ...props },
    ref,
  ) {
    // 포커스처리
    const [focused, setFocused] = useState(false)
    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true)
      onFocus?.(e)
    }
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false)
      onBlur?.(e)
    }
    const labelColor = hasError ? 'red' : focused ? 'blue' : 'grey'
    return (
      <div>
        {label ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
