
interface InputProps {
    name: string,
    displayName: string,
    value: string|undefined,
    required: boolean,
    id: string,
    classes: string|undefined,
    placeholder: string|undefined,
    type: "text" | "number" | "date" | "color" | "file" | "password"
}

/**
 * A generic input div with a label
 * @param props
 * @constructor
 */
function Input(props: InputProps) {
    return (
        <>
            <label for={props.id}>{props.displayName}</label>
            <input id={props.id} name={props.name} class={props.classes} value={props.value} required={props.required} placeholder={props.placeholder}/>
        </>
    );
}

export {Input};
