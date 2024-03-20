import ListRow from '@shared/ListRow'
import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'

const CardList = () => {
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

  if (data == null) {
    return null
  }

  return (
    <div>
      <ul>
        <InfiniteScroll
          dataLength={cards.length} //This is important field to render the next data
          next={loadMore}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
        >
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
                right={card.payback != null ? <div>{card.payback}</div> : null}
                onClick={() => {}}
              />
            )
          })}
        </InfiniteScroll>
      </ul>
    </div>
  )
}

export default CardList
