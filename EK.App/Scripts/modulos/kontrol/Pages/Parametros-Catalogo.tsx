namespace EK.Modules.Kontrol.Pages.Parametros {
    "use strict";
    const CONFIGURACION_PARAMETROS: string = "Configuracion";
    const config: page.IPageConfig = global.createPageConfig("parametros", "kontrol", [CONFIGURACION_PARAMETROS]);
    let PAGE_ID = "Parámetros";
    export class Edicion extends page.Base {
        onWillEntityLoad(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/parametros/Get/GetByIDParametros/" + parametros);
        };
        onEntityLoaded(props: page.IProps): any {
            let idEntidad: any = getDataID(props.entidad);
            let Entidad: any = getData(props.entidad);
            let parametros: any = global.assign({ idParametro: idEntidad });

            if (idEntidad > -1) {
                props.config.dispatchCatalogoBase("base/kontrol/ConfigurarParametros/Get/getConfiguracionParametro/", parametros, CONFIGURACION_PARAMETROS);
                //Si hay un modulo registrado
                if (Entidad.Ambito && Entidad.Ambito.Clave == "DO") {
                    dispatchSuccessful("load::parametroGlobal", { valor: true });//Global
                }
                else
                {
                    dispatchSuccessful("load::parametroGlobal", { valor: false });//No global
                }
            }
            else {
                global.dispatchSuccessful("global-page-data", [], CONFIGURACION_PARAMETROS);
                dispatchSuccessful("load::parametroGlobal", { valor: true });//no global
            }
        };
        saveForm(props: page.IProps, item: EditForm): any {

            let model: any = item
                .addID()
                .addString("parametro")
                .addString("Descripcion")
                .addObject("Seccion")
                .addObject("Ambito")
                .addString("Valor")
                .addObject("Modulo")
                .addObject(CONFIGURACION_PARAMETROS)
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onEntityLoaded={this.onEntityLoaded} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad}>
                <View />
                <Edit />
            </page.Main>;
        };
    }
    interface IParametrosView extends page.IProps {
        parametroGlobal?: any;
        config?: any;
        elementos?: boolean;
    };

    export const Edit: any = global.connect(class extends React.Component<IParametrosView, IParametrosView> {
        constructor(props: IParametrosView) {
            super(props);
            this.onChangAmbito = this.onChangAmbito.bind(this);
            this.onSaveConfiguracion = this.onSaveConfiguracion.bind(this);
            this.onValidateConfiguracionParametro = this.onValidateConfiguracionParametro.bind(this);
        }
        static props: any = (state: any) => ({
            parametroGlobal: state.global.parametroGlobal,
            elementos: state.global.parametrosConfiguracion,
            config:page.props(state),
        });
        onChangAmbito(e: any): any {
            if (e && e.Clave == "C") {
                dispatchSuccessful("load::parametroGlobal", { valor: false });
            }
            else
            {
                dispatchSuccessful("load::parametroGlobal", { valor: true });
            }
        };
        onSaveConfiguracion(): void {
            let item: EditForm = Forms.getForm(CONFIGURACION_PARAMETROS);
            if (this.onValidateConfiguracionParametro(item)) {
                warning("Ya fue Añadido un Valor para este parametro");
                return;
            }
            else {
                let entidades: DataElement = this.props.config.config.getCatalogo(CONFIGURACION_PARAMETROS);
                let parametroGlobal: any = getData(this.props.modulo).valor;

                   let elemento: any;
                    elemento = item
                        .addNumber("ID")
                        .addObject("Compania")
                        .addString("Valor")
                        .addEstatus()
                        .addVersion()
                        .toObject();
                    if (elemento["ID"] < 0 || elemento["ID"] == undefined) {
                        elemento["ID"] = entidades.getNextLowerID();
                    }
                    if (parametroGlobal && entidades.data.length > 0) {
                        entidades.data[0] = elemento;
                        if (entidades.data[0].ID < 1)
                        {
                            entidades.data[0].ID = -1;
                        }
                    }
                let retValue: DataElement= entidades.upsertItem(elemento);
                Forms.updateFormElement(config.id, CONFIGURACION_PARAMETROS);
                global.dispatchSuccessful("global-page-data", retValue, CONFIGURACION_PARAMETROS);
                this.props.config.config.setState({ viewMode: true }, CONFIGURACION_PARAMETROS);
            }
        }
        onValidateConfiguracionParametro(item: any): boolean {
            let result: boolean = false;
            let entidadActual: any = Forms.getForm(config.id);
            let entidades: DataElement = this.props.config.config.getCatalogo(CONFIGURACION_PARAMETROS);
            if (entidadActual.Ambito.Clave == "DO") {
                result = false;
            }
            else
            {
                let items: any[] = entidades.data;
                items.forEach((value: any, index: number) => {
                    if (value.Compania.ID == item.Compania.ID && (item.ID < 1 || item.ID === undefined)) {
                        result = true;
                    }
                });
            }
            return result;
        }
        render(): JSX.Element {
            let entidades: DataElement = this.props.config.config.getCatalogo(CONFIGURACION_PARAMETROS);
            let parametroGlobal: any = getData(this.props.parametroGlobal).valor;
            let valorParametro: string;
            if (parametroGlobal == true && entidades.data && entidades.data.length) {
                valorParametro = entidades.data[0].Valor;
            }
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-globe" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Input id={"parametro"} size={[12, 4, 4, 4]} maxLength={150} validations={[validations.required()]} />
                            <Input id="Descripcion" size={[12, 6, 6, 6]} />
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            <AmbitosParametrosDDL id="Ambito" change={this.onChangAmbito} size={[12, 12, 4, 4]} />
                            <ddl.ModulosDDL id="Modulo" size={[12, 12, 4, 4]} />
                            <AgrupadorParametrosDDL id="Seccion" size={[12, 12, 4, 4]} />
                            {parametroGlobal ?
                                <Input id={"Valor"}  value={valorParametro} size={[12, 12, 12, 12]} />
                                :null}
                        </Row>
                        {parametroGlobal ?
                            null
                            : 
                            <page.SectionList
                                id={CONFIGURACION_PARAMETROS}
                                parent={config.id}
                                idParent={config.id}
                                onSave={this.onSaveConfiguracion}
                                icon="icon-settings"
                                style={{ paddingTop: 20 }}
                                level={1}
                                listHeader={
                                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                        <Row>
                                            <Column size={[12, 5, 5, 5]} className="list-default-header">{"Compañía"}</Column>
                                            <Column size={[12, 7, 7, 7]} className="list-default-header">{"Valor"}</Column>
                                        </Row>
                                    </div>}
                                size={[12, 12, 12, 12]}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                mapFormToEntity={(form: EditForm): any => {
                                    return form
                                        .addID()
                                        .addEstatus()
                                        .addString("Valor")
                                        .addObject("Compania")
                                        .addVersion()
                                        .toObject();
                                }}
                                formatter={(index: number, item: any) => {
                                    let nombreCompania: string = item.Compania ? item.Compania.Nombre ? "(" + item.Compania.Clave + ") " + item.Compania.Nombre : "" : "";
                                    return <Row>
                                        <Column size={[12, 5, 5, 5]}>
                                            <span>{nombreCompania}</span>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]}>
                                            <span>{item.Valor}</span>
                                        </Column>
                                        <buttons.PopOver idParent={config.id} idForm={CONFIGURACION_PARAMETROS} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>;
                                }}>
                                <Row>
                                    <ddl.CompaniaDDL id={"Compania"} idFormSection={CONFIGURACION_PARAMETROS} size={[12, 6, 6, 6]} validations={[validations.required()]} />
                                    <Input id="Valor" validations={[validations.required()]} label="Valor" idFormSection={CONFIGURACION_PARAMETROS} size={[12, 12, 12, 12]} />
                                </Row>
                            </page.SectionList>}
                        
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    });

    export const View: any = global.connect(class extends React.Component<IParametrosView, IParametrosView> {
        constructor(props: IParametrosView) {
            super(props);
        }
        static props: any = (state: any) => ({
            parametroGlobal: state.global.parametroGlobal,
            elementos: state.global.parametrosConfiguracion,
            config: page.props(state),
        });
        render(): JSX.Element {
            let entidades: DataElement = this.props.config.config.getCatalogo(CONFIGURACION_PARAMETROS);
            let parametroGlobal: any = getData(this.props.parametroGlobal).valor;
            let valorParametro: string;
            if (parametroGlobal == true && entidades.data && entidades.data.length)
            {
                valorParametro = entidades.data[0].Valor;
            }
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Label id="parametro" size={[12, 4, 4, 4]} />
                            <Label id="Descripcion" size={[12, 6, 6, 6]} />
                            <label.Estatus size={[12, 2, 2, 2]} />
                            <label.Entidad id="Ambito" size={[12, 4, 4, 4]} />
                            <label.Entidad id="Modulo" size={[12, 4, 4, 4]} />
                            <label.Entidad id="Seccion" size={[12, 4, 4, 4]} />

                            {parametroGlobal ?
                                <Label id="Valor" value={valorParametro} size={[12, 12, 12, 12]} />
                                : null}
                        </Row>
                        {parametroGlobal ?
                            null
                            :
                            <page.SectionList
                                id={CONFIGURACION_PARAMETROS}
                                parent={config.id}
                                idParent={config.id}
                                icon="icon-settings"
                                style={{ paddingTop: 20 }}
                                level={1}
                                listHeader={
                                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                                        <Row>
                                            <Column size={[12, 5, 5, 5]} className="list-default-header">{"Compañía"}</Column>
                                            <Column size={[12, 7, 7, 7]} className="list-default-header">{"Valor"}</Column>
                                        </Row>
                                    </div>}
                                size={[12, 12, 12, 12]}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                formatter={(index: number, item: any) => {
                                    let nombreCompania: string = item.Compania ? item.Compania.Nombre ? "(" + item.Compania.Clave + ") " + item.Compania.Nombre : "" : "";
                                    return <Row>
                                        <Column size={[12, 5, 5, 5]}>
                                            <span>{nombreCompania}</span>
                                        </Column>
                                        <Column size={[12, 6, 6, 6]}>
                                            <span>{item.Valor}</span>
                                        </Column>
                                        <buttons.PopOver idParent={config.id} idForm={CONFIGURACION_PARAMETROS} info={item}
                                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>;
                                }}>
                            </page.SectionList>}
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    });
}
let AmbitosParametrosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
    static props: any = (state: any) => ({
        items: state.global.AMBITOPARAMETROS
    });
    static defaultProps: IDropDrownListProps = {
        id: "Ambito",
        items: createDefaultStoreObject([]),
        label: "Ámbito",
        helpLabel: "Seleccione un ámbito",
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
                return $(["<span class='bold'>", item.text, "</span>"].join(""));
            }
            else {
                return $([
                    "<span>",
                    "(" + item.Clave + ") " + item.Nombre,
                    "</span>",
                ].join(""));
            }
        },
        selectionFormatter: (item): any => {
            if (!item) return item.text;

            return $([
                "<span>",
                "(" + item.Clave + ") " + item.Nombre,
                "</span>",
            ].join(""));
        }
    };
    componentDidMount(): void {
        if (!isLoadingOrSuccessful(this.props.items)) {
            dispatchAsync("load::AMBITOPARAMETROS", "catalogos/get(AMBITO)");
        };
    };


    render(): any {
        let itemsModificados: DataElement = this.props.items;
        if (isSuccessful(this.props.items)) {
            let nuevoItem: any = {};
            nuevoItem['ID'] = 0;
            nuevoItem['Nombre'] = '';
            nuevoItem['Clave'] = 'Seleccione Ámbito';
            if (itemsModificados.data.length != 0) {
                if (itemsModificados.data[0].ID != 0) {
                    itemsModificados.data.unshift(nuevoItem);
                }
            }
        }
        return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
    }
});

let AgrupadorParametrosDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
    static props: any = (state: any) => ({
        items: state.global.AgrupadorParametros
    });
    static defaultProps: IDropDrownListProps = {
        id: "Agrupador",
        items: createDefaultStoreObject([]),
        label: "Agrupador",
        helpLabel: "Seleccione un Agrupador",
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
                return $(["<span class='bold'>", item.text, "</span>"].join(""));
            }
            else {
                return $([
                    "<span>",
                    "(" + item.Clave + ") " + item.Nombre,
                    "</span>",
                ].join(""));
            }
        },
        selectionFormatter: (item): any => {
            if (!item) return item.text;

            return $([
                "<span>",
                "(" + item.Clave + ") " + item.Nombre,
                "</span>",
            ].join(""));
        }
    };
    componentDidMount(): void {
        if (!isLoadingOrSuccessful(this.props.items)) {
            dispatchAsync("load::AgrupadorParametros", "catalogos/get(AGRUPADOR)");
        };
    };
    render(): any {
        return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
    }
});



//namespace EK.Modules.Kontrol.Pages {
//    "use strict";
//    const PAGE_ID: string = "parametros";
//    const idForm: string = "parametros";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: number;
//    }

//    interface IParametrosProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        parametro: any;
//        params?: IParams;
//        global?: any;
//        guardar?: (item: any) => void;
//        isNew?: boolean;
//        ambito?: any;
//        modulo?: any;
//        ambitos?: any;
//        modulos?: any;
//        tipodatos?: any;
//        clientesmodulos?: any;
//    }

