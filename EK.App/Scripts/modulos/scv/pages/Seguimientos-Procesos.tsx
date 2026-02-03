// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";

    interface ISeguimientoProcesoProps extends IBaseSeguimiento {
        procesos: DataElement;
        form: any;
        proceso: any;
        activarEdicion?: false;
    }

    class cSeguimientoProcesos extends React.Component<ISeguimientoProcesoProps, {}> {
        constructor(props: ISeguimientoProcesoProps) {
            super(props);
            this.onClickCancel = this.onClickCancel.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onAllowStartButton = this.onAllowStartButton.bind(this);
        }

        static props: any = (state: any) => ({
            seguimiento: state.seguimientosReducer.selected,
            form: state.forms,
            etapa: state.seguimientosReducer.etapaSelected,
            proceso: state.seguimientosReducer.procesoSelected,
            procesos: state.seguimientosReducer.procesos
        });

        refs: {
            form: any;
        };

        onClickCancel(): void {
            dispatchSuccessful("scv-seguimientos-procesos-setSelected", {});
        }

        onSelect(item: any): void {
            let model = EK.Global.assign({}, {
                ID: item.ID,
                IdSeguimiento: item.IdSeguimiento,
                IdExpediente: item.IdExpediente,
                IdEtapa: item.IdEtapa,
                Proceso: item.Proceso,
                EstatusProceso: item.EstatusProceso,
                Estatus: item.Estatus,
                IdSeguimientoEtapa: item.IdSeguimientoEtapa,
            });

            dispatchAsyncPut("scv-seguimientos-procesos-setSelected", "SCV/Seguimientos/ExecuteProcess", model);
        }

        onAllowStartButton(item: any): boolean {
            let proceso: any = item.Proceso;
            let responsable: string = proceso.Responsable;
            let estatusProceso: string = item.EstatusProceso.Clave;
            let estatusEtapa: string = item.EstatusEtapa.Clave;

            // Validar si el proceso es de Usuario para ejecutarlo manualmente
            if (responsable.toLocaleLowerCase() === "sistema") {
                return false;
            }

            // Validar si el proceso no ha sido ejecutado
            if (estatusProceso.toLocaleLowerCase() === 'e') {
                return false;
            }

            // Validar si la etapa está en proceso de autorización o completada - 2018/03/25
            if (estatusEtapa.toLocaleLowerCase() === 'c' || estatusEtapa.toLocaleLowerCase() === 'd') {
                return false;
            }

            return true;
        }

        componentDidUpdate(prevProps: ISeguimientoProcesoProps, {}): any {
            let $page: any = $ml[PAGE_ID];
            if (isUpdating(prevProps.proceso) && isSuccessful(this.props.proceso)) {
                if (this.props.proceso.returnCode > 0) {

                } else {
                    let id: number = getDataID(this.props.seguimiento);
                    success($page.mensajes.proceso);
                    dispatchAsync("scv-seguimientos-procesos", "SCV/Seguimientos/SeguimientoProcesos/" + id + "/" + 0);
                }
            }
        };

        componentDidMount(): any {
            if (!isLoadingOrSuccessful(this.props.procesos)) {
                let id: number = getDataID(this.props.seguimiento);

                dispatchAsync("scv-seguimientos-procesos", "SCV/Seguimientos/SeguimientoProcesos/" + id + "/" + 0);
            }
        }

        componentWillMount(): any {
            Forms.remove(PAGE_ID);
            dispatchSuccessful("scv-seguimientos-procesos-setSelected", {});
        }

        shouldComponentUpdate(nextProps: ISeguimientoProcesoProps, {}): boolean {
            return (hasChanged(this.props.proceso, nextProps.proceso)) ||
                (hasChanged(this.props.procesos, nextProps.procesos));
        }

        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let items: DataElement;

            if (global.isSuccessful(this.props.procesos)) {
                items = this.props.procesos.getActiveItems();
            }

            let model: any = getData(this.props.proceso);
            let etapaSelect: any = getData(this.props.etapa);
            let existeEtapa: boolean = etapaSelect.ID ? true : false;
            let tituloEtapa: any = existeEtapa ? $page.form.section.etapas$Procesos.tituloindividual + "   (" + etapaSelect.Etapa.Nombre + ") " : $page.form.section.etapas$Procesos.titulototal;
            let info: DataElement = !isSuccessful(this.props.proceso) ? this.props.proceso : this.props.procesos;

            let icono_items: any = {};
            icono_items['E'] = "fa fa-check pull-left";
            icono_items['P'] = "fa fa-clock-o pull-left";
            icono_items['B'] = "";
            icono_items['F'] = "fa fa-exclamation-triangle pull-left";

            let icono_items_color: any = {};
            icono_items_color['E'] = "#4cd964";
            icono_items_color['P'] = "#ffd107";
            icono_items_color['B'] = "#67809f";
            icono_items_color['F'] = "#f22424";

            let run: any = {
                icon: "icon-arrow-right",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };

            return <page.OptionSection title={tituloEtapa}
                icon="fa fa-cogs" collapsed={false} level={1} readOnly={true}>
                <PanelUpdate info={info}>
                    <List
                        items={items}
                        readonly={true}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        listHeader={<div>
                            <Row className="list-fixed-header">
                                <Column size={[8, 8, 8, 8]} className="list-default-header">{$page.form.section.etapas$Procesos.list.nombre}</Column>
                                <Column size={[2, 2, 2, 2]} className="list-center-header">{$page.form.section.etapas$Procesos.list.fechaEjecucion}</Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header">{$page.form.section.etapas$Procesos.list.estatus}</Column>
                                <Column size={[1, 1, 1, 1]} className="list-center-header">&nbsp;</Column>
                            </Row>
                        </div>}
                        formatter={(index: number, item: any) => {
                            let tieneOpcion: boolean = false;
                            let estaEnProceso: boolean = false;

                            if (item) {
                                if (item.Proceso && item.Proceso.Opcion && item.Proceso.Opcion.Clave) {
                                    tieneOpcion = true;
                                }
                                if (item.EstatusProceso && item.EstatusProceso.Clave && item.EstatusProceso.Clave === "B") {
                                    estaEnProceso = true;
                                }
                            }
                            //                                         <div style={{ fontWeight: 600 }}><span className={icono_items[item.EstatusProceso.Clave]} style={{ fontSize: "11px", color: icono_items_color[item.EstatusProceso.Clave] }}></span>{item.Proceso.Nombre}</div>
                            return <Row >
                                <Column size={[8, 8, 8, 8]} className="listItem-default-header">
                                    {tieneOpcion === true && estaEnProceso === true ?
                                        <label.LinkList value={item.Proceso}
                                            link={global.getFullUrl(item.Proceso.Opcion.Ruta.replace(":id", item.IdExpediente)) + "?" + global.encodeParameters({ claveProceso: item.Proceso.Clave, claveEstatus : item.EstatusProceso.Clave })}
                                            size={[12, 5, 5, 5]} />
                                        :
                                        <label.EntidadList value={item.Proceso} size={[12, 5, 5, 5]} />
                                    }
                                </Column>
                                <Column size={[2, 2, 2, 2]} className="listItem-center-header"><div style={{ fontWeight: 400 }}>{EK.UX.Labels.formatDate(item.FechaEjecucion)}</div></Column>
                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    <div style={{ fontWeight: 400 }} >
                                        {item.EstatusProceso.Clave === "P" ?
                                            <span className="badge badge-default btn-editing" >
                                                <p style={{ fontSize: "11px", margin: "0px" }}>{item.EstatusProceso.Nombre}</p>
                                            </span> : item.EstatusProceso.Clave === "F" ?
                                                <span className="badge badge-danger btn-editing" >
                                                    <p style={{ fontSize: "11px", margin: "0px" }}>{item.EstatusProceso.Nombre}</p>
                                                </span> : item.EstatusProceso.Clave === "E" ?
                                                    <span className="badge badge-success" >
                                                        <p style={{ fontSize: "11px", margin: "0px" }}>{item.EstatusProceso.Nombre}</p>
                                                    </span> : item.EstatusProceso.Clave === "B" ?
                                                            <span className="badge badge-primary" >
                                                            <p style={{ fontSize: "11px", margin: "0px" }}>{item.EstatusProceso.Nombre}</p>
                                                        </span> : null
                                        }
                                    </div>
                                </Column>

                                <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                    {item.ReadOnlyKontrol === 0 ?
                                        <span className="icon-lock" style={{ fontSize: "18px", color: "#FF8F00 ", marginLeft: "-6px" }}></span>
                                        : null
                                    }
                                    {this.props.activarEdicion && existeEtapa && item.ReadOnlyKontrol === 1 && item.EstatusEtapa.Clave === 'A' ?
                                        this.onAllowStartButton(item)
                                            ? <buttons.PopOver info={item} extraData={[run]} />
                                            : <div className="hidden-xs" style={{ minHeight: "40px" }}>{""}</div>
                                        : null
                                    }
                                </Column>
                            </Row>;
                        } } />
                </PanelUpdate>
            </page.OptionSection>
        }
    }

    export let SeguimientoProcesos: any = ReactRedux.connect(cSeguimientoProcesos.props, null)(cSeguimientoProcesos);
}