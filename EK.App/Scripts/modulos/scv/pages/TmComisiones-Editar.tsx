namespace EK.Modules.SCV.Pages.TmComisiones {
    "use strict";

    const scv_Comision_Compania: string = "ComisionCCompania";
    const config: page.IPageConfig = global.createPageConfig("TMComisiones", "scv", [scv_Comision_Compania]);
    let PAGE_ID = "Tipos de Comisiones";
    
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addString("Descripcion")
                .addObject("TipoMovimiento_OC")
                .addObject("TipoMovimiento_Cancelacion")
                .addObject("Insumo")
                .addObject("TipoComision")
                .addObject(scv_Comision_Compania)
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let entity: any = getData(props.entidad);
            let idComision = getDataID(props.entidad);
            let parametros: any = global.assign({ idComision: idComision });
            if (idComision <= 0 || idComision === undefined) {
                global.dispatchSuccessful("global-page-data", [], scv_Comision_Compania);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/TmComisiones/Get/GetAllComisionCompania/", parametros, scv_Comision_Compania);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;

        };
    };
    interface IViewProps extends React.Props<any> {
        item: any;
    };

    interface ITmComsionesView extends page.IProps {
        bloqueado?: any;
        complementaria?: any;
        usarObligatorio?: any;
        checkedComplementaria?: boolean;
        TipoMovimiento?: boolean;
        cancelarTC?: any;
    };
    class ComportamientoCheck extends React.Component<ITmComsionesView, ITmComsionesView> {
        constructor(props: ITmComsionesView) {
            super(props);
        }

        render() {
            let entidad: number = getDataID(this.props.entidad);


            let retValue: any = null;
            if (entidad == 0) {
                retValue = <div>
                    <TipoComisionDDL id={"TipoComision"} size={[12, 12, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />
                </div>
            }
            return retValue;
        }
    }

    let Edit: any = global.connect(class extends React.Component<ITmComsionesView, ITmComsionesView> {
        constructor(props: ITmComsionesView) {
            super(props);
            this.onChangeCancela = this.onChangeCancela.bind(this);
        }
        static props: any = (state: any) => ({
            TipoMovimiento: Forms.getValue("TipoMovimiento_OC", config.id, state),
            complementaria: state.global.ComplementariaChecked,
        });

        componentWillReceiveProps(nextProps: ITmComsionesView) {
            let selectDrop: any = Forms.getValue("TipoMovimiento_OC", config.id);
        }


        onChangeCancela(e: any): any {

            if (e === true) {
                dispatchSuccessful("load::CancelarTCCompania", { valor: e });

            } else {
                dispatchSuccessful("load::CancelarTCCompania", { valor: e });
            }
        }
        render(): JSX.Element {


            let Obligatorio: any = Forms.getValue("Numeracion", config.id);

            let tipoMovimiento: any = this.props.TipoMovimiento;
            let mostrarComisionComplementaria: boolean = tipoMovimiento && tipoMovimiento.ID > 1 && tipoMovimiento.Naturaleza.Clave == 'CAR' ? true : false;

            let retValue: any = null;
            let entidad: number = getDataID(this.props.entidad);
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-puzzle-piece" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={50} />
                            <checkBox.Status size={[12, 2, 2, 2]} />

                            <Input id={"Descripcion"} size={[12, 6, 6, 6]} maxLength={150} />
                            <ddl.TiposMovimientosDDL id={"TipoMovimiento_OC"} size={[12, 3, 3, 3]} validations={[validations.required()]} />
                            <TiposMovimientosCancelacionDDL id={"TipoMovimiento_Cancelacion"} size={[12, 3, 3, 3]} validations={[validations.required()]} />

                            <ddl.SCCOInsumosDDL id={"Insumo"} size={[12, 5, 4, 4]} addNewItem={"SO"} validations={[validations.required()]} />

                            {(mostrarComisionComplementaria) ?
                                <div>
                                    <ddl.TipoComisionDDL id={"TipoComision"} size={[12, 5, 5, 5]} addNewItem={"SO"} addNewItemText={"Sin opcion Comisión"} />
                                </div>
                                :
                                <Row>
                                </Row>
                            }
                            

                            <Companias />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;

        };
    });
    interface IDNaturalezaChildsProps extends IDropDrownListProps {
        naturaleza?: any;
        cargaDatos?: (idNaturaleza?: any) => void;
    }

    let TiposMovimientosCancelacion$DDL: any = global.connect(class extends React.Component<IDNaturalezaChildsProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.TiposMovimientosCancelacion
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>): any => ({
            cargaDatos: (idNaturaleza?: any): void => {
                let url: string = global.encodeAllURL("scv", "TipoMovimiento", { idNaturaleza: idNaturaleza, activos: 1,Cancelar:1 });
                dispatchAsync("load::TiposMovimientosCancelacion", url);
            }
        });
        static defaultProps: IDNaturalezaChildsProps = {
            id: "TipoMovimiento_Cancelacion",
            items: createDefaultStoreObject([]),
            helpLabel: "Seleccione el Movimiento de Cancelacion",
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
                            item.obj.Nombre, " ",
                            "</span> ", " ",
                            " <span class='badge badge-info'>",
                            item.obj.Naturaleza.Clave,
                            "</span>"].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                } else {
                    return $([
                        "<span style='font-size: 90%'>",
                        item.Nombre, " ",
                        " </span>",
                        " <span class='badge badge-info'>",
                        item.Naturaleza.Clave,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                };
                return $([
                    "<span>",
                    item.Nombre, " ",
                    "</span> ",
                    " <span class='badge badge-info'>",
                    item.Naturaleza.Clave,
                    "</span> "].join(""));
            }
        };
        componentWillReceiveProps(nextProps: IDNaturalezaChildsProps): void {
            if (hasChanged(this.props.naturaleza, nextProps.naturaleza)) {
                let id: any = getDataID(nextProps.naturaleza);
                this.props.cargaDatos(id);
            }
        }
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "TipoMovimiento", { activos: 1, Cancelar: 1 });
                dispatchAsync("load::TiposMovimientosCancelacion", url);
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    export const TiposMovimientosCancelacionDDL: any =
        ReactRedux.connect(TiposMovimientosCancelacion$DDL.props, null)(TiposMovimientosCancelacion$DDL);
    let View: any = global.connect(class extends React.Component<ITmComsionesView, ITmComsionesView> {

        static props: any = (state: any) => ({
            naturaleza: state.global.NaturalezaSelected,
            cancelarTC: state.global.CancelarTCCompania

        });
        render(): JSX.Element {
            let selectCheck: any = Forms.getValue("Complementaria", config.id);
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fas fa-puzzle-piece" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <label.Clave size={[12, 12, 2, 2]} />
                                <label.Nombre size={[12, 12, 8, 8]} />
                                <label.Estatus size={[12, 12, 2, 2]} />
                                <label.Descripcion size={[12, 6, 6, 6]} />
                                <label.Entidad id="TipoMovimiento_OC" size={[12, 3, 3, 3]} />
                                <label.Entidad id="TipoMovimiento_Cancelacion" size={[12, 3, 3, 3]} />
                                <label.Entidad id="Insumo" size={[12, 3, 3, 3]} />
                                <label.Entidad id="TipoComision" size={[12, 12, 4, 4]} />
                            </Column>

                            <Companias/>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });



    export let Companias: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;

            return <page.SectionList
                id={scv_Comision_Compania}
                title={"Listado de Compañia"}
                parent={config.id}
                level={1}
                icon="fa fa-table"
                style={{ paddingTop: 20 }}
                size={[12, 6, 6, 6]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[9, 9, 9, 9]} className="list-default-header">{"Compañía"}</Column>
                            <Column size={[2, 2, 2, 2]} className="list-default-header">{"Principal"}</Column>
                            <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                        </Row>
                    </div>}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addObject("Compania")
                        .addBoolean("Numeracion")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;
                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {

                            if (value.Compania.ID === retValue.Compania.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };

                            if (value.Numeracion == true && retValue.Numeracion == true) {
                                value.Numeracion = false;
                                value._modificado = true;
                            };
                        });
                    }

                    return retValue;
                }}
                readonly={false}
                addRemoveButton={false}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[9, 9, 9, 9]} className="listItem-default-item">
                            <span className="badge badge-success" style={{ marginRight: 10 }}>{item.Compania.Clave} </span>
                            <span>{item.Compania.Nombre}</span>
                        </Column>
                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">
                            <span>{EK.UX.Labels.bool(item.Numeracion)}</span>
                        </Column>

                        {(estadoEntidad) ? null :
                            <buttons.PopOver idParent={config.id} idForm={scv_Comision_Compania} info={item}
                                extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }

                    </Row>;
                }}>
                <Row>
                    <ddl.CompaniaDDL id={"Compania"} idFormSection={scv_Comision_Compania} size={[12, 9, 9, 9]} />
                    <checkBox.CheckBox id="Numeracion" label="Principal" idFormSection={scv_Comision_Compania} size={[12, 3, 3, 3]} />
                </Row>
            </page.SectionList>
        };
    })

};
