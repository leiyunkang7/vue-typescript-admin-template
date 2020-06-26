<template>
  <div class="full-calendar-demo">
    <week-select v-model="week"></week-select>
    <FullCalendar
      ref="fullCalendar"
      class="app-calendar"
      :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <el-popover placement="top-start" width="200" trigger="hover">
          <div class="reference" slot="reference">
            自定义内容爽歪歪
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </div>

          <div>
            这是一段内容,这是一段内容,这是一段内容,这是一段内容。
          </div>
        </el-popover>
      </template>

      <template v-slot:dayHeaderContent="{ dow }">
        {{ $t(`weekName${dow}`) }}
      </template>
    </FullCalendar>
  </div>
</template>

<i18n>
{
  "zh": {
    "weekName1": "星期一",
    "weekName2": "星期二",
    "weekName3": "星期三",
    "weekName4": "星期四",
    "weekName5": "星期五",
    "weekName6": "星期六",
    "weekName7": "星期日"
  },
  "en": {
    "weekName1": "星期一",
    "weekName2": "星期二",
    "weekName3": "星期三",
    "weekName4": "星期四",
    "weekName5": "星期五",
    "weekName6": "星期六",
    "weekName7": "星期日"
  }
}
</i18n>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import FullCalendar from '@fullcalendar/vue'
import useCalendarOptions from './use-calendar-options'
import { Popover } from 'element-ui'
import WeekSelect, { useWeeks } from '@/components/form/week-select'

export default defineComponent({
  name: 'FullCalendarDemo',

  components: {
    FullCalendar,
    WeekSelect,
    'el-popover': Popover
  },

  setup() {
    const { calendarOptions } = useCalendarOptions()

    const fullCalendar = ref<any>(null)

    const { date: week } = useWeeks()

    return { calendarOptions, fullCalendar, week }
  }
})
</script>

<style lang="less" scoped>
.full-calendar-demo {
  .app-calendar {
    // height: 800px;
  }
  .reference {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
