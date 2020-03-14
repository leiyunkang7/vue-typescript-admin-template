import { computed, ref, toRefs, watch } from '@vue/composition-api'

export interface Page {
  [key: string]: unknown
  perPage: number
  total: number
  startPage: number
  currentPage: number
  lastPage: number
}

export const defaultPage = {
  perPage: 0,
  total: 0,
  startPage: 0,
  currentPage: 0,
  lastPage: 0
}

export default function usePagination(options: Page = defaultPage) {
  const { perPage = ref(10), total = ref(0), startPage = 1 } = toRefs<Page>(
    options
  )
  // Internal currentPage value
  const _currentPage = ref(startPage)
  // public readonly ref for the currentPage
  // changing the current Page is only possible through the povided methods (see below)
  const currentPage = computed(() => _currentPage.value)

  // Computed values
  const lastPage = computed(() =>
    total.value ? Math.ceil(total.value / perPage.value) : 0
  )
  const offset = computed(() =>
    Math.min((currentPage.value - 1) * perPage.value, total.value)
  )

  // Functions
  const set = (val: any) => {
    if (typeof val !== 'number') return
    _currentPage.value = minmax(val, 1, lastPage.value)
  }
  const prev = () => set(currentPage.value - 1)
  const next = () => set(currentPage.value + 1)
  const first = () => set(1)
  const last = () => set(lastPage.value)

  // lastPage may never be < currentPage
  watch(
    [total, perPage],
    () => {
      if (_currentPage.value > lastPage.value) {
        _currentPage.value = lastPage.value
      }
    },
    { lazy: true } // no need to run on first render
  )

  return {
    // Mutable state
    perPage,
    total,
    //Computed
    currentPage,
    lastPage,
    offset,
    // Functions
    next,
    prev,
    first,
    last,
    set
  }
}

function minmax(val: number, min: number, max: number) {
  if (val < min) return min
  if (val > max) return max
  return val
}
