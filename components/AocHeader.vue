<script setup lang="ts">

const props = defineProps<{
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()

</script>


<template>
    <component :is="props.type" class="text-5xl text-aoc-bright-green aoc-text-shadow">
        <slot />
    </component>
</template>