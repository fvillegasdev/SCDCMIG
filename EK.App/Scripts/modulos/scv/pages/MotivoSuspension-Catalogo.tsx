namespace EK.Modules.SCV.Pages.MotivoSuspension {
    "use strict";

    const notificadores: string = "Notificaciones";
    let usuario: string = "Usuario"
    let IdMotivo: number = -1;
    let tituloSeccion: string = "Motivo de Suspension";
    const config: page.IPageConfig = global.createPageConfig("motivosuspension", "scv", [notificadores, usuario]);

    interface IMotivosProps extends page.IProps {
        item?: DataElement;
        notificadoresSeleccionados?: any;
        config?: page.IPageConfig;
    };
    interface IMotivoState {
    }

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject(notificadores)
                .addObject(usuario)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            IdMotivo = getDataID(props.entidad);
            if (IdMotivo <= 0 || IdMotivo === undefined) {
                global.dispatchSuccessful("global-page-data", [], notificadores);
                global.dispatchSuccessful("global-page-data", [], usuario);
            }
            else {
                let parametros: any = global.assign({ IdMotivo: IdMotivo });
                props.config.dispatchCatalogoBase("base/kontrol/MotivoSuspension/Get/GetNotificadores/", parametros, notificadores);
                props.config.dispatchCatalogoBase("base/kontrol/MotivoSuspension/Get/GetUsuarios/", parametros, usuario);
            }
           
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

        const Edit: any = global.connect(class extends React.Component<IMotivosProps, IMotivoState> {
        constructor(props: IMotivosProps) {
            super(props);
            this.onSaveNotificadoresMS = this.onSaveNotificadoresMS.bind(this);
        };
        static props: any = (state: any) => ({
            item: state.global.currentEntity, 
            notificadoresSeleccionados: state.global.notificadoresSeleccionados, 
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        });
        onSaveNotificadoresMS(): void {

            let item: EditForm = Forms.getForm(notificadores);

            let entidades: DataElement = this.props.config.getCatalogo(notificadores);
            let retValue: DataElement;
            let elemento: any;
            elemento = item
                .addNumber("ID")
                .addObject("TipoNotificador")
                .addObject("Registro")
                .addEstatus()
                .addVersion()
                .toObject();
            if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                elemento["ID"] = entidades.getNextLowerID();
            }

            if (entidades.data == undefined) {
                let element: any = [];
                element[0] = elemento;
                entidades.data = element;
                retValue = entidades;
            }
            else {
                retValue = entidades.upsertItem(elemento);
            }
            Forms.updateFormElement('motivosuspension', notificadores);
            global.dispatchSuccessful("global-page-data", retValue, notificadores);
            this.props.config.setState({ viewMode: true }, notificadores);

            global.dispatchSuccessful("load::USUARIOS", []);

            var IdRegistro = elemento["Registro"].ID;
            var notificador = elemento["TipoNotificador"].Nombre;

            let parametros: any = global.encodeParameters({ idRegistro: elemento["Registro"].ID, tipoNotificador: notificador, operacion: "UsuariosTemporal" });
            global.asyncGet("base/scv/MotivoSuspension/Get/GetUsuarios/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.loading) {
                }
                if (status === AsyncActionTypeEnum.successful) {
                    let retValue: DataElement;
                    let entidades: DataElement = this.props.config.getCatalogo(usuario);
                    retValue = entidades;
                    data.forEach((value: any, index: number) => {
                        retValue = retValue.upsertItem(value);

                    });
                    Forms.updateFormElement(config.id, usuario);
                    global.dispatchSuccessful("global-page-data", retValue, usuario);
                    this.props.config.setState({ viewMode: true }, usuario);

                }
            });
                //dispatchAsync("load::notificadoresSeleccionados", "base/kontrol/MotivoSuspension/Get/GetUsuarios/" + parametros);


        }

        render(): JSX.Element {
            
             let remove: any = {
            icon: "fa fa-trash",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);
                Forms.updateFormElement(idParent, id, element.removeItem(item));



                let entidades: DataElement = this.props.config.getCatalogo(usuario);
                let nuevaLista: DataElement = this.props.config.getCatalogo(usuario);


                if (entidades && entidades.data && entidades.data.length > 0) {
                    entidades.data.forEach((value: any, index: number): any => {

                        if (item.TipoNotificador.Nombre === value.TipoNotificador && value.Notificador === item.Registro.Nombre) {
                            nuevaLista = nuevaLista.removeItem(value);
                        }
                    });
                        Forms.updateFormElement(idParent, usuario, nuevaLista);
                };
            }
        };
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={tituloSeccion}
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} validations={[validations.required()]} />
                            <input.Nombre size={[12, 12, 8, 8]} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]}/>
                        </Row>
                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                            <page.SectionList
                            id={notificadores}
                            parent={config.id}
                            onSave={this.onSaveNotificadoresMS}
                            level={1}
                            style={{ paddingTop: 20, paddingRight: 30 }}
                            icon="icon-users" 
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[6, 6, 4, 4]} className="list-default-header">{"Tipo"}</Column>
                                        <Column size={[6, 6, 8, 8]} className="list-default-header">{"Notificador"}</Column>
                                    </Row>
                                </div>}
                            size={[12, 12, 6, 6]}
                            items={createSuccessfulStoreObject([])}
                            addRemoveButton={true}
                            mapFormToEntity={(form: EditForm): any => {
                                //let retValue: any = form
                                return form
                                    .addID()
                                    .addVersion()
                                    .addObject("TipoNotificador")
                                    .addObject("Registro")
                                    .addEstatus()
                                    .toObject();

                                //let e: any[] = entidades;
                                //if (e && e.length > 0) {
                                //    e.forEach((value: any, index: number): any => {
                                //        if (value.TipoNotificador.ID === retValue.TipoNotificador.ID) {
                                //            retValue.ID = value.ID;
                                //            retValue._eliminar = true;
                                //        };
                                //    });
                                //};

                                //return retValue;

                            }}
                            formatter={(index: number, item: any) => {
                                    return <Row>
                                        <Column size={[6, 6, 4, 4]} className="listItem-default-item">
                                            <span>{item.TipoNotificador.Clave}</span>
                                        </Column>
                                        <Column size={[6, 6, 7, 7]} className="listItem-default-item">
                                            <span>{item.Registro.Nombre}</span>
                                        </Column>
                                        <buttons.PopOver idParent={config.id} idForm={notificadores} info={item}
                                            extraData={[buttons.PopOver.edit, remove]} />
                                        </Row>;
                            }}>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                        <MOTIVOSNOTIFICADORESDDL id={"TipoNotificador"} idFormSection={notificadores} validations={[validations.required()]}/>
                                        <MultiEditor id={"Registro"} formSection={notificadores} validations={[validations.required()]}  />
                                </Column>
                            </Row>
                        </page.SectionList>
                            <page.SectionList
                            id={usuario}
                            parent={config.id}
                            level={1}
                            style={{ paddingTop: 20, paddingRight: 30 }}
                            icon="icon-user"
                            hideNewButton={true}
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                            <Column size={[12, 12, 2, 2]} className="list-default-header">{"Tipo"}</Column>
                                            <Column size={[12, 12, 2, 2]} className="list-default-header">{"Notificador"}</Column>
                                            <Column size={[12, 12, 4, 4]} className="list-center-header">{"Usuario"}</Column>
                                           <Column  size={[12, 12, 4, 4]} className="list-default-header">{"Correo"}</Column>
                                    </Row>
                                </div>}
                            size={[12, 12, 6, 6]}
                            items={createSuccessfulStoreObject([])}
                            addRemoveButton={false}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addVersion()
                                    .addObject("TipoNotificador")
                                    .addObject("Registro")
                                    .addEstatus()
                                    .toObject();
                            }}
                            
                            formatter={(index: number, item: any) => {
                                    let info: string;
                                    let correo: string;
                                    if (item.Clave === null && item.Nombre === null) {
                                        if (item.Clave === undefined && item.Nombre === undefined) {
                                            info = "";
                                            correo = "";
                                        } 
                                    } else {
                                        info = item.Padre ? item.Usuario.Nombre + " " + item.Usuario.Apellidos : item.Nombre + " " + item.Apellidos;
                                        correo = item.Padre ? item.Usuario.Clave : item.Clave;
                                    }

                                    let nombre: string = info;
                                    let clave: string = correo;

                                    //let nombre: string = item.Padre ? item.Usuario.Nombre + " " + item.Usuario.Apellidos : item.Nombre + " " + item.Apellidos;
                                   // let clave: string = item.Padre ? item.Usuario.Clave : item.Clave;
                                    let tipoNotificador: string = item.Padre ? "Posición" : item.Notificador;


                                    return <Row>
                                        <Column size={[12, 2, 2, 2]} >
                                            <span>{item.TipoNotificador}</span>
                                        </Column>
                                        <Column size={[12, 2, 3, 3]} >
                                            <span>{tipoNotificador}</span>
                                        </Column>
                                        <Column size={[12, 4, 3, 3]} >
                                            {nombre ? <span>{nombre}</span> : <span className="badge badge-danger ek-sombra">{"Sin Usuario"}</span>}
                                        </Column>
                                        <Column size={[12, 4, 2, 2]} >
                                            {clave ? <span className="badge badge-success ek-success">{clave}</span> : <span >{" "}</span>}
                                        </Column>
                                    </Row>;
                            }}>
                            <Row>
                                <Column size={[12, 12, 12, 12]}>
                                    
                                </Column>
                            </Row>
                        </page.SectionList>
                        </Column>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });
        const View: any = global.connect(class extends React.Component<IMotivosProps, IMotivoState> {
            constructor(props: IMotivosProps) {
                super(props);
                //this.onSaveNotificadoresMS = this.onSaveNotificadoresMS.bind(this);
            };
            static props: any = (state: any) => ({
                item: state.global.currentEntity,
                config: global.createPageConfigFromState(state.global)
            });
    //class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={tituloSeccion}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 2, 2]} />
                        </Row>
                        <page.SectionList
                            id={notificadores}
                            parent={config.id}
                            level={1}
                            style={{ paddingTop: 20, paddingRight: 30 }}
                            icon="icon-users"
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[6, 6, 4, 4]} className="list-default-header">{"Usuario"}</Column>
                                        <Column size={[6, 6, 8, 8]} className="list-default-header">{"Notificador"}</Column>
                                    </Row>
                                </div>}
                            size={[12, 12, 6, 6]}
                            items={createSuccessfulStoreObject([])}
                            addRemoveButton={true}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addVersion()
                                    .addObject("TipoNotificador")
                                    .addObject("Registro")
                                    .addEstatus()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[6, 6, 4, 4]} className="listItem-default-item">
                                        <span>{item.TipoNotificador.Clave}</span>
                                    </Column>
                                    <Column size={[6, 6, 7, 7]} className="listItem-default-item">
                                        <span>{item.Registro.Nombre}</span>
                                    </Column>
                                </Row>;
                            }}>
                        </page.SectionList>
                        <page.SectionList
                            id={usuario}
                            parent={config.id}
                            level={1}
                            style={{ paddingTop: 20, paddingRight: 30 }}
                            icon="icon-user"
                            listHeader={
                                <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                    <Row>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Tipo"}</Column>
                                        <Column size={[12, 12, 2, 2]} className="list-default-header">{"Notificador"}</Column>
                                        <Column size={[12, 12, 4, 4]} className="list-center-header">{"Usuario"}</Column>
                                        <Column size={[12, 12, 4, 4]} className="list-default-header">{"Correo"}</Column>
                                    </Row>
                                </div>}
                            size={[12, 12, 6, 6]}
                            items={createSuccessfulStoreObject([])}
                            addRemoveButton={false}
                            mapFormToEntity={(form: EditForm): any => {
                                return form
                                    .addID()
                                    .addVersion()
                                    .addObject("TipoNotificador")
                                    .addObject("Registro")
                                    .addEstatus()
                                    .toObject();
                            }}
                            formatter={(index: number, item: any) => {
                                return <Row>
                                    <Column size={[12, 2, 2, 2]} >
                                        <span>{item.TipoNotificador}</span>
                                    </Column>
                                    <Column size={[12, 2, 3, 3]} >
                                        <span>{item.Notificador}</span>
                                    </Column>
                                    <Column size={[12, 4, 3, 3]} >
                                        {item.Nombre ? <span >{item.Nombre + " " + item.Apellidos}</span> : <span className="badge badge-danger ek-sombra">{"Sin Usuario"}</span>}
                                    </Column>
                                    <Column size={[12, 4, 2, 2]} >
                                        {item.Clave ? <span className="badge badge-success ek-success">{item.Clave}</span> : <span>{" "}</span>}
                                    </Column>
                                </Row>;
                                //return <Column>{item.Nombre}</Column>
                            }}>
                           
                        </page.SectionList>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
    let MOTIVOSNOTIFICADORESDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.MOTIVOSNOTIFICADORES,
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            loadData: (): void => {
                dispatchAsync("load::MOTIVOSNOTIFICADORES", "catalogos/get(MOTIVOSNOTIFICADORES)");
            }
        });
        static defaultProps: IDropDrownListProps = {
            id: "MOTIVOSNOTIFICADORES",
            items: createDefaultStoreObject([]),
            label: "Notificador",
            helpLabel: "Seleccione el tipo de notificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                this.props.loadData();
            }
        }
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = 0;
                nuevoItem['Nombre'] = 'Seleccione un Tipo de Notificador';
                nuevoItem['Clave'] = 'Seleccione un Tipo de Notificador';
                if (itemsModificados.data.length != 0) {
                    if (itemsModificados.data[0].ID != 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });
    let PosicionesActivasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        constructor(props: IDropDrownListProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.POSICIONES
        });
        static defaultProps: IDropDrownListProps = {
            id: "Posicion",
            items: createDefaultStoreObject([]),
            label: "Posición",
            helpLabel: "Seleccione una posición",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span>",
                            item.obj.Nombre,
                            "</span>",
                            "<span class='badge badge-info'>",
                            item.obj.Usuario.Nombre,
                            "</span>"].join(""));
                    }
                    else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span>",
                        "<span class='badge badge-info'>",
                        item.Usuario.Nombre,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span>",
                    item.Nombre,
                    "</span>",
                    "<span class='badge badge-info'>",
                    item.Usuario.Nombre,
                    "</span> "].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "posiciones", { activos: 1 });
                dispatchAsync("load::POSICIONES", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });
    interface IMultiDropDrownListProps extends React.Props<any> {
        TipoNotificador?: any;

    };
    const MultiEditor: any = global.connect(class extends React.Component<IMultiDropDrownListProps, IMultiDropDrownListProps>{
        constructor(props: IMultiDropDrownListProps) {
            super(props);
        };
        static props: any = (state: any) => ({
            TipoNotificador: Forms.getValue("TipoNotificador", notificadores),
        });
        componentWillReceiveProps(nextProps: IMultiDropDrownListProps) {
            if (this.props.TipoNotificador && nextProps.TipoNotificador) {
                if (this.props.TipoNotificador.Clave !== nextProps.TipoNotificador.Clave) {
                    Forms.updateFormElement(notificadores, "Value", null);

                };
            }
        };
        render(): JSX.Element {

            let Direccion: any = (item: any) => {
               
            };
            let retValue: any = null;
            {
                if (this.props.TipoNotificador && this.props.TipoNotificador.Clave) {
                    if (this.props.TipoNotificador.Clave === "GRUPO") {
                        retValue = <GruposDDL id={"Registro"} idFormSection={notificadores} validations={[validations.required()]} onChange={Direccion} />

                    } else if (this.props.TipoNotificador.Clave === "AREA") {
                        retValue = <AreasOrganizacionDDL id={"Registro"} idFormSection={notificadores} validations={[validations.required()]} onChange={Direccion} />

                    } else if (this.props.TipoNotificador.Clave === "POSICION") {
                        retValue = <PosicionesActivasDDL id={"Registro"} idFormSection={notificadores} validations={[validations.required()]} onChange={Direccion} />
                    };
                }
            }
            return retValue;
        };
    });
};
