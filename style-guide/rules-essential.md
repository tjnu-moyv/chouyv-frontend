# 优先级 A 规则：必要的 {#priority-a-rules-essential}

这些规则有助于防止错误，因此务必全面学习并遵守它们。可能会存在例外情况，但应该非常罕见，只能由具有 JavaScript 和 Vue 两方面专业知识的人员进行修改。

## 使用多词组件名称 {#use-multi-word-component-names}

用户组件名称应始终为多词组合，仅根 `App` 组件可以例外。这样做可以[避免与现有和未来的 HTML 元素冲突](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)，因为所有 HTML 元素都是单个词。

<div class="style-example style-example-bad">
<h3>不推荐</h3>

```vue-html
<!-- 在预编译模板中 -->
<Item />

<!-- 在实时 DOM 模板中 -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```vue-html
<!-- 在预编译模板中 -->
<TodoItem />

<!-- 在实时 DOM 模板中 -->
<todo-item></todo-item>
```

</div>

## 使用详细的 prop 定义 {#use-detailed-prop-definitions}

在提交的代码中，prop 定义应尽可能详细，至少需要指定类型。

::: details 详细解释
详细的[prop定义](/guide/components/props#prop-validation)有两个优点：

- 它们文档化了组件的 API，使得很容易看出组件的预期使用方式。
- 在开发过程中，如果组件提供了格式不正确的 prop，Vue 会发出警告，帮助您捕获潜在的错误源。
  :::

<div class="options-api">
<div class="style-example style-example-bad">
<h3>不推荐</h3>

```js
// 仅在原型开发时可以这样做
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```js
props: {
  status: String
}
```

```js
// 更好的写法！
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>
</div>

<div class="composition-api">
<div class="style-example style-example-bad">
<h3>不推荐</h3>

```js
// 仅在原型开发时可以这样做
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// 更好的写法！

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>
</div>

## 使用带键的 `v-for` {#use-keyed-v-for}

对于组件，`v-for` 需要始终使用 `key`，以便维护子树内部的组件状态。即使对于元素，也应该遵循一种良好的实践，例如在动画中保持[对象恒定性](https://bost.ocks.org/mike/constancy/)。

::: details 详细解释
假设您有一个 todo 列表：

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: '学习使用 v-for'
      },
      {
        id: 2,
        text: '学习使用 key'
      }
    ]
  }
}
```

然后您对其进行字母排序。在更新 DOM 时，Vue 会优化渲染以执行最便宜的 DOM 变化。这可能意味着删除第一个 todo 元素，然后将其再添加到列表的末尾。

问题在于，存在一些情况下，不能删除保留在 DOM 中的元素。例如，您可能希望使用 `<transition-group>` 来对列表排序进行动画处理，或者如果渲染的元素是 `<input>`，则保持焦点。在这些情况下，为每个项目添加一个唯一的键（例如 `:key="todo.id"`）将告诉 Vue 如何更可预测地行为。

根据我们的经验，最好始终添加唯一的键，这样您和您的团队就不必担心这些边界情况。然后，在罕见的、性能关键的场景中，不需要对象恒定性时，您可以有意识地例外。
:::

<div class="style-example style-example-bad">
<h3>不推荐</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## 避免在 `v-for` 中使用 `v-if` {#avoid-v-if-with-v-for}

**永远不要在同一元素上同时使用 `v-for` 和 `v-if`。**

有两种常见情况可能会引起这种诱惑：

- 在列表中筛选项目（例如 `v-for="user in users" v-if="user.isActive"`）。在这种情况下，可以用一个返回筛选列表的计算属性（例如 `activeUsers`）替换 `users`。

- 如果应该隐藏列表，则避免渲染列表（例如 `v-for="user in users" v-if="shouldShowUsers

"`）。在这种情况下，将 `v-if` 移到容器元素（例如 `ul`、`ol`）。

::: details 详细解释
当 Vue 处理指令时，`v-if` 的优先级高于 `v-for`，因此以下模板：

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

会抛出错误，因为 `v-if` 指令将首先被计算，此时迭代变量 `user` 不存在。

可以通过迭代计算属性来解决此问题，如下所示：

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

另一种方法是使用 `<template>` 标签将 `<li>` 元素包装在 `v-for` 中：

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>不推荐</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## 使用组件范围的样式 {#use-component-scoped-styling}

对于应用程序，`App` 组件中的样式和布局组件中的样式可能是全局的，但所有其他组件应始终具有范围。

这仅适用于[单文件组件](/guide/scaling-up/sfc)。不要求使用 [`scoped` 属性](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)。样式可以通过[CSS 模块](https://vue-loader.vuejs.org/zh/guide/css-modules)、基于类的策略（例如[BEM](http://getbem.com/)）或其他库/约定来进行作用域限定。

**但是，组件库应该优先选择基于类的策略，而不是使用 `scoped` 属性。**

这使得覆盖内部样式更加容易，使用易读的类名，不会具有太高的特异性，但仍极不可能导致冲突。

::: details 详细解释
如果您正在开发一个大型项目、与其他开发人员合作，或者有时会包含第三方 HTML/CSS（例如来自 Auth0 的内容），一致的作用域限定将确保样式仅适用于其预期的组件。

除了 `scoped` 属性之外，使用唯一的类名可以确保第三方 CSS 不会应用于您自己的 HTML。例如，许多项目使用 `button`、`btn` 或 `icon` 类名，因此即使不使用 BEM 等策略，添加一个特定于应用程序和/或组件的前缀（例如 `ButtonClose-icon`）可以提供一定的保护。
:::

<div class="style-example style-example-bad">
<h3>不推荐</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>推荐</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- 使用 `scoped` 属性 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- 使用 CSS 模块 -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>
