<script setup lang="ts">
const props = defineProps<{
    title: string;
}>()

const open = ref(false);

</script>


<template>
    <div>
        <div @click="open = !open" class="text-left flex justify-between items-center  cursor-pointer border-b-2">
            <slot name="header">
                <h2 class="text-2xl font font-semibold">{{ props.title }}</h2>
            </slot>

            <Icon v-if="!open" name="lucide:plus" />
            <Icon v-else name="lucide:minus" />

        </div>
        <div v-show="open" class=" mt-5">
            <slot></slot>
        </div>
    </div>
</template>