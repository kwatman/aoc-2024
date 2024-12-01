<script setup lang="ts">
import day1Input from '@/assets/inputs/day1.txt?raw';



const puzzle1Result = ref<string | null>(null);
const puzzle2Result = ref<string | null>(null);

const { steps, doStep } = useSteps();

const onInputSelected = async (input: string) => {

    // Split the input into an array
    await doStep('Get input ', () => [input], 'dump')

    const [left, right] = await doStep('Split and sort input', () => {
        const locations = input.match(/\d+/g)

        const left = locations?.filter((_, i) => i % 2 === 0).sort((a, b) => a - b)
        const right = locations?.filter((_, i) => i % 2 !== 0).sort((a, b) => a - b)

        return [left, right]
    }, 'dump')

    let [totals] = await doStep('Substract left from right', async () => {
        let totals = [];
        for (let i = 0; i < left.length; i++) {
            let diference = Math.abs(parseInt(left[i]) - parseInt(right[i]));
            totals.push(diference);
        }
        return [totals];
    }, 'dump', [1])

    puzzle1Result.value = await doStep('Sum the substracted values', () => {
        return [parseInt(totals.reduce((a, b) => a + b).toString())];
    }, 'dump', [1])

    let [similarityScores] = await doStep('Calculate similarity scores', () => {
        let scores = new Map();
        for (let i = 0; i < left.length; i++) {
            let number = parseInt(left[i]);
            let occurencesInRight = right.filter(x => parseInt(x) === number).length;

            let newTotal = (number * occurencesInRight) + (scores.get(number) || 0);
            scores.set(number, newTotal);
        }
        return [Array.from(scores.values())];
    }, 'dump', [2])

    puzzle2Result.value = similarityScores.reduce((a, b) => a + b).toString();

}


</script>


<template>
    <div>
        <AocDay title="Day 1: Historian Hysteria" :input="day1Input" :results="[puzzle1Result, puzzle2Result]"
            :puzzles="2" @input-selected="onInputSelected" :steps="steps">
            <template #steps="{ step, index }">
                <div v-if="step.renderer == 'dump'" class="flex justify-center ">
                    <AocDump class="flex-1" v-for="result in step.results" :data="JSON.stringify(result, null, 4)" />
                </div>
            </template>
        </AocDay>
    </div>
</template>