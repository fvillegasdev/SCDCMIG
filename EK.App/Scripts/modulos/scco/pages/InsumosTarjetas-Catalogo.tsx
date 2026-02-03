namespace EK.Modules.SCCO.Pages.InsumosTarjetas {
    "use strict";
    const PAGE_ID: string = "InsumosTarjetas";
    const PAGE_TARJETA_INSUMOS: string = "TarjetaInsumos";
    const PAGE_TARJETA_INSUMOS_RESULT: string = "insumos$result";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scco", [PAGE_TARJETA_INSUMOS]);

    const listHeaderDetalle: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[12, 12, 4, 4]} className="list-default-header">{"Insumo"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Unidad"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Moneda"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">{"Cantidad"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">{"Precio"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-center-header">{"Importe"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </Column>

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let filters: any = Forms.getValues("scco$filters");
            if (filters) {
                item.addNumberConst("IdObra", filters.IdObra);
                item.addNumberConst("IdTabulador", filters.IdTabulador);
                item.addNumberConst("IdTipoPresupuesto", filters.IdTipoPresupuesto);
            };
            //
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("Obra")
                .addObject("Tabulador")
                .addObject("TipoPresupuesto")
                .addObject("TipoTarjeta")
                .addObject("UnidadMedida")
                .addString("Descripcion")
                .addNumber("CostoDirecto")
                .addObject(PAGE_TARJETA_INSUMOS)
                .addEstatus()
                .addVersion()
                .toObject()

            return model;
        };
        onEntityLoaded(props: page.IProps, parameters?: any): void {
            let id: number = global.getDataID(props.entidad);
            let entidad: any = global.getData(props.entidad);

            if (id === undefined || id === -1) {
                global.dispatchSuccessful("global-page-data", [], PAGE_TARJETA_INSUMOS);
            } else {
                global.dispatchSuccessful("global-page-data", entidad.TarjetaInsumos, PAGE_TARJETA_INSUMOS);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    interface IEditProps extends page.IProps {
        insumos?: global.DataElement;
        calcularInsumos?: (insumos: any[], IdObra: number, IdTabulador: number, IdTipoPresupuesto: number) => void;
    };

    class $Edit extends React.Component<IEditProps, IEditProps> {
        constructor(props: IEditProps) {
            super(props);
            this.onCalculate = this.onCalculate.bind(this);
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            insumos: state.global[["catalogo", PAGE_TARJETA_INSUMOS_RESULT].join("$")]
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            calcularInsumos: (insumos: any[], IdObra: number, IdTabulador: number, IdTipoPresupuesto: number): void => {
                let data: any = global.assign({ insumos, IdObra, IdTabulador, IdTipoPresupuesto });
                global.dispatchAsyncPost("global-page-data", "base/scco/InsumosTarjetas/GetBP/CalcularInsumos", data, PAGE_TARJETA_INSUMOS_RESULT)
            }
        });
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (global.hasChanged(this.props.insumos, nextProps.insumos)) {
                if (global.isSuccessful(nextProps.insumos)) {
                    let costoDirecto: number = 0;
                    //
                    let insumos: any[] = global.getData(nextProps.insumos, []);
                    if (insumos && insumos.length) {
                        insumos.forEach((insumo) => {
                            costoDirecto += insumo.Importe;
                        })
                    };
                    //
                    Forms.updateFormElement(config.id, "CostoDirecto", costoDirecto);
                    Forms.updateFormElement(config.id, PAGE_TARJETA_INSUMOS, nextProps.insumos);
                };
            };
        };
        onCalculate(data: DataElement): void {
            let isValid: boolean = SCCO.Filtros.isValid();
            if (isValid === true) {
                let items: any[] = data ? global.getData(data, []) : [];
                let filters: any = Forms.getValues("scco$filters");
                //
                this.props.calcularInsumos(items, filters.IdObra, filters.IdTabulador, filters.IdTipoPresupuesto);
                Forms.updateFormElement(config.id, PAGE_TARJETA_INSUMOS, global.createLoadingStoreObject([]));
            };
        };
        render(): JSX.Element {
            let id: number = global.getDataID(this.props.entidad);

            return <page.Edit>
                <Filtros.SCCOFilters />
                <Column size={[12, 12, 12, 12]} style={{ padding: 10 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-cubes"
                        level="main"
                        collapsed={false} hideCollapseButton={true}>
                        <Row>
                            {id === -1 ?
                                <input.Text id="Clave" size={[12, 12, 12, 2]} maxLength={150} validations={[validations.required(), dde.uniqueTarjeta("clave", "Ya existe una tarjeta con la clave capturada")]} /> :
                                <label.Clave size={[12, 2, 2, 2]} label={<div>Clave <span style={{ color: "#ffc107" }} className='fas fa-lock'></span></div>} />
                            }
                            <input.Nombre size={[12, 12, 12, 8]} maxLength={150} />
                            <checkBox.Status id="Estatus" size={[12, 12, 12, 2]} />
                            <TipoTarjetaDDL id="TipoTarjeta" size={[12, 12, 12, 3]} validations={[validations.required()]} />
                            <UnidadMedidaDDL id="UnidadMedida" size={[12, 12, 12, 3]} validations={[validations.required()]} />
                            <label.Decimal id="CostoDirecto" value={(item: any) => { return label.formatDecimal(item, 8) }} size={[12, 12, 2, 2]} />
                            <TextArea id="Descripcion" size={[12, 12, 12, 12]} cols={20} rows={2} />
                            <page.SectionList
                                id={PAGE_TARJETA_INSUMOS}
                                parent={config.id}
                                level={1}
                                icon="fa fa-cube"
                                size={[12, 12, 12, 12]}
                                inlineNew={true}
                                viewButtons={
                                    <Button
                                        keyBtn="btnSCCORecalcularInsumos"
                                        className="btn-ico-ek white"
                                        iconOnly={true}
                                        color="white"
                                        icon="fas fa-calculator"
                                        onClick={() => { this.onCalculate(Forms.getValue(PAGE_TARJETA_INSUMOS, config.id)) }} />
                                }
                                style={{ marginTop: 12 }}
                                listHeader={listHeaderDetalle}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                onValidations={() => {
                                    if (!Filtros.isValid()) {
                                        global.warning("Seleccione la Obra y Tipo Presupuesto para agregar insumos al tabulador.");
                                        return false;
                                    };

                                    return true;
                                }}
                                mapFormToEntity={(form: EditForm, entidades?: any[]): any => {
                                    let retValue: any = form
                                        .addID()
                                        .addObject("Insumo")
                                        .addNumber("Cantidad")
                                        .addNumber("Precio")
                                        .addNumber("PrecioMoneda")
                                        .addNumber("Importe")
                                        .addNumber("ImporteMoneda")
                                        .addObject("Moneda")
                                        .addVersion()
                                        .addEstatus()
                                        .toObject();
                                    //
                                    if (entidades && entidades.length > 0) {
                                        entidades.forEach((value: any, index: number): any => {
                                            if (value.Insumo.ID === retValue.Insumo.ID) {
                                                retValue.ID = value.ID;
                                                retValue._found = true;
                                            };
                                        });
                                    };
                                    //
                                    return retValue;
                                }}
                                formatter={(index: number, item: any) => {
                                    let clasificacion: any = item.Insumo && item.Insumo.Clasificacion ? item.Insumo.Clasificacion : {};
                                    let iconClass: any = clasificacion.Clave === "INSUMO" ? "fad fa-cube" : "fad fa-cubes";
                                    //
                                    return <Row>
                                        <Column size={[12, 12, 4, 4]} className="listItem-default-item listItem-overflow">
                                            <div style={{ position: "absolute", top: 2 }}>
                                                <i className={iconClass} style={{ fontSize: 18, color: clasificacion.Color }}></i>
                                            </div>
                                            <div style={{ marginLeft: 25 }}>
                                                <span style={{ alignItems: "center", marginRight: 2 }} className="badge badge-success">{item.Insumo.ClaveInsumo ? item.Insumo.ClaveInsumo : item.Insumo.Clave}</span>
                                                <span>{item.Insumo.Nombre}</span>
                                            </div>
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">
                                            <span className="badge badge-info" style={{ marginRight: 5 }}>{!(item.Insumo && item.Insumo.UnidadMedida) ? "" : item.Insumo.UnidadMedida.Clave}</span>
                                            <span>{!(item.Insumo && item.Insumo.UnidadMedida) ? "" : item.Insumo.UnidadMedida.Nombre}</span>
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow" style={{ padding: 0 }}>
                                            {clasificacion.Clave === "INSUMO" ?
                                                <ddl.MonedasDDL property={PAGE_TARJETA_INSUMOS} index={index} value={item.Moneda} id="Moneda" idFormSection={config.id} validations={[validations.required()]} /> :
                                                <span className="badge badge-info" style={{ marginRight: 5 }}>{!(item.Moneda) ? "" : item.Moneda.Clave}</span>
                                            }
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <input.Decimal property={PAGE_TARJETA_INSUMOS} index={index} value={item.Cantidad} id="Cantidad" idFormSection={config.id} />
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            {clasificacion.Clave === "INSUMO" ?
                                                <input.Decimal property={PAGE_TARJETA_INSUMOS} index={index} value={item.PrecioMoneda} id="PrecioMoneda" idFormSection={config.id} /> :
                                                <span>{label.formatDecimal(item.PrecioMoneda, 8)}</span>
                                            }
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <span>{label.formatDecimal(item.ImporteMoneda, 8)}</span>
                                        </Column>
                                        <buttons.PopOver idParent={config.id} idForm={PAGE_TARJETA_INSUMOS} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>
                                }}>
                                <Row>
                                    <ddl.SCCOInsumosDDL idFormSection={PAGE_TARJETA_INSUMOS} size={[12, 12, 4, 4]} validations={[validations.required()]} />
                                    <ddl.MonedasDDL label="Moneda" idFormSection={PAGE_TARJETA_INSUMOS} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                                    <input.Decimal id="Cantidad" label="Cantidad" idFormSection={PAGE_TARJETA_INSUMOS} size={[12, 12, 2, 2]} />
                                </Row>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    };

    const Edit: any = ReactRedux.connect($Edit.props, $Edit.dispatchs)($Edit);

    class View extends page.Base {
        onFilter(props: page.IProps, filters: any): void {
            let entidad: any = global.getData(props.entidad);
            //let id: number = global.getDataID(props.entidad);
            //let filtersI: any = global.assign(global.getFilters(filters), { IdInsumoTarjeta: id });
            //props.config.dispatchCatalogoBase("base/scco/InsumosTarjetas/Get/GetInsumosTarjeta/", filtersI, PAGE_TARJETA_INSUMOS);
            global.dispatchSuccessful("global-page-data", entidad.TarjetaInsumos, PAGE_TARJETA_INSUMOS);
        };
        render(): JSX.Element {
            return <page.View>
                <Filtros.SCCOFilters onFilter={this.onFilter.bind(this)} />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-cubes"
                        level="main"
                        collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 12, 2]} />
                            <label.Nombre size={[12, 12, 12, 8]} />
                            <label.Estatus id="Estatus" size={[12, 12, 12, 2]} />
                            <label.Entidad id="UnidadMedida" size={[12, 12, 12, 3]} />
                            <label.Entidad id="TipoTarjeta" size={[12, 12, 12, 3]} />
                            <label.Currency id="CostoDirecto" size={[12, 12, 2, 2]} /> 
                            <label.Label id="Descripcion" size={[12, 12, 12, 12]} />
                            <page.SectionList
                                id={PAGE_TARJETA_INSUMOS}
                                parent={config.id}
                                level={1}
                                icon="fa fa-cube"
                                style={{ paddingTop: 10 }}
                                size={[12, 12, 12, 12]}
                                listHeader={listHeaderDetalle}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                formatter={(index: number, item: any) => {
                                    let clasificacion: any = item.Insumo && item.Insumo.Clasificacion ? item.Insumo.Clasificacion : {};
                                    let iconClass: any = clasificacion.Clave === "INSUMO" ? "fad fa-cube" : "fad fa-cubes";
                                    //
                                    return <Row>
                                        <Column size={[12, 12, 4, 4]} className="listItem-default-item listItem-overflow">
                                            <div style={{ position: "absolute", top: 2 }}>
                                                <i className={iconClass} style={{ fontSize: 18, color: clasificacion.Color }}></i>
                                            </div>
                                            <div style={{ marginLeft: 25 }}>
                                                <span style={{ alignItems: "center", marginRight: 2 }} className="badge badge-success">{item.Insumo.ClaveInsumo ? item.Insumo.ClaveInsumo : item.Insumo.Clave}</span>
                                                <span>{item.Insumo.Nombre}</span>
                                            </div>
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">
                                            <span className="badge badge-info" style={{ marginRight: 5 }}>{!(item.Insumo && item.Insumo.UnidadMedida) ? "" : item.Insumo.UnidadMedida.Clave}</span>
                                            <span>{!(item.Insumo && item.Insumo.UnidadMedida) ? "" : item.Insumo.UnidadMedida.Nombre}</span>
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow">
                                            <span className="badge badge-info" style={{ marginRight: 5 }}>{!(item.Moneda) ? "" : item.Moneda.Clave}</span>
                                            <span>{!(item.Moneda) ? "" : item.Moneda.Nombre}</span>
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <span>{label.formatDecimal(item.Cantidad, 8)}</span>
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <span>{label.formatDecimal(item.PrecioMoneda, 8)}</span>
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <span>{label.formatDecimal(item.ImporteMoneda, 8)}</span>
                                        </Column>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
};