<template>
  <div class="full-calendar-demo">
    <week-select v-model="week"></week-select>
    <FullCalendar
      ref="calendarRef"
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
            {{ arg.timeText }}
          </div>
        </el-popover>
      </template>

      <template v-slot:dayHeaderContent="args">
        <div class="header-content" @click="handleHeaderClick(args)">
          {{ $t(`weekName${args.dow}`) }}
          <div>{{ args.text }}</div>
        </div>
      </template>

      <template v-slot:moreLinkContent="args">
        {{ args }}
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
    "weekName0": "星期日"
  },
  "en": {
    "weekName1": "Mon",
    "weekName2": "Tue",
    "weekName3": "Wed",
    "weekName4": "Thu",
    "weekName5": "Fri",
    "weekName6": "Sat",
    "weekName0": "Sun"
  }
}
</i18n>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FullCalendar from '@fullcalendar/vue'
import useCalendarOptions from './use-calendar-options'
import { Popover } from 'element-ui'
import WeekSelect, { useWeeks } from '@/components/form/week-select'
import useCalendarRef from './use-calendar-ref'

export default defineComponent({
  name: 'FullCalendarDemo',

  components: {
    FullCalendar,
    WeekSelect,
    'el-popover': Popover
  },

  setup(props, context) {
    const { calendarOptions } = useCalendarOptions()

    const { date: week } = useWeeks()

    const { calendarRef } = useCalendarRef({ week, context })

    return {
      calendarOptions,
      calendarRef,
      week,
      handleHeaderClick(args: any) {
        console.table('头部单击事件', args)
      }
    }
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
