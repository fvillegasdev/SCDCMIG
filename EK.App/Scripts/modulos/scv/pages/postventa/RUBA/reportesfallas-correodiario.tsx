namespace EK.Modules.SCV.Pages.postventa.RUBA.EnviarCorreoResumenDiario {
    const PAGE_ID: string = "EnviarCorreoDiario";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount() {
            //let fecha = new Date();
            //let HoraActual = fecha.getHours();
            //if (HoraActual >= 18 && HoraActual < 21) {
            //    console.log('Intentar enviar el correo')
            //    global.dispatchAsyncPost("global-page-entity", "scv/reportesFallas/enviarCorreoDiarioCAT/");
            //}
        }

        componentWillUnmount() {
            //global.dispatchSuccessful("global-page-data", [], REPORTE_PLAZAS_ID);
            //global.dispatchSuccessful("global-page-data", [], REPORTE_USUARIOS_ID);
            //global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            //global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);
            //dispatchDefault("load::" + REPORTE_PLAZA_SELECCIONADA, {});
        }

        onSave(props: page.IProps, item: global.EditForm): any {
            //let idPlazaSeleccionada: any = getData(EK.Store.getState().global[REPORTE_PLAZA_SELECCIONADA]).ID;
            //let idUsuarioSeleccionado: any = getData(EK.Store.getState().global[REPORTE_USUARIO_SELECCIONADO]).ID;

            //let cantidadAsignados: any[] = global.getData(Forms.getValue(REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID, config.id), []);

            //if (cantidadAsignados.length <= 0 || cantidadAsignados === undefined || cantidadAsignados === null) {
            //    warning("No Existen Fraccionamientos Asignados");
            //    return null;
            //}
            let model: any = item
            //    .addID()
            //    .addStringConst("IdPlaza", idPlazaSeleccionada)
            //    .addNumberConst("IdUsuario", idUsuarioSeleccionado)
            //    .addObject("Fraccionamiento", REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID)
            //    .addVersion()
            //    .toObject();

            return model;
        };

        onFilter(props: any, filters: any, type?: string): void { };
        onEntitySaved(props: page.IProps): void {
            //global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", REPORTE_PLAZAS_ID);
            // props.config.setState({ viewMode: false });
            let item = getData(EK.Store.getState().global.PersonalEntregaUbicaciones$plazaSeleccionada);
            let prevID: number = item && item.ID ? item.ID : null;
            if (prevID > 0) {
            } else {
                prevID = null
            }
            let p: any = global.assign({
                activos: 1,
                IdPlaza: prevID
            });
            //global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_ASIGNADOS_ID);
            //global.dispatchSuccessful("global-page-data", [], REPORTE_FRACCIONAMIENTOS_NO_ASIGNADOS_ID);
            //dispatchSuccessful("load::" + REPORTE_PLAZA_SELECCIONADA, item);
            //dispatchAsyncPost("global-page-data", "base/kontrol/PersonalEntregaUbicaciones/GetBP/getPersonalEntregaVivienda/", { parametros: p }, REPORTE_USUARIOS_ID);
            //delete EK.Store.getState().global.catalogoOriginalUPP;
            //delete EK.Store.getState().global.catalogoOriginalFA;
            //delete EK.Store.getState().global.catalogoOriginalFNA;
        };
        componentDidMount() {
            console.log('Cargado')
        }
        onEntityLoaded(props: page.IProps): void { };

        onWillEntityLoad(id: any, props: page.IProps): void {
            global.setCurrentEntity({});
            //global.dispatchAsync("global-page-data", "base/scv/Plaza/Get/GetSPVPlazas/", REPORTE_PLAZAS_ID);
            // props.config.setState({ viewMode: false });
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowDelete={false}
                allowEdit={true}
                onSave={this.onSave.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}
                onEntitySaved={this.onEntitySaved}
                onFilter={this.onFilter.bind(this)}>
               
            </page.Main>
        };
    });
}