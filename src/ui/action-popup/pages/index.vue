<script setup lang="ts">
import { ref } from "vue"
import { sendMessage } from "webext-bridge/popup"
import type { TabsItem } from "@nuxt/ui"

const mapboxVarible = ref('')
const curTab = ref("center")
const centerArr = ref([])
const zoom = ref(22)
const items = ref<TabsItem[]>([
  {
    label: "中心点定位",
    icon: "i-lucide-user",
    value: "center",
  },
])

const getVar = async () => {
  const toast = useToast()

  if (!mapboxVarible.value) {
    toast.add({
      title: "提示",
      description: "未输入变量名称",
      color: "warning",
    })
    return
  }
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })
  const res = await sendMessage(
    "get-page-window-info",
    { name: mapboxVarible.value },
    {
      context: "content-script",
      tabId: tab.id, // ✅ 关键！必须加
    },
  )
  console.log("收到回复：", res)
}

const handleSetLockVarible = () => {
  localStorage.setItem('mapbox_varible', mapboxVarible.value || '')
}

const setMapboxVarible = () => {
  const   variable = localStorage.getItem('mapbox_varible')
  if (variable) {
    mapboxVarible.value = variable || ''
  }
}
onMounted(() => {
  setMapboxVarible()
})
</script>

<template>
  <UTabs
    v-model="curTab"
    :items="items"
    class="w-full"
  />

  <UCard v-show="curTab === 'center'">
    <div class="flex items-center gap-1 mb-1.5 panel__item">
      <div class="w-1/2 whitespace-nowrap">mapbox 对象实例变量:</div>
      <UInput
        v-model="mapboxVarible"
        class="w-full"
      />
      <span
        v-if="mapboxVarible"
        @click="handleSetLockVarible"
        class="cursor-pointer"
      >
        锁
      </span>
    </div>

    <div class="flex items-center gap-1 mb-1.5 panel__item">
      <div class="whitespace-nowrap">中心点(数组格式):</div>
      <UInput
        v-model="centerArr"
        class="flex-1"
      />
    </div>

    <div class="flex items-center gap-1 mb-1.5 panel__item">
      <div class="whitespace-nowrap">层级 :</div>
      <UInput
        v-model="zoom"
        class="flex-1"
      />
    </div>

    <div class="flex justify-end gap-1 mb-1.5 panel__item">
      <UButton
        class="mb-4"
        @click="getVar"
      >
        定位
      </UButton>
    </div>
  </UCard>
</template>

<style scoped></style>
