import styled from '@emotion/styled'

interface SpacingProbs {
  size: number
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProbs>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px` : `width:${size}px`}
`
export default Spacing
