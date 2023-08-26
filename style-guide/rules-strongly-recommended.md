# 优先级 B 规则：强烈推荐 {#priority-b-rules-strongly-recommended}

这些规则已被证实能够提升大多数项目中的可读性和/或开发者体验。即使违反这些规则，您的代码仍然可以运行，但违规应该很少且有充分的理由。

## 组件文件 {#component-files}

**每个组件都应位于自己的文件中，如果有构建系统可用于合并文件。**

这有助于您在需要编辑组件或审查如何使用它时更快地找到组件。

<div class="style-example style-example-bad">
<h3>不好</h3>

```js
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- TodoList.js
|- TodoItem.js
```

```
components/
|- TodoList.vue
|- TodoItem.vue
```

</div>

## 单文件组件文件名大小写 {#single-file-component-filename-casing}

**[单文件组件](/guide/scaling-up/sfc)的文件名应始终使用 PascalCase 或 kebab-case。**

PascalCase 在代码编辑器中的自动补全中效果最佳，因为它与我们在 JS(X) 和模板中引用组件的方式保持一致。然而，混合大小写的文件名有时在大小写不敏感的文件系统上会导致问题，这就是为什么 kebab-case 也是完全可接受的。

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- mycomponent.vue
```

```
components/
|- myComponent.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- MyComponent.vue
```

```
components/
|- my-component.vue
```

</div>

## 基础组件名称 {#base-component-names}

**应用特定样式和约定的基础组件（也称为展示型、哑组件或纯组件）都应以特定前缀开头，例如 `Base`、`App` 或 `V`。**

::: details 详细解释
这些组件为应用中的一致样式和行为奠定了基础。它们可能**只能**包含：

- HTML 元素，
- 其他基础组件，以及
- 第三方 UI 组件。

但它们**永远不会**包含全局状态（例如来自 [Pinia](https://pinia.vuejs.org/zh/) 存储的状态）。

它们的名称通常包括它们包装的元素的名称（例如 `BaseButton`、`BaseTable`），除非没有与其特定用途相对应的元素（例如 `BaseIcon`）。如果您为更具体的上下文构建类似的组件，它们几乎总是会使用这些组件（例如 `BaseButton` 可能在 `ButtonSubmit` 中使用）。

这种约定的一些优点：

- 在编辑器中按字母顺序组织时，应用的基础组件都会列在一起，更容易识别。

- 由于组件名称应始终由多个单词组成，这种约定避免了为简单的组件包装器选择任意前缀（例如 `MyButton`、`VueButton`）。

- 由于这些组件经常被使用，您可能希望将它们全局化，而不是到处导入它们。使用 Webpack 可以通过前缀实现这一点：

  ```js
  const requireComponent = require.context(
    './src',
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  )
  requireComponent.keys().forEach(function (fileName) {
    let baseComponentConfig = requireComponent(fileName)
    baseComponentConfig =
      baseComponentConfig.default || baseComponentConfig
    const baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
    app.component(baseComponentName, baseComponentConfig)
  })
  ```

  :::

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

```
components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

```
components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

</div>

## 单实例组件名称 {#single-instance-component-names}

**应始终以 `The` 前缀开头命名只应有单个活动实例的组件，以表示只能有一个实例。**

这并不意味着该组件只在单个页面中使用，而是每个页面只能使用一次。这些组件不接受任何 props，因为它们是特定于您的应用的，而不是其在应用中的上下文。如果您发现需要添加 props，则这是这实际上是一个可重用的组件，目前每个页面只使用一次。

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- Heading.vue
|- MySidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

</div>

## 与父组件紧密耦合的组件名称 {#tightly-coupled-component-names}

**与父组件紧密耦合的子组件应将父组件名称作为前缀包含在组件名称中。**

如果一个组件在单个父组件的上下文中才有意义，那么它的名称中应体现这种关系。由于编辑器通常按字母顺序组织文件，这也使得这些相关文件相邻。

::: details 详细解释
您可能会尝试通过以父组件的名称命名的目录中嵌套子组件来解决此问题。例如：

```
components/
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```

或：

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```