//    interface IParametrosState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarParametros extends React.Component<IParametrosProps, IParametrosState> {
//        constructor(props: IParametrosProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);

//            this.state = { viewMode: true };
//        }

//        static defaultProps: IParametrosProps = {
//            isNew: false,
//            parametro: undefined,
//            global: {}
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let parametro: any = item
//                .addNumberConst("ID", this.props.parametro.data.ID != undefined ? this.props.parametro.data.ID : 0)
//                .addString("Nombre")
//                .addString("Descripcion")
//                .addObject("Seccion")
//                .addObject("Ambito")
//                .addObject("Modulo")
//                .addNumber("Longitud")
//                .addNumber("Decimales")
//                .addObject("TipoDato")
//                .addEstatus("Estatus")
//                .toObject();
//            this.props.guardar(parametro);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push($bc.kontrol.parametros.link);
//            }
//        }

//        shouldComponentUpdate(nextProps: IParametrosProps, nextState: IParametrosState): boolean {
//            return (hasChanged(this.props.parametro, nextProps.parametro)) ||
//                (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);
//            requireGlobal(Catalogos.ambitos);
//            requireGlobal(Catalogos.tiposdato);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("parametros-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("parametros-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IParametrosProps, prevState: IParametrosState): any {
//            let $page: any = $ml[PAGE_ID];
//            if (wasUpdated(prevProps.parametro, this.props.parametro)) {
//                success($page.mensajes.exito);
//                this.setState({ viewMode: true });
//            };
//        }

