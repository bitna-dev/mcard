import ListRow from '@shared/ListRow'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const navigate = useNavigate()

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])
  const cards = flatten(data?.pages.map(({ items }) => items))
  console.log(data)

  if (data == null) {
    return null
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length} //This is important field to render the next data
        next={loadMore}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        scrollThreshold="30px"
      >
        <ul>
          {cards?.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                // left={<div></div>}
                withArrow
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
