/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

namespace EK.UX {
    "use strict";

    interface ISummerNoteProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        id: string;
        label?: string;
        helpLabel?: string;
        required?: boolean;
        placeholder?: string;
    }

    export class SummerNote extends React.Component<ISummerNoteProps, {}> {
        constructor(props: ISummerNoteProps) {
            super(props);

            this.Init = this.Init.bind(this);
            this.Destroy = this.Destroy.bind(this);
        }

        static defaultProps: ISummerNoteProps = {
            id: "",
            helpLabel: "",
            size: [12, 12, 12, 12],
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            isFormComponent: true,
            placeholder: undefined,
        };

        refs: {
            textEditor: Element;
        };

        shouldComponentUpdate(nextProps: ISummerNoteProps, nextState: any): boolean {
            return false;
        }

        Init(): void {
            let textEditor: any = $(this.refs.textEditor);
            let placeholder: string = this.props.placeholder != undefined ? this.props.placeholder : "Capture la plantilla en este apartado...";
            textEditor.summernote({
                placeholder: placeholder,
                height: 350,
                //fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
                toolbar:
                [
                    ['fontname', [['fontname']]],
                    ['insert', ["picture", "link", "table", "hr"]],
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ["height", ["height"]],
                    ["misc", ["codeview", "undo", "redo", "help"]]
                ]
            });
            textEditor.summernote('code', "");
        }

        Destroy(): void {
            let textEditor: any = $(this.refs.textEditor);
            textEditor.summernote('code', undefined);
            textEditor.summernote("destroy");
        }

        componentDidMount(): void {
            this.Init();
            let textEditor: any = $(this.refs.textEditor);
            textEditor.summernote('code', this.props.value);


            textEditor.on("summernote.change", (customEvent, contents, $editable): any => {
                if (contents != customEvent.currentTarget.value) {
                    if (this.props.updateState) {
                        this.props.updateState({
                            id: this.props.id,
                            value: contents,
                            initialValue: this.props.initialValue,
                            hasChanged: true,
                            validations: this.props.validations,
                            isFormComponent: true
                        });
                    }
                }
            });
        };

        componentWillUpdate(nextProps: ISummerNoteProps, nextState: any) {
            this.Destroy();
        }

        componentDidUnMount(): void {
            this.Destroy();
        }

        componentDidUpdate(): void {
            let textEditor: any = $(this.refs.textEditor);
            textEditor.summernote('code', this.props.value);
        }

        componentWillUnmount(): void {
            this.Destroy();
        }

        render(): JSX.Element {
            let formControlId: string = "formControl_" + this.props.id;
            let required: boolean = false;
            let requiredPoint: any = "";

            if (this.props.validations && this.props.validations.length > 0) {
                for (var i = 0; i < this.props.validations.length; i++) {
                    if (this.props.validations[i].type === "requerido") {
                        required = true;
                        break;
                    };
                };
            }

            if (this.props.hasValidationError === true && this.props.validate === true) {
                requiredPoint = <span
                    className="required-char"
                    data-container="body"
                    data-placement="right"
                    data-original-title={this.props.helpLabel}>*</span>;
            } else {
                if (required) {
                    requiredPoint = <span
                        className="required-char-nv"
                        data-container="body"
                        data-placement="right"
                        data-original-title={this.props.helpLabel}>*</span>
                };
            };
            return <grid.Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div id={this.props.id} ref="textEditor"> </div>
            </grid.Column>;

        }
    }

    export class SummerNoteForm extends React.Component<ISummerNoteProps, ISummerNoteProps> {
        constructor(props: ISummerNoteProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };

        updateState(element: any): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            element.validate = true;

            Forms.updateFormElement(idForm, element);
        };

        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };

        componentWillReceiveProps(nextProps: ISummerNoteProps) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };

        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <SummerNote {...element} {...labels} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let SummerNote$Form: any = ReactRedux.connect(Forms.props, null)(SummerNoteForm);
}
import RichTextEditor = EK.UX.SummerNote$Form;