//        render(): JSX.Element {
//            let parametro: any = this.props.parametro.data;
//            let $page: any = $ml[PAGE_ID];  /// PAGE_ID 
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.cg, $bc.kontrol.parametros];
//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? parametro.Nombre : $page.edit.titulo,
//                subTitle: !this.props.isNew ? parametro.ID : "",
//                children: [EK.UX.Labels.badgeEstatus(parametro.Estatus)]
//            };

//            let status: AsyncActionTypeEnum =
//                (!this.props.parametro || !this.props.parametro.status) ? AsyncActionTypeEnum.default : this.props.parametro.status;

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                    <PanelUpdate info={this.props.parametro}>
//                        {!this.props.isNew && this.state.viewMode
//                            ? <View item={parametro} />
//                            : <Edit
//                                isNew={this.props.isNew}
//                                item={parametro}
//                                modulo={this.props.modulo}
//                                ambito={this.props.ambito}
//                                ambitos={this.props.ambitos}
//                                tipodatos={this.props.tipodatos}
//                                clientesmodulos={this.props.clientesmodulos} />}
//                    </PanelUpdate>
//                </PageV2>;
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            parametro: state.parametros.selected,

//            ambito: state.global.ambito,
//            modulo: state.global.clientemodulo,
//            ambitos: state.global.AMBITOS,
//            tipodatos: state.global.TIPODATO,
//            clientesmodulos: state.global.clientesmodulos
//        };
//    };

//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.parametros.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
//        return {
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "parametros-setSelected",
//                    url: "parametros/GetById/" + id
//                }));
//            },
//            obtenerClientesModulos(): void {
//                dispatchAsync("clientesmodulos-kv", "ClientesModulos/Get");
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "parametros-guardar",
//                    type: HttpMethod.PUT,
//                    url: "parametros/Save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        };
//    };

//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PageParametroCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarParametros);

//    /*** BEGIN: NEW FORM ***/
//    export class NuevoParametro extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PageParametroCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        item: any;
//        isNew?: boolean;
//        ambito?: any;
//        modulo?: any;
//        ambitos?: any;
//        tipodatos?: any;
//        clientesmodulos?: any;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        refs: {
//            form: any;
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];
//            let current: any = this.props.item;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            let seccion: any = (!this.props.isNew && current.Secciones.ID) ? current.Secciones : undefined;
//            let ambito: any = (this.props.isNew && this.props.ambito && this.props.ambito.data) ? this.props.ambito.data :
//                (!this.props.isNew && current.Ambito && current.Ambito.ID) ? current.Ambito : undefined;
//            let modulo: any = (this.props.isNew && this.props.modulo && this.props.modulo.data) ? this.props.modulo.data :
//                (!this.props.isNew && current.Modulo && current.Modulo.ID) ? current.Modulo : undefined;

//            let tipodato: any = (this.props.isNew && this.props.tipodatos && this.props.tipodatos.data) ? this.props.tipodatos.data[0] :
//                current.TipoDato;

