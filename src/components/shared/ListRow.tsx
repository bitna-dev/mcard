import Flex from './Flex'
import { css } from '@emotion/react'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick: () => void
}
const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  onClick,
}: ListRowProps) => {
  return (
    <Flex as="li" css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}
const listRowTexts = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}
ListRow.Texts = listRowTexts

const listRowContainerStyles = css`
  padding: 8px 24px;
`
const listRowLeftStyles = css`
  margin-right: 14px;
`
const listRowContentsStyles = css`
  flex: 1;
`

const IconArrowRight = () => {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default ListRow
