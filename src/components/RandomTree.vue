<script setup lang="ts">
import {onMounted, ref} from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 180
  },
  height: {
    type: Number,
    default: 180
  },
  thickRatio: {
    type: Number,
    default: 0.8
  },
  lengthRatio: {
    type: Number,
    default: 0.9
  },
  liveRatio: {
    type: Number,
    default: 0.5
  },
  flowerOfEndRatio: {
    type: Number,
    default: 1
  },
  flowerOfMiddleRatio: {
    type: Number,
    default: 0.1
  },
  maxDirChildren: {
    type: Number,
    default: 30
  }
});

const canvas = ref<HTMLCanvasElement | null>(null);

const drawFlower = (x: number, y: number, context: CanvasRenderingContext2D) => {
  context.beginPath();
  context.arc(x, y, 5, 0, 2 * Math.PI);
  context.fillStyle = 'red';
  context.fill();
  context.closePath();
};

/**
 * 绘画一个树干并递归延展
 *
 * @param v0x
 * @param v0y
 * @param thick
 * @param length
 * @param dir
 * @param context
 */
const draw = (
    v0x: number,
    v0y: number,
    thick: number,
    length: number,
    dir: number,
    context: CanvasRenderingContext2D
) => {
  if (thick < 15 && Math.random() < (1 - props.liveRatio)) {
    if (Math.random() < props.flowerOfMiddleRatio) {
      // 在树枝末端绘制花朵
      drawFlower(v0x, v0y, context);
    }
    return;
  }
  if (thick < 1) {
    if (Math.random() < props.flowerOfEndRatio) {
      // 在树枝末端绘制花朵
      drawFlower(v0x, v0y, context);
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
  draw(
      v1x,
      v1y,
      thick * props.thickRatio,
      length * props.lengthRatio,
      dir + props.maxDirChildren * Math.random(),
      context
  );
  draw(
      v1x,
      v1y,
      thick * props.thickRatio,
      length * props.lengthRatio,
      dir - props.maxDirChildren * Math.random(),
      context
  );
};

onMounted(() => {
  const context = canvas.value?.getContext('2d');
  if (!context) return;
  context.translate(props.width / 2, props.height);
  context.scale(0.2, -0.2);
  draw(0, 0, 30, 80, 90 + (Math.random() - 0.5) * 25, context);
});
</script>

<template>
  <div class="random-tree">
    <canvas :width="width" :height="height" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.random-tree {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
