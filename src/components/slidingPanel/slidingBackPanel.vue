<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue'

// 接收父组件传递的值
const props = defineProps({
  value: {
    // type: Number,
    // required: true
  }
})
console.log(props)

const emit = defineEmits(['update:value'])

const sliderContainer = ref(null)
const sliderHandle = ref(null)
const isDragging = ref(false)

// 初始化时设置滑块位置
const updateSliderPosition = (newValue) => {
  const rect = sliderContainer.value.getBoundingClientRect()
  const offsetX = (newValue / 100) * rect.width // 计算滑块位置
  sliderHandle.value.style.left = `${offsetX}px`
}

// 拖动开始
const startDragging = (event) => {
  isDragging.value = true
  document.body.style.userSelect = 'none' // 禁止选中文本
  document.body.style.cursor = 'ew-resize' // 设置鼠标为双箭头

  // 设置初始偏移
  const rect = sliderContainer.value.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  sliderHandle.value.style.left = `${offsetX}px`

  // 添加鼠标移动和松开事件
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopDragging)
}

// 拖动结束
const stopDragging = () => {
  isDragging.value = false
  document.body.style.userSelect = '' // 恢复文本选择
  document.body.style.cursor = '' // 恢复默认鼠标样式

  // 移除事件监听器
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopDragging)
}

// 拖动过程中
const handleMouseMove = (event) => {
  if (!isDragging.value) return

  const rect = sliderContainer.value.getBoundingClientRect()
  let offsetX = event.clientX - rect.left // 获取鼠标在容器中的位置

  // 限制滑块不能超出容器的左右边缘，稍微留出一点距离
  offsetX = Math.max(5, Math.min(offsetX, rect.width - 5))

  // 更新滑块位置
  sliderHandle.value.style.left = `${offsetX}px`

  // 计算新的滑块值（假设最大值为100）
  const newValue = Math.round((offsetX / rect.width) * 100)
  emit('update:value', newValue)
}

// 监听父组件传递的值
watch(() => props.value, (newValue) => {
  updateSliderPosition(newValue)
})

onMounted(() => {
  updateSliderPosition(props.value) // 初始化时设置滑块位置
})

onUnmounted(() => {
  // 确保组件销毁时移除所有事件监听器
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopDragging)
})
</script>

<template>
  <div class="slider-container" ref="sliderContainer" @mousedown="startDragging">
    <div class="slider-handle" ref="sliderHandle"></div>
  </div>
</template>

<style scoped>
/* 外层容器 */
.slider-container {
  position: relative;
  width: 60px;
  /* 容器的宽度 */
  height: 19px;
  background-color: #333;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: ew-resize;
}

/* 中间的滑块（竖线） */
.slider-handle {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #00bfff;
  cursor: ew-resize;
  left: 50%;
  /* 初始位置在中间 */
  transform: translateX(-50%);
  transition: background-color 0.3s;
}

.slider-handle:hover {
  background-color: #00ffff;
}
</style>
