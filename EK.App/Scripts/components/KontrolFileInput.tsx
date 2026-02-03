// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.Kontrol {
    "use strict";
    const default$source: string = global.getFullUrl("/Content/Img/component/thumbnail.png", "") ;
    export class File {
        private name: string;
        private size: number;
        private type: string;
        private extension: string;
        public constructor(private data: any) {
            if (this.data) {
                this.name = this.data.name;
                this.size = this.data.size;
                this.type = this.data.type;
                this.extension = getFileExtension(this.name);
            } else {
                this.name = "";
                this.size = 0;
                this.type = "";
                this.extension = "";
            }
        }
        public isValid(): boolean {
            return this.data ? true : false;
        }
        public getFile(): any {
            return this.data;
        }
        public getName(): string {
            return this.name;
        }
        public getSize(): number {
            return this.size;
        }
        public getType(): string {
            return this.type;
        }
        public getExtension(): string {
            return this.extension;
        }
    }
    export enum FileInputMode {
        IconOnly,
        IconOnlyEKC,
        Default,
        WithoutInput,
        ImageUpload1,
        ImageUpload2
    }
    export interface IKontrolFileInputProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        onSelect?: (e: any) => any;
        onChange?: (file: File) => any;
        inputChange?: (e: any) => any;
        inputRemove?: (e: any) => any;
        onBlur?: (e: any) => any;
        mode?: number;
        text?: string;
        label?: string;
        required?: boolean;
        textChange?: string;
        textRemove?: string;
        visible?: boolean | Function;
        source?: string;
        iconColor?: string;
    }
    export interface IKontrolFileInputState {
        file: File;
    }

    export class KontrolFile$InputV2 extends React.Component<IKontrolFileInputProps, {}>{
        constructor(props: IKontrolFileInputProps) {
            super(props);
            this.inputClick = this.inputClick.bind(this);
            this.inputTrigger = this.inputTrigger.bind(this);
            this.inputChange = this.inputChange.bind(this);
            this.inputRemove = this.inputRemove.bind(this);
            this.inputBlur = this.inputBlur.bind(this);
            this.onLoad = this.onLoad.bind(this);
        };
        static defaultProps: IKontrolFileInputProps = {
            mode: FileInputMode.IconOnly,
            text: " Seleccionar ",
            textChange: " Cambiar ",
            textRemove: " Cancelar ",
            visible: true,
            label: "",
            source: default$source,
            size: [12, 12, 12, 12],
            iconColor: "white"
        };
        //
        inputRef: Element;
        //
        inputClick(info: any): any {
            if (this.props.onSelect) {
                this.props.onSelect(info);
            }
        };
        inputTrigger(info: any, button: any): any {
            let fileInput: any = $(this.inputRef);
            fileInput.click();
        };
        inputChange(e: any): any {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.inputChange) {
                this.props.inputChange(e);
            }
            else {
                let data: any = e.target.files[0];
                let file: File = new File(data);

                if (this.props.onChange) {
                    this.props.onChange(file);
                }

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                if (idForm && this.props.id) {
                    Forms.updateFormElement(idForm, this.props.id, true);
                };
            }
        };
        inputRemove(e: any): any {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.inputRemove) {
                this.props.inputRemove(e);
            }
            else {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                let element: any = {
                    id: this.props.id,
                    value: null,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    validations: this.props.validations,
                    isFormComponent: true,
                    validate: true
                };
                Forms.updateFormElement(idForm, element);
            }
        };
        inputBlur(e: any): any {
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        };
        componentDidMount(): void {
            let fileInput: any = $(this.inputRef);
            fileInput.fileinput().on("change", this.inputChange);
            fileInput.fileinput().on("click", this.inputClick);
            $('#fileinput-img').hide();
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm && this.props.id) {
                Forms.updateFormElement(idForm, this.props.id, false);
            };
        };
        componentWillUnmount(): void {
            let fileInput: any = $(this.inputRef);
            fileInput.fileinput().off("change");
            fileInput.fileinput().off("click");
        };
        onLoad(): void {
            $('#fileinput-img').hide();
            $('#fileinput-div').removeClass('fileinput-loading')
            $('#fileinput-img').fadeIn();
        };
        render(): JSX.Element {
            let mode: number = this.props.mode;
            let text: string = this.props.text;
            let textChange: string = this.props.textChange;
            let textRemove: string = this.props.textRemove;
            let inputs: JSX.Element[] = [];
            let source: string = this.props.source ? this.props.source : default$source;

            if (!this.props.visible) {
                return null;
            }

            let formControlId: string = "formControl_" + this.props.id;
            let formGroupClass: string = "form-group";

            inputs[FileInputMode.Default] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className={formGroupClass}>
                    <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12, width: "100%" }}>
                        <span ref="requiredPoint">{this.props.label}</span>
                    </label>
                    <div className="fileinput fileinput-new" data-provides="fileinput" style={{ width: "100%" }}>
                        <div className="input-group" style={{ width: "100%" }}>
                            <div className="form-control uneditable-input input-fixed input-large" data-trigger="fileinput">
                                <i className="fas fa-file fileinput-exists"></i>&nbsp;
                            <span className="fileinput-filename">&nbsp;</span>
                            </div>
                            <span className="input-group-addon btn default btn-file" style={{ width: "10%" }}>
                                <span className="fileinput-new"><i className="fas fa-papeclip"></i></span>
                                <span className="fileinput-exists"><i className="fas fa-paperclip"></i></span>
                                <input
                                    id={"formControl_" + this.props.id}
                                    type="file"
                                    name="..."
                                    ref={(node) => this.inputRef = node}
                                    onClick={this.inputClick}
                                    onChange={this.inputChange}
                                    onBlur={this.inputBlur} />
                            </span>
                            <a href="javascript:void(0)"
                                className="input-group-addon btn red fileinput-exists"
                                data-dismiss="fileinput"
                                onClick={this.inputRemove}
                                style={{ width: "10%" }}>
                                <i className="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.IconOnly] = <span>
                <Button style={{ color: this.props.iconColor, fontSize: '20px' }} className="btn-ico-ek white fa-2x" keyBtn={"btnKONTROLFILESubirInformacion"} iconOnly={true} icon="fas fa-paperclip fa-2x" onClick={this.inputTrigger} color="white" />
                <input
                    type="file"
                    name="..."
                    ref={(node) => this.inputRef = node}
                    style={{ display: "none" }}
                    onClick={this.inputClick}
                    onChange={this.inputChange}
                    onBlur={this.inputBlur} />
            </span>

            inputs[FileInputMode.ImageUpload1] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput">
                    <div className="fileinput-preview thumbnail" data-trigger="fileinput" style={{ width: "200px", height: "150px", lineHeight: "150px", color: "#333" }}>
                    </div>
                    <div>
                        <span className="btn red btn-outline btn-file" >
                            <span className="fileinput-new">{text}</span>
                            <span className="fileinput-exists">{textChange}</span>
                            <input type="hidden" value="" name="..." />
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                accept="image/*"
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>
                        <a href="javascript:void(0)" className="btn red fileinput-exists" data-dismiss="fileinput">{textRemove}</a>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.ImageUpload2] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput" style={{ width: "100%" }}>
                    <div
                        id="fileinput-div"
                        className="fileinput-new thumbnail fileinput-image fileinput-loading"
                        style={{ width: "100%" }}>
                        <img
                            id="fileinput-img"
                            src={source}
                            onLoad={this.onLoad}
                            className="img-responsive" alt="" />
                    </div>
                    <div
                        className="fileinput-preview fileinput-image fileinput-exists thumbnail">
                    </div>
                    <div style={{ display: "none" }}>
                        <span className="btn red btn-outline btn-file">
                            <span className="fileinput-new"><Icon icon="fas fa-camera"></Icon>&nbsp;{text}</span>
                            <span className="fileinput-exists"><Icon icon="fas fa-sync"></Icon>&nbsp;{textChange}</span>
                            <input type="hidden" value="" name="..." />
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                accept="image/*"
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>
                        <a href="javascript:void(0)" className="btn red fileinput-exists" data-dismiss="fileinput">
                            <Icon icon="fas fa-times"></Icon>&nbsp;{textRemove}
                        </a>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.WithoutInput] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput">
                    <div className="input-group input-large">
                        <span className="btn green btn-file">
                            <span className="fileinput-new">{text}</span>
                            <span className="fileinput-exists">{textChange}</span>
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>&nbsp;
                <span className="fileinput-filename">&nbsp;</span>&nbsp;
                <a href="javascript:void(0)" className="close fileinput-exists" data-dismiss="fileinput"></a>
                    </div>
                </div>
            </Column>

            return inputs[mode];
        }
    };

    export class KontrolFile$Input extends React.Component<IKontrolFileInputProps, {}>{
        constructor(props: IKontrolFileInputProps) {
            super(props);
            this.inputClick = this.inputClick.bind(this);
            this.inputTrigger = this.inputTrigger.bind(this);
            this.inputChange = this.inputChange.bind(this);
            this.inputRemove = this.inputRemove.bind(this);
            this.inputBlur = this.inputBlur.bind(this);
            this.onLoad = this.onLoad.bind(this);
        };
        static defaultProps: IKontrolFileInputProps = {
            mode: FileInputMode.IconOnly,
            text: " Seleccionar ",
            textChange: " Cambiar ",
            textRemove: " Cancelar ",
            visible: true,
            label: "",
            source: default$source,
            size: [12, 12, 12, 12],
            iconColor:"white"
        };
        //
        inputRef: Element;
        //
        inputClick(info: any): any {
            if (this.props.onSelect) {
                this.props.onSelect(info);
            }
        };
        inputTrigger(info: any, button: any): any {
            let fileInput: any = $(this.inputRef);
            fileInput.click();
        };
        inputChange(e: any): any {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.inputChange) {
                this.props.inputChange(e);
            }
            else {
                let data: any = e.target.files[0];
                let file: File = new File(data);

                if (this.props.onChange) {
                    this.props.onChange(file);
                }

                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                if (idForm && this.props.id) {
                    Forms.updateFormElement(idForm, this.props.id, true);
                };
            }
        };
        inputRemove(e: any): any {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.inputRemove) {
                this.props.inputRemove(e);
            }
            else {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                let element: any = {
                    id: this.props.id,
                    value: null,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    validations: this.props.validations,
                    isFormComponent: true,
                    validate: true
                };
                Forms.updateFormElement(idForm, element);
            }
        };
        inputBlur(e: any): any {
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        };
        componentDidMount(): void {
            let fileInput: any = $(this.inputRef);
            fileInput.fileinput().on("change", this.inputChange);
            fileInput.fileinput().on("click", this.inputClick);
            $('#fileinput-img').hide();
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            if (idForm && this.props.id) {
                Forms.updateFormElement(idForm, this.props.id, false);
            };
        };
        componentWillUnmount(): void {
            let fileInput: any = $(this.inputRef);
            fileInput.fileinput().off("change");
            fileInput.fileinput().off("click");
        };
        onLoad(): void {
            $('#fileinput-img').hide();
            $('#fileinput-div').removeClass('fileinput-loading')
            $('#fileinput-img').fadeIn();
        };
        render(): JSX.Element {
            let mode: number = this.props.mode;
            let text: string = this.props.text;
            let textChange: string = this.props.textChange;
            let textRemove: string = this.props.textRemove;
            let inputs: JSX.Element[] = [];
            let source: string = this.props.source ? this.props.source : default$source;

            if (!this.props.visible) {
                return null;
            }

            let formControlId: string = "formControl_" + this.props.id;
            let formGroupClass: string = "form-group";

            inputs[FileInputMode.Default] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className={formGroupClass}>
                    <label htmlFor={formControlId} style={{ textTransform: "uppercase", fontSize: 12, width: "100%" }}>
                        <span ref="requiredPoint">{this.props.label}</span>
                    </label>
                    <div className="fileinput fileinput-new" data-provides="fileinput" style={{width: "100%"}}>
                        <div className="input-group" style={{ width: "100%" }}>
                            <div className="form-control uneditable-input input-fixed input-large" data-trigger="fileinput">
                                <i className="fas fa-file fileinput-exists"></i>&nbsp;
                            <span className="fileinput-filename">&nbsp;</span>
                            </div>
                            <span className="input-group-addon btn default btn-file" style={{ width: "10%" }}>
                                <span className="fileinput-new"><i className="fas fa-cloud-upload-alt"></i></span>
                                <span className="fileinput-exists"><i className="fas fa-cloud-upload-alt"></i></span>
                                <input
                                    id={"formControl_" + this.props.id}
                                    type="file"
                                    name="..."
                                    ref={(node) => this.inputRef = node}
                                    onClick={this.inputClick}
                                    onChange={this.inputChange}
                                    onBlur={this.inputBlur} />
                            </span>
                            <a href="javascript:void(0)"
                                className="input-group-addon btn red fileinput-exists"
                                data-dismiss="fileinput"
                                onClick={this.inputRemove}
                                style={{ width: "10%" }}>
                                <i className="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.IconOnly] = <span>
                <Button style={{ color: this.props.iconColor }} className="btn-ico-ek white" keyBtn={"btnKONTROLFILESubirInformacion"} iconOnly={true} icon="fas fa-cloud-upload-alt" onClick={this.inputTrigger} color="white" />
                <input
                    type="file"
                    name="..."
                    ref={(node) => this.inputRef = node}
                    style={{ display: "none" }}
                    onClick={this.inputClick}
                    onChange={this.inputChange}
                    onBlur={this.inputBlur} />
            </span>

            inputs[FileInputMode.IconOnlyEKC] = <span>
                <Button style={{ color: this.props.iconColor, fontSize:'26px' }} className="btn-ico-ek white fa-2x fa-ekc" keyBtn={"btnKONTROLFILEUPLOADEKCFILE"} iconOnly={true} icon="fas fa-paperclip" onClick={this.inputTrigger} color="white" />
                <input
                    type="file"
                    name="..."
                    ref={(node) => this.inputRef = node}
                    style={{ display: "none" }}
                    onClick={this.inputClick}
                    onChange={this.inputChange}
                    onBlur={this.inputBlur} />
            </span>

            inputs[FileInputMode.ImageUpload1] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput">
                    <div className="fileinput-preview thumbnail" data-trigger="fileinput" style={{ width: "200px", height: "150px", lineHeight: "150px", color: "#333" }}>
                    </div>
                    <div>
                        <span className="btn red btn-outline btn-file" >
                            <span className="fileinput-new">{text}</span>
                            <span className="fileinput-exists">{textChange}</span>
                            <input type="hidden" value="" name="..." />
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                accept="image/*"
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>
                        <a href="javascript:void(0)" className="btn red fileinput-exists" data-dismiss="fileinput">{textRemove}</a>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.ImageUpload2] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput" style={{ width: "100%" }}>
                    <div
                        id="fileinput-div"
                        className="fileinput-new thumbnail fileinput-image fileinput-loading"
                        style={{ width: "100%" }}>
                        <img
                            id="fileinput-img"
                            src={source}
                            onLoad={this.onLoad}
                            className="img-responsive" alt="" />
                    </div>
                    <div
                        className="fileinput-preview fileinput-image fileinput-exists thumbnail">
                    </div>
                    <div style={{ display: "none" }}>
                        <span className="btn red btn-outline btn-file">
                            <span className="fileinput-new"><Icon icon="fas fa-camera"></Icon>&nbsp;{text}</span>
                            <span className="fileinput-exists"><Icon icon="fas fa-sync"></Icon>&nbsp;{textChange}</span>
                            <input type="hidden" value="" name="..." />
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                accept="image/*"
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>
                        <a href="javascript:void(0)" className="btn red fileinput-exists" data-dismiss="fileinput">
                            <Icon icon="fas fa-times"></Icon>&nbsp;{textRemove}
                        </a>
                    </div>
                </div>
            </Column>

            inputs[FileInputMode.WithoutInput] = <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div className="fileinput fileinput-new" data-provides="fileinput">
                    <div className="input-group input-large">
                        <span className="btn green btn-file">
                            <span className="fileinput-new">{text}</span>
                            <span className="fileinput-exists">{textChange}</span>
                            <input
                                type="file"
                                name="..."
                                ref={(node) => this.inputRef = node}
                                onClick={this.inputClick}
                                onChange={this.inputChange}
                                onBlur={this.inputBlur} />
                        </span>&nbsp;
                <span className="fileinput-filename">&nbsp;</span>&nbsp;
                <a href="javascript:void(0)" className="close fileinput-exists" data-dismiss="fileinput"></a>
                    </div>
                </div>
            </Column>

            return inputs[mode];
        }
    };

    export class File$Input extends React.Component<input.IInputProps, {}>{
        constructor(props: input.IInputProps) {
            super(props);

            this.updateState = this.updateState.bind(this);
        };
        static defaultProps: input.IInputProps = {
            id: "Archivo",
            size: [8, 8, 8, 8],
            validations: [validations.required()]
        };
        updateState(e: any): void {
            let hasChanged: boolean = true;
            let currentValue: boolean = false;
            let file: EK.UX.Kontrol.File = new EK.UX.Kontrol.File(e.target.files[0]);
            //
            let fileSize: number = EK.UX.Kontrol.DEFAULT_FILE_SIZE;
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            //
            currentValue = file.isValid();
            //
            let element: IFormElement = Forms.getFormElement(idForm, this.props);
            element.value = currentValue;
            element.initialValue = this.props.initialValue;
            element.hasChanged = true;
            element.validations = this.props.validations;
            element.isFormComponent = true;
            element.validate = true;
            //
            Forms.updateFormElement(idForm, element);
        };
        componentDidMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                Forms.updateFormElement(idForm, Forms.getFormElement(idForm, this.props));
            };
        };
        componentWillReceiveProps(nextProps: input.IInputProps) {   
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };
        render(): JSX.Element {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = EK.Global.assign(this.props, Forms.getFormElement(idForm, this.props));

                let $page: any = $ml[this.props.idForm];
                let labels: any = {};

                if ($page && this.props.id) {
                    labels = global.setLabels($page, this.props);
                };

                return <EK.UX.Kontrol.KontrolFile$Input
                    id={this.props.id}
                    size={this.props.size}
                    validations={this.props.validations}
                    inputChange={this.updateState}
                    inputRemove={(e: any) => { }}
                    mode={EK.UX.Kontrol.FileInputMode.IconOnly} />
            } else {
                return null;
            };
        };
    };
};
namespace EK.UX.Kontrol.Archivos {
    export let SingleFile: any = ReactRedux.connect(Forms.props, null)(EK.UX.Kontrol.File$Input);
};
import files = EK.UX.Kontrol.Archivos;