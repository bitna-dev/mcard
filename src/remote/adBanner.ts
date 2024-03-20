import { getDocs, collection } from 'firebase/firestore'
import { store } from '@remote/firebase'

import { COLLECTIONS } from '@constants/index'
import { AdBanner } from '@models/adBanner'

export const getAdBanners = async () => {
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )
  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
