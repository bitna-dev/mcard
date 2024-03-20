import { getCard } from '@remote/card'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Top from '@shared/Top'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

const CardPage = () => {
  const { id = '' } = useParams()
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })
  console.log('data= ', data)

  if (data == null) {
    return null
  }
  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtml(promotion.title) : tags.join(', ')
  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle}></Top>
      <ul>
        {benefit.map((item, index) => (
          <ListRow
            left={<IconCheck />}
            key={item}
            contents={
              <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={item} />
            }
            onClick={() => {}}
          ></ListRow>
        ))}
      </ul>
      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold typography="t7">
            유의사항
          </Text>
          <Text typography="t8">{removeHtml(promotion.terms)}</Text>
        </Flex>
      ) : null}
      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

export default CardPage

const removeHtml = (text: string) => {
  let output = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const IconCheck = () => {
  return (
    <svg
      data-name="Layer 1"
      id="Layer_1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
    >
      <path
        d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"
        fill="#6563ff"
      />
    </svg>
  )
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`