//            return <FadeInColumn>
//                <Input id="ID" value={current.ID} label="" visible={false} />
//                <DropdownList
//                    id="Ambito"
//                    label={$page.form.ambito.label}
//                    items={this.props.ambitos}
//                    size={[12, 12, 12, 4]}
//                    helpLabel={$page.form.ambito.helplabel}
//                    value={ambito}
//                    validations={[validations.required($page.form.ambito.validaciones.requerido)]}
//                    style={{ marginBottom: 0 }} />
//                <DropdownList
//                    id="Modulo"
//                    label={$page.form.modulo.label}
//                    items={this.props.clientesmodulos}
//                    size={[12, 12, 12, 5]}
//                    helpLabel={$page.form.modulo.helplabel}
//                    value={modulo}
//                    validations={[validations.required($page.form.modulo.validaciones.requerido)]}
//                    style={{ marginBottom: 0 }} />
//                <CheckBoxStatus
//                    id="Estatus"
//                    label={$page.form.estatus.label}
//                    xs={{ size: 12 }}
//                    sm={{ size: 12 }}
//                    md={{ size: 6 }}
//                    lg={{ size: 3 }}
//                    helpLabel={$page.form.estatus.helplabel}
//                    value={Status}
//                    style={{ marginTop: 20 }} />
//                <Input
//                    id="Nombre"
//                    label={$page.form.nombre.label}
//                    size={[12, 7, 7, 7]}
//                    helpLabel={$page.form.nombre.helplabel}
//                    value={current.Nombre}
//                    maxLength={300}
//                    validations={[
//                        validations.required($page.form.nombre.validaciones.requerido)
//                    ]}
//                    style={{ marginTop: 20 }} />
//                <Select
//                    id={"Seccion"}
//                    label={$page.form.seccion.label}
//                    remoteUrl={"CatalogosGeneralesValores/SearchSeccion/"}
//                    mode={SelectModeEnum.Single}
//                    itemFormatter={(index: number, item: any) => {
//                        return <h5 style={{ margin: "5px 0px" }}>
//                            <span className="badge badge-primary" style={{ marginRight: 10 }}>
//                                {item.Clave}
//                            </span>{item.Nombre}
//                        </h5>
//                    } }
//                    suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div> } }
//                    size={[12, 12, 12, 5]}
//                    helpLabel={$page.form.seccion.helplabel}
//                    itemLabel={"sección"}
//                    itemValue={"Nombre"}
//                    itemKey={"ID"}
//                    value={seccion}
//                    required={true}
//                    style={{ marginTop: 20, marginBottom: 35 }} />
//                <DropdownList
//                    id="TipoDato"
//                    label={$page.form.tipodato.label}
//                    items={this.props.tipodatos}
//                    size={[12, 12, 6, 5]}
//                    helpLabel={$page.form.tipodato.helplabel}
//                    value={tipodato}
//                    validations={[
//                        validations.required($page.form.tipodato.validaciones.requerido)
//                    ]} />
//                <Input
//                    id="Longitud"
//                    label={$page.form.longitud.label}
//                    size={[12, 6, 6, 4]}
//                    helpLabel={$page.form.longitud.helplabel}
//                    value={current.Longitud} />
//                <Input
//                    id="Decimales"
//                    label={$page.form.decimales.label}
//                    size={[12, 6, 6, 3]}
//                    helpLabel={$page.form.decimales.helplabel}
//                    value={current.Decimales} />
//                <TextArea
//                    id="Descripcion"
//                    label={$page.form.descripcion.label}
//                    size={[12, 6, 6, 12]}
//                    helpLabel={$page.form.descripcion.helplabel}
//                    value={current.Descripcion}
//                    maxLength={500} />
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        item: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let current: any = this.props.item;
//            let $page: any = $ml[PAGE_ID];
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;
//            let clienteNombre: string = (current.Cliente) ? current.Cliente.Nombre : undefined;
//            let SeccionNombre: string = (current.Secciones) ? current.Secciones.Nombre : undefined;
//            let tipoDatoNombre: string = (current.TipoDato) ? current.TipoDato.Nombre : undefined;
//            return <FadeInColumn>
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.ambito.label} value={current.Ambito.Nombre} size={[12, 12, 12, 6]} />
//                    <Label label={$page.form.modulo.label} value={current.Modulo.Nombre} size={[12, 12, 12, 6]} />
//                    <Label label={$page.form.nombre.label} value={current.Nombre} size={[12, 12, 12, 12]} />
//                    <Label label={$page.form.tipodato.label} value={tipoDatoNombre} size={[12, 2, 2, 6]} />
//                    <Label label={$page.form.seccion.label} value={SeccionNombre} size={[12, 2, 2, 6]} />
//                </Row>
//            </FadeInColumn>;
//        };
//    }
//    /*** END: VIEW FORM ***/

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.parametros.history[state.parametros.selected.data.ID]
//        };
//    };

//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemCatalogoTab);
//}