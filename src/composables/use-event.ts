import { onMounted, onDeactivated, ref, Ref } from '@vue/composition-api'
import { unwrap } from '@/composables/utils'

type ElType = HTMLHtmlElement | Document | null | Ref<any>

export default function useEvent(
  el: ElType = ref(document),
  name: string,
  handler: Function
) {
  let rawEl = unwrap(el)
  const remove = () => rawEl && rawEl.removeEventListener(name, handler)

  onMounted(() => rawEl && rawEl.addEventListener(name, handler))
  onDeactivated(remove)

  return remove
}
