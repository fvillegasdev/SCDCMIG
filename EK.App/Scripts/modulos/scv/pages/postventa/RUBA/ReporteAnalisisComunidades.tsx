namespace EK.Modules.SCV.Pages.Reportes.AnalisisComunidades {
    "use strict";
    const PAGE_ID: string = "ReporteAnalisisComunidad";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    export const Edicion: any = global.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let contactos: any = Forms.getValue(null, null).data

            item = Forms.getForm(null);
            let model: any = item
                .addID()
                .addNumber("IdEntity")
                .addNumber("IdUbicacion")
                .addString("TelefonoCasa")
                .addString("TelefonoOtros")
                .addString("CorreoElectronico")
                .addEstatus()
                .addVersion()
                .toObject();
            model.ClienteTelefonoContactos = contactos;
            //console.log(model)
            return { model, url: "base/scv/ClientesSPV/Get/UpdateContacto" };
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setState({ viewMode: false });
            props.config.setEntity({});
            //props.config.setEntity({}, PAGE_UBICACION_ID);
            //props.config.setEntity({}, PAGE_CLIENTE_INFO_ID);
            //props.config.setCatalogo([], CLIENTE_CONTACTO_ID);
            //Forms.remove(PAGE_CLIENTE_INFO_ID);
        };
        onEntitySaved(props: page.IProps): void {
            this.onWillEntityLoad(null, props);
        };
        render(): JSX.Element {
            let allowSave: boolean = true;

            //let cliente: any = Forms.getValue("Cliente", config.id);
            //if (cliente) {
            //    if (cliente.ID > 0) {
            //        allowSave = true;
            //    };
            //};
            allowSave = true;
            //console.log(config)
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowSave={false}
                allowDelete={false}
                onSave={this.saveForm}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                //onEntityLoaded={this.onEntityLoaded.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onFilter={this.onFilter.bind(this)}
            >
                <Edit />
            </page.Main>
        };
    });
    interface IEditProps extends page.IProps {
        //obtenerUbicacion?: (idUbicacion: number) => void;
        //obtenerCliente?: (id: number) => void;
        //obtenerTelefonos?: (id: number) => void;
        //clienteRef?: global.DataElement;
        //ubicacion?: global.DataElement;
        //clienteInfo?: global.DataElement;
        //telefonosCliente?: global.Catalogos;
        Plaza?: global.DataElement;
        Fraccionamiento?: global.DataElement;
    };
    const Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.Plaza = Forms.getDataValue("PlazaInicial", PAGE_ID, state);
            retValue.Fraccionamiento = Forms.getDataValue("Fraccionamientos", PAGE_ID, state);
            //retValue.ubicacion = state.global.entity$datosCliente$ubicacion;
            //retValue.clienteInfo = state.global.entity$datosCliente$info;
            //retValue.telefonosCliente = state.global.catalogo$datosCliente$contacto;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerUbicacion: (idUbicacion: number): void => {
                let encodedFilters: string = global.encodeObject({ id: idUbicacion });
                // global.dispatchAsync("global-page-entity", "base/scv/ReportesFallas/GetBP/GetUbicacionById/" + encodedFilters, PAGE_UBICACION_ID);
            },
            obtenerCliente: (id: number): void => {
                //global.dispatchAsyncPost("global-page-entity", "base/scv/ClientesSPV/id", { id }, PAGE_CLIENTE_INFO_ID);
            },
            obtenerTelefonos: (id: number): void => {
                let encodedFilters: string = global.encodeObject({ idCliente: id });
                //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/GetBP/GetOnlycontactosAdicionalesCliente/" + encodedFilters, CLIENTE_CONTACTO_ID);
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.Plaza, nextProps.Plaza) && global.isSuccessful(nextProps.Plaza)) {
                if (global.getDataID(this.props.Plaza) !== global.getDataID(nextProps.Plaza)) {
                    let plaza = nextProps.Plaza.data;
                    if (plaza.ID !== '-2' && plaza.ID !== -2) {
                        let encodedParams: string = global.encodeParameters({ IdPlaza: plaza.ID });
                       // global.dispatchAsync("load::tags$fraccionamientos", "base/kontrol/fraccionamientos/all/" + encodedParams);
                        //console.log('obtener fraccionamientos')
                    }
                };
            };

            if (hasChanged(this.props.Fraccionamiento, nextProps.Fraccionamiento) && global.isSuccessful(nextProps.Fraccionamiento)) {
                if (global.getDataID(this.props.Fraccionamiento) !== global.getDataID(nextProps.Fraccionamiento)) {
                    //console.log(nextProps.Fraccionamiento)
                    Forms.updateFormElement(PAGE_ID, "PorcVivEntregada", null);
                    Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
                    Forms.updateFormElement(PAGE_ID, "FoliosAbiertoAC", null);
                    Forms.updateFormElement(PAGE_ID, "FoliosAbiertoCasas", null);
                    Forms.updateFormElement(PAGE_ID, "ComiteVecinal", null);
                    Forms.updateFormElement(PAGE_ID, "EntregaAreasComunes", null);
                    Forms.updateFormElement(PAGE_ID, "AC", null);
                    Forms.updateFormElement(PAGE_ID, "FondoEntregado", null);
                    Forms.updateFormElement(PAGE_ID, "EntregaAdministracion", null);
                    Forms.updateFormElement(PAGE_ID, "Anotaciones", null);
                    Forms.updateFormElement(PAGE_ID, "diasDesde51", null);
                    let frac = nextProps.Fraccionamiento.data;
                    if (frac.ID !== '-2' && frac.ID !== -2) {

                        let p = { ClaveFracc: frac.Clave }
                        console.log(p)
                        global.asyncPost("base/kontrol/ReporteAnalisisComunidades/GetBP/GetTotalesParaAnalisisComunidad/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                            if (status === AsyncActionTypeEnum.successful) {
                                console.log(data)
                                if (data != null) {
                                    if (data.porVivEntregada === 0) {
                                        data.porVivEntregada = '0'
                                    }
                                    if (data.fondoConvive === 0 || data.fondoConvive === null) {
                                        data.fondoConvive = 'Monto $0'
                                    } else {
                                        data.fondoConvive = 'Monto $' + data.fondoConvive;
                                    }
                                    if (data.cantFoliosAbiertosAC === 0) {
                                        data.cantFoliosAbiertosAC = '0'
                                    }
                                    if (data.cantFoliosAbiertos === 0) {
                                        data.cantFoliosAbiertos = '0'
                                    }
                                    Forms.updateFormElement(PAGE_ID, "PorcVivEntregada", data.porVivEntregada);
                                    Forms.updateFormElement(PAGE_ID, "FondoConvive", data.fondoConvive);
                                    Forms.updateFormElement(PAGE_ID, "FoliosAbiertoAC", data.cantFoliosAbiertosAC);
                                    Forms.updateFormElement(PAGE_ID, "FoliosAbiertoCasas", data.cantFoliosAbiertos);
                                    Forms.updateFormElement(PAGE_ID, "diasDesde51", data.diasDesde51);
                                }
                                
                            }
                        });
                        //Forms.updateFormElement(PAGE_ID, "ComiteVecinal", 'ComiteVecinalNo');
                    }
                    
                };
            };
        };
        
        GuardarAnalisis() {
            let model: any = Forms.getValues(PAGE_ID);

            if (model.PlazaInicial.ID === undefined || model.PlazaInicial.ID === '-2') {
                global.info('Seleccione una plaza');
                return;
            }
            if (model.Fraccionamientos.ID === -2 || model.Fraccionamientos.ID === '-2') {
                global.info('Seleccione un fraccionamiento');
                return;
            }
            for (let key of Object.keys(model)) {
                if (key !== 'Anotaciones' && key !== 'Fraccionamientos' && key !== 'PlazaInicial') {
                    console.log(typeof model[key]);
                    if (typeof model[key] === 'string' && model[key] !== null && model[key] !== 'null') {
                        if (model[key].includes('SI')) {
                            model[key] = 1;
                        }
                        else if (model[key].includes('NO')) {
                            model[key] = 0;
                        }
                        else if (model[key].includes('PAR')) {
                            model[key] = 2;
                        } else {
                            model[key] = null;
                        }
                    }                    
                }
                
            }


            if (model.ComiteVecinal === "0" || model.ComiteVecinal === null) {
                global.info('Seleccione una opcion de Comite vecinal');
                return;
            }

            if (model.EntregaAreasComunes === "0" || model.EntregaAreasComunes === null) {
                global.info('Seleccione una opcion de Entrega areas comunes');
                return;
            }

            if (model.AC === "0" || model.AC === null) {
                global.info('Seleccione una opcion de A. C.');
                return;
            }

            if (model.FondoEntregado === "0" || model.FondoEntregado === null) {
                global.info('Seleccione una opcion de Fondo entregado');
                return;
            }

            if (model.EntregaAdministracion === "0" || model.EntregaAdministracion === null) {
                global.info('Seleccione una opcion de Entrega de administracion');
                return;
            }
            if (model.Anotaciones === null || model.Anotaciones === undefined || model.Anotaciones.trim() === '') {
                global.info('Faltan anotaciones');
                return;
            }
            model.IdPlaza = model.PlazaInicial.ID;
            model.CveFracc = model.Fraccionamientos.Clave;

            global.asyncPost("base/kontrol/ReporteAnalisisComunidades/GetBP/GuardarReporteAnalisisComunidad/", { parametros: model }, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {

                    if (data === 2 || data === '2') {
                        global.info('Ya existe un registro de este fraccionamiento');
                        Forms.updateFormElement(PAGE_ID, "PorcVivEntregada", null);
                        Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
                        Forms.updateFormElement(PAGE_ID, "FoliosAbiertoAC", null);
                        Forms.updateFormElement(PAGE_ID, "FoliosAbiertoCasas", null);
                        Forms.updateFormElement(PAGE_ID, "ComiteVecinal", null);
                        Forms.updateFormElement(PAGE_ID, "EntregaAreasComunes", null);
                        Forms.updateFormElement(PAGE_ID, "AC", null);
                        Forms.updateFormElement(PAGE_ID, "FondoEntregado", null);
                        Forms.updateFormElement(PAGE_ID, "EntregaAdministracion", null);
                        Forms.updateFormElement(PAGE_ID, "Anotaciones", null);
                        Forms.updateFormElement(PAGE_ID, "diasDesde51", null);
                    }

                    else if (data === 1 || data === '1') {
                        global.success('Registro guardado correctamente');
                        Forms.updateFormElement(PAGE_ID, "PorcVivEntregada", null);
                        Forms.updateFormElement(PAGE_ID, "FondoConvive", null);
                        Forms.updateFormElement(PAGE_ID, "FoliosAbiertoAC", null);
                        Forms.updateFormElement(PAGE_ID, "FoliosAbiertoCasas", null);
                        Forms.updateFormElement(PAGE_ID, "ComiteVecinal", null);
                        Forms.updateFormElement(PAGE_ID, "EntregaAreasComunes", null);
                        Forms.updateFormElement(PAGE_ID, "AC", null);
                        Forms.updateFormElement(PAGE_ID, "FondoEntregado", null);
                        Forms.updateFormElement(PAGE_ID, "EntregaAdministracion", null);
                        Forms.updateFormElement(PAGE_ID, "Anotaciones", null);
                        Forms.updateFormElement(PAGE_ID, "diasDesde51", null);
                    } else {
                        global.warning('Hubo un problema al guardar el registro');
                    }
                    //console.log(data);
                }
            });
                //console.log( model);

          
        }

        render(): JSX.Element {
            //let t: any = Forms.getValue("FondoConvive", PAGE_ID);
            
            //t = t !== null ? 'Fondo $' + t : 'Fondo $0';
            //console.log(t)

            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle="Análisis comunidades"
                        icon="fa fa-pencil-square-o" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                            <FraccionamientosDashBoardFailureReportDDL id={"Fraccionamientos"} size={[12, 4, 4, 4]} idForm={PAGE_ID}  validations={[validations.required()]} required={true} />
                            
                            {/*<input.Text id="PorcVivEntregada" label="% Viviendas entregada" idFormSection={'test'} size={[12, 12, 3, 3]} /><ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 5, 5]} validations={[validations.required()]} required={true} />*/}
                            <label.Label id="PorcVivEntregada" label="% Viviendas entregadas" size={[12, 12, 2, 2]} />
                            <label.Label id="diasDesde51" label="Tiempo desde 50+1" size={[12, 12, 2, 2]} />

                        </Row>
                        <Row>
                            <Column size={[2, 2, 2, 2]} style={{ marginTop: 12 }}>
                                <page.OptionSection
                                    title="Comite Vecinal"
                                    icon="fas fa-users" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}> 
                                            <EK.UX.RadioButton$Form id={"ComiteVecinalSI"} idForm={PAGE_ID} label={"SI"} value={1} groupName={"ComiteVecinal"} size={[12, 12, 4, 4]} />
                                            <EK.UX.RadioButton$Form id={"ComiteVecinalNO"} idForm={PAGE_ID} label={"NO"} value={0} groupName={"ComiteVecinal"} size={[12, 12, 4, 4]} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                            <Column size={[6, 6, 6, 6]} style={{ marginTop: 12 }}>
                                <label.Label id="FondoConvive" label="Fondo Convive" size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 4, 4]} style={{ marginTop: 12 }}>
                                <page.OptionSection
                                    title="Entrega de Areas Comunes"
                                    icon="fas fa-tree" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                            <RadioButton id={"entAreasComunesSI"} label="SI" value="1" idForm={PAGE_ID} groupName="EntregaAreasComunes" size={[12, 12, 6, 6]} />
                                            <RadioButton id={"entAreasComunesNO"} label="NO" value="0" idForm={PAGE_ID} groupName="EntregaAreasComunes" size={[12, 12, 6, 6]} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[2, 2, 2, 2]} style={{ marginTop: 12 }}>
                                <page.OptionSection
                                    title="A. C."
                                    icon="fas fa-tree" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={"ACSI"} label="SI" value="1" idForm={PAGE_ID} groupName="AC" size={[12, 12, 6, 6]} />
                                        <RadioButton id={"ACNO"} label="NO" value="0" idForm={PAGE_ID} groupName="AC" size={[12, 12, 6, 6]} />
                                    </Column>
                                </page.OptionSection>
                            </Column>
                            <Column size={[6, 6, 6, 6]} style={{ marginTop: 12 }}>
                                <page.OptionSection
                                    title="Fondo Entregado"
                                    icon="fas fa-money" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={"FondoEntregadoSI"} label="SI" value="1" idForm={PAGE_ID} groupName="FondoEntregado" size={[12, 12, 6, 4]} />
                                        <RadioButton id={"FondoEntregadoNO"} label="NO" value="0" idForm={PAGE_ID} groupName="FondoEntregado" size={[12, 12, 6, 4]} />
                                        <RadioButton id={"FondoEntregadoPAR"} label="PARCIAL" value="0" idForm={PAGE_ID} groupName="FondoEntregado" size={[12, 12, 4, 4]} />
                                    </Column>
                                </page.OptionSection>
                            </Column>
                            <Column size={[12, 12, 4, 4]} style={{ marginTop: 12 }}>
                                <page.OptionSection
                                    title="Entrega de Administracion"
                                    icon="fas fa-cogs" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                        <RadioButton id={"entAdminSI"} label="SI" value="1" idForm={PAGE_ID} groupName="EntregaAdministracion" size={[12, 12, 6, 6]} />
                                        <RadioButton id={"entAdminNO"} label="NO" value="0" idForm={PAGE_ID} groupName="EntregaAdministracion" size={[12, 12, 6, 6]} />
                                    </Column>
                                </page.OptionSection>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 3, 3]} style={{ marginTop: 12 }}>
                                <Row>
                                    <label.Label id="FoliosAbiertoAC" label="# Folios abiertos Areas comunes" size={[12, 12, 12, 12]} />
                                </Row>
                            </Column>
                            <Column size={[12, 12, 3, 3]} style={{ marginTop: 12 }}>
                                <Row>
                                    <label.Label id="FoliosAbiertoCasas" label="# Folios abiertos de casas" size={[12, 12, 12, 12]} />
                                </Row>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={[12, 12, 6, 6]} style={{ marginTop: 12 }}>
                                <TextArea id="Anotaciones" label="Anotaciones" rows={3} idForm={PAGE_ID} size={[12, 12, 12, 12]} />
                            </Column>
                            <Column size={[12, 12, 4, 4]} style={{ marginTop: 12 }}>
                                <Button icon="fas fa-save" text="Guardar" id="btnId1" className={"btn btn-sm"} size={[12, 12, 12, 12]}
                                    style={{ backgroundColor: '#2ecc71', color: "#FFFFFF", border: 'none', width: '120px', height:'40px',marginTop:'40px'}} onClick={this.GuardarAnalisis} />

                            </Column>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;

        };
    });

    interface IFraccionamientosGeoJsonVDDLProps extends IDropDrownListProps {
        plazaSeleccionada?: global.DataElement;
    }
    export class FraccionamientosDashBoardFailureReport$DDL extends React.Component<IFraccionamientosGeoJsonVDDLProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.fraccSeleccionado,
            plazaSeleccionada: Forms.getDataValue("PlazaInicial", PAGE_ID, state)//Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state) //Forms.getDataValue("PlazaInicial", getData(state.global.pageConfig).id, state)
        });

        static defaultProps: IDropDrownListProps = {
            id: "Fraccionamientos",
            items: createDefaultStoreObject([]),
            label: "Fraccionamientos",
            helpLabel: "Seleccione el fraccionamiento.",
            value: undefined,
            initialValue: undefined,
            hasChanged: true,
            hasValidationError: false,
            required: true,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return $(item.text);
                }
                else {
                    return $([
                        "<span class='badge badge-success '> ",
                        item.ID == -2 ? item.Nombre : item.Clave,
                        "</span>",
                        "<span class='' style='font-size: 90%'> ",
                        item.ID == -2 ? '' : item.Nombre,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";
                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span class='' style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span class='badge badge-success '> ",
                    item.ID == -2 ? item.Nombre : item.Clave,
                    "</span>",
                    "<span class='' style='font-size: 90%'> ",
                    item.ID == -2 ? '' : item.Nombre,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): any {
            //dispatchSuccessful("load::fSeleccionado", '-2');
        }

        componentWillReceiveProps(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): void {
            if (global.hasChanged(this.props.plazaSeleccionada, nextProps.plazaSeleccionada)) {
                if ((getData(nextProps.plazaSeleccionada).ID != getData(this.props.plazaSeleccionada).ID)) {
                    let idPlaza: any = getData(nextProps.plazaSeleccionada).ID;
                    let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;

                    Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
                    let encodedParams: string = global.encodeParameters({ IdPlaza: idPlaza, IdVocacion: -2 });
                    //let encodedURL: any = "base/kontrol/fraccionamientos/all/" + encodedParams;
                    global.dispatchAsync("load::fraccSeleccionado", "base/kontrol/fraccionamientos/all/" + encodedParams);
                    //if (idPlaza != undefined) {
                        //dispatchAsync("load::fraccSeleccionado", encodedURL);
                   // }
                }
            }
        };

        shouldComponentUpdate(nextProps: IFraccionamientosGeoJsonVDDLProps, nextState: IFraccionamientosGeoJsonVDDLProps): boolean {
            return hasChanged(this.props.items, nextProps.items);
        }

        componentWillMount(): any {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm ? this.props.idForm : null;
            Forms.updateFormElement(idForm, this.props.id, { ID: -2, Clave: "-2", Nombre: "TODOS", id: -2, text: "TODOS" })
        };

        render(): any {
            let itemsModificados: DataElement = this.props.items;
            ////////
            if (global.isSuccessful(this.props.items)) {
                let existeItemTodos: boolean = false;
                for (var i = 0; i < itemsModificados.data.length; i++) {
                    if (String(itemsModificados.data[i].ID) === "-2") {
                        existeItemTodos = true;
                        break;
                    };
                };
                if (existeItemTodos === false) {
                    let nuevoItem: any = {};
                    nuevoItem['ID'] = -2;
                    nuevoItem['Clave'] = '-2';
                    nuevoItem['Nombre'] = 'TODOS';
                    if (itemsModificados.data.length > 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    };
                };
            };
            ///////
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} /*addNewItem={"SO"} addNewItemText={"Indique el Fraccionamiento"}  */ />;
        };
    };
    export const FraccionamientosDashBoardFailureReportDDL: any = ReactRedux.connect(FraccionamientosDashBoardFailureReport$DDL.props, null)(FraccionamientosDashBoardFailureReport$DDL);

}