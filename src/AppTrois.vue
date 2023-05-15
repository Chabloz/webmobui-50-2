<script setup>
  import { onMounted, ref } from 'vue';
  import { MathUtils, Vector3 } from 'three';
  const { randFloat, randFloatSpread } = MathUtils;


  const renderer = ref(null);
  const light = ref(null);
  onMounted(() => {
    renderer.value.onBeforeRender(() => {
      const { pointer } = renderer.value.three;
      const target = new Vector3().copy(pointer.positionV3)
      light.value.light.position.copy(target);
    });
  });

  function randomHsl() {
    return `hsl(${randFloat(0, 360)}, 100%, 50%)`;
  }
</script>

<template>
  <Renderer
    ref="renderer"
    :orbit-ctrl="true"
    antialias
    resize="window"
    pointer
    shadow
  >
    <Camera :position="{ z: 2 }" />
    <Scene>
      <!-- <AmbientLight color="#808080" /> -->
      <PointLight
        ref="light"
        cast-shadow
        :shadow-map-size="{ width: 1024, height: 1024 }"
      />

      <Dodecahedron
        v-for="i in 200"
        :position="{ x: randFloatSpread(20), y: randFloatSpread(20), z: -5 }"
        :radius=".5"
        cast-shadow
        receive-shadow
      >
        <PhongMaterial :color="randomHsl()" />
      </Dodecahedron>
      <Plane :width="50" :height="50" :position="{ z: -7 }" receive-shadow>
        <PhongMaterial color="#9C1E15" />
      </Plane>
    </Scene>
  </Renderer>
</template>