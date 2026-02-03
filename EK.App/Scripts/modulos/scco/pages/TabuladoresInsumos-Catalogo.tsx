
namespace EK.Modules.SCCO.Pages.TabuladoresInsumos {
    "use strict";
    const PAGE_ID = "TabuladoresInsumos";
    const PAGE_INSUMOS_TABULADOR_ID: string = "tabulador$insumos";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scco", [PAGE_INSUMOS_TABULADOR_ID]);
    const listHeaderDetalle: JSX.Element =
        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
            <Row>
                <Column size={[12, 12, 3, 3]} className="list-default-header">{"Insumo"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Unidad Medida"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header" style={{ textAlign: "right" }}>{"Precio"}</Column>
                <Column size={[12, 12, 2, 2]} className="list-default-header">{"Moneda"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-default-header">{"Creado"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-default-header">{"Modificado"}</Column>
                <Column size={[12, 12, 1, 1]} className="list-default-header">&nbsp;</Column>
            </Row>
        </div>

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus("Estatus")
                .addObject("Moneda")
                .addObject("Insumos", PAGE_INSUMOS_TABULADOR_ID)
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps, parameters?: any): void {
            let entidad: any = global.getData(props.entidad);
            let id: number = global.getDataID(props.entidad);

            if (id === undefined || id === -1) {
                global.dispatchSuccessful("global-page-data", [], PAGE_INSUMOS_TABULADOR_ID);
            } else {
                let isValid: boolean = SCCO.Filtros.isValid();
                if (isValid === true) {
                    let $filters: any = Forms.getValues("scco$filters");
                    let filters: any = global.assign(global.getFilters($filters), { IdTabulador: id });
                    props.config.dispatchCatalogoBase("base/scco/TabuladoresInsumos/Get/GetInsumos/", filters, PAGE_INSUMOS_TABULADOR_ID);
                } else {
                    global.dispatchSuccessful("global-page-data", [], PAGE_INSUMOS_TABULADOR_ID);
                };
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        onFilter(props: page.IProps, filters: any): void {
            props.config.dispatchCatalogoBase("base/scco/TabuladoresInsumos/Get/GetInsumos/", filters, PAGE_INSUMOS_TABULADOR_ID);
        };
        render(): JSX.Element {
            return <page.Edit>
                <Filtros.SCCOFilters onFilter={this.onFilter.bind(this)} />
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-columns"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 6, 6]} maxLength={50} />
                            <MonedasDDL id="Moneda" size={[12, 12, 3, 3]} validations={[validations.required()]} />
                            <checkBox.Status id="Estatus" size={[12, 12, 1, 1]} />
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_INSUMOS_TABULADOR_ID}
                                parent={config.id}
                                level={1}
                                icon="fa fa-cube"
                                style={{ paddingTop: 20 }}
                                size={[12, 12, 12, 12]}
                                inlineNew={true}
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
                                    let $filters: any = Forms.getValues("scco$filters");
                                    if ($filters) {
                                        form.addNumberConst("IdObra", $filters.IdObra);
                                        form.addNumberConst("IdTabulador", $filters.IdTabulador);
                                        form.addNumberConst("IdTipoPresupuesto", $filters.IdTipoPresupuesto);
                                    };
                                    //
                                    let retValue: any = form
                                        .addID()
                                        .addObject("Insumo")
                                        .addNumber("PrecioMoneda")
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
                                        <Column size={[12, 12, 3, 3]} className="listItem-default-item listItem-overflow">
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
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <input.Decimal property={PAGE_INSUMOS_TABULADOR_ID} index={index} value={item.PrecioMoneda} id="PrecioMoneda" idFormSection={config.id} />
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow" style={{ padding: 0 }}>
                                            <ddl.MonedasDDL property={PAGE_INSUMOS_TABULADOR_ID} index={index} value={item.Moneda} id="Moneda" idFormSection={config.id} />
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item listItem-overflow">
                                            {label.formatDate(item.Creado)}
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item listItem-overflow">
                                            {label.formatDate(item.Modificado)}
                                        </Column>
                                        <buttons.PopOver idParent={config.id} idForm={PAGE_INSUMOS_TABULADOR_ID} info={item} extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                                    </Row>
                                }}>
                                <Row>
                                    <ddl.SCCOInsumosDDL clasificacion="INSUMO" idFormSection={PAGE_INSUMOS_TABULADOR_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} />
                                    <ddl.MonedasDDL idFormSection={PAGE_INSUMOS_TABULADOR_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} />
                                    <input.Decimal id="PrecioMoneda" idFormSection={PAGE_INSUMOS_TABULADOR_ID} size={[12, 12, 4, 4]} maxLength={8} />
                                </Row>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };

    class View extends page.Base {
        onFilter(props: page.IProps, filters: any): void {
            props.config.dispatchCatalogoBase("base/scco/TabuladoresInsumos/Get/GetInsumos/", filters, PAGE_INSUMOS_TABULADOR_ID);
        };
        render(): JSX.Element {
            return <page.View>
                <Filtros.SCCOFilters onFilter={this.onFilter.bind(this)} />
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-columns"
                        collapsed={false}
                        hideCollapseButton={true}
                        level="main">
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 6, 6]} />
                            <label.Entidad id="Moneda" size={[12, 12, 3, 3]} />
                            <label.Estatus id="Estatus" size={[12, 12, 1, 1]} />
                        </Row>
                        <Row>
                            <page.SectionList
                                id={PAGE_INSUMOS_TABULADOR_ID}
                                parent={config.id}
                                level={1}
                                icon="fa fa-cube"
                                style={{ paddingTop: 20 }}
                                size={[12, 12, 12, 12]}
                                listHeader={listHeaderDetalle}
                                items={createSuccessfulStoreObject([])} readonly={false}
                                addRemoveButton={false}
                                formatter={(index: number, item: any) => {
                                    let clasificacion: any = item.Insumo && item.Insumo.Clasificacion ? item.Insumo.Clasificacion : {};
                                    let iconClass: any = clasificacion.Clave === "INSUMO" ? "fad fa-cube" : "fad fa-cubes";
                                    //
                                    return <Row>
                                        <Column size={[12, 12, 3, 3]} className="listItem-default-item listItem-overflow">
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
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item" style={{ textAlign: "right" }}>
                                            <span style={{ textAlign: "right" }}>{label.formatDecimal(item.PrecioMoneda, 8)}</span>
                                        </Column>
                                        <Column size={[12, 12, 2, 2]} className="listItem-default-item listItem-overflow" style={{ padding: 0 }}>
                                            <span><span className="badge badge-info">{!(item.Moneda) ? "" : item.Moneda.Clave}</span> {!(item.Moneda) ? "" : item.Moneda.Nombre}</span>
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item listItem-overflow">
                                            {label.formatDate(item.Creado)}
                                        </Column>
                                        <Column size={[12, 12, 1, 1]} className="listItem-default-item listItem-overflow">
                                            {label.formatDate(item.Modificado)}
                                        </Column>
                                        <Column size={[12, 12, 1, 1]}></Column>
                                    </Row>
                                }}>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        };
    };
};