<template>
  <div class="promise-dialog">
    <el-button type="text" @click="handleOpenDialog">点击打开 Dialog</el-button>
    <el-dialog title="提示" :visible.sync="visible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useDialogPromise from '@/composables/use-dialog-promise'

export default defineComponent({
  name: 'PromiseDialog',
  setup() {
    const { visible, open } = useDialogPromise()

    return {
      visible,
      async handleOpenDialog() {
        await open()

        debugger
      }
    }
  }
})
</script>

<style lang="less" scoped>
.promise-dialog {
}
</style>