这并不推荐，因为会出现以下问题：

- 许多具有相似名称的文件，使得在代码编辑器中快速切换文件更加困难。
- 许多嵌套的子目录，增加了在编辑器侧边栏中浏览组件所需的时间。
:::

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
```

```
components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

</div>

## 组件名称中单词的顺序 {#order-of-words-in-component-names}

**组件名称应以最高级别（通常是最常见的）单词开头，并以描述性的修饰性词语结尾。**

::: details 详细解释
您可能会想：

> “为什么要强制组件名称使用较不自然的语言顺序呢？”

在自然的英语中，形容词和其他描述词通常出现在名词之前，而例外情况需要使用连接词。例如：

- Coffee _with_ milk（带奶的咖啡）
- Soup _of the_ day（今日汤品）
- Visitor _to the_ museum（到博物馆的游客）

如果您愿意，您当然可以在组件名称中包含这些连接词，但顺序仍然很重要。

还要注意，**“最高级别”会因您的应用而异**。例如，想象一个带有搜索表单的应用。它可能包含诸如这样的组件：

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

正如您可能注意到的那样，在这个列表中很难看出哪些组件与搜索有关。现在，让我们根据规则重新命名这些组件：

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```

由于编辑器通常按字母顺序组织文件，现在可以一目了然地看到所有组件之间的重要关系。

您可能会考虑以不同的方式解决这个问题，将所有搜索组件嵌套在名为“search”的目录下，然后将所有设置组件嵌套在名为“settings”的目录下。我们只建议在非常大的应用程序（例如 100 个以上的组件）中考虑这种方法，原因如下：

- 通常需要更多时间来浏览嵌套的子目录，而不是在单个 `components` 目录中滚动。
- 名称冲突（例如多个 `ButtonDelete.vue` 组件）使在代码编辑器中快速导航到特定组件变得更加困难。
- 重构变得更加困难，因为仅使用查找和替换通常不足以更新移动组件的相对引用。
:::

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

</div>

## 自闭合组件 {#self-closing-components}

**在[单文件组件](/guide/scaling-up/sfc)、字符串模板以及[JSX](/guide/extras/render-function#jsx-tsx)中，没有内容的组件应该是自闭合的，但在 DOM 模板中不应自闭合。**

自闭合的组件传达了它们不仅没有内容，而且**意味着**它们是没有内容的。这就像是一本书中的空白页和一个标有“此页故意留白”的页面之间的区别。您的代码也会更清晰，没有不必要的闭合标签。

不幸的是，HTML 不允许自定义元素是自闭合的，只有[官方的“无内容”元素](https://www.w3.org/TR/html/syntax.html#void-elements)。这就是为什么这种策略只有在 Vue 的模板编译器可以在 DOM 之前到达模板，然后提供符合 DOM 规范的 HTML 时才能实现。

<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
<!-- 在单文件组件、字符串模板以及 JSX 中 -->
<MyComponent></MyComponent>
```

```vue-html
<!-- 在 DOM 模板中 -->
<my-component/>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<!-- 在单文件组件、字符串模板以及 JSX 中 -->
<MyComponent/>
```

```vue-html
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

</div>

## 模板中的组件名大小写 {#component-name-casing-in-templates}

**在大多数项目中，[单文件组件](/guide/scaling-up/sfc)和字符串模板中的组件名称应始终使用 PascalCase，但在 DOM 模板中应使用 kebab-case。**

PascalCase 相对于 kebab-case 有一些优势：

- 编辑器可以在模板中自动补全组件名称，因为 PascalCase 也用于 JavaScript。
- `<MyComponent>` 在视觉上与单词 HTML 元素更为不同，与 `<my-component>` 相比有两个字符的差异（两个大写字母），而不仅仅是一个字符的差异（一个连字符）。
- 如果您在模板中使用了任何非 Vue 自定义元素，例如 Web 组件，PascalCase 可以确保您的 Vue 组件保持独立可见。

不幸的是，由于 HTML 不区分大小写，DOM 模板仍必须使用 kebab-case。

还要注意，如果您已经大量使用了 kebab-case，在 HTML 约定的一致性和能够在所有项目中使用相同的大小写方式之间，后者可能比上面列出的优势更为重要。在这些情况下，**在所有地方都使用 kebab-case 也是可以接受的。**
<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
<!-- 在单文件组件和字符串模板中 -->
<mycomponent/>
```

