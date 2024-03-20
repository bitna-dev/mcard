import Button from '@shared/Button'
import { card_list } from '@mock/data'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/index'

const CardListAddButton = () => {
  const dataHandler = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(docRef, card)
    })
    await batch.commit()
    alert('카드 추가 완료')
  }
  return <Button onClick={dataHandler}>카드리스트 추가하기</Button>
}

export default CardListAddButton

// https://firebase.google.com/docs/rules/basics?hl=ko
