<template>
  <div class="random-tree">
    <canvas :width="width" :height="height" ref="canvas"></canvas>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    // 宽度
    width: {
      default: 180
    },
    // 高度
    height: {
      default: 180
    },
    // 树枝粗细的迭代倍率
    thickRatio: {
      default: 0.8
    },
    // 树枝长度的迭代倍率
    lengthRatio: {
      default: 0.9
    },
    // 整棵树的茂盛程度
    liveRatio: {
      default: 0.5
    },
    // 树枝末端有花的数量占所有末端的比例
    flowerOfEndRatio: {
      default: 1
    },
    // 树枝躯干有花的数量占所有躯干的比例
    flowerOfMiddleRatio: {
      default: 0.1
    },
    // 树枝角度迭代的范围(-dir, dir)角度值
    maxDirChildren: {
      default: 30
    }
  },
  mounted() {
    this.drawCanvas();
  },
  methods: {
    drawCanvas() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.translate(canvas.width / 2, canvas.height);
      context.scale(0.2, -0.2);
      this.draw(0, 0, 30, 80, 90 + (Math.random() - 0.5) * 25, context);
    },
    draw(v0x, v0y, thick, length, dir, context) {
      if (thick < 15 && Math.random() < (1 - this.liveRatio)) {
        if (Math.random() < this.flowerOfMiddleRatio) {
          // 在树枝末端绘制花朵
          this.drawFlower(v0x, v0y, context);
        }
        return;
      }
      if (thick < 1) {
        if (Math.random() < this.flowerOfEndRatio) {
          // 在树枝末端绘制花朵
          this.drawFlower(v0x, v0y, context);
        }
        return;
      }
      context.beginPath();
      context.moveTo(v0x, v0y);
      const v1x = v0x + length * Math.cos((Math.PI * dir) / 180);
      const v1y = v0y + length * Math.sin((Math.PI * dir) / 180);
      context.lineWidth = thick;
      context.strokeStyle = '#111';
      context.lineCap = 'round';
      context.lineTo(v1x, v1y);
      context.stroke();
      this.draw(v1x, v1y, thick * this.thickRatio, length * this.lengthRatio, dir + this.maxDirChildren * Math.random(), context);
      this.draw(v1x, v1y, thick * this.thickRatio, length * this.lengthRatio, dir - this.maxDirChildren * Math.random(), context);
    },
    drawFlower(x, y, context) {
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    }
  },
});
</script>

<style>
.random-tree {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

}
</style>
