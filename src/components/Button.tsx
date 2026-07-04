import {mergeProps} from "solid-js";

interface ButtonProps {
    text: string,
    color: string,
    action: Function | undefined,
    type: "submit" | "reset" | "button" | "menu" | undefined,
}

/**
 * Generic button component
 * @param props
 * @constructor
 */
function Button(props: ButtonProps) {
    const finalProps = mergeProps({defaultText: "Click me", defaultColor: "primary", defaultType: "button"}, props);

    return (
        <>
            <button type={finalProps.type} background-color={finalProps.color} onclick={(e) => {
                if (props.action !== undefined) {
                    e.preventDefault();
                    props.action(e);
                }
            }}>{props.text}</button>
        </>
    );
}

export {Button};
