<script setup lang="ts">

const props = defineProps<{
    title: string;
    input: string;
    steps: step[];
    puzzles: number
    results: string[]
}>()

const emit = defineEmits(['input-selected']);
const activePuzzle = ref(0);


const inputSelected = (input: string) => {
    emit('input-selected', input);
}

const puzzleSteps = computed(() => {
    return props.steps.filter((step) => step.puzzles?.includes(activePuzzle.value + 1) || step.puzzles?.length === 0 || !step.puzzles)
})

</script>


<template>
    <div>
        <AocHeader type="h1" class="mb-5">{{ props.title }}</AocHeader>
        <PuzzleInput @input-selected="inputSelected" :default-input="input" />

        <div v-if="props.steps.length > 0">
            <div class="flex gap-2 ">
                <div class="cursor-pointer" v-for="puzzle in props.puzzles" @click="activePuzzle = puzzle - 1" :class="{
                    'text-aoc-yellow': activePuzzle === puzzle - 1

                }">
                    [{{ `Puzzle ${puzzle}` }}]
                </div>
            </div>
            <div v-for="(step, index) in puzzleSteps" class="my-2">
                <AocDropdown :title="`${index + 1}: ${step.title}`">
                    <slot name="steps" :step="step" :index="index">

                    </slot>
                </AocDropdown>
            </div>

            <h2 class="text-xl font-semibold">
                Final result
            </h2>
            <div>
                {{ props.results?.[activePuzzle] }}
            </div>
        </div>

    </div>
</template>