import {mergeProps, splitProps, type JSX} from "solid-js";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Bootstrap variant: primary, secondary, outline-primary... */
    variant?: string;
}

/**
 * Generic button: a thin wrapper around <button> that adds Bootstrap classes.
 * Every native attribute (type, disabled, onClick...) is forwarded as is.
 */
function Button(props: ButtonProps) {
    const merged = mergeProps({variant: "primary", type: "button" as const}, props);
    const [local, rest] = splitProps(merged, ["variant", "class", "children"]);

    return (
        <button {...rest} class={`btn btn-${local.variant}${local.class ? ` ${local.class}` : ""}`}>
            {local.children}
        </button>
    );
}

export {Button};
