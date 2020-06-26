import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en.js'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN.js'

Vue.use(VueI18n)

function loadLocaleMessages(): LocaleMessages {
  const locales = require.context(
    './locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages: LocaleMessages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })

  Object.assign(messages, {
    zh: zhLocale,
    en: enLocale
  })

  return messages
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

Vue.use(Element, {
  i18n: (key: string, value: LocaleMessages) => i18n.t(key, value)
})

export default i18n
