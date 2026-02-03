// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.postventa.RUBA.Prereporte {
    "use strict";
    const PAGE_ID: string = "Prereportes";
    const PREREPORTE_PARTIDAS_ID: string = "prereporte$partidas";
    const PREREPORTE_CALIFICACION_ID: string = "prereporte$calificacion";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PREREPORTE_PARTIDAS_ID, PREREPORTE_CALIFICACION_ID]);

    const listHeaderFallas: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Incidencia"}</Column>
                <Column size={[2, 2, 2, 2]} className="list-default-header">{"Ubicación Incidencia"}</Column>
                <Column size={[5, 5, 5, 5]} className="list-default-header">{"Observaciones Cliente"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Foto"}</Column>
                <Column size={[1, 1, 1, 1]} className="list-center-header">{"Estatus"}</Column>
            </Row>
        </Column>

    export const Edicion: any = page.connect(class extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("EstatusReporte")
                .addVersion()
                .toObject();

            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let entidad: any = global.getData(props.entidad)
            let id: number = global.getDataID(props.entidad);
            if (id > 0) {
                global.dispatchSuccessful("global-page-data", entidad.Partidas, PREREPORTE_PARTIDAS_ID);
            };
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded.bind(this)} allowDelete={false} allowNew={false} allowEdit={false}>
                <PageButtons>
                    {/*<RechazarButton />*/}
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    });

    const View: any = page.connect(class extends page.Base {

        OpenPhotoViewer(img) {
            //console.log(img);
            dispatchSuccessful('load::TipoViewer', 'PREREPORTE')
            dispatchSuccessful('load::ImageValueURI', img)
            let modalCalen: any = $("#ModalPhotoViewer");
            modalCalen.modal();
        }

        onGetImagenes(itemImagenes: any): any {
            let retValue: any[] = [];
            let arrayImagenes: any[] = [];
            arrayImagenes = itemImagenes.split(",");
            if (arrayImagenes && arrayImagenes.length >= 0) {
                arrayImagenes.forEach((value: any, index: number) => {
                    retValue.push(<img key={"ImgReportFallasMovil_" + index.toString()} alt="" onClick={() => this.OpenPhotoViewer(value.trim())} src={"kontrolFiles/GetByStorageCustom/PostVentaImageReports/partidas/" + value.trim() + "/true"} style={{ width: "60px", height: "60px", marginTop: "2px", marginLeft: "2px", position: "relative",  display: "inline-flex" }} />);
                })
            }
            //console.log(retValue);
            return retValue;
        };
        render(): JSX.Element {
            let entidad: any = global.getData(this.props.entidad);
            let labelEstatus: any = (item: any) => {
                return !item ? "" : (!item.Clave ? "" : "<span class='badge' style='background-color: " + EstatusBGC[item.Clave] + "'>" + item.Clave + "</span> ") + (!item.Nombre ? "" : item.Nombre);
            };

            let w: any = window;
            let reporteWindowFn: string = "$reportesFallasOpcion";
            if (!w[reporteWindowFn]) {
                w[reporteWindowFn] = (obj: any, id: number) => {
                    global.go(["scv/pv/ReportesFallas/", id].join(""));
                };
            };

            let labelReporte: any = (id: any) => {
                return !id ? "" : "<a onClick=\"window." + reporteWindowFn + "(this, " + id + ");\"><span class=\"badge badge-success\"> " + id + " </span></a>";
            };

            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Pre-Reporte de Fallas</span>
                            <span className="badge badge-danger bold pull-right">{entidad.ID}</span>
                            <span className="pull-right bold">#Pre-Reporte:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Entidad id="Cliente" size={[12, 12, 6, 6]} />
                            <label.Label id="FechaCaptura" size={[12, 12, 2, 2]} />
                            <label.Label id="IdReporte" value={labelReporte} isHTML={true} size={[12, 12, 2, 2]} />
                            <label.Entidad id="EstatusReporte" value={labelEstatus} size={[12, 12, 2, 2]} />
                        </Row>
                        <Row style={{ marginTop: 12 }}>
                            <page.SectionList
                                id={PREREPORTE_PARTIDAS_ID}
                                parent={config.id}
                                icon="fas fa-cogs"
                                level={1}
                                listHeader={listHeaderFallas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={true}
                                drawOddLine={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    return <Row className="list-selectable-item">
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header" style={{ verticalAlign: "top" }}><span className="badge badge-info bold">{item.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item" style={{ verticalAlign: "top" }}>{!(item && item.UbicacionFalla) ? null : <span>< span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                        <Column size={[3,3,3,3]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>{item.Observaciones}</Column>
                                        <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow" style={{ verticalAlign: "top" }}>  <div> {this.onGetImagenes(item.Imagenes)}</div> </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header" style={{ verticalAlign: "top" }}>{label.ok(item.EstatusPartida === 1)}</Column>
                                    </Row>;
                                } }>
                            </page.SectionList>
                        </Row>
                        {entidad.Calificado > 0 ? <Row>
                            <Column size={[12, 12, 12, 12]}>
                                <page.OptionSection
                                    id={PREREPORTE_CALIFICACION_ID}
                                    parent={config.id}
                                    level={1}
                                    icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <CalificacionEstrellas size={[12, 12, 12, 12]} stars={entidad.Calificacion} />
                                        <label.Label id="CalificacionObservacion" size={[12, 12, 12, 12]} />
                                    </Row>
                                </page.OptionSection>
                            </Column>
                        </Row> : null}
                    </page.OptionSection>
                </Column>
                <ModalPhotoViewer size={[12, 12, 12, 12]} />
            </page.View>

        };
    });

    const Edit: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let labelReporte: any = (value: any) => {
                return !value ? "" : "<span class='badge badge-success'> " + value + " </span>";
            };

            let entidad: any = global.getData(this.props.entidad);
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={config.id}
                        subTitle={<span>
                            <span>Pre-Reporte de Fallas</span>
                            <span className="badge badge-danger bold pull-right">{entidad.ID}</span>
                            <span className="pull-right bold">#Pre-Reporte:&nbsp;</span>
                        </span>}
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Entidad id="Cliente" size={[12, 12, 6, 6]} />
                            <label.FechaHora id="FechaCaptura" size={[12, 12, 2, 2]} />
                            <label.Label id="IdReporte" value={labelReporte} isHTML={true} size={[12, 12, 2, 2]} />
                            <EstatusPreReporteDDL id="EstatusReporte" required={true} validations={[validations.required()]} size={[12, 12, 2, 2]} />
                        </Row>
                        <Row style={{ marginTop: 12 }}>
                            <page.SectionList
                                id={PREREPORTE_PARTIDAS_ID}
                                parent={config.id}
                                icon="fas fa-cogs"
                                level={1}
                                listHeader={listHeaderFallas}
                                size={[12, 12, 12, 12]}
                                readonly={true}
                                horizontalScrolling={true}
                                selectable={true}
                                drawOddLine={true}
                                items={createSuccessfulStoreObject([])}
                                formatter={(index: number, item: any) => {
                                    return <Row className="list-selectable-item">
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header"><span className="badge badge-info bold">{item.Partida}</span></Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-default-item">{!(item && item.UbicacionFalla) ? null : <span>< span className="badge badge-success" style={{ marginRight: 5 }}>{item.UbicacionFalla.IdUbicacionFalla}</span>{item.UbicacionFalla.Descripcion}</span>}</Column>
                                        <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow">{item.Observaciones}</Column>
                                        <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow"></Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">{label.ok(item.EstatusPartida === 1)}</Column>
                                    </Row>;
                                } }>
                            </page.SectionList>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    });

    class CalificacionEstrellas extends React.Component<any, any>{
        render(): JSX.Element {
            let stars: number = this.props.stars ? this.props.stars : 0;
            let starsIcons: any[] = [];
            for (var i = 0; i < stars; i++) {
                starsIcons.push(<span key={"fas_star_" + i} style={{ color: "rgb(241, 196, 15)" }}><span className="fas fa-star"></span></span>);
            };
            for (var i = starsIcons.length; i < 5; i++) {
                starsIcons.push(<span key={"fas_star_" + i}><span className="far fa-star"></span></span>);
            };
            return <Column size={this.props.size} style={{ textAlign: "center", padding: 5 }}>
                <span style={{ fontSize: 14 }}>{starsIcons}</span>
            </Column>
        };
    };

    interface IRechazarButtonProps extends IButtonProps, page.IProps { };
    const RechazarButton: any = global.connect(class extends React.Component<IRechazarButtonProps, any>{
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        static defaultProps: IRechazarButtonProps = {
            icon: "far fa-times-circle",
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
            EK.Global.confirm("Presione Confirmar para Rechazar el Prereporte de Fallas", "Rechazar Prereporte de Fallas", (isConfirm) => {
                if (isConfirm === true) {
                    let model: any = global.getData(this.props.entidad);
                    global.dispatchAsyncPut("global-current-entity", "base/scv/Prereportes/Get/Reject", model);
                };
            });
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.entidad)) {
                let entidad: any = global.getData(this.props.entidad);
                if (entidad) {
                    if (entidad.EstatusReporteId === 1) {
                        return <Button {...this.props} keyBtn={"btnSPVRechazarPrereporteFallas"} onClick={this.onClick.bind(this)} />
                    };
                };
            };

            return null;
        };
    });

    class EstatusPreReporte$DDL extends React.Component<ddl.IDropDrownListProps, ddl.IDropDrownListProps> {
        static props: any = (state: any) => ({
            items: state.global.SPVESTATUSPREREPORTE
        });
        static defaultProps: IDropDrownListProps = {
            id: "EstatusReporte",
            label: "Estatus",
            helpLabel: "Seleccione el estatus del Pre-Reporte",
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
                dispatchAsync("load::SPVESTATUSPREREPORTE", "catalogos/get(SPVESTATUSPREREPORTE)");
            };
        };
        render(): JSX.Element {
            return <ddl.DropdownList$Form {...this.props} />;
        };
    };

    export const EstatusPreReporteDDL: any = ReactRedux.connect(EstatusPreReporte$DDL.props, null)(EstatusPreReporte$DDL);
};