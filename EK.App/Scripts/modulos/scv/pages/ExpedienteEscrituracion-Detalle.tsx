namespace EK.Modules.SCV.Pages.ExpedientesEnEscrituracion {
    "use strict";
    let UBICACIONES = "Ubicaciones";
    let FINANCIAMIENTO = "Financiamiento";

    const config: page.IPageConfig = global.createPageConfig("expedientesEscriturar", "scv", [UBICACIONES, FINANCIAMIENTO]);

    let PAGE_ID = "Información General";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Notario")
                .addString("NumeroEscrituracion")
                .addEstatus()
                .addVersion()
                .toObject();
            config.dispatchEntityBase(model, "base/scv/expedientes/get/SaveEscrituracion", undefined, global.HttpMethod.PUT);

            return null;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            let parametros: any = global.encodeParameters({ id });
            global.dispatchAsync("global-current-entity", "base/kontrol/expedientes/Get/ObtenerExpedientePorEscriturarPorID/" + parametros);
        };
        onEntitySaved(props: page.IProps): any {

        };
        onEntityLoaded(props: page.IProps): any {
            let idExpediente: number = getDataID(props.entidad);
            let parametros: any = global.encodeParameters({ idExpediente });

            global.dispatchAsync("global-page-data", "base/kontrol/ventas/Get/ObtenerUbicaciones/" + parametros, UBICACIONES);
            global.dispatchAsync("global-page-data", "base/kontrol/ventas/Get/ObtenerFinanciamiento/" + parametros, FINANCIAMIENTO);



        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onWillEntityLoad={this.onWillEntityLoad}
                onSave={this.saveForm}
                allowNew={false}
                onEntitySaved={this.onEntitySaved}
                onEntityLoaded={this.onEntityLoaded}
                allowDelete={false}>
                <PageButtons>
                    <AuthorizeButton />
                    <PrintCotizacionButton/>
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    let Edit: any = global.connect(class extends React.Component<IExpediente, IExpediente> {
        constructor(props: IExpediente) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IExpediente, nextState: IExpediente): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let estatus: any = entidad && entidad.FlujoTrabajo && entidad.FlujoTrabajo.Estatus.ID != null ? entidad.FlujoTrabajo.Estatus : null;
            let estatusClave: any = estatus ? estatus.Clave : null;

            let tareaArregloEstatus: any = {};
            if (estatus != null) {
                tareaArregloEstatus[0] = estatus.Nombre;
                tareaArregloEstatus[1] = undefined;
                tareaArregloEstatus[2] = estatus.Clave;
            }
            //No permitir la edicion de la entidad si esta en autorizacion
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12,12,12,12]}>
                                <label.Folio id={"ID"} size={[12, 1, 1, 1]} />
                                <label.Link id={"Cliente"} formatValue={(e: any) => { return { ID: e.ID, Clave: e.ID, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} size={[12, 4, 4, 4]} />
                                <label.Link id={"Desarrollo"} link={"#/scv/desarrollos/:id"} size={[12, 4, 4, 4]} />
                                <label.Link id={"TipoComercializacion"} link={"#/scv/tipocomercializacion/:id"} size={[12, 3, 3, 3]} />
                            </Column>


                            <Column size={[ 12,12,12,12]}>
                                <label.Entidad id={"EsquemaSeguimiento"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Moneda"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Plaza"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Compania"} size={[12, 3, 3, 3]} />

                                <label.Fecha id="FechaEscrituracion" size={[12, 2, 2, 2]} />
                                <label.Fecha id="FechaFiniquito" size={[12, 2, 2, 2]} />
                            </Column>

                            <Column size={[12, 12, 7, 7]} style={{ marginTop: "3%" }}>
                                <page.OptionSection
                                    id="DatosEscrituracion"
                                    icon="fas fa-signature "
                                    level={1} collapsed={false} hideCollapseButton={false}>


                                    {(estatus != null && estatusClave!="RE") ?
                                        <div>
                                            <label.Entidad id={"Notario"} size={[12, 6, 6, 6]} />
                                             <Label id="NumeroEscrituracion" size={[12, 4, 4, 4]} />
                                             <label.EstatusFlujo size={[12, 2, 2, 2]} label="Autorización" value={tareaArregloEstatus} />
                                        </div>
                                        :
                                        <div>
                                             <ddl.SCVNotarios id={"Notario"} size={[12, 6, 6, 6]} validations={[validations.required()]} addNewItem={"SO"} />
                                             <input.Text id="NumeroEscrituracion" size={[12, 4, 4, 4]} maxLength={150} validations={[validations.required()]} />
                                            {(estatusClave != null) ?
                                                <label.EstatusFlujo size={[12, 3, 3, 3]} label="Autorización" value={tareaArregloEstatus} />
                                                 : null
                                            }
                                        </div>
                                    }
                                </page.OptionSection>
                            </Column>


                            <Ubicaciones />
                            <Financiaiento />

                        </Row>
                    </page.OptionSection>
                </Column>

            </page.Edit>;
        }
    });

    interface IExpediente extends page.IProps {
        entidad: any;
    };

    let View: any = global.connect(class extends React.Component<IExpediente, IExpediente> {
        constructor(props: IExpediente) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IExpediente, nextState: IExpediente): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let moneda: any = entidad && entidad.Moneda ? entidad.Moneda : null;
            let desarrollo: any = entidad && entidad.Desarrollo ? entidad.Desarrollo : null;

            let estatus: any = entidad && entidad.FlujoTrabajo && entidad.FlujoTrabajo.Estatus.ID != null ? entidad.FlujoTrabajo.Estatus : null;
            let estatusClave: any = estatus ? estatus.Clave : null;


            let tareaArregloEstatus: any = {};
            if (estatus != null) {
                tareaArregloEstatus[0] = estatus.Nombre;
                tareaArregloEstatus[1] = undefined;
                tareaArregloEstatus[2] = estatus.Clave;
            }

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info" collapsed={false} hideCollapseButton={true}>
                        <Row>

                            <Column size={[12, 12, 12, 12]}>
                                <label.Folio id={"ID"} size={[12, 1, 1, 1]} />
                                <label.Link id={"Cliente"} formatValue={(e: any) => { return { ID: e.ID, Clave: e.ID, Nombre: [e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno].join(" ") }; }} link={"#/scv/clientes/:id"} size={[12, 4, 4, 4]} />
                                <label.Link id={"Desarrollo"} link={"#/scv/desarrollos/:id"} size={[12, 4, 4, 4]} />
                                <label.Link id={"TipoComercializacion"} link={"#/scv/tipocomercializacion/:id"} size={[12, 3, 3, 3]} />
                            </Column>


                            <Column size={[12, 12, 12, 12]}>
                                <label.Entidad id={"EsquemaSeguimiento"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Moneda"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Plaza"} size={[12, 3, 3, 3]} />
                                <label.Entidad id={"Compania"} size={[12, 3, 3, 3]} />
                                <label.Fecha id="FechaFiniquito" size={[12, 2, 2, 2]} />
                                <label.Fecha id="FechaEscrituracion" size={[12, 2, 2, 2]} />
                                <label.Link id={"AgenteFiniquito"} formatValue={(e: any) => { return { ID: e.ID, Clave: e.ID, Nombre: [e.Nombre, e.Apellidos].join(" ") }; }} link={"#/kontrol/usuarios/:id"} size={[12, 4, 4, 4]} />
                                <label.Link id={"AgenteEscrituracion"} formatValue={(e: any) => { return { ID: e.ID, Clave: e.ID, Nombre: [e.Nombre, e.Apellidos].join(" ") }; }} link={"#/kontrol/usuarios/:id"} size={[12, 4, 4, 4]} />
                            </Column>


                            <Column size={[12, 12, 7, 7]} style={{ marginTop: "3%" }}>
                                <page.OptionSection
                                    id="DatosEscrituracion"
                                    title={""}
                                    icon="fas fa-signature "
                                    level={1} collapsed={false} hideCollapseButton={false}>

                                        <label.Entidad id={"Notario"} size={[12, 6, 6, 6]} />
                                        <Label id="NumeroEscrituracion" size={[12, 4, 4, 4]} />
                                        {estatusClave != null ?
                                            <label.EstatusFlujo size={[12, 2, 2, 2]} label="Autorización" value={tareaArregloEstatus} />
                                            : null
                                        }
                                </page.OptionSection>
                            </Column>

                            <Ubicaciones />
                            <Financiaiento/>

                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    });


    let Ubicaciones: any = global.connect(class extends React.Component<IExpediente, IExpediente> {
        constructor(props: IExpediente) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IExpediente, nextState: IExpediente): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let moneda: any = entidad && entidad.Moneda ? entidad.Moneda : null;
            let desarrollo: any = entidad && entidad.Desarrollo ? entidad.Desarrollo : null;

            return <page.SectionList
                id={UBICACIONES}
                parent={config.id}
                level={1}
                icon="fa fa-table"
                hideNewButton={true}
                listHeader={<Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header hidden-xs hidden-sm">{"Tipo Ubicación"}</Column>
                        <Column size={[2, 2, 2, 2]} className="list-default-header">{"Prototipo"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Precio Venta"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>}
                aggregate={(item: any, values: any) => {
                    if (!values.ImporteMoneda) values.ImporteMoneda = 0;
                    values.ImporteMoneda += item.ImporteMoneda ? item.ImporteMoneda : 0;
                    return values;
                }}
                listFooter={(values: any) => {
                    return <div>
                        <Row>
                            <Column size={[9, 8, 8, 8]}>{""}</Column>
                            <Column size={[2, 2, 2, 2]} style={{ textAlign: "right" }} className="listItem-right-header">
                                <span className="badge badge-info list-footer-badge">
                                    {global.formatMoney(values.ImporteMoneda, moneda)}
                                </span>
                            </Column>
                        </Row>
                    </div>;
                }}
                size={[12, 12, 12, 12]}
                formatter={(index: number, item: any) => {
                    let ubicacion: any = item.Ubicacion;

                    let caracteristicas: DataElement = global.createSuccessfulStoreObject(item.Caracteristicas).getActiveItems();
                    let length: number = global.getData(caracteristicas, []).length;
                    let precioVenta: any = item.PrecioVenta ? item.PrecioVenta.Clave : "O";
                    let style: React.CSSProperties = {};
                    style.backgroundColor = "";
                    let styleO: React.CSSProperties = {};
                    style.backgroundColor = "";
                    let classNameD: string = "";
                    let className: string = "";
                    let classNameO: string = "";
                    if (precioVenta == "O") {
                        styleO.backgroundColor = "#36d35f"
                        classNameO = "badge badge-info";
                    } else {
                        style.backgroundColor = "#36d35f"
                        className = "badge badge-info";
                    }
                    if (item.Diferencia < 0) {
                        classNameD = "badge badge-danger";
                    }
                    return <Row id={"row_ubicacion_" + item.Ubicacion.Clave} className="panel-collapsed" >
                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">

                            <Column size={[12, 1, 1, 1]} className="listItem-default-header">
                                <CollapseButton idElement={"row_ubicacion_" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                            </Column>

                            <Column size={[2, 2, 2, 2]} className="listItem-default-header">
                                <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>
                                <span className="bold">{item.Ubicacion.Clave}</span>
                            </Column>

                            <Column size={[2, 2, 2, 2]}>
                                <span className="badge badge-info">{item.Ubicacion.Nombre}</span>
                            </Column>

                            <Column size={[2, 2, 2, 2]} className="listItem-default-header hidden-xs hidden-sm">
                                <span>{item.Ubicacion.TipoUbicacion.Nombre}</span>
                            </Column>

                            <Column size={[1, 1, 1, 1]} className="listItem-default-header">
                                <span>{item.Ubicacion.Prototipo.Nombre}</span>
                            </Column>

                            <Column size={[1, 1, 1, 1]} >
                                <span className="badge badge-info" style={{ backgroundColor: "#36d35f" }}>{precioVenta}</span>
                            </Column>

                            <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                {global.formatMoney(item.ImporteMoneda, moneda)}
                            </Column>
                        </Column>

                        <Row>
                            <Column
                                xs={{ size: 10 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 10, offset: 1 }}
                                lg={{ size: 10, offset: 1 }}
                                className="panel-detail well well-sm">
                                <div className="note note-sucess" style={{ padding: "5px 0px", margin: 0, border: "none" }}>
                                    <Row style={{ padding: "5px 15px" }} id={"row_ubicacion_p" + item.Ubicacion.Clave} className="panel-collapsed">

                                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">

                                            <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                <CollapseButton idElement={"row_ubicacion_p" + item.Ubicacion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                            </Column>

                                            <Column size={[6, 6, 6, 6]}>
                                                <span>PRECIO DE UBICACIÓN</span>
                                            </Column>

                                            <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}>
                                                <span style={{ paddingRight: "5%" }}> {global.formatMoney(item.ImporteUbicacion, moneda)}</span>
                                            </Column>

                                        </Column>


                                        <Row>
                                            <Column
                                                xs={{ size: 10 }}
                                                sm={{ size: 10, offset: 1 }}
                                                md={{ size: 10, offset: 1 }}
                                                lg={{ size: 10, offset: 1 }}
                                                className="panel-detail well well-sm"
                                                style={{ paddingLeft: "10px", paddingRight: "50px", marginLeft: "200px", marginRight: "0px", width: "760px" }}>
                                                <div className="note note-sucess" style={{ padding: "5px", margin: 0, border: "none" }}>
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[6, 6, 6, 6]}><span >VALOR AVALÚO</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={className} style={style}>{global.formatMoney(item.ValorAvaluo, moneda)}</span></Column>
                                                    </Row>
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[6, 6, 6, 6]}><span>VALOR OPERATIVO</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameO} style={styleO}>{global.formatMoney(item.ValorOperativo, moneda)}</span></Column>
                                                    </Row>
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>PRECIO DE UBICACIÓN</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color: "#808080" }}>{global.formatMoney(item.ImporteUbicacion, moneda)}</Column>
                                                    </Row>
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[6, 6, 6, 6]}><span style={{ color: "#808080", paddingLeft: "30px" }}>TOTAL DE CARACTERÍSTICAS</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600, color: "#808080" }}>{global.formatMoney(item.TotalCaracteristicas, moneda)}</Column>
                                                    </Row>
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[6, 6, 6, 6]}><span>DIFERENCIA</span></Column>
                                                        <Column size={[4, 4, 4, 4]} className="listItem-right-header" style={{ fontWeight: 600 }}><span className={classNameD}>{global.formatMoney(item.Diferencia, moneda)}</span></Column>
                                                    </Row>
                                                </div>
                                            </Column>
                                        </Row>
                                    </Row>
                                    {ubicacion.Excedente ?
                                        <Row style={{ padding: "5px 15px" }}>
                                            <Column size={[2, 2, 2, 2]}></Column>
                                            <Column size={[4, 4, 4, 4]}>
                                                <span>METROS<sup>2</sup> EXCEDENTE</span>
                                                <span className="badge badge-danger pull-right">{ubicacion.Excedente}&nbsp;m<sup>2</sup></span>
                                                <span>{global.formatMoney(item.PrecioExcedente, moneda)}</span>
                                            </Column>
                                            <Column size={[6, 6, 6, 6]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item.ValorExcedente, moneda)}</Column>

                                        </Row> : null
                                    }
                                </div>
                                <List
                                    id={this.props.id + "_list"}
                                    items={caracteristicas}
                                    readonly={true}
                                    listHeader={<Column size={[12, 12, 12, 12]}>
                                        <Row>
                                            <Column size={[2, 2, 2, 2]} className="list-default-header">&nbsp;</Column>
                                            <Column size={[8, 7, 7, 7]} className="list-default-header">{"Característica"}</Column>
                                            <Column size={[2, 3, 3, 3]} className="list-default-header">
                                                <span>{"Importe"}</span>
                                            </Column>
                                        </Row>
                                    </Column>}
                                    addRemoveButton={false}
                                    formatter={(index_c: number, item_c: any): any => {
                                        if (item_c.VentaOpcional === true) {
                                            return <Row id={"row_ubicacion" + index_c}>
                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-warning">Incluida</span></Column>
                                                <Column size={[10, 10, 10, 10]}>{item_c.Caracteristica.Nombre}</Column>
                                            </Row>
                                        }
                                        else {
                                            return <Row id={"row_ubicacion" + index_c}>
                                                <Column size={[2, 2, 2, 2]}><span className="badge badge-info">Adicional</span></Column>
                                                <Column size={[8, 8, 8, 8]}>{item_c.Caracteristica.Nombre}</Column>
                                                <Column size={[2, 2, 2, 2]} className="listItem-right-header" style={{ fontWeight: 600 }}>{global.formatMoney(item_c.Importe, moneda)}</Column>
                                            </Row>
                                        }
                                    }} />
                            </Column>
                        </Row>
                    </Row>
                }}>
                <Row>
                </Row>
            </page.SectionList>
        }
    });

    let Financiaiento: any = global.connect(class extends React.Component<IExpediente, IExpediente> {
        constructor(props: IExpediente) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IExpediente, nextState: IExpediente): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            let moneda: any = entidad && entidad.Moneda ? entidad.Moneda : null;
            let desarrollo: any = entidad && entidad.Desarrollo ? entidad.Desarrollo : null;

            return <page.SectionList
                id={FINANCIAMIENTO}
                parent={config.id}
                level={1}
                icon="fa fa-table"
                size={[12, 12, 12, 12]}
                listHeader={<Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                        <Column size={[9, 9, 9, 9]} className="list-default-header">{"Nombre"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">{"Importe"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>}
                items={createSuccessfulStoreObject([])} readonly={false}
                hideNewButton={true}
                formatter={(index: number, item: any) => {

                    let instituciones: global.DataElement = global.createSuccessfulStoreObject(item.FinanciamientoInstituciones).getActiveItems();
                    let length: number = global.getData(instituciones, []).length;
                    let importeFinanciamiento: number = 0;

                    if (instituciones && length) {
                        let _instituciones: any[] = global.getData(instituciones, []);

                        _instituciones.forEach((value: any, index: number) => {
                            importeFinanciamiento += parseFloat(value.MontoCredito);
                        });
                    }

                    return <Row id={"row_financiamiento_" + index} className="panel-collapsed">
                        <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                            <Row>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    <CollapseButton idElement={"row_financiamiento_" + index} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                </Column>
                                <Column size={[9, 9, 9, 9]} className="listItem-default-header bold">
                                    <span className="badge badge-success" style={{ position: "absolute", top: 0, left: -12 }}>{length}</span>{item.Financiamiento.Nombre}
                                </Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-right-header">
                                    <span className="badge badge-info list-footer-badge">{global.formatMoney(importeFinanciamiento, moneda)}</span>
                                </Column>
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
                                    id={this.props.id + "_list"}
                                    items={instituciones}
                                    readonly={true}
                                    listHeader={<Column size={[12, 12, 12, 12]}>
                                        <Row>
                                            <Column size={[10, 10, 10, 10]} className="list-default-header">{"Institución"}</Column>
                                            <Column size={[2, 2, 2, 2]} className="list-center-header">{"Importe"}</Column>
                                        </Row>
                                    </Column>}
                                    addRemoveButton={false}
                                    formatter={(index_e: number, item: any): any => {
                                        let conceptos: global.DataElement = global.createSuccessfulStoreObject(item.Conceptos).getActiveItems();
                                        let style: React.CSSProperties = {};
                                        style.backgroundColor = "#fafafa";
                                        return <Row id={"row_financiamiento_" + index_e}>
                                            <Row id={"row_instituciones_" + item.Institucion.Clave} className="panel-collapsed">
                                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                    <Row>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                            <CollapseButton idElement={"row_instituciones_" + item.Institucion.Clave} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                                        </Column>
                                                        <Column size={[9, 9, 9, 9]}>
                                                            <div className="listItem-default-header bold">{item.Institucion.Nombre}</div>
                                                            <div className="listItem-default-header italic">{item.Comentarios}</div>
                                                        </Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header bold">
                                                            {global.formatMoney(item.MontoCredito, moneda)}
                                                        </Column>
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
                                                            items={conceptos}
                                                            readonly={true}
                                                            listHeader={<Column size={[12, 12, 12, 12]}>
                                                                <Row>
                                                                    <Column size={[6, 6, 6, 6]} className="list-default-header">{"Concepto"}</Column>
                                                                    <Column size={[3, 3, 3, 3]} className="list-center-header">{"Estimado"}</Column>
                                                                    <Column size={[3, 3, 3, 3]} className="list-center-header">{"Real"}</Column>
                                                                </Row>
                                                            </Column>}
                                                            addRemoveButton={false}
                                                            formatter={(index_c: number, item: any): any => {
                                                                let style: React.CSSProperties = {};
                                                                style.padding = "5px 0px";
                                                                style.backgroundColor = item.Credito === true && item.Concepto.TipoConcepto.Clave === "IMP" ? "#E3E4F9" : null;

                                                                return <Row>
                                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                                                        <Row style={style}>
                                                                            <Column size={[6, 6, 6, 6]} className="listItem-default-header bold">{item.Concepto.Nombre}</Column>
                                                                            <EK.Modules.SCV.Pages.Ventas.ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorEstimado} />
                                                                            <EK.Modules.SCV.Pages.Ventas.ColumnCC size={[3, 3, 3, 3]} className="listItem-right-header" tipoCC={item.Concepto.TipoConcepto} desarrollo={desarrollo} value={item.ValorAutorizado} />
                                                                        </Row>
                                                                    </Column>
                                                                </Row>
                                                            }} />
                                                    </Column>
                                                </Row>

                                            </Row>
                                        </Row>
                                    }} />
                            </Column>
                        </Row>
                    </Row>
                }}>
                <Row>

                </Row>
            </page.SectionList>
        }
    });


    interface IAuthorizeButton extends EK.UX.Buttons.IButtonProps {
        item?: any;
        estadoEntidad?: boolean;
        config?: page.IPageConfig;
    }

    let AuthorizeButton: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IAuthorizeButton = {
            icon: "fa fa-check-circle",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.item);

            let id: number = item.ID;
            let parametros: any = global.encodeParameters({ id });
            EK.Global.confirm("Autorización de escrituración", "Solicitud de autorización de escrituración", () => {

                global.asyncGet("base/scv/expedientes/Get/RequestAuthorize/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.loading) {
                        global.dispatchLoading("global-current-entity", data);
                    }
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchSuccessful("global-current-entity", data);
                        if (this.props.config) {
                            this.props.config.setState({ viewMode: true });
                        }
                        success($ml.mensajes.exito);
                    }
                });
            });
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.item);
            let estatus: any = entidad && entidad.FlujoTrabajo && entidad.FlujoTrabajo.Estatus ? entidad.FlujoTrabajo.Estatus : null;
            if (entidad && entidad.ID && entidad.Notario.ID == null && entidad.NumeroEscrituracion == null)
                return null;
            if (estatus && (estatus.ID != null && estatus.Clave!='RE'))
                return null;
            return <Button {...this.props} onClick={this.onClick} />;
        }
    });

    let PrintCotizacionButton: any = global.connect(class extends React.Component<IAuthorizeButton, {}> {
        constructor(props: IAuthorizeButton) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            item: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global)
        });
        static defaultProps: IAuthorizeButton = {
            icon: "fa fa-print",
            text: "",
            color: "white",
            className: "btn btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        shouldComponentUpdate(nextProps: IAuthorizeButton, nextState: IAuthorizeButton): boolean {
            return hasChanged(this.props.item, nextProps.item)
        }
        onClick(): void {
            let $ml: any = this.props.config.getML();
            let item: any = getData(this.props.item);
            let entidad: any = global.getData(this.props.item);
            let url: string = ["expediente/generar/escrituracion/", entidad.ID].join("")
            let win = window.open(url, "_blank")
        }
        render(): JSX.Element {
            let entidad: any = getData(this.props.item);
            if (entidad && entidad.ID && entidad.Notario.ID != null && entidad.NumeroEscrituracion != null)
            {
                return <Button {...this.props} onClick={this.onClick} />;

            }
            return null;
        }
    });
}