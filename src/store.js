import { writable } from 'svelte/store'

export const persistStore = (key, initial) => {
  const persist = localStorage.getItem(key)
  const data = persist ? JSON.parse(persist) : initial
  //if sub is broken, sets value to current local storage value
  const store = writable(data, () => {
    const unsubscribe = store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    return unsubscribe
  })
  return store
} 

export const levelUnlocked = persistStore('levelUnlocked', 1)
export const levelCompleted = persistStore('levelCompleted', 0)
export const currentLevel = persistStore('currentLevel', 0)
export const dayLastCompleted = persistStore('dayLastCompleted', null)
export const records = persistStore('records', {})