export default function useSteps() {

    const steps = ref<Step[]>([])

    const doStep = async (title: string, action: Function, renderer: string, puzzles?: number[]) => {
        let results = await action()

        steps.value.push({
            title,
            results,
            renderer,
            puzzles
        })

        return results
    }

    return {
        doStep,
        steps
    }

}