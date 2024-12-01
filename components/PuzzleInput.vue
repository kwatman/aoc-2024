<script setup lang="ts">
const puzzleInput = defineModel<string | null>();

const props = defineProps<{
    defaultInput?: string;
}>()

const emit = defineEmits(['inputSelected']);

const fileInput = useTemplateRef<HTMLInputElement | null>('fileInput');


const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
        console.log('No file selected');
        return;
    }

    try {
        const reader = new FileReader();

        reader.onload = () => {
            puzzleInput.value = reader.result as string;
            emit('inputSelected', puzzleInput.value);
        };

        reader.onerror = () => {
            console.error('Error reading file:', reader.error);
        };

        reader.readAsText(file); // Adjust this based on the file type (e.g., `readAsDataURL` for images)
    } catch (error) {
        console.error('Error processing file:', error);
    }
};

const openDialog = () => {
    fileInput.value.click()
}

const loadDefault = async () => {
    puzzleInput.value = props.defaultInput;
    emit('inputSelected', puzzleInput.value);
}


</script>

<template>
    <input class="hidden" type="file" ref="fileInput" @change="handleFileChange">
    <div class="">
        <div v-if="!puzzleInput" class="flex justify-center gap-2">
            <p class="text-aoc-white ">No input provided:</p>
            <button @click="loadDefault" class="text-aoc-yellow">[Use Default]</button>
            <button @click="openDialog" class="text-aoc-yellow">[Select File]</button>
        </div>
    </div>
</template>