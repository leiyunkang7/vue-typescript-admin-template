import StaticAxios, {
  AxiosStatic,
  AxiosPromise,
  AxiosRequestConfig
} from 'axios'
import LRU from 'lru-cache'
import { ref, watch, onUnmounted, computed } from '@vue/composition-api'

const actions = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_END: 'REQUEST_END'
}

export function makeUseAxios(configurationOptions?: any) {
  let cache: any
  let axiosInstance: AxiosStatic

  const __ssrPromises: AxiosPromise<any>[] = []

  function resetConfigure() {
    cache = new LRU()
    axiosInstance = StaticAxios
  }

  resetConfigure()

  function configure(options: any = {}) {
    if (options.axios) {
      axiosInstance = options.axios
    }

    if (options.cache) {
      cache = options.cache
    }
  }

  configure(configurationOptions)

  function loadCache(data: any) {
    cache.load(data)
  }

  async function serializeCache() {
    const ssrPromisesCopy = [...__ssrPromises]

    __ssrPromises.length = 0

    await Promise.all(ssrPromisesCopy)

    return cache.dump()
  }

  async function cacheAdapter(config: AxiosRequestConfig) {
    const cacheKey = JSON.stringify(config)
    const hit = cache.get(cacheKey)

    if (hit) {
      return hit
    }

    delete config.adapter

    const response = await axiosInstance(config)

    const responseForCache = { ...response }
    delete responseForCache.config
    delete responseForCache.request

    cache.set(cacheKey, responseForCache)

    return response
  }

  function createInitialState(options: any) {
    return {
      loading: !options.manual
    }
  }

  function reducer(state: any, action: any) {
    switch (action.type) {
      case actions.REQUEST_START:
        return {
          ...state,
          loading: true,
          error: null
        }
      case actions.REQUEST_END:
        return {
          ...state,
          loading: false,
          ...(action.error ? {} : { data: action.payload.data }),
          [action.error ? 'error' : 'response']: action.payload
        }
      default:
        return state
    }
  }

  async function request(config: AxiosRequestConfig, dispatch: Function) {
    try {
      dispatch({ type: actions.REQUEST_START })
      const response = await axiosInstance(config)
      dispatch({ type: actions.REQUEST_END, payload: response })
      return response
    } catch (err) {
      if (StaticAxios.isCancel(err)) {
        return
      }

      dispatch({ type: actions.REQUEST_END, payload: err, error: true })
      throw err
    }
  }

  function executeRequestWithCache(
    config: AxiosRequestConfig,
    dispatch: Function
  ) {
    return request({ ...config, adapter: cacheAdapter }, dispatch)
  }

  function executeRequestWithoutCache(
    config: AxiosRequestConfig,
    dispatch: Function
  ) {
    return request(config, dispatch)
  }

  function executeRequest(
    config: AxiosRequestConfig,
    options: any,
    dispatch: Function
  ) {
    if (options.useCache) {
      return executeRequestWithCache(config, dispatch)
    }

    return executeRequestWithoutCache(config, dispatch)
  }

  function useAxios(config: AxiosRequestConfig, options: any) {
    if (typeof config === 'string') {
      config = {
        url: config
      }
    }

    const configRef = ref(config)

    options = { manual: false, useCache: true, ...options }

    const cancelSourceRef = ref({} as any)

    let selfState = ref(createInitialState(options) as any)

    let state = computed({
      get: () => selfState.value,
      set: val => (selfState.value = val)
    })

    function dispatch(action: any) {
      state.value = reducer(state.value, action)
    }

    // const [state, dispatch] = useReducer(reducer, createInitialState(options))

    if (typeof window === 'undefined' && !options.manual) {
      ;(useAxios as any).__ssrPromises.push(
        axiosInstance({ ...config, adapter: cacheAdapter })
      )
    }

    watch(configRef, () => {
      cancelSourceRef.value = StaticAxios.CancelToken.source()

      if (!options.manual) {
        executeRequest(
          { cancelToken: cancelSourceRef.value.token, ...config },
          options,
          dispatch
        ).catch(() => {})
      }
    })

    onUnmounted(() => {
      cancelSourceRef.value.cancel()
    })

    const refetch = (configOverride: AxiosRequestConfig, options: any) => {
      return executeRequest(
        {
          cancelToken: cancelSourceRef.value.token,
          ...config,
          ...configOverride
        },
        { useCache: false, ...options },
        dispatch
      )
    }

    return { state, refetch }
  }

  return Object.assign(useAxios, {
    __ssrPromises,
    resetConfigure,
    configure,
    loadCache,
    serializeCache
  })
}

const defaultUseAxios = makeUseAxios()

const {
  __ssrPromises,
  resetConfigure,
  configure,
  loadCache,
  serializeCache
} = defaultUseAxios

export default defaultUseAxios

export { __ssrPromises, resetConfigure, configure, loadCache, serializeCache }
