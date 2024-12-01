export {Step,StepResult}

declare global {
    type Step = {
        title: string;
        renderer: string;
        puzzles?: number[];
        results: any[];
    }

}
