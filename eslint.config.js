import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  // 添加自定义规则
  {
    // files: ['**/*.{js,mjs,jsx,vue}'], //指定需要用eslint检查的文件类型
    rules: {
      semi: ['error', 'never'], // 不使用分号
      'comma-dangle': ['error', 'never'], // 禁止对象和数组最后的逗号
      'quotes': ['error', 'single'], // 使用单引号
      'vue/multi-word-component-names': ['error',
        {
          ignores: ['index']
        }] // vue组件名称多单词组成（忽略index.vue）
    },
    // 忽略这些Eslint全局变量
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  }
]