```vue-html
<!-- 在单文件组件和字符串模板中 -->
<myComponent/>
```

```vue-html
<!-- 在 DOM 模板中 -->
<MyComponent></MyComponent>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
```

```vue-html
<!-- 在 DOM 模板中 -->
<my-component></my-component>
```

或

```vue-html
<!-- 在所有地方 -->
<my-component></my-component>
```

</div>

## 在 JS/JSX 中的组件名称大小写 {#component-name-casing-in-js-jsx}

**在 JS/JSX 中的组件名称应始终使用 PascalCase，尽管在字符串中使用 kebab-case 是在只使用 `app.component` 进行全局组件注册的较简单应用程序中允许的。**

::: details 详细解释
在 JavaScript 中，PascalCase 是类和原型构造函数的约定，本质上是任何可以具有不同实例的东西。Vue 组件也具有实例，所以使用 PascalCase 也是有道理的。此外，JSX（以及模板）中使用 PascalCase 可以让代码阅读者更轻松地区分组件和 HTML 元素。

然而，对于只使用 `app.component` 进行全局组件定义的应用程序，我们建议使用 kebab-case。原因是：

- 很少有全局组件在 JavaScript 中被引用，因此遵循 JavaScript 的约定就没有那么有意义。
- 这些应用程序始终包含许多在 DOM 模板中使用的模板，其中必须使用 [kebab-case **必须** 使用](#component-name-casing-in-templates)。
:::

<div class="style-example style-example-bad">
<h3>不好</h3>

```js
app.component('myComponent', {
  // ...
})
```

```js
import myComponent from './MyComponent.vue'
```

```js
export default {
  name: 'myComponent'
  // ...
}
```

```js
export default {
  name: 'my-component'
  // ...
}
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```js
app.component('MyComponent', {
  // ...
})
```

```js
app.component('my-component', {
  // ...
})
```

```js
import MyComponent from './MyComponent.vue'
```

```js
export default {
  name: 'MyComponent'
  // ...
}
```

</div>

## 完整单词的组件名称 {#full-word-component-names}

**组件名称应优先使用完整的单词，而不是缩写。**

编辑器中的自动补全功能使得编写更长的名称的成本非常低，而它们所提供的清晰度是无价的。特别是不常见的缩写应始终避免使用。

<div class="style-example style-example-bad">
<h3>不好</h3>

```
components/
|- SdSettings.vue
|- UProfOpts.vue
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

</div>

## Prop 名称的大小写 {#prop-name-casing}

**在声明中，Prop 名称应始终使用 camelCase。在 DOM 模板中使用时，Props 应该使用 kebab-case。单文件组件模板和 [JSX](/guide/extras/render-function#jsx-tsx) 可以使用 kebab-case 或 camelCase。大小写应该保持一致 - 如果您选择使用 camelCase 的 props，请确保在应用程序中不要使用 kebab-case 的 props。**

<div class="style-example style-example-bad">
<h3>不好</h3>

<div class="options-api">

```js
props: {
  'greeting-text': String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  'greeting-text': String
})
```

</div>

```vue-html
<!-- 对于 DOM 模板 -->
<welcome-message greetingText="hi"></welcome-message>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

<div class="options-api">

```js
props: {
  greetingText: String
}
```

</div>

<div class="composition-api">

```js
const props = defineProps({
  greetingText: String
})
```

</div>

```vue-html
<!-- 对于 SFC - 请确保您的大小写风格在整个项目中保持一致 -->
<!-- 您可以使用任一约定，但我们不建议在一个项目中混合两种不同的大小写风格 -->
<WelcomeMessage greeting-text="hi"/>
<!-- 或者 -->
<WelcomeMessage greetingText="hi"/>
```

```vue-html
<!-- 对于 DOM 模板 -->
<welcome-message greeting-text="hi"></welcome-message>
```

</div>

## 多属性元素 {#multi-attribute-elements}

**具有多个属性的元素应跨越多行，每行一个属性。**

在 JavaScript 中，将具有多个属性的对象拆分成多行被普遍认为是一个好的惯例，因为它更容易阅读。我们的模板和 [JSX](/guide/extras/render-function#jsx-tsx) 应该得到同样的考虑。

<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
```

```vue-html
<MyComponent foo="a" bar="b" baz="c"/>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
```

```vue-html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

</div>

## 模板中的简单表达式 {#simple-expressions-in-templates}

**组件模板应仅包含简单表达式，将更复杂的表达式重构为计算属性或方法。**

模板中的复杂表达式使其变得不够声明式。我们应该努力描述应该显示的内容，而不是我们如何计算该值。计算属性和方法还允许代码的重用。

<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<!-- 在模板中 -->
{{ normalizedFullName }}
```

<div class="options-api">

```js
// 复杂表达式已移至计算属性
computed: {
  normalizedFullName() {
    return this.fullName.split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }
}
```

</div>

<div class="composition-api">

```js
// 复杂表达式已移至计算属性
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
```

</div>

</div>

## 简单的计算属性 {#simple-computed-properties}

**复杂的计算属性应拆分为尽可能多的简单属性。**

::: details 详细说明
简单且命名良好的计算属性具有以下优点：

- **更易测试**

  当每个计算属性只包含非常简单的表达式，并且依赖项很少时，编写测试来确认其正确工作要容易得多。

- **更易阅读**

  简化计算属性迫使您为每个值赋予一个描述性名称，即使它不会被重用。这使得其他开发人员（以及未来的您）更容易集中精力关注他们关心的代码，并找出正在发生的情况。

- **更适应不断变化的需求**

  任何可以命名的值在视图中可能是有用的。例如，我们可能决定显示一条消息，告诉用户他们节省了多少钱。我们还可以决定计算销售税，但可以单独显示，而不是作为最终价格的一部分。

  较小、专注的计算属性对信息使用方式做出较少的假设，因此在需求变化时需要进行更少的重构。
  :::

<div class="style-example style-example-bad">
<h3>不好</h3>

<div class="options-api">

```js
computed: {
  price() {
    const basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```

</div>

<div class="composition-api">

```js
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
```

</div>

</div>

<div class="style-example style-example-good">
<h3>好</h3>

<div class="options-api">

```js
computed: {
  basePrice() {
    return this.manufactureCost / (1 - this.profitMargin)
  },

  discount() {
    return this.basePrice * (this.discountPercent || 0)
  },

  finalPrice() {
    return this.basePrice - this.discount
  }
}
```

</div>

<div class="composition-api">

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
```

</div>

</div>

## 引号包裹的属性值 {#quoted-attribute-values}

**非空的 HTML 属性值应始终放在引号内（单引号或双引号，取决于 JS 中未使用的引号）。**

虽然在 HTML 中，没有空格的属性值不需要使用引号，但这种做法通常会导致避免使用空格，使得属性值的可读性降低。

<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
<input type=text>
```

```vue-html
<AppSidebar :style={width:sidebarWidth+'px'}>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<input type="text">
```

```vue-html
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

</div>

## 指令缩写 {#directive-shorthands}

**始终应始或不使用指令缩写（`: `用于 `v-bind:`，`@`用于`v-on:`，`#`用于`v-slot`）。**

<div class="style-example style-example-bad">
<h3>不好</h3>

```vue-html
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>这里可能是页面标题</h1>
</template>

<template #footer>
  <p>这里是一些联系信息</p>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>好</h3>

```vue-html
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
```

```vue-html
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
```

```vue-html
<input
  @input="onInput"
  @focus="onFocus"
>
```

```vue-html
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

```vue-html
<template v-slot:header>
  <h1>这里可能是页面标题</h1>
</template>

<template v-slot:footer>
  <p>这里是一些联系信息</p>
</template>
```

```vue-html
<template #header>
  <h1>这里可能是页面标题</h1>
</template>

<template #footer>
  <p>这里是一些联系信息</p>
</template>
```

</div>