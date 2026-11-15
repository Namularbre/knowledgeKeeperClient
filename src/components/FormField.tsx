import {splitProps, type ComponentProps, type JSX} from "solid-js";
import {Form} from "solid-bootstrap";

export type FormFieldProps = ComponentProps<typeof Form.Control> & {
    /** Text of the label shown above the field */
    label: JSX.Element;
    /** Links the label to the field (Form.Group controlId) */
    id: string;
};

/**
 * Labelled form field built on solid-bootstrap (Form.Group + Form.Label + Form.Control).
 * Every other prop (type, name, required, autocomplete...) goes to Form.Control.
 */
function FormField(props: FormFieldProps) {
    const [local, rest] = splitProps(props, ["label", "id"]);

    return (
        <Form.Group class="mb-3" controlId={local.id}>
            <Form.Label>{local.label}</Form.Label>
            <Form.Control {...rest}/>
        </Form.Group>
    );
}

export {FormField};
