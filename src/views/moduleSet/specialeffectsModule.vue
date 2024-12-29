<script setup>

</script>

<template>
  <div id="specialeffects">
    <el-checkbox v-model="value" label="流光" size="large" />
    <el-checkbox v-model="value" label="降雨" size="large" />
    <el-checkbox v-model="value" label="昼夜更替" size="large" />
  </div>
</template>

<style lang="scss" scoped>
#specialeffects {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: vh(17px);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 vw(20px);
  font-size: rem(14px);
}
</style>