import {createSignal} from "solid-js";

type FormSubmitEvent = SubmitEvent & {currentTarget: HTMLFormElement};

/**
 * Wraps an async form action and exposes its state.
 * `onSubmit` goes on the <form>; `pending` and `error` drive the UI.
 */
export function createSubmit(action: (data: FormData) => Promise<unknown>) {
    const [pending, setPending] = createSignal(false);
    const [error, setError] = createSignal<string | null>(null);

    const onSubmit = async (e: FormSubmitEvent) => {
        e.preventDefault();
        if (pending()) return;

        setPending(true);
        setError(null);
        try {
            await action(new FormData(e.currentTarget));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setPending(false);
        }
    };

    return {pending, error, onSubmit};
}
