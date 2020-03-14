import { ref, onDeactivated } from '@vue/composition-api'
import json2mq from 'json2mq'

export function useMedia(query: string) {
  if (typeof query === 'object') {
    query = json2mq(query)
  }
  const result = ref(null)
  const mqlist = window.matchMedia(query)

  const handler = (e: any) => (result.value = e.matches)
  mqlist.addListener(handler)
  onDeactivated(() => mqlist.removeListener(handler))

  return result
}
