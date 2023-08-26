# 优先级 C 规则：推荐规则 {#priority-c-rules-recommended}

当存在多个同样好的选项时，为了保持一致性，可以进行任意选择。在这些规则中，我们描述了每个可接受的选项并建议默认选择。这意味着您可以在自己的代码库中自由进行不同的选择，只要保持一致并有充分的理由。但请确实有充分的理由！通过适应社区标准，您将会：

1. 更容易解析大多数社区代码。
2. 能够直接复制粘贴大多数社区代码示例而无需修改。
3. 通常会发现新员工已经习惯于您的首选编码风格，至少在Vue方面是如此。

## 组件/实例选项顺序 {#component-instance-options-order}

**组件/实例选项应该有一致的顺序。**

以下是我们推荐的组件选项默认顺序。它们被分成了不同的类别，这样您就会知道在哪里添加来自插件的新属性。

1. **全局信息**（需要组件之外的知识）

   - `name`

2. **模板编译选项**（更改模板的编译方式）

   - `compilerOptions`

3. **模板依赖**（模板中使用的资源）

   - `components`
   - `directives`

4. **组合**（将属性合并到选项中）

   - `extends`
   - `mixins`
   - `provide`/`inject`

5. **接口**（组件的接口）

   - `inheritAttrs`
   - `props`
   - `emits`

6. **组合 API**（使用组合 API 的入口点）

   - `setup`

7. **本地状态**（本地响应式属性）

   - `data`
   - `computed`

8. **事件**（由响应式事件触发的回调）

   - `watch`
   - 生命周期事件（按调用顺序排列）
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `activated`
     - `deactivated`
     - `beforeUnmount`
     - `unmounted`
     - `errorCaptured`
     - `renderTracked`
     - `renderTriggered`

9. **非响应式属性**（与响应式系统无关的实例属性）

   - `methods`

10. **渲染**（组件输出的声明性描述）
    - `template`/`render`

## 元素属性顺序 {#element-attribute-order}

**元素（包括组件）的属性应该有一致的顺序。**

以下是我们推荐的元素属性默认顺序。它们被分成了不同的类别，这样您就会知道在哪里添加自定义属性和指令。

1. **定义**（提供组件选项）

   - `is`

2. **列表渲染**（创建相同元素的多个变体）

   - `v-for`

3. **条件**（元素是否被渲染/显示）

   - `v-if`
   - `v-else-if`
   - `v-else`
   - `v-show`
   - `v-cloak`

4. **渲染修饰符**（更改元素的渲染方式）

   - `v-pre`
   - `v-once`

5. **全局信息**（需要组件之外的知识）

   - `id`

6. **唯一属性**（需要唯一值的属性）

   - `ref`
   - `key`

7. **双向绑定**（结合绑定和事件）

   - `v-model`

8. **其他属性**（所有未指定的绑定和非绑定属性）

9. **事件**（组件事件监听器）

   - `v-on`

10. **内容**（覆盖元素的内容）
    - `v-html`
    - `v-text`

## 组件/实例选项中的空行 {#empty-lines-in-component-instance-options}

**您可能希望在多行属性之间添加一个空行，特别是如果选项太长，超出了您的屏幕高度。**

当组件开始感觉拥挤或难以阅读时，添加多行属性之间的空格可以使它们再次容易扫视。在某些编辑器（如Vim）中，这样的格式选项还可以使它们在键盘上导航更容易。

<div class="style-example style-example-good">
<h3>好的</h3>

```js
props: {
  value: {
    type: String,
    required: true
  },

  focused: {
    type: Boolean,
    default: false
  },

  label: String,
  icon: String
},

computed: {
  formattedValue() {
    // ...
  },

  inputClasses() {
    // ...
  }
}
```

```js
// 没有空格也是可以的，只要组件
// 仍然容易阅读和导航。
props: {
  value: {
    type: String,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  label: String,
  icon: String
},
computed: {
  formattedValue() {
    // ...
  },
  inputClasses() {
    // ...
  }
}
```

</div>

## 单文件组件顶层元素顺序 {#single-file-component-top-level-element-order}

**[单文件组件](/guide/scaling-up/sfc)应该始终以一致的顺序排列 `<script>`、`<template>` 和 `<style>` 标签，`<style>` 标签放在最后，因为其他两个标签中至少有一个始终是必需的。**

<div class="style-example style-example-bad">
<h3>不好的</h3>

```vue-html
<style>/* ... */</style>
<script>/* ... */</script>
<template>...</template>
```



```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>

<div class="style-example style-example-good">
<h3>好的</h3>

```vue-html
<!-- ComponentA.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<script>/* ... */</script>
<template>...</template>
<style>/* ... */</style>
```

```vue-html
<!-- ComponentA.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>

<!-- ComponentB.vue -->
<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

</div>
