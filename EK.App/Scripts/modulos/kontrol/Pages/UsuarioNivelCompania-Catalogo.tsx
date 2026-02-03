//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    interface IUsuarioNivelCompania extends React.Props<any> {
//        IdUsuario?: number;
//        niveles?: any;
//        companias?: any;
//        obtenerDatos: (idUsuario: number) => void;
//        onRowSelected?: (item: any) => void;
//    }

//    export class PageUsuarioNivelCompania extends React.Component<IUsuarioNivelCompania, IUsuarioNivelCompania> {
//        constructor(props: IUsuarioNivelCompania) {
//            super(props);
//            this.onRowSelectedForm = this.onRowSelectedForm.bind(this);
//        }

//        onRowSelectedForm(item: any): void {
//            this.props.onRowSelected(item);
//        };

//        componentDidMount(): any {
//            requireGlobal(Catalogos.niveles);
//            this.props.obtenerDatos(this.props.IdUsuario);
//        }

//        shouldComponentUpdate(nextProps: IUsuarioNivelCompania, nextState: IUsuarioNivelCompania): boolean {
//            return true;
//        }

//        render(): JSX.Element {
//            if (this.props.IdUsuario == undefined) { return null; }

//            let columns: any[] = [
//                { title: "Nivel", data: "Nivel.Nivel" },
//                { title: "Compañía", data: "Compania.Nombre" }];

//            let nivel: any = (this.props.niveles && this.props.niveles.data) ?
//                this.props.niveles.data[0] : undefined;

//            let compania: any = (this.props.companias && this.props.companias.data) ?
//                this.props.companias.data[0] : undefined;

//            return <Form id={"frmUsuarioNivelCompania"} ref="form">
//                <Column size={[12, 12, 12, 12]}>
//                    <OptionSection title="Niveles" readOnly={false}>
//                        <Row>
//                            <Input id="ID" label="" value={this.props.IdUsuario} visible={false} />
//                            <DropdownList id="Niveles" label="Nivel" items={this.props.niveles}
//                                size={[12, 4, 4, 4]} helpLabel="Seleccione el nivel" value={nivel}
//                                itemKey={"ID"} itemValue={"Nivel"} />
//                            <DropdownList id="Companias" label="Compañía" items={this.props.companias}
//                                size={[12, 4, 4, 4]} helpLabel="Seleccione la compania" value={compania} />
//                            <ButtonGroup>
//                                <DeleteNivelCompania text="" icon={"fa fa-trash-o"} iconOnly={false}
//                                    inverse={false} isInHeaderPortlet={true} color={ColorEnum.greenSharp} />
//                                <AddNivelCompania text="" icon={"fa fa-plus-square-o"} iconOnly={false}
//                                    inverse={false} isInHeaderPortlet={true} color={ColorEnum.greenSharp} />
//                            </ButtonGroup>
//                            <TableNivelesCompania id="tblNivelesCompanias" columns={columns}
//                                key={"dtNivelesCompanias"} onRowSelected={this.onRowSelectedForm} />
//                        </Row>
//                    </OptionSection>
//                </Column>
//            </Form>;
//        }
//    }

//    //Página
//    const mapProps: any = (state: any): any => {
//        return {
//            niveles: state.global.NIVELES,
//            companias: state.global.COMPANIAS
//        };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            obtenerDatos: (idUsuario: number): any => {
//                dispatchAsync("usuarios-niveles", "usuarios/niveles(" + idUsuario + ")");
//            },
//            onRowSelected: (item: any): any => {
//                dispatchDefault("usuarios-nivelesSetSelected", item);
//            },
//        };
//    };

//    /// Tabla 
//    const mapTableNivelesCompania: any = (state: any) => {
//        return {
//            data: state.usuarios.niveles,
//            selectedItem: state.usuarios.nivelSelected
//        };
//    };

//    /// Botón
//    const mapAddNivelCompaniaDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (form: any): void => {
//                let datos = new EditForm("frmUsuarioNivelCompania");
//                let Niveles: any = datos.formData.form.Niveles.value;
//                let Companias: any = datos.formData.form.Companias.value;
//                let sForm: any = {
//                    "ID": 0,
//                    "IdUsuario": datos.formData.form.ID.value,
//                    "IdNivel": datos.formData.form.Niveles.value.ID,
//                    "IdCompania": datos.formData.form.Companias.value.ID
//                };
//                dispatch(actionAsync({
//                    action: "usuarios-guardarniveles",
//                    type: HttpMethod.PUT,
//                    url: "Usuarios/SaveNiveles",
//                    data: sForm,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));

//                dispatchAsync("usuarios-niveles", "usuarios/niveles(" + datos.formData.form.ID.value + ")");
//            }
//        };
//    };

//    /// Botón Delete
//    const DeleteNivelesCompaniasMapProps: any = (state: any) => {
//        return {
//            info: { selected: state.usuarios.nivelSelected.data },
//            visible: state.usuarios.nivelSelected != undefined &&
//            state.usuarios.nivelSelected.data != undefined &&
//            state.usuarios.nivelSelected.data.ID !== undefined
//        };
//    };

//    const mapDeleteNivelCompaniaDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            onClick: (info: any): any => {
//                if (info.selected.ID) {
//                    dispatch(actionAsync({
//                        action: "usuarios-eliminarniveles",
//                        type: HttpMethod.PUT,
//                        url: "Usuarios/DeleteNiveles",
//                        data: info.selected.ID,
//                        custom: {
//                            processData: false,
//                            contentType: false
//                        },
//                        status: AsyncActionTypeEnum.updating
//                    }));
//                    dispatchAsync("usuarios-niveles", "usuarios/niveles(" + info.selected.Usuario.ID + ")");
//                }
//            }
//        };
//    }
//    let AddNivelCompania: any = ReactRedux.connect(null, mapAddNivelCompaniaDispatchs)(Button);
//    let DeleteNivelCompania: any = ReactRedux.connect(DeleteNivelesCompaniasMapProps, mapDeleteNivelCompaniaDispatchs)(Button);
//    let TableNivelesCompania: any = ReactRedux.connect(mapTableNivelesCompania, null)(DataTableExt);

//    export let UsuarioNivelCompania: any = ReactRedux.connect(mapProps, mapDispatchs)(PageUsuarioNivelCompania);
//}