import { css } from '@emotion/react'
import React from 'react'
import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subTitle: string
}
const Top = ({ title, subTitle }: TopProps) => {
  return (
    <Flex direction="column" css={ContainerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const ContainerStyles = css`
  padding: 24px;
`

export default Top
