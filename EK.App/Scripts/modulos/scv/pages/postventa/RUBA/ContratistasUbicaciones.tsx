// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.postventa.RUBA.ContratistasUbicaciones {
    "use strict";
    const PAGE_ID: string = "ContratistasUbicaciones";
    const PAGE_PLAZAS_ID: string = "contratistasLotes$plazas";
    const PAGE_FRACCIONAMIENTOS_ID: string = "contratistasLotes$fraccionamientos";
    const PAGE_CONTRATISTAS_ID: string = "contratistasLotes$contratistas";
    const PAGE_CONTRATISTAS_CHECK_ID: string = "contratistasLotes$contratistasCheck";
    const PAGE_UBICACIONES_ID: string = "contratistasLotes$ubicaciones";
    const PAGE_UBICACIONES_CHECK_ID: string = "contratistasLotes$ubicacionesCheck";
    const PAGE_PLAZA_SELECCIONADA: string = "contratistasLotes$plazaSeleccionada";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PLAZAS_ID, PAGE_FRACCIONAMIENTOS_ID, PAGE_CONTRATISTAS_ID, PAGE_UBICACIONES_ID]);

    const listHeaderFraccionamientos: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Fraccionamiento"}</Column>
            </Row>
        </Column>

    const listHeaderUbicaciones: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Ubicación"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">&nbsp;</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderContratistas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                <Column size={[6, 6, 6, 6]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Tipo Contratista"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">{"Default"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    const listHeaderUbicacionesContratistas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Contratista"}</Column>
                <Column size={[4, 4, 4, 4]} className="list-default-header">{"Tipo Contratista"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Default"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    var BGCTipoContratista: any = {
        "1": "#26C281",
        "2": "#36c6d3",
        "3": "#659BE0",
        "4": "#f1c40f"
    };

    class ColumnTiposContratista extends React.Component<any, any>{
        render(): JSX.Element {
            let items: any[] = global.getData(this.props.items, []);
            if (items) {
                let vivienda: number = items.filter((value) => { return value.TipoContratista.ID === 1 }).length;//V
                let urbanizacion: number = items.filter((value) => { return value.TipoContratista.ID === 2 }).length;//U
                let equipamiento: number = items.filter((value) => { return value.TipoContratista.ID === 5 }).length;//E
                let impermeabilizacion: number = items.filter((value) => { return value.TipoContratista.ID === 4 }).length;//I

                return <Column size={this.props.size} className="listItem-default-item">
                    {vivienda > 0 ?
                        <a className="btn btn-circle btn-xs" style={{ color: "#ffffff", backgroundColor: BGCTipoContratista[1], minWidth: 21 }}>V</a> :
                        <a className="btn btn-default btn-circle btn-xs" style={{ backgroundColor: "#f1f1f1", minWidth: 21 }}>V</a>
                    }&nbsp;
                    {urbanizacion > 0 ?
                        <a className="btn btn-circle btn-xs" style={{ color: "#ffffff", backgroundColor: BGCTipoContratista[2], minWidth: 21 }}>U</a> :
                        <a className="btn btn-default btn-circle btn-xs" style={{ backgroundColor: "#f1f1f1", minWidth: 21 }}>U</a>
                    }&nbsp;
                    {impermeabilizacion > 0 ?
                        <a className="btn btn-circle btn-xs" style={{ color: "#ffffff", backgroundColor: BGCTipoContratista[4], minWidth: 21 }}>I</a> :
                        <a className="btn btn-default btn-circle btn-xs" style={{ backgroundColor: "#f1f1f1", minWidth: 21 }}>I</a>
                    }&nbsp;
                    {equipamiento > 0 ?
                        <a className="btn btn-circle btn-xs" style={{ color: "#ffffff", backgroundColor: BGCTipoContratista[3], minWidth: 21 }}>E</a> :
                        <a className="btn btn-default btn-circle btn-xs" style={{ backgroundColor: "#f1f1f1", minWidth: 21 }}>E</a>
                    }
                </Column>
            };

            return null;
        };
    };

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        componentWillMount() {
            global.dispatchDefault("load::" + PAGE_PLAZA_SELECCIONADA, {});
        };
        getCheckedItems(dataSlot: string, parentSlot: string, checkForm: string, itemPrefix: string, config: page.IPageConfig) {
            let entidades: DataElement = config.getCatalogo(dataSlot);

            if (parentSlot) {
                entidades = Forms.getValue(dataSlot, parentSlot);
            };

            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            };

            let items: any[] = global.getData(entidades, []);
            let retValue: any[] = [];
            //
            let form: EditForm = Forms.getForm(checkForm);
            if (form.formData && form.formData.form) {
                for (var prop in form.formData.form) {
                    let element: any = form.formData.form[prop];
                    if (element && element.value === true) {
                        let id: number = Number(prop.replace(itemPrefix, ""));
                        let found: any[] = items.filter((item) => { return item.ID === id; });
                        if (found && found.length) {
                            retValue.push(found[0]);
                        };
                    };
                };
            };
            //
            return retValue;
        };
        onSave(props: page.IProps, item: global.EditForm): any {
            let contratistas: any[] = this.getCheckedItems(PAGE_CONTRATISTAS_ID, config.id, PAGE_CONTRATISTAS_CHECK_ID, "contratista_", this.props.config);
            if (contratistas && contratistas.length > 0) {
                let validacion: any[] = contratistas.filter((value: any) => { return !value.TipoContratista; });
                if (validacion && validacion.length > 0) {
                    global.info("No se ha seleccionado el tipo de contratista de uno o más proveedores.");
                    return null;
                };
            };
            //
            let ubicaciones: any[] = this.getCheckedItems(PAGE_UBICACIONES_ID, null, PAGE_UBICACIONES_CHECK_ID, "ubicacion_", this.props.config);
            if (!(ubicaciones && ubicaciones.length > 0)) {
                global.info("No se ha seleccionado ninguna ubicación.");
                return null;
            };
            //
            let msgError: string;
            let cc_default: boolean = contratistas.some((c) => { return c.ContratistaDefault === true });
            //
            ubicaciones.forEach((value: any, index: number) => {
                let u_contratistas: any[] = value.Contratistas;
                if (!u_contratistas) {
                    u_contratistas = [];
                };
                //
                u_contratistas.forEach((_value: any, _index: number) => {
                    if (contratistas.length > 0) {
                        if (!msgError) {
                            let tipoAsignados: any[] = contratistas.filter((c) => {
                                return _value._eliminado !== true && (_value.IdTipoContratista === c.IdTipoContratista);
                            });

                            if (tipoAsignados && tipoAsignados.length > 0) {
                                let tipoAsignado: any = tipoAsignados[0];
                                msgError = "El tipo de contratista " + tipoAsignado.TipoContratista.Descripcion + " ya está asignado para la ubicación [" + value.ClaveFormato + "]";
                            };
                        };
                        //
                        if (!msgError) {
                            let asignados: any[] = contratistas.filter((c) => {
                                return _value._eliminado !== true && (_value.IdContratista === c.IdContratista);
                            });

                            if (asignados && asignados.length > 0) {
                                let asignado: any = asignados[0];
                                msgError = "El contratista " + asignado.Contratista.Nombre + " ya está asignado para la ubicación [" + value.ClaveFormato + "]";
                            };
                        };
                        //
                        if (!msgError) {
                            if (cc_default === true) {
                                if (_value._eliminado !== true && _value.ContratistaDefault === "S") {
                                    msgError = "Ya existe un contratista por default en la ubicación [" + value.ClaveFormato + "]";
                                };
                            };
                        };
                    };
                });
                //
                if (!msgError) {
                    let uc_default: boolean = u_contratistas.some((uc) => {
                        return uc._eliminado !== true && uc.ContratistaDefault === "S"
                    });

                    if (cc_default === false && uc_default === false) {
                        msgError = "Algunas ubicaciones no tienen asignado un contratista default";
                    };
                };
            });
            //
            if (msgError && msgError.length > 0) {
                global.info(msgError);
                return null;
            };
            //
            if (contratistas && contratistas.length > 0) {
                contratistas.forEach((value: any, index: number) => {
                    value.ContratistaDefault = value.ContratistaDefault === true ? "S" : "N";
                });
            };
            //
            let model: any = item
                .addObjectConst("Ubicaciones", ubicaciones)
                .addObjectConst("Contratistas", contratistas)
                .toObject();
            //
            global.dispatchAsyncPut("global-current-entity", "base/scv/ContratistasUbicaciones/Get/SaveConfiguracion", model);
            delete EK.Store.getState().global.catalogoOriginalUPP;
            delete EK.Store.getState().global.catalogoOriginalF;
            Forms.updateFormElement(config.id, 'FiltrarInfoC', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoF', null);
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setEntity({});
            global.dispatchSuccessful("global-page-data", [], PAGE_FRACCIONAMIENTOS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_CONTRATISTAS_ID);
            global.dispatchSuccessful("global-page-data", [], PAGE_UBICACIONES_ID);
            global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", PAGE_PLAZAS_ID);
        };
        onEntityLoaded(props: page.IProps): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchSuccessful("global-page-data", [], PAGE_UBICACIONES_ID);
            Forms.remove(PAGE_CONTRATISTAS_CHECK_ID);
            Forms.remove(PAGE_UBICACIONES_CHECK_ID);
            console.log('guardado')
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowDelete={false}
                allowEdit={true}
                onSave={this.onSave.bind(this)}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
        plazas?: DataElement;
        plazaSeleccionada?: DataElement;
        contratistas?: DataElement;
        fraccionamientos?: DataElement;
        ubicaciones?: DataElement;
    };

    let View: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.forms = state.forms;
            retValue.plazas = state.global.catalogo$contratistasLotes$plazas;
            retValue.plazaSeleccionada = state.global[PAGE_PLAZA_SELECCIONADA];
            retValue.fraccionamientos = state.global.catalogo$contratistasLotes$fraccionamientos;
            retValue.contratistas = state.global.catalogo$contratistasLotes$contratistas;
            retValue.ubicaciones = state.global.catalogo$contratistasLotes$ubicaciones;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.plazas, nextProps.plazas) ||
                hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada) ||
                hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                hasChanged(this.props.contratistas, nextProps.contratistas) ||
                hasChanged(this.props.ubicaciones, nextProps.ubicaciones);
        };

        FiltrarResultados(ID_CATALOGO: any, value: any) {
            let ListaFiltrada = [];
            let ListaUsuariosCompleta = null;
            let ListaOriginal_UPP: any = EK.Store.getState().global.catalogoOriginalUPP;

            if (ListaOriginal_UPP === undefined) {
                let catalogo = `catalogo$${ID_CATALOGO}`; 
                //console.log(catalogo);
                if (EK.Store.getState().global[catalogo].data.length === 0) {
                    return;
                }
                ListaUsuariosCompleta = EK.Store.getState().global[catalogo].data;
                global.dispatchSuccessful("load::catalogoOriginalUPP", ListaUsuariosCompleta);
            } else {
                ListaUsuariosCompleta = ListaOriginal_UPP.data;
            }

            for (let u of ListaUsuariosCompleta) {
                let patron = u.Contratista.Nombre.toLowerCase() + u.Contratista.ID;
                if (patron.includes(value.toLowerCase())) {
                    ListaFiltrada.push(u);
                }
            }
            global.dispatchSuccessful("global-page-data", ListaFiltrada, PAGE_CONTRATISTAS_ID);
        }

        ObtenerTodosLotesPlaza() {
            console.log('obtener lista completa')
            let plazaId = EK.Store.getState().global[PAGE_PLAZA_SELECCIONADA].data.ID
            console.log(plazaId)
            //let encodedFilters: string = global.encodeObject({ IdPlaza: plazaId, operacion: "PERFORMANCE_QUERY" });
            let encodedFilters: string = global.encodeObject({ idPlaza: plazaId, operacion: "PERFORMANCE_QUERY_LOTE_NC" });
           // global.dispatchAsync("global-page-data", "base/scv/ContratistasUbicaciones/Get/GetAllUbicacionesPlaza/" + encodedFilters, PAGE_UBICACIONES_ID);
            //let plazaId = EK.Store.getState().global.contratistasLotes$plazaSeleccionada.data.
            global.asyncGet("base/scv/ContratistasUbicaciones/Get/GetAllUbicacionesPlaza/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        console.log(data)
                        //loader.style.display = 'none';
                        //loadedTable.style.display = 'inherit';
                        let fecha = Date.now();
                        dispatchSuccessful("global-page-data", data, PAGE_UBICACIONES_ID)

                        break;
                    case AsyncActionTypeEnum.loading:
                        dispatchUpdating("global-page-data", [], PAGE_UBICACIONES_ID)
                        //loader.style.display = 'block';
                        //loadedTable.style.display = 'none';
                        break;
                    case AsyncActionTypeEnum.failed:
                        //loader.style.display = 'none';
                        //loadedTable.style.display = 'none';
                        break;
                }
            });
        }

        ActualizarListaCompletaLotes() {
            let ListaUbicaciones = EK.Store.getState().global['catalogo$' + PAGE_UBICACIONES_ID].data;
            let index = 0;
            dispatchUpdating("global-page-data", [], PAGE_UBICACIONES_ID)
            console.log(ListaUbicaciones)
            for (let ubi of ListaUbicaciones) {
              
                let encodedFilters: string = global.encodeObject({ cveFracc: ubi.DesarrolloClave, IdPlaza: ubi.IdPlaza,lote_id:ubi.ID });

                global.asyncGet("base/scv/ContratistasUbicaciones/Get/SaveRelContratistaLote/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            console.log(data)
                            if (data === 1) {
                                //ubi.Contratistas = [];
                                //ubi.Contratistas.push({ ContratistaDefault: 'S', TipoContratista: { Clave: '1', Descripcion: 'VIVIENDA', ID: 1 } })
                                ListaUbicaciones[index].Contratistas = [];
                                ListaUbicaciones[index].Contratistas.push({ ContratistaDefault: 'S', TipoContratista: { Clave: '1', Descripcion: 'VIVIENDA', ID: 1 } })
                               
                            }
                            //dispatchSuccessful("global-page-data", ListaUbicaciones, PAGE_UBICACIONES_ID)

                            index++;
                            if (index >= ListaUbicaciones.length) {
                                dispatchSuccessful("global-page-data", ListaUbicaciones, PAGE_UBICACIONES_ID)

                                global.success('Actualizado')
                            }
                            //loader.style.display = 'none';
                            //loadedTable.style.display = 'inherit';
                            //let fecha = Date.now();
                           // dispatchSuccessful("global-page-data", data, PAGE_UBICACIONES_ID)

                            break;
                        case AsyncActionTypeEnum.loading:
                            //dispatchUpdating("global-page-data", [], PAGE_UBICACIONES_ID)
                            //loader.style.display = 'block';
                            //loadedTable.style.display = 'none';
                            break;
                        case AsyncActionTypeEnum.failed:
                            //loader.style.display = 'none';
                            //loadedTable.style.display = 'none';
                            break;
                    }
                });
                //dispatchSuccessful("global-page-data", ListaUbicaciones, PAGE_UBICACIONES_ID)

            }
            global.success('Actualizado')
        }

        render(): JSX.Element {
            return <page.View>
                <Row>
                    <PlazasCard size={[12, 12, 12, 12]} />
                    <Column size={[12, 12, 6, 6]}>

                        <Button size={[2, 2, 2, 2]} className="btn" keyBtn={"btnSPVGetAllLotesList"} icon="fa fa-search" style={{ marginTop: "15px", color: "#26c281" }} onClick={this.ObtenerTodosLotesPlaza} ></Button>
                        <Button size={[2, 2, 2, 2]} className="btn" keyBtn={"btnSPVUpdateAllLotesList"} icon="fa fa-save" style={{ marginTop: "15px", color: "#26c281" }} onClick={this.ActualizarListaCompletaLotes} ></Button>
                    </Column>
                    <page.SectionList
                        id={PAGE_CONTRATISTAS_ID}
                        parent={config.id}
                        subTitle={(data: any): any => {
                            return <span>
                                <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                                <br />
                                <input.Text id="FiltrarInfoC" placeHolder="Ingrese informacion para filtrar" change={this.FiltrarResultados.bind(this, PAGE_CONTRATISTAS_ID)} idFormSection={config.id} size={[12, 12, 12, 12]} />
                            </span>
                        }}
                        icon="fas fa-cogs"
                        level={1}
                        listHeader={listHeaderContratistas}
                        size={[8, 8, 8, 8]}
                        readonly={true}
                        drawOddLine={true}
                        selectable={true}
                        horizontalScrolling={true}
                        height="250px"
                        hideNewButton={true}
                        items={createSuccessfulStoreObject([])}
                        formatter={(index: number, item: any) => {
                            return <Row style={{ margin: 0 }}>
                                <Column size={[1, 1, 1, 1]}></Column>
                                <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? "" : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Nombre}</span>}</Column>
                                <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.TipoContratista) ? "" : <span className="badge badge-info" style={{ marginRight: 5, backgroundColor: BGCTipoContratista[item.TipoContratista.ID] }}>{item.TipoContratista.Descripcion}</span>}</Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-default-item">{EK.UX.Labels.yes(item.ContratistaDefault === true)}</Column>
                                <Column size={[1, 1, 1, 1]}></Column>
                            </Row>
                        }}>
                    </page.SectionList>
                    <SectionFraccionamientos size={[12, 12, 4, 4]} />
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_UBICACIONES_ID}
                            parent={config.id}
                            icon="fa fa-users"
                            level={1} collapsed={false}
                            subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                                {[global.getData(this.props.ubicaciones, []).length].join("")}
                            </span>}>
                            <PanelUpdate info={this.props.ubicaciones}>
                                <List
                                    id={PAGE_UBICACIONES_ID}
                                    items={this.props.ubicaciones}
                                    readonly={true}
                                    drawOddLine={true}
                                    selectable={true}
                                    height="250px"
                                    listHeader={listHeaderUbicaciones}
                                    formatter={(index: number, item: any) => {
                                        let contratistas: global.DataElement = global.createSuccessfulStoreObject(item.Contratistas).getActiveItems();

                                        return <Row id={"row_ubicacion_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                            <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                <Row>
                                                    <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                        <CollapseButton idElement={"row_ubicacion_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                                    </Column>
                                                    <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow"><span className="badge badge-info bold">{item.ClaveFormato}</span></Column>
                                                    <ColumnTiposContratista size={[5, 5, 5, 5]} items={contratistas} />
                                                    <Column size={[2, 2, 2, 2]}></Column>
                                                </Row>
                                            </Column>
                                            <Row>
                                                <Column
                                                    xs={{ size: 10 }}
                                                    sm={{ size: 10, offset: 1 }}
                                                    md={{ size: 10, offset: 1 }}
                                                    lg={{ size: 10, offset: 1 }}
                                                    className="panel-detail well well-sm">
                                                    <List
                                                        items={contratistas}
                                                        readonly={true}
                                                        listHeader={listHeaderUbicacionesContratistas}
                                                        addRemoveButton={false}
                                                        formatter={(_index: number, _item: any): any => {
                                                            return <Row>
                                                                <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow">{!(_item && _item.Contratista) ? "" : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Contratista.ID}</span>{_item.Contratista.Nombre}</span>}</Column>
                                                                <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow">{!(_item && _item.TipoContratista) ? "" : <span className="badge badge-info" style={{ marginRight: 5, backgroundColor: BGCTipoContratista[_item.TipoContratista.ID] }}>{_item.TipoContratista.Descripcion}</span>}</Column>
                                                                <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.yes(_item.ContratistaDefault === "S")}</Column>
                                                                <Column size={[1, 1, 1, 1]}></Column>
                                                            </Row>
                                                        }} />
                                                </Column>
                                            </Row>
                                        </Row>
                                    }} />
                            </PanelUpdate>
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>
        };
    });

    let Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.forms = state.forms;
            retValue.plazas = state.global.catalogo$contratistasLotes$plazas;
            retValue.plazaSeleccionada = state.global[PAGE_PLAZA_SELECCIONADA];
            retValue.fraccionamientos = state.global.catalogo$contratistasLotes$fraccionamientos;
            retValue.contratistas = state.global.catalogo$contratistasLotes$contratistas;
            retValue.ubicaciones = state.global.catalogo$contratistasLotes$ubicaciones;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.plazas, nextProps.plazas) ||
                hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada) ||
                hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                hasChanged(this.props.contratistas, nextProps.contratistas) ||
                hasChanged(this.props.ubicaciones, nextProps.ubicaciones);
        };
        render(): JSX.Element {
            return <page.Edit>
                <Row>
                    <PlazasCard size={[12, 12, 12, 12]} />
                    <SectionContratistas size={[12, 12, 8, 8]} />
                    <SectionFraccionamientos size={[12, 12, 4, 4]} />
                    <SectionUbicacionesContratista size={[12, 12, 12, 12]} />
                </Row>
            </page.Edit>
        };
    });

    interface IPlazasCardProps extends page.IProps, grid.IColumn {
        plazas?: DataElement;
        plazaSeleccionada?: DataElement;
        obtenerContratistas?: (IdPlaza: string) => void;
        obtenerFraccionamientos?: (IdPlaza: string) => void;
    };

    const PlazasCard: any = global.connect(class extends React.Component<IPlazasCardProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plazas = state.global[["catalogo", PAGE_PLAZAS_ID].join("$")];
            retValue.plazaSeleccionada = state.global[PAGE_PLAZA_SELECCIONADA];
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerFraccionamientos: (IdPlaza: string): void => {
                let encodedFilters: string = global.encodeObject({ IdPlaza });
                global.dispatchAsync("global-page-data", "base/kontrol/Fraccionamientos/all/" + encodedFilters, PAGE_FRACCIONAMIENTOS_ID);
            },
            obtenerContratistas: (IdPlaza: string): void => {
                let encodedFilters: string = global.encodeObject({ IdPlaza, operacion: "PERFORMANCE_QUERY_CONTRATISTAS" });
                global.dispatchAsync("global-page-data", "base/scv/ContratistasUbicaciones/all/" + encodedFilters, PAGE_CONTRATISTAS_ID);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (global.hasChanged(this.props.plazas, nextProps.plazas)) {
                if (global.isSuccessful(nextProps.plazas)) {
                    let plazas: any[] = global.getData(nextProps.plazas, []);
                    if (plazas && plazas.length > 0) {
                        this.onClick(plazas[0]);
                    };
                };
            };
        };
        onClick(item: any): void {
            this.props.obtenerContratistas(item.ID);
            this.props.obtenerFraccionamientos(item.ID);
            //
            global.dispatchSuccessful("load::" + PAGE_PLAZA_SELECCIONADA, item);
            global.dispatchSuccessful("global-page-data", [], PAGE_UBICACIONES_ID);
            //
            Forms.remove(PAGE_CONTRATISTAS_CHECK_ID);
            Forms.remove(PAGE_UBICACIONES_CHECK_ID);
            delete EK.Store.getState().global.catalogoOriginalUPP;
            delete EK.Store.getState().global.catalogoOriginalF;
            delete EK.Store.getState().global.catalogoOriginalU;
            Forms.updateFormElement(config.id, 'FiltrarInfoC', null);
            Forms.updateFormElement(config.id, 'FiltrarInfoF', null);
        };
        render(): JSX.Element {
            let idPlazaSeleccionada: number = global.getDataID(this.props.plazaSeleccionada);

            return <Column size={this.props.size}>
                <div className="portlet light portlet-fit bordered ek-sombra" style={{ margin: "0px 5px 20px 5px" }}>
                    <div className="portlet-body">
                        <Row className="timeline-expediente" style={{ background: "none" }} >
                            <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10" style={{ paddingBottom: 15 }}>
                                <span><i className="fas fa-boxes">&nbsp;</i><h5 style={{ margin: 0, display: "inline-block" }}> Plazas </h5></span>
                            </Column>
                            <Column size={[12, 12, 12, 12]} className="events-container" >
                                <Row style={{ marginBottom: "67px" }}>
                                    {global.isSuccessful(this.props.plazas) === true ?
                                        <EKHorizontalTimeLine
                                            items={this.props.plazas}
                                            desactivarFondo={true}
                                            onClickElementHorizontal={this.onClick.bind(this)}
                                            idSeleccionado={idPlazaSeleccionada}
                                            tipoPresentacion={6} />
                                        : <AwesomeSpinner
                                            paddingTop={50}
                                            size={40}
                                            icon="fas fa-sync-alt"
                                            colorClass="font-blue" />
                                    }
                                </Row>
                            </Column>
                        </Row>
                    </div>
                </div>
            </Column>
        }
    });

    interface IContratistasProps extends page.IProps, grid.IColumn { }

    const SectionContratistas: any = global.connect(class extends React.Component<IContratistasProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onSave(): void {
            let entidades: DataElement = this.props.config.getCatalogo(PAGE_CONTRATISTAS_ID);
            //
            if (config.id) {
                entidades = Forms.getValue(PAGE_CONTRATISTAS_ID, config.id);
            };
            //
            if (!entidades) {
                entidades = global.createSuccessfulStoreObject([]);
            };
            //
            if (!Forms.isValid(PAGE_CONTRATISTAS_ID)) {
                global.warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };
            //
            let item: EditForm = Forms.getForm(PAGE_CONTRATISTAS_ID);
            let entidad: any = item
                .addID()
                .addObject("TipoContratista")
                .addBoolean("ContratistaDefault")
                .addVersion()
                .toObject();
            //
            if (entidad && entidad._found === true) {
                entidad._found = undefined;
            }
            else {
                if (!(entidad.ID > 0)) {
                    if (!(entidad && entidad.ID)) {
                        entidad.ID = entidades.getNextLowerID();
                    }
                };
            };
            //
            if (entidad.ContratistaDefault === true) {
                let data: any[] = global.getData(entidades, []);
                if (data && data.length) {
                    data.forEach((value: any, index: number) => {
                        if (value.ContratistaDefault === true) {
                            value.ContratistaDefault = false;
                            entidades.upsertItem(value);
                        };
                    });
                };
            };
            //
            let retValue: DataElement = entidades.upsertItem(entidad);
            //
            Forms.updateFormElement(config.id, PAGE_CONTRATISTAS_ID, retValue);
            //
            this.props.config.setState({ viewMode: true }, PAGE_CONTRATISTAS_ID);
        };
        FiltrarResultados(ID_CATALOGO: any, value: any) {
            let ListaFiltrada = [];
            let ListaUsuariosCompleta = null;
            let ListaOriginal_UPP: any = EK.Store.getState().global.catalogoOriginalUPP;

            if (ListaOriginal_UPP === undefined) {
                let catalogo = `catalogo$${ID_CATALOGO}`;
                //console.log(catalogo);
                if (EK.Store.getState().global[catalogo].data.length === 0) {
                    return;
                }
                ListaUsuariosCompleta = EK.Store.getState().global[catalogo].data;
                global.dispatchSuccessful("load::catalogoOriginalUPP", ListaUsuariosCompleta);
            } else {
                ListaUsuariosCompleta = ListaOriginal_UPP.data;
            }

            for (let u of ListaUsuariosCompleta) {
                let patron = u.Contratista.Nombre.toLowerCase() + u.Contratista.ID;
                if (patron.includes(value.toLowerCase())) {
                    ListaFiltrada.push(u);
                }
            }
            global.dispatchSuccessful("global-page-data", ListaFiltrada, PAGE_CONTRATISTAS_ID);
        }
        render(): JSX.Element {
            return <page.SectionList
                id={PAGE_CONTRATISTAS_ID}
                parent={config.id}
                icon="fas fa-cogs"
                level={1}
                listHeader={listHeaderContratistas}
                subTitle={(data: any): any => {
                    return <span>
                        <span className="badge badge-info" style={{ marginLeft: 10 }}> {[global.getData(data, []).length].join("")}</span>
                        <br />
                        <input.Text id="FiltrarInfoC" placeHolder="Ingrese informacion para filtrar" change={this.FiltrarResultados.bind(this, PAGE_CONTRATISTAS_ID)} idFormSection={config.id} size={[12, 12, 12, 12]} />
                    </span>
                }}
                size={this.props.size}
                readonly={true}
                drawOddLine={true}
                selectable={true}
                horizontalScrolling={true}
                height="250px"
                hideNewButton={true}
                items={createSuccessfulStoreObject([])}
                onSave={this.onSave.bind(this)}
                formatter={(index: number, item: any) => {
                    return <Row style={{ margin: 0 }}>
                        <Column size={[1, 1, 1, 1]} style={{ marginBottom: -20, marginTop: -28 }}><checkBox.CheckBox id={"contratista_" + item.ID} initialValue={undefined} size={[1, 1, 1, 1]} idFormSection={PAGE_CONTRATISTAS_CHECK_ID} /></Column>
                        <Column size={[6, 6, 6, 6]} className="listItem-default-item listItem-overflow">{!(item && item.Contratista) ? "" : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Contratista.ID}</span>{item.Contratista.Nombre}</span>}</Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow">{!(item && item.TipoContratista) ? "" : <span className="badge badge-info" style={{ marginRight: 5, backgroundColor: BGCTipoContratista[item.TipoContratista.ID] }}>{item.TipoContratista.Descripcion}</span>}</Column>
                        <Column size={[1, 1, 1, 1]} className="listItem-default-item">{EK.UX.Labels.yes(item.ContratistaDefault === true)}</Column>
                        <buttons.PopOver idParent={config.id} idForm={PAGE_CONTRATISTAS_ID} info={item} extraData={[buttons.PopOver.edit]} />
                    </Row>
                }}>
                <Row>
                    <ddl.SPVTiposContratista idFormSection={PAGE_CONTRATISTAS_ID} validations={[validations.required()]} size={[12, 12, 10, 10]} />
                    <checkBox.CheckBox id="ContratistaDefault" idFormSection={PAGE_CONTRATISTAS_ID} size={[12, 12, 2, 2]} />
                </Row>
            </page.SectionList>
        };
    });

    interface IFraccionamientosProps extends page.IProps, grid.IColumn {
        fraccionamientos?: DataElement;
        obtenerUbicaciones?: (fraccionamiento: string) => void;
    };

    const SectionFraccionamientos: any = global.connect(class extends React.Component<IFraccionamientosProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.fraccionamientos = state.global.catalogo$contratistasLotes$fraccionamientos;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUbicaciones: (fraccionamiento: string): void => {
                let encodedFilters: string = global.encodeObject({ idDesarrollo: fraccionamiento, operacion: "PERFORMANCE_QUERY" });
                global.dispatchAsync("global-page-data", "base/scv/ContratistasUbicaciones/Get/GetUbicaciones/" + encodedFilters, PAGE_UBICACIONES_ID);
            }
        });
        onClick(item: any): void {
            Forms.remove(PAGE_UBICACIONES_CHECK_ID);
            this.props.obtenerUbicaciones(item.Clave);
        };

        FiltrarResultados(ID_CATALOGO: any, value: any) {
            let ListaFiltrada = [];
            let ListaOriginal: any = EK.Store.getState().global.catalogoOriginalF;

            if (ListaOriginal === undefined) {
                let catalogo = `catalogo$${ID_CATALOGO}`;
                if (EK.Store.getState().global[catalogo].data.length === 0) {
                    return;
                }
                ListaOriginal = EK.Store.getState().global[catalogo].data;
                global.dispatchSuccessful("load::catalogoOriginalF", ListaOriginal);
            } else {
                ListaOriginal = ListaOriginal.data;
            }

            for (let u of ListaOriginal) {
                let patron = u.Nombre.toLowerCase() + u.Clave.toLowerCase();
                if (patron.includes(value.toLowerCase())) {
                    ListaFiltrada.push(u);
                }
            }
            global.dispatchSuccessful("global-page-data", ListaFiltrada, ID_CATALOGO);
        }

        render(): JSX.Element {
            return <Column size={this.props.size}>
                <page.OptionSection
                    id={PAGE_FRACCIONAMIENTOS_ID}
                    parent={config.id}
                    icon="fa fa-users"
                    level={1} collapsed={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                        {[global.getData(this.props.fraccionamientos, []).length].join("")}
                    </span>}>
                    <input.Text id="FiltrarInfoF" placeHolder="Ingrese informacion para filtrar" change={this.FiltrarResultados.bind(this, PAGE_FRACCIONAMIENTOS_ID)} idFormSection={config.id} size={[12, 12, 12, 12]} />

                    <PanelUpdate info={this.props.fraccionamientos}>
                        <List
                            id={PAGE_FRACCIONAMIENTOS_ID}
                            items={this.props.fraccionamientos}
                            readonly={true}
                            drawOddLine={true}
                            selectable={true}
                            horizontalScrolling={true}
                            height="250px"
                            onItemClick={this.onClick.bind(this)}
                            listHeader={listHeaderFraccionamientos}
                            formatter={(index: number, item: any) => {
                                return <Row className="list-selectable-item" style={{ margin: 0 }}>
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item listItem-overflow"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.Clave}</span>{item.Nombre}</Column>
                                </Row>
                            }} />
                    </PanelUpdate>
                </page.OptionSection>
            </Column>
        };
    });

    interface IUbicacionesContratistaProps extends page.IProps, grid.IColumn {
        ubicaciones?: DataElement;
    };

    const SectionUbicacionesContratista: any = global.connect(class extends React.Component<IUbicacionesContratistaProps, {}>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.ubicaciones = state.global.catalogo$contratistasLotes$ubicaciones;
            return retValue;
        };
        onRemove(item: any): void {
            let ubicacion: any = global.assign({}, item.ubicacion);
            let contratista: any = global.assign({}, item.contratista);
            //
            let contratistas: DataElement = global.createSuccessfulStoreObject(ubicacion.Contratistas);
            ubicacion.Contratistas = global.getData(contratistas.removeItem(contratista), []);
            //
            let entidades: DataElement = this.props.ubicaciones.upsertItem(ubicacion);
            global.dispatchSuccessful("global-page-data", entidades, PAGE_UBICACIONES_ID);
            //
            let element: string = ["ubicacion_", ubicacion.ID].join("")
            Forms.updateFormElement(PAGE_UBICACIONES_CHECK_ID, element, true);
        };
        render(): JSX.Element {
            return <Column size={this.props.size}>
                <page.OptionSection
                    id={PAGE_UBICACIONES_ID}
                    parent={config.id}
                    icon="fa fa-users"
                    level={1} collapsed={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 10 }}>
                        {[global.getData(this.props.ubicaciones, []).length].join("")}
                    </span>}>
                    <PanelUpdate info={this.props.ubicaciones}>
                        <List
                            id={PAGE_UBICACIONES_ID}
                            items={this.props.ubicaciones}
                            readonly={true}
                            drawOddLine={true}
                            selectable={true}
                            height="250px"
                            listHeader={listHeaderUbicaciones}
                            formatter={(index: number, item: any) => {
                                let contratistas: global.DataElement = global.createSuccessfulStoreObject(item.Contratistas).getActiveItems();

                                return <Row id={"row_ubicacion_" + item.ID} className="panel-collapsed" style={{ margin: 0 }}>
                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                        <Row>
                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton idElement={"row_ubicacion_" + item.ID} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} inverse={true} />
                                            </Column>
                                            <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow"><span className="badge badge-info bold">{item.ClaveFormato}</span></Column>
                                            <ColumnTiposContratista size={[5, 5, 5, 5]} items={contratistas} />
                                            <Column size={[2, 2, 2, 2]} style={{ marginBottom: -20, marginTop: -28 }}><checkBox.CheckBox id={"ubicacion_" + item.ID} size={[1, 1, 1, 1]} idFormSection={PAGE_UBICACIONES_CHECK_ID} /></Column>
                                        </Row>
                                    </Column>
                                    <Row>
                                        <Column
                                            xs={{ size: 10 }}
                                            sm={{ size: 10, offset: 1 }}
                                            md={{ size: 10, offset: 1 }}
                                            lg={{ size: 10, offset: 1 }}
                                            className="panel-detail well well-sm">
                                            <List
                                                items={contratistas}
                                                readonly={true}
                                                listHeader={listHeaderUbicacionesContratistas}
                                                addRemoveButton={false}
                                                formatter={(_index: number, _item: any): any => {
                                                    return <Row>
                                                        <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow">{!(_item && _item.Contratista) ? "" : <span><span className="badge badge-success" style={{ marginRight: 5 }}>{_item.Contratista.ID}</span>{_item.Contratista.Nombre}</span>}</Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-default-item listItem-overflow">{!(_item && _item.TipoContratista) ? "" : <span className="badge badge-info" style={{ marginRight: 5, backgroundColor: BGCTipoContratista[_item.TipoContratista.ID] }}>{_item.TipoContratista.Descripcion}</span>}</Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{EK.UX.Labels.yes(_item.ContratistaDefault === "S")}</Column>
                                                        <Button size={[2, 2, 2, 2]} className="btn btn-xs red" style={{ display: "block", cursor: "pointer" }} icon="fas fa-times" info={{ ubicacion: item, contratista: _item }} onClick={this.onRemove.bind(this)}></Button>
                                                    </Row>
                                                }} />
                                        </Column>
                                    </Row>
                                </Row>
                            }} />
                    </PanelUpdate>
                </page.OptionSection>
            </Column>
        };
    });
};