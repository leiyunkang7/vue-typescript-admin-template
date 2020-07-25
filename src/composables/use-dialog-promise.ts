import { ref, watch } from '@vue/composition-api'

export default function useDialogPromise() {
  const visible = ref(false)

  const resolve = ref<(value?: unknown) => void>()

  watch(visible, visible => {
    if (!visible) {
      resolve.value && resolve.value()
    }
  })

  return {
    visible,
    open() {
      visible.value = true
      return new Promise(res => {
        resolve.value = res
      })
    }
  }
}
