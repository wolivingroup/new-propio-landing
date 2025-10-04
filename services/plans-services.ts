import { environment } from '@/lib/firebase'
import { getApps, initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(environment.firebase) : getApps()[0]
const db = getFirestore(app)

export interface Store {
  id: string
  name: string
  description?: string
  owner: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  [key: string]: unknown
}

export async function getStores(): Promise<Store[]> {
  try {
    const storesCollection = collection(db, 'stores')
    const storesSnapshot = await getDocs(storesCollection)

    const stores: Store[] = []
    for (const doc of storesSnapshot.docs) {
      stores.push({
        id: doc.id,
        ...doc.data(),
      } as Store)
    }

    return stores
  } catch (error) {
    console.error('Error getting stores:', error)
    throw new Error('Failed to fetch stores from Firebase')
  }
}

export async function getStoreById(storeId: string): Promise<Store | null> {
  try {
    const stores = await getStores()
    return stores.find((store) => store.id === storeId) || null
  } catch (error) {
    console.error('Error getting store by ID:', error)
    return null
  }
}
