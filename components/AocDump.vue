<script setup lang="ts">
import Prism from "prismjs";

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/components/prism-json'
import 'prismjs/plugins/match-braces/prism-match-braces'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/match-braces/prism-match-braces.css'

import "prismjs/themes/prism-tomorrow.css";
const props = withDefaults(
    defineProps<{
        language?: string;
        data: any;
    }>(),
    {
        language: "json",
    }
);

const codeblock = ref(null);

Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,

})

onMounted(async () => {
    await nextTick()
    highlight()
})

async function highlight() {
    if (codeblock.value) {
        Prism.highlightElement(codeblock.value)
    }
}

watch(
    () => props.data,
    async () => {
        await nextTick()
        highlight()
    },
    {
        deep: true,
    },
)
</script>


<template>
    <div class="max-h-96 overflow-y-auto">
        <pre class="line-numbers">
            <code ref="codeblock" class="match-braces" :class="'language-' + props.language">
            {{ props.data }}
            </code>
        </pre>
    </div>
</template>