import {splitProps, type JSX} from "solid-js";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    /** Text of the label shown above the input */
    label: JSX.Element;
    id: string;
}

/**
 * Generic labelled input. Every native attribute (type, name, required,
 * autocomplete...) is forwarded to the <input>.
 */
function Input(props: InputProps) {
    const [local, rest] = splitProps(props, ["label", "id", "class"]);

    return (
        <>
            <label class="form-label" for={local.id}>{local.label}</label>
            <input {...rest} id={local.id} class={local.class ?? "form-control"}/>
        </>
    );
}

export {Input};
