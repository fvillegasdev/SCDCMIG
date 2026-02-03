namespace EK.Modules.Kontrol.Pages.FlujoTrabajoInstancia {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("flujoTrabajoInstancia", "kontrol");

   let onPageFilter: (props: page.IProps, filters: any, type: string) => any = (props: page.IProps, filters: any, type: string): any => {
        config.dispatchCatalogoBase("workflowManager/instances/all/", filters);
    };
    interface IFlujoTrabajoInstancia extends page.IProps {
        id?: any;
    };
    export let Vista: any = global.connect(class extends React.Component<IFlujoTrabajoInstancia, IFlujoTrabajoInstancia> {
        constructor(props: IFlujoTrabajoInstancia) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any {
            let propiedades: any = global.assign(props, { onFilter: onPageFilter });
            page.applyFilter(propiedades, null);
        };
        componentDidMount(): void {
            //Inicializando el valor del estatus en la seccion de filtros
            Forms.updateFormElement(config.id + "$filters", "Tipo", { ID: -1, Nombre: 'Seleccione una opción', Clave: "Seleccione una opción" });
            let p: any = global.encodeParameters({ clave: 'EP', clavecatalogo: 'FLUJOESTATUS' });
            global.asyncGet("base/kontrol/CatalogosGeneralesValores/Get/GetAll/" + p, (status: AsyncActionTypeEnum, data: any) => {
                if (status === AsyncActionTypeEnum.successful) {
                    Forms.updateFormElement(config.id + "$filters", "Estatus", { ID: data[0].ID, Nombre: 'En Progreso', Clave: "EP" });
                    let propiedades: any = global.assign(this.props, { onFilter: onPageFilter });
                    page.applyFilter(propiedades, null);
                }
            });

        }
        render(): JSX.Element {
            let formatNombreUserOwner: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return row.UserOwner.Nombre + " " + row.UserOwner.Apellidos;
            };
            let formatTipoFlujo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "("+row.Workflow.Tipo.Clave + ") " + row.Workflow.Tipo.Nombre;
            };
            let formatFlujo: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "(" + row.Workflow.Clave + ") " + row.Workflow.Nombre;
            };
            let formatConfigAprobar: (data: any, type: any, row: any) => string = (data: any, type: any, row: any[]) => {
                let w: any = window;
                let aprobacionWindowFn: string = "$aprobacionModal";
                let detalleWindowFn: string = "$detalleAutorizacionModal";

                //
                if (!w[aprobacionWindowFn]) {
                    w[aprobacionWindowFn] = (obj: any, id: number) => {
                        global.goModal("modalAprobacion", "#/kontrol/autorizaciones/" + id);
                    };
                };
                if (!w[detalleWindowFn]) {
                    w[detalleWindowFn] = (obj: any, id: number) => {
                        global.goModal("modalDetalleFlujo", "#/kontrol/workflows/procesos/" + id);
                    };
                };

                return "<div style='text-align:center'>" +
                  //  "<a class='btn btn-circle green btn-xs' data-id=\"data\" onClick=\"window." + aprobacionWindowFn + "(this, " + data + ");\" title='Aprobar'><i class='fa fa-check'></i></a>" +
                    "<a class='btn btn-circle grey-salsa btn-xs' style='padding-left:9%;padding-right:9%;' data-id=\"data\" onClick=\"window." + detalleWindowFn + "(this, " + data + ");\" title='Detalle'><i class='fa fa-info'></i></a>" +
                    "</div>";
            };

            let estiloPersonalizado: React.CSSProperties = {
                opacity: 1.0,
                pointerEvents: "auto",
                paddingRight: "5px",
                paddingLeft: "5px"
            };

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 10 })
                .add({ data: "IdReferencia", width: 5 })
                .add({ data: "Workflow.Tipo.Nombre", width: 25, render: formatTipoFlujo })
                .add({ data: "Nombre", width: 20, render: formatFlujo })
                .add({ data: "UserOwner.Nombre", width: 15, render: formatNombreUserOwner })
                .add({ data: "Estatus", width: 15, render: label.formatBadgeFlujo })
                .add({ data: "ID", title: "", width: 10, render: formatConfigAprobar })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} readOnly={true} onFilter={this.onFilter}>
                <page.Filters>
                    <ddl.TipoFlujoTrabajoDDL id="Tipo" size={[12, 4, 4, 4]} addNewItem={"SO"}/>
                    <PropietariosFlujoTrabajoDDL size={[12, 4, 4, 4]}/>
                    <ddl.EstatusFlujoAutorizacionDDL size={[12, 4, 4, 4]} addNewItem={"SO"}/>
                </page.Filters>
                <Column size={[12, 12, 2, 2]} style={{ paddingRight: "5px", paddingLeft: "5px" }} >
                    <div className="portlet light   portlet-fit  bordered  ek-sombra " >
                        <div className="portlet-body">
                            <Row >
                                <Column size={[12, 12, 12, 12]} className="panel panel-main panel-sub10" >
                                    <div>
                                        <EstatusFlujoTrabajo/>
                                    </div>
                                </Column>
                            </Row>
                        </div>
                    </div>
                </Column>
                <Column size={[12, 10, 10, 10]}>
                    <dt.PageTable columns={columns} />
                    <modal.Modal id="modalAprobacion" url={"about:blank"}></modal.Modal>
                    <modal.Modal id="modalDetalleFlujo" url={"about:blank"}></modal.Modal>
                </Column>
            </page.Main>;
        };
    });

    export class VistaMe extends page.Base {
        onFilter(props: page.IProps, filters: any, type: string): any {
            //let f: any = global.assign(filters, { idTipo: getDataID(props.entidad) });            
            config.dispatchCatalogoBase("workflowManager/instances/user/", filters, type);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 10 })
                .add({ data: "IdReferencia", width: 10 })
                .add({ data: "Workflow.Tipo.Nombre", width: 20 })
                .addNombre({ width: 20 })
                .add({ data: "EstadoWF", width: 7 })
                .add({ data: "UserOwner.Nombre", width: 20 })
                .add({ data: "Estatus", width: 13, render: label.formatBadgeFlujo })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} readOnly={true} onFilter={this.onFilter}>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };


    let PropietariosFlujoTrabajoDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.PropietariosFlujo
        });
        static defaultProps: IDropDrownListProps = {
            id: "UserOwner",
            items: createDefaultStoreObject([]),
            label: "Propietario del flujo",
            helpLabel: "Propietario del flujo",
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
                    return $(item.text);
                }
                else {
                    return $([
                        "<span  style='font-size: 90%'> ",
                        item.Nombre+" "+item.Apellidos,
                        "</span> "
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item) return "";

                if (!item.id || item.id === "" || isNaN(item.id) || !item.Nombre) {
                    return $([
                        "<span  style='font-size: 90%'> ",
                        item.text,
                        "</span> "
                    ].join(""));
                };
                return $([
                    "<span style='font-size: 90%'> ",
                    item.Nombre + " " + item.Apellidos,
                    "</span> "
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let encodedFilters: string = global.encodeObject({ usuariosPropietarios: true, Usuario: global.getCurrentUser() });
                dispatchAsync("load::PropietariosFlujo", "base/kontrol/FlujoTrabajoInstancia/Get/getUsuariosPropietarios/" + encodedFilters);
            };
        };
        render(): any {
            let itemsModificados: DataElement = this.props.items;
            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = 0;
                nuevoItem['Nombre'] = 'Seleccione un propietario';
                nuevoItem['Apellidos'] = '';
                nuevoItem['Clave'] = '';
                if (itemsModificados.data.length != 0) {
                    if (itemsModificados.data[0].ID != 0) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }
    });

    interface IEstatusFlujoTrabajoInstancia extends React.Props<any> {
        elementos?: any;
        estatusSeleccionado?: any;
        onclick?: () => void;
    };
    let EstatusFlujoTrabajo: any = global.connect(class extends React.Component<IEstatusFlujoTrabajoInstancia, {}>{
        constructor(props: IEstatusFlujoTrabajoInstancia) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.elementos = state.global.EstatusFlujoAutorizacionC;
            retValue.estatusSeleccionado = Forms.getValue("Estatus", "flujoTrabajoInstancia$filters", state);
            return retValue;
        };
        onClick(valor: any): void {
            Forms.updateFormElement("flujoTrabajoInstancia$filters", "Estatus", { ID: valor.ID, Nombre: valor.Nombre, Clave: valor.Clave });
            let propiedades: any = global.assign(this.props, { onFilter: onPageFilter });
            page.applyFilter(propiedades, null);
        };
        componentDidMount(): void {
            let encodedFilters: string = global.encodeObject({ EstatusConteo: true, Usuario: global.getCurrentUser() });
            dispatchAsync("load::EstatusFlujoAutorizacionC", "base/kontrol/flujoTrabajoInstancia/Get/GetAll/" + encodedFilters);
        }
        shouldComponentUpdate(nextProps: IEstatusFlujoTrabajoInstancia, nextState: IEstatusFlujoTrabajoInstancia): boolean {
            return hasChanged(this.props.elementos, nextProps.elementos) ||
                hasChanged(this.props.estatusSeleccionado, nextProps.estatusSeleccionado);
        };
        render(): JSX.Element {
            let iconos: any[] = [];
            iconos['AP'] = "fa fa-check";
            iconos['EP'] = "glyphicon glyphicon-play";
            iconos['RE'] = "fa fa-times-circle";
            iconos['SI'] = "fas fa-exclamation-triangle";
            iconos['SU'] = "glyphicon glyphicon-pause";
            iconos['CA'] = "fa fa-times-circle";
            iconos['CA'] = "fa fa-times-circle";
            iconos['TODOS'] = "fas fa-bars ";


            let iconosColor: any[] = [];
            iconosColor['TODOS'] = "";
            iconosColor['AP'] = "rgb(139, 199, 128)";
            iconosColor['EP'] = "rgb(139, 199, 128)";
            iconosColor['RE'] = "#df0707";
            iconosColor['SI'] = "#ff8f00";
            iconosColor['SU'] = "#337ab7";
            iconosColor['CA'] = "#df0707";

            let itemsModificados: DataElement = this.props.elementos;
            let totalElementos: number = 0;
            if (itemsModificados && itemsModificados.data.length) {

                if (itemsModificados.data.length > 0) {
                    if (itemsModificados.data[0].Clave != 'TODOS') {

                        itemsModificados.data.forEach((value: any, index: number): any => {
                            let cantidad: number = parseInt(value.Referencia);
                            totalElementos = totalElementos + cantidad;
                        });
                        let nuevoItem: any = {};
                        nuevoItem['ID'] = null;
                        nuevoItem['Clave'] = 'TODOS';
                        nuevoItem['Nombre'] = 'TODAS';
                        nuevoItem['Referencia'] = totalElementos;
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }

            }

            let items: any = getData(itemsModificados);
            let estatusSeleccionado: string = this.props.estatusSeleccionado && this.props.estatusSeleccionado.Clave ? this.props.estatusSeleccionado.Clave : null;


            let fnCreateList: (items: any[]) => any = (items: any[]): any => {
                let retValue: any = (itemsModificados && itemsModificados.data.length && itemsModificados.data.length > 0) ?
                    items.map((item: any, i: number): any => {
                        let estatusSeleccion: string = item.Clave == estatusSeleccionado ? " indicar_seleccion" : "";
                        let clases: string = "dd-item dd3-item  dd3-content-ek" + estatusSeleccion;
                        return <li key={item.Clave} className={clases} onClick={(e) => this.onClick(item)} data-id="210" style={{ cursor: "pointer" }}>
                            <span className="badge badge-success pull-right ek-sombra" style={{ marginTop: "7px" }}>{item.Referencia}</span>
                            <a className="btn" >
                                <i className={iconos[item.Clave]} style={{ color: iconosColor[item.Clave] }}></i>{item.Nombre}</a>
                        </li>
                    })
                    : null
                return retValue;
            };
            items = fnCreateList(items);

            return <div>
                {itemsModificados && itemsModificados.data.length && itemsModificados.data.length > 0 ?
                    <ol className="dd-list " >
                        {items}
                    </ol>
                    :
                    <AwesomeSpinner paddingTop={50} size={40} icon={"fa fa-refresh"} colorClass={"font-blue"} />
                }

            </div>
        }
    });
};


