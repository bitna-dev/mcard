import Button from '@shared/Button'
import { writeBatch, collection, doc } from 'firebase/firestore'
import { store } from '@remote/firebase'
import { adBanners } from '@mock/data'
import { COLLECTIONS } from '@constants/index'

const AdBannerAddButton = () => {
  const bannerHandler = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))
      batch.set(docRef, banner)
    })
    await batch.commit()
    alert('배너 추가 완료')
  }
  return <Button onClick={bannerHandler}>배너리스트 추가하기</Button>
}

export default AdBannerAddButton
