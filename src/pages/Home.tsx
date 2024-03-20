import Top from '@shared/Top'
import AdBanners from '@home/AdBanners'
import CardList from '@home/CardList'
// import { useEffect } from 'react'
// import { getCards } from '@remote/card'

const Home = () => {
  // useEffect(() => {
  //   getCards().then((res) => {
  //     console.log('res===', res)
  //   })
  // }, [])
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해 혜택 좋은 카드를 모아봤어요."
      />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default Home
