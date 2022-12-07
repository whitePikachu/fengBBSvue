<script setup lang="ts">
import { onMounted, ref } from 'vue'
import service from '../../plugins/axios'
import { encrypt, decrypt } from '../../plugins/crypto'
import { ElMessage } from 'element-plus'
const loging = ref(false)
type data = {
  world: string
  x: number
  y: number
}
type res = {
  status: boolean
  msg: string
  cod: string
}
//emits
const codsuccess = defineEmits<{
  (e: 'success', rescod: string): void
}>()

async function getdata() {
  const data = (await (await service.get('cod/getcod')).data) as res
  if (data.status) {
    const cod = data.cod
    let res = decrypt(cod) as string
    if (res.match(/\[(.*?)\]/)?.[1]) {
      res = `[${res.match(/\[(.*?)\]/)?.[1]}]` as string
      try {
        const json = JSON.parse(res) as data
        return json
      } catch (error) {
        console.log(error)
      }
    }

    return []
  }
}
let cod = (await getdata()) as data[]
let seed = [] as any
onMounted(async () => {
  const canvas = document?.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D
  const width = 300
  const height = 300
  function canvasCod() {
    canvas.width = width
    canvas.height = height
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`
    ctx.fillRect(0, 0, width, height)
    //干扰线
    for (let i = 0; i < 10; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`
      ctx.stroke()
    }
  }
  //绘制文字
  function drawText(
    text: string,
    x: number,
    y: number,
    clor = true,
    pen = ctx,
    size = 20
  ) {
    if (clor) {
      pen.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`
    } else {
      pen.fillStyle = `rgb(0,0,0)`
    }
    pen.font = `bold ${size}px Arial`
    pen.textAlign = 'center'
    pen.textBaseline = 'middle'
    pen.fillText(text, x, y)
  }
  let si = 0
  canvas.onmousedown = function (e) {
    const x = e.offsetX
    const y = e.offsetY
    const s = ['①', '②', '③', '④']
    //依次绘画s中的每个字符
    if (si < s.length) {
      drawText(s[si], x, y, false)
      seed.push({ x, y })
      si++
    }
    //
    let success = 0
    for (let index = 0; index < cod.length; index++) {
      const element = cod[index]
      if (
        Math.abs(seed[index]?.x - element.x) < 30 &&
        Math.abs(seed[index]?.y - element.y) < 30
      ) {
        success++
        continue
      }
    }
    if (success === 4) {
      console.log('通过')
      codsuccess('success', encrypt(JSON.stringify(seed)))
      init()
      return
    }
    if (seed.length === 4) {
      ElMessage({
        message: '验证失败',
        type: 'error',
      })
      console.log('失败')
      init()
    }
  }
  async function init() {
    cod = (await getdata()) as data[]
    canvasCod()
    rendcod()
    si = 0
    seed = []
    for (let i = 0; i < cod.length; i++) {
      drawText(cod[i].world, cod[i].x, cod[i].y, true, ctx, 30)
    }
  }
  await init()
  //刷新验证码
  const refresh_bt = document?.getElementById('bt_refresh')
  //验证图
  refresh_bt?.addEventListener('click', async () => {
    loging.value = true
    await init()
    loging.value = false
  })
  function rendcod() {
    const cods = document?.getElementsByClassName(
      'cod'
    ) as HTMLCollectionOf<HTMLCanvasElement>
    for (let index = 0; index < cods.length; index++) {
      const element = cods[index]
      const ctx = element?.getContext('2d') as CanvasRenderingContext2D
      element.width = 24
      element.height = 24
      ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      })`
      ctx.fillRect(0, 0, width, height)
      drawText(cod[index].world, 12, 12, true, ctx, 12)
    }
  }
})
</script>

<template>
  <div>
    <el-space direction="vertical">
      <div>
        <el-space>
          <span>请点击下图所示字符</span>
          <Canvas class="cod"
                  style="width:24px;height: 24px;" />
          <Canvas class="cod"
                  style="width:24px;height: 24px;" />
          <Canvas class="cod"
                  style="width:24px;height: 24px;" />
          <Canvas class="cod"
                  style="width:24px;height: 24px;" />
        </el-space>
      </div>
      <div>
        <Canvas id="canvas"
                style="width:300px;height: 300px;" />
      </div>
      <div id="refresh">
        看不清，点击下刷新<el-button id="bt_refresh"
                   :loading="loging">刷新验证码</el-button>
      </div>
    </el-space>
  </div>

</template>

<style scoped>
#refresh {
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>