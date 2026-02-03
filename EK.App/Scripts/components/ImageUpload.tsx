/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface IImageUpload extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        config?: page.IPageConfig;
        file?: string;
        required?: boolean;
        helpLabel?: string;
        label?: string;
        visible?: boolean | Function;
    }

    export class ImageUpload extends React.Component<IImageUpload, IImageUpload> {
        constructor(props: IImageUpload) {
            super(props);

            this.state = {
                id: this.props.id,
                file: this.props.file
            };

            this.onChange = this.onChange.bind(this);
            this.onRemove = this.onRemove.bind(this);
        }
        //
        static props: any = (state: any) => {
            return {
                config: global.createPageConfigFromState(state.global)
            };
        };
        //
        static defaultProps: IImageUpload = {
            id: "",
            file: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            visible: true,
            isFormComponent: true
        };

        refs: {
            input: Element;
            requiredPoint: Element;
        };

        DEFAULT_SIZE: number = 4096000;
        getFormatBytes2(bytes: number = 0, precision: number = 2): string {
            if (isNaN(bytes) || !isFinite(bytes)) return '0 Bytes';

            let unit = 0;
            let units: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

            while (bytes >= 1024) {
                bytes /= 1024;
                unit++;
            }

            return bytes.toFixed(precision) + ' ' + units[unit];
        };
        getFileExtension(filename: string): string {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        };
        getFilePath(data: any): string {
            return ["KontrolFiles", "GetFile", data.EntityType, data.EntityId, data.Uid].join("/");
        };
        onClickSave(file: any): void {
            let $page: any = $ml[this.props.config.id];

            let item: DataElement = getData(this.props.config.getEntity());
            let current: any = getData(item);

            let fileProps: any = {};
            fileProps['name'] = file.name;
            fileProps['size'] = file.size;
            fileProps['type'] = file.type;
            fileProps['extt'] = this.getFileExtension(file.name);

            if (fileProps.size > this.DEFAULT_SIZE) {
                errorMessage([$page.mensajes.fileSize, this.getFormatBytes2(this.DEFAULT_SIZE, 0)].join(" "));
                return;
            }

            let d: any = new Date();
            let uuid: any = Number(d).toString();
            let model: any = {};
            model["ID"] = current.ID;
            model["EntityId"] = current.EntityId;
            model["EntityType"] = current.EntityType;
            model["FileSize"] = fileProps.size;
            model["FileType"] = fileProps.type;
            model["FileExtension"] = fileProps.extt;
            model["Nombre"] = fileProps.name;
            model["Modulo"] = current.Modulo;
            model["Uid"] = uuid;
            model["FilePath"] = this.getFilePath(model);

            model = EK.Global.assign(model, {
                EntityId: model.EntityId,
                EntityType: model.EntityType,
                FileSize: model.FileSize,
                FileType: model.FileType,
                FileExtension: model.FileExtension,
                Nombre: model.Nombre,
                Modulo: model.Modulo,
                Uid: model.Uid,
                FilePath: model.FilePath
            });

            let data: FormData = new FormData();
            data.append("item", JSON.stringify(model));
            data.append("file", file);

            //dispatchAsyncPut("kontrol-fileManager-guardar", "KontrolFiles/Save", data, this.props.itemKey);
        };
        onChange(e: any): any {
            e.preventDefault();
            let input: any = $(e.target).find("input[type=file]").get(0);

            let file = input.files[0];
            if (file) {
                let fileProps: any = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    elementId: input.id
                };

                if (this.props.updateState) {
                    this.props.updateState({
                        id: this.props.id,
                        value: fileProps,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        hasValidationError: this.props.hasValidationError
                    });
                }
            }
        }

        onRemove(e: any): any {
            e.preventDefault();
            let input: any = $(e.target).find("input[type=file]").get(0);

            let fileProps: any = {
                removed: true,
                elementId: input.id
            };

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.id,
                    value: fileProps,
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    hasValidationError: this.props.hasValidationError
                });
            }
        }

        componentDidMount(): void {
            let fileInput: any = $(this.refs.input);
            // let formControlId: string = "formControl_" + this.props.id;

            fileInput.fileinput().on("change.bs.fileinput", this.onChange);
            fileInput.fileinput().on("clear.bs.fileinput", this.onRemove);
        }

        componentWillUnmount(): void {
            let fileInput: any = $(this.refs.input);

            fileInput.fileinput().off("change.bs.fileinput");
            fileInput.fileinput().off("clear.bs.fileinput");
        }

        componentWillUpdate(nextProps: IImageUpload, nextState: any) {
            let fileInput: any = $(this.refs.input);

            fileInput.fileinput().off("change.bs.fileinput");
        }

        componentDidUpdate(): void {
            let fileInput: any = $(this.refs.input);

            fileInput.fileinput().on("change.bs.fileinput", this.onChange);
        }

        render(): JSX.Element {
            if (!this.props.visible) {
                return null;
            };

            let state: any = getData(this.props.config.getState());
            let entity: DataElement = getData(this.props.config.getEntity());

            let formControlId: string;
            let previewControlId: string;
            let className: string = "input-file";
            let formGroupClass: string = "form-group form-md form-md-floating-label";

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
                previewControlId = "previewControl_" + Number(d).toString();

            } else {
                formControlId = "formControl_" + this.props.id;
                previewControlId = "previewControl_" + this.props.id;
            };

            if (this.props.value && this.props.value !== "") {
                className += " edited";
            }

            let imageUrl: string;
            if (this.props.value !== undefined && this.props.value !== null) { 
                if (this.props.initialValue === this.props.value) {
                    imageUrl = this.props.value;
                };
            };

            return <Column
                className="text-center"
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>
                <div ref="input"
                    className="fileinput fileinput-new" data-provides="fileinput">
                    <div
                        className="fileinput-preview thumbnail"
                        data-trigger="fileinput"
                        style={{
                            cursor: "pointer", 
                            width: 195,
                            height: 195,
                            padding: 5
                        }}>
                        { imageUrl ? <img src={imageUrl} /> : <img src="" /> }
                    </div>
                    <div className="row">
                        <span className="btn red btn-outline btn-file">
                            <span className="fileinput-new"> Seleccionar... </span>
                            <span className="fileinput-exists"> Seleccionar... </span>
                            <input type="file"
                                id={formControlId}
                                name={formControlId}/>
                        </span>
                        <a href="javascript:;" className="btn red" data-dismiss="fileinput"> Remover... </a>
                    </div>
                </div>
            </Column>;
        };
    };

    export class ImageUploadForm extends React.Component<IImageUpload, IImageUpload> {
        constructor(props: IImageUpload) {
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

        componentWillReceiveProps(nextProps: IImageUpload) {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let nextIdForm: string = nextProps.idFormSection ? nextProps.idFormSection : nextProps.idForm;

            if (idForm !== nextIdForm) {
                Forms.updateFormElement(nextIdForm, Forms.getFormElement(nextIdForm, nextProps));
            };
        };

        render(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

            if (idForm) {
                let element: any = Forms.getFormElement(idForm, this.props);

                return <ImageUpload {...this.props} {...element} updateState={this.updateState} />;
            } else {
                return null;
            };
        };
    };

    export let ImageUpload$Form: any = ReactRedux.connect(Forms.props, null)(ImageUploadForm);
};

import ImageSelector = EK.UX.ImageUpload$Form;