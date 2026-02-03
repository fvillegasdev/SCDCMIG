/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface IFileUploadProps extends React.Props<any>, grid.IColumn, EK.UX.IFormElement {
        file?: string;
        required?: boolean;
        visible?: boolean | Function;
        nombre?: string;
        referencia?: string;
        idArchivo?: number;
        archivoNombre?: string;
        saveFile?: (info: any,dataItem:any,file:any)=> void;
        deleteFile?: ( dataItem: any) => void;
        dataItem?: any;        
        fnRefreshPage?: Function;
        showAddButton?: boolean;
        showDeleteButton?: boolean;
        enableDownloadFile?: boolean;
    }

    export class FileUpload extends React.Component<IFileUploadProps, IFileUploadProps> {
        constructor(props: IFileUploadProps) {
            super(props);

            this.state = {
                id: this.props.id,
                file: this.props.file,
                nombre: this.props.nombre,
                referencia: this.props.referencia
            };


            this.onChange = this.onChange.bind(this);
            this.onRemove = this.onRemove.bind(this);
        }

        static defaultProps: IFileUploadProps = {
            id: "",
            file: "",
            value: undefined,
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            visible: true,
            idArchivo: 0,
            archivoNombre: "",
            nombre: "",
            referencia:"",
            fnRefreshPage: function () { },
            showAddButton:false,
            showDeleteButton:false,
            enableDownloadFile: false,
            isFormComponent: true
        };

        refs: {
            input: Element;
            requiredPoint: Element;
        };

        onChange(e: any): any {
            e.preventDefault();
            let input: any = $(e.target).get(0);//$(e.target).find("input[type=file]").get(0);            

            let file = input.files[0];
            if (file) {
                let fileProps: any = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    elementId: input.id
                };

                this.props.saveFile(fileProps,this.props.dataItem,file);

                if (this.props.updateState) {
                    this.props.updateState({
                        id: this.props.id,
                        value: fileProps,
                        initialValue: this.props.initialValue,
                        hasChanged: true,
                        hasValidationError: this.props.hasValidationError,                       
                    });
                    
                }
            this.props.fnRefreshPage();
            }
        }

        onRemove(e: any): any {
            e.preventDefault();

            this.props.deleteFile( this.props.dataItem);

            if (this.props.updateState) {
                this.props.updateState({
                    id: this.props.dataItem.ID,
                    value: [],
                    initialValue: this.props.initialValue,
                    hasChanged: true,
                    hasValidationError: this.props.hasValidationError
                });
                
            }
            this.props.fnRefreshPage();
        }

        componentDidMount(): void {
            let fileInput: any = $(this.refs.input);            

            fileInput.fileinput().on("change.bs.fileinput", this.onChange);
            fileInput.fileinput().on("clear.bs.fileinput", this.onRemove);
        }

        componentWillUnmount(): void {
            let fileInput: any = $(this.refs.input);

            fileInput.fileinput().off("change.bs.fileinput");
            fileInput.fileinput().off("clear.bs.fileinput");
        }

        componentWillUpdate(nextProps: IFileUploadProps, nextState: any) {
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

            let formControlId: string;
            let previewControlId: string;
            let className: string = "input-file";
            let FileName: string = "";
            let formGroupClass: string = "form-group form-md form-md-floating-label";

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
                previewControlId = "previewControl_" + Number(d).toString();

            } else {
                formControlId = "formControl_" + this.props.id;
                previewControlId = "previewControl_" + this.props.id;
            };

            let requiredPoint: any = "";
            let requiredElement: any = "";
            if (this.props.required) {
                requiredElement = <span className="badge badge-danger">&nbsp;requerido&nbsp;</span>;
            }

            if (this.props.value && this.props.value !== "") {
                className += " edited";
                FileName = this.props.value.name;
            }

            let imageUrl: string;
            if (this.props.value !== undefined && this.props.value !== null) {
                if (this.props.initialValue === this.props.value) {
                    imageUrl = this.props.value;
                };
            }

            let RutaArchivo: string = './Workflows/Task/' + this.props.dataItem.FlujoTrabajoInstanciaId + '/' +
                this.props.dataItem.TareaInstanciaId + '/' + this.props.nombre + '/';
                

            return <Column
                className="text-center"
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}>

                <li className="mt-list-item done" style={{ padding: "5px", listStyleType: "none" }}>
                    <div className="row well well-sm" >                                
                        <Input id="DocumentoId" value={this.props.id} visible={false} initialValue={this.props.id} />                       
                        <div className="list-item-content col-xs-12 col-sm-12 col-md-9 col-lg-9" style={{ textAlign: "left" }}>
                            <h4 className="uppercase" style={{ margin: "10px",display: "inline-block",fontSize: "large",fontStyle: "normal",fontWeight: "bold"}} id={"nameDoc_" + this.props.id}
                                ><a href={RutaArchivo}>{this.props.nombre}</a></h4> 
                                                                                
                                <span style={{ margin: "10px" }} id={"nameFile_" + this.props.id}>{this.props.archivoNombre}</span>
                            </div>
                            <div className="col-xs-1 col-sm-1 col-md-2 col-lg-2">                              
                            <div className="row">
                                {this.props.showAddButton===true &&
                                    <span className="btn btn-outline btn-file green-sharp fa fa-upload" >
                                        <input type="file" id={formControlId} name={formControlId} multiple ref="file" style={{ opacity: 0 }} onChange={this.onChange} />
                                    </span>                                
                                }
                                {this.props.showDeleteButton === true &&
                                    <a className="btn btn-outline red fas fa-times" data-dismiss="fileinput" onClick={this.onRemove}></a>
                                }
                            </div>
                                
                            </div>
                          
                    </div>
                </li>      
                
            </Column>;
        }

        
    }

    const mapFileUploadItemButtonProps: any = (state: any) => {
        return {
            info: {
                //form: state.forms.uploadForm
            }     
        };
    };  

    const mapFileUploadDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            saveFile: (info: any, dataItem: any, file: any): void => {  
                var data = new FormData();
                                                 
                let fileItem: any = {
                    "text":info.name,
                    "Size":info.size,
                    "FileType": info.type,
                    "FlujoTrabajoInstanciaId": dataItem.FlujoTrabajoInstanciaId,
                    "TareaInstanciaId": dataItem.TareaInstanciaId,
                    "DocumentoId": dataItem.ID,
                    "ArchivoId": dataItem.ArchivoId,
                    "Obligatorio": dataItem.Obligatorio,
                    "Referencia": "T" + dataItem.TareaInstanciaId + "D" + dataItem.ID        
                };
                data.append("item", JSON.stringify(fileItem).toString());
                data.append("file", file);     
                dispatch(actionAsync({
                    action: "autorizacionProceso-documentos",
                    type: HttpMethod.PUT,
                    url: "Workflows/InsertDocumentsTaskInstance/",
                    data: data,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
                success("Se agregó el archivo correctamente.", "Agregar archivo");
            },
            deleteFile: (dataItem: any): void => {

                let fileItem: any = {
                    "text": dataItem.text,    
                    "FlujoTrabajoInstanciaId": dataItem.FlujoTrabajoInstanciaId,               
                    "TareaInstanciaId": dataItem.TareaInstanciaId,
                    "DocumentoId": dataItem.ID,
                    "ArchivoId": dataItem.ArchivoId,
                    "Obligatorio": dataItem.Obligatorio
                };

                dispatch(actionAsync({
                    action: "autorizacionProceso-documentos",
                    type: HttpMethod.POST,
                    url: "Workflows/DeleteDocumentsTaskInstance/",
                    data: fileItem,
                    status: AsyncActionTypeEnum.updating
                })
                );
                success("Se eliminó el archivo correctamente.", "Eliminar archivo");
            }
        };
    };
    export let FileSelector: any = ReactRedux.connect(mapFileUploadItemButtonProps, mapFileUploadDispatchs)(FileUpload);   
  
}
