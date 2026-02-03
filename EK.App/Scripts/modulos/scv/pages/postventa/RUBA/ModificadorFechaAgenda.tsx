namespace EK.Modules.SCV.Pages.postventa.RUBA.ModificadorFechaAgenda {
    "use strict";
    const PAGE_ID: string = "ModificadorFechaAgenda";
    const PAGE_CLIENTE_INFO_AGENDA: string = PAGE_ID + "$clienteInfoAgenda";
    const PAGE_CLIENTE_HISTORIAL: string = PAGE_ID + "$HistorialAgenda";

    //const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_UBICACION_ID, PAGE_REPORTE_ID, PAGE_REPORTE_PARTIDAS_ID, PAGE_REPORTE_ORDEN_TRABAJO_ID, UBICACION_DETALLE_ID, CLIENTE_ETAPA_ID, REPORTES_UBICACION, SEGUIMIENTO_EXPEDIENTE, UBICACION_EQUIPAMIENTO, PAGE_BITACORA_CLIENTE_ID, PAGE_CLIENTE_INFO_ID, PAGE_CLIENTE_INFO_AGENDA]);
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_CLIENTE_INFO_AGENDA, PAGE_CLIENTE_HISTORIAL]);

    export const Edicion: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setEntity({});
            global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_AGENDA);
            global.dispatchSuccessful("global-page-data", [], PAGE_CLIENTE_HISTORIAL);
            Forms.updateFormElement(PAGE_CLIENTE_INFO_AGENDA, 'ObservacionesModificacion', null);

            props.config.setState({ viewMode: false });
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onEntitySaved(props: page.IProps): void {
            global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_AGENDA);
            global.dispatchSuccessful("global-page-data", [], PAGE_CLIENTE_HISTORIAL);
            Forms.updateFormElement(PAGE_CLIENTE_INFO_AGENDA, 'ObservacionesModificacion', null);
            props.config.setState({ viewMode: false });
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowSave={false}
                allowDelete={false}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <PageButtons>
                    <FormalizacionVentaButton />
                    <EquipamientoViviendaButton />
                </PageButtons>
                <Edit />
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
        clienteRef?: DataElement;
        clienteInfo?: DataElement;
        clienteInfoAgenda?: DataElement;
        ubicacion?: DataElement;
        reporte?: DataElement;
        reportesPartidas?: global.DataElement;
        partidas?: DataElement;
        historialAgenda?: DataElement;
        ordenesTrabajo?: DataElement;
        obtenerUbicacion?: (idUbicacion: number) => void;
        obtenerReporte?: (id: number) => void;
        obtenerEtapa?: (id: number) => void;
        obtenerExpediente?: (idCliente: number) => void;
        obtenerBitacora?: (idCliente: number) => void;
        obtenerCliente?: (id: number) => void;
        clienteEtapa?: global.DataElement;
        ubicacionDetalle?: global.DataElement;
        reportesUbicacion?: global.DataElement;
        expedientes?: global.DataElement;
        equipamiento?: global.DataElement;
        bitacora?: global.DataElement;
    };

    const Edit: any = global.connect(class extends React.Component<IEditProps, IEditProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state); 
            retValue.historialAgenda = state.global["catalogo$" + PAGE_CLIENTE_HISTORIAL];
            retValue.clienteInfoAgenda = state.global["entity$" + PAGE_CLIENTE_INFO_AGENDA];
            return retValue;
        };
       
        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.clienteRef, nextProps.clienteRef) && getDataID(this.props.clienteRef) !== getDataID(nextProps.clienteRef)) {
                let loader = document.getElementById('loadinggrid');
                let loadedTable = document.getElementById('historialgrid');
                if (isSuccessful(nextProps.clienteRef)) {
                    let item: any = global.getData(nextProps.clienteRef);
                    let idCliente: any = global.getDataID(nextProps.clienteRef) && global.getDataID(nextProps.clienteRef) != undefined && global.getDataID(nextProps.clienteRef) != null ? global.getDataID(nextProps.clienteRef) : 0;
                    let cliente: any = global.getData(nextProps.clienteRef);
                    let idUbicacion: any = cliente.IdUbicacion != null && cliente.IdUbicacion != undefined ? cliente.IdUbicacion : 0;
                    if (idCliente > 0) {
                        let fechaIncial: any = new Date('1990-01-01');
                        let fechaFinal: any = new Date();
                        let p: any = global.assign({
                            Plaza: -2,
                            Fraccionamiento: -2,
                            Vocaciones: -2,
                            FechaInicial: fechaIncial,
                            FechaFinal: fechaFinal,
                            Opcionales: "Bitacora",
                            Cliente: idCliente
                        });
                        global.dispatchAsyncPost("global-page-entity", "base/kontrol/agendaSPV/GetBP/getFechaAgendaCliente/", { parametros: p }, PAGE_CLIENTE_INFO_AGENDA);
                        //global.dispatchAsyncPost("global-page-data", "base/kontrol/agendaSPV/GetBP/getHistorialModificacionAgenda/", { parametros: p }, PAGE_CLIENTE_HISTORIAL);
                        let columnas = [
                            { caption: "ID", dataField: "ID", alignment: "center" },
                            { caption: "Id Agenda", dataField: "IdAgenda", alignment: "center" },
                            { caption: "Tipo Agenda", dataField: "TipoAgenda", alignment: "center" },
                            { caption: "Plaza", dataField: "NombrePlaza", alignment: "center" },
                            { caption: "Fecha Original", dataField: "FechaOriginal", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm', alignment: "center"},
                            { caption: "Fecha Modificada", dataField: "FechaModificada", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm', alignment: "center" },
                            { caption: "Usuario Modifico", dataField: "UsuarioModifico", alignment: "center"},
                            { caption: "Fecha modifico", dataField: "FechaModifico", dataType: 'datetime', format: 'dd/MM/yyyy HH:mm', alignment: "center" },
                            { caption: "Motivo modificacion", dataField: "MotivoModificacion" },
                        ];
                        try {
                            $("#datagroupContainer").dxDataGrid("dispose");
                        } catch (ex) { }
                        global.asyncPost("base/kontrol/agendaSPV/GetBP/getHistorialModificacionAgenda/", { parametros: p }, (status: AsyncActionTypeEnum, data: any) => {
                            switch (status) {
                                case AsyncActionTypeEnum.successful:
                                    console.log(data)
                                    //dispatchSuccessful("global-page-data", data, PAGE_CLIENTE_HISTORIAL)
                                    let dataGrid = $("#datagroupContainer").dxDataGrid({
                                        dataSource: data,
                                        allowColumnReordering: true,
                                        scrolling: {
                                            columnRenderingMode: "standard"
                                        },
                                        columnAutoWidth: true,
                                        showBorders: false,
                                        grouping: {
                                            autoExpandAll: false,
                                        },

                                        columns: columnas,
                                        columnFixing: { enabled: true },
                                        showColumnLines: false,
                                        showRowLines: false,
                                        rowAlternationEnabled: true
                                    }).dxDataGrid("instance");
                                    dataGrid.refresh();
                                    loader.style.display = 'none';
                                    loadedTable.style.display = 'inherit';
                                    break;
                                case AsyncActionTypeEnum.loading:
                                    loader.style.display = 'inherit';
                                    loadedTable.style.display = 'none';
                                    break;
                                case AsyncActionTypeEnum.failed:
                                    loader.style.display = 'none';
                                    loadedTable.style.display = 'inherit';
                                    break;
                            }
                        });
                        //global.dispatchAsync("global-page-data", "base/scv/ReportesFallas/all/" + global.encodeObject({ idCliente: idCliente }), REPORTES_UBICACION);
                    } else {
                       
                        global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_AGENDA);
                      
                        global.dispatchSuccessful("global-page-data", [], PAGE_CLIENTE_HISTORIAL);
                        Forms.updateFormElement(PAGE_CLIENTE_INFO_AGENDA, 'ObservacionesModificacion', null);
                    }
                };
                if (nextProps.clienteRef.data === undefined) {
                    global.dispatchSuccessful("global-page-data", [], PAGE_CLIENTE_HISTORIAL);
                    global.dispatchSuccessful("global-page-entity", {}, PAGE_CLIENTE_INFO_AGENDA);
                    Forms.updateFormElement(PAGE_CLIENTE_INFO_AGENDA, 'ObservacionesModificacion', null);
                    loader.style.display = 'none';
                    loadedTable.style.display = 'none';
                }
            };

            //if (hasChanged(this.props.reporte, nextProps.reporte) && getDataID(this.props.reporte) !== getDataID(nextProps.reporte)) {
            //    if (isSuccessful(nextProps.reporte)) {
            //        let reporte: any = global.getData(nextProps.reporte);
            //        let partidas: DataElement = global.createSuccessfulStoreObject(reporte.Partidas);
            //        let ordenesTrabajo: DataElement = global.createSuccessfulStoreObject(reporte.OrdenesTrabajo);
            //    };
            //};

            if (hasChanged(this.props.historialAgenda, nextProps.historialAgenda)) {
                if (isSuccessful(nextProps.historialAgenda)) {
                    console.log(nextProps.historialAgenda);

                }
            }
        };
        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.clienteRef, nextProps.clienteRef) ||
                hasChanged(this.props.clienteInfo, nextProps.clienteInfo) ||
                hasChanged(this.props.clienteEtapa, nextProps.clienteEtapa) ||
                hasChanged(this.props.ubicacionDetalle, nextProps.ubicacionDetalle) ||
                hasChanged(this.props.ubicacion, nextProps.ubicacion) ||
                //hasChanged(this.props.reporte, nextProps.reporte) ||
                //hasChanged(this.props.reportesPartidas, nextProps.reportesPartidas) ||
                //hasChanged(this.props.reportesUbicacion, nextProps.reportesUbicacion) ||
                //hasChanged(this.props.partidas, nextProps.partidas) ||
                //hasChanged(this.props.ordenesTrabajo, nextProps.ordenesTrabajo) ||
                //hasChanged(this.props.expedientes, nextProps.expedientes) ||
                //hasChanged(this.props.equipamiento, nextProps.equipamiento) ||
                //hasChanged(this.props.bitacora, nextProps.bitacora)||
                hasChanged(this.props.historialAgenda, nextProps.historialAgenda)||
                hasChanged(this.props.clienteInfoAgenda, nextProps.clienteInfoAgenda);
        };
        componentDidUpdate(prevProps: IEditProps, { }) {
            if (isSuccessful(this.props.clienteEtapa)) {
                if (hasChanged(prevProps.clienteEtapa, this.props.clienteEtapa)) {
                    let contador: any;
                    contador = $(".counter");
                    if (contador.length > 0) {
                        contador.counterUp();
                    }
                }
            }
        };
        onClickItem(item: any) {
            if (item.ID != null && item.ID != undefined) {
                this.props.obtenerReporte(item.ID);
            }
        };
        onClickSave() {
            let item = global.getData(EK.Store.getState().global.entity$ModificadorFechaAgenda$clienteInfoAgenda);
            let nFechas = Forms.getForm(PAGE_CLIENTE_INFO_AGENDA);
            console.log(nFechas)
            let nuevaFechaInicio = nFechas['FechaInicioNueva'];
            let nuevaFechaFin = new Date(nuevaFechaInicio);
            nuevaFechaFin.setMinutes(nuevaFechaFin.getMinutes() + 15);
            let CurrentUser: any = getData(EK.Store.getState().global.app).Me;
            let diasDiferencia = global.getDateDiff(nuevaFechaInicio, global.getToday(), "days");
            let nivelNotificar = 0;

            switch (CurrentUser.NivelUsuario) {
                case 1:
                case 134:
                    //nivelNotificar = 1;
                    //nivelNotificar = 84;
                    nivelNotificar = 0;
                    break;
                case 84:
                    //nivelNotificar = 135;
                    nivelNotificar = 0;
                    break;
                default:
                    nivelNotificar = 0;
                    break;
            }

            let Motivo = nFechas['ObservacionesModificacion'];
            let params = {
                Cliente: item.Cliente,
                Plaza: item.IdPlaza,
                FechaOriginal:item.FechaInicio,
                FechaInicial: nuevaFechaInicio,
                FechaFinal: nuevaFechaFin,
                IdTipoAgenda: item.IdTipoAgenda,
                IdAgenda: item.IdAgenda,
                MotivoModifico: Motivo,
                NivelANotificar: nivelNotificar,
                IdTipoModificar: nFechas['TipoCambiar'].Clave
            }

            console.log(params)
            if (params.Cliente === undefined || params.Cliente === null) {
                global.warning('Seleccione un cliente planificado en agenda de construccion o vivienda', 'Atencion');
                return;
            }
            if (params.MotivoModifico === undefined || params.MotivoModifico === null || params.MotivoModifico.trim() === '') {
                global.warning('Ingrese el motivo de modificacion', 'Atencion');
                return;
            }
            let loader = document.getElementById('loadinggrid');
            let loadedTable = document.getElementById('historialgrid');
            EK.Global.confirm("Presione Confirmar para guardar ", "¿Desea guardar los siguientes cambios en la agenda?", () => {
                global.asyncPost("base/kontrol/agendaSPV/GetBP/SaveCambioAgenda/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                    switch (status) {
                        case AsyncActionTypeEnum.successful:
                            let v = Forms.getForm(config.id);
                            Forms.updateFormElement(config.id, 'Cliente', null);
                            setTimeout(() => {
                                Forms.updateFormElement(config.id, 'Cliente', v);

                            }, 300)
                            global.success('Los datos de la agenda se modificaron correctamente', 'Agenda actualizada');
                            loader.style.display = 'none';
                            loadedTable.style.display = 'none';
                            break;
                        case AsyncActionTypeEnum.loading:
                            loader.style.display = 'inherit';
                            loadedTable.style.display = 'none';
                            break;
                        case AsyncActionTypeEnum.failed:
                            loader.style.display = 'none';
                            loadedTable.style.display = 'inherit';
                            break;
                    }
                });
            });
        };
        GetStartDays() {
            let usuario: any = getData(EK.Store.getState().global.app).Me;
            let nivel = usuario.NivelUsuario;
            let dias = 0;
            let diasLoop = 0;
            let diasDisponibles = 0;
            var d = new Date();
            var h = d.getHours();
            let finDiasDisponibles = false;
            switch (nivel) {
                //case 115:
                case 71:
                case 75:
                case 134:
                    diasLoop = 7;
                    break;
                //case 1:
                case 84:
                    diasLoop = 15;
                    break;
                case 135:
                case 1:
                case 115:
                    dias = undefined;
                    break;
                default:
                    dias = null;
                    break;
            }
            
            if (dias !== undefined && dias !== null) {
                var FechaActual = new Date();
                while (!finDiasDisponibles) {
                    var FechaAnterior = new Date(FechaActual);
                    dias--;
                    console.log(dias)
                    FechaAnterior.setDate(FechaAnterior.getDate() + dias);
                    console.log(FechaAnterior)
                    if (FechaAnterior.getDay() !== 0) {
                        diasDisponibles++;
                        console.log(diasDisponibles, diasLoop)
                        if (diasDisponibles === diasLoop) {
                            finDiasDisponibles = true;
                        } else {
                            finDiasDisponibles = false;
                        }
                    }
                }
                let horas = dias * 24 + h;
                dias = horas / 24;
                dias--;
                //console.log(dias);
            } 
           
            return dias;
        }

        getDisabledDays(dias) {
            var diasDesactivados = [];
            if (dias === null) {
                diasDesactivados = [0, 1, 2, 3, 4, 5, 6];
            } else {
                diasDesactivados = [0];
            }
            return diasDesactivados;
        }

        render(): JSX.Element {
            let FechaInicio;
            let FechaFin;
            let FConst;
            let FVivienda;
            let labelFechaCaptura: any = (value: any) => {
                let className: string = "fas fa-lock";
                if (global.isSuccessful(this.props.reporte)) {
                    let reporte: any = global.getData(this.props.reporte);
                    let fechaCaptura: Date = new Date(reporte.FechaCaptura);
                    let horasTrascurridas: number = global.getDateDiff(fechaCaptura, global.getToday(), "hours");
                    if (horasTrascurridas <= 24) {
                        className = "fas fa-unlock";
                    };
                };

                return global.formatDate(value) + " <span class='pull-right'><i class='" + className + "' style='color:#1A237E;'></i></span>";
            };
            let Desactivados = this.getDisabledDays(this.GetStartDays());
           // console.log(Desactivados)
            //let diasEntrega: any = 0;
            //let mesesEntrega: any = 0;
            //let reportesFalla: any = 0;
            //let lote: any = global.getData(this.props.ubicacion);
            //let clienteEtapa: any = global.getData(this.props.clienteEtapa);
            //let ubicacionDetalle: any = global.getData(this.props.ubicacionDetalle);
            //diasEntrega = clienteEtapa.MesesTranscurridos ? clienteEtapa.MesesTranscurridos : 0;
            //mesesEntrega = clienteEtapa.MesesTranscurridosEntrega ? clienteEtapa.MesesTranscurridosEntrega : 0;
            //if (ubicacionDetalle.length > 0) {
            //    reportesFalla = ubicacionDetalle[0].CantReportesFallas ? ubicacionDetalle[0].CantReportesFallas : 0;
            //};
            if (global.isSuccessful(this.props.clienteInfoAgenda)) {
                let infoAgenda = global.getData(this.props.clienteInfoAgenda);
                if (Object.keys(infoAgenda).length > 0) {
                    //console.log(infoAgenda)
                    FechaInicio = global.formatDateTimeDirect(infoAgenda.FechaInicio, true) ? global.formatDateTimeDirect(infoAgenda.FechaInicio, true) : " ";
                    FechaFin = global.formatDateTimeDirect(infoAgenda.FechaFin, true) ? global.formatDateTimeDirect(infoAgenda.FechaFin, true) : " ";
                    FConst = infoAgenda.fecha_construccion.getFullYear() === 1 ? 'Sin planificar' : infoAgenda.fecha_construccion;
                    FVivienda = infoAgenda.fecha_entrega.getFullYear() === 1 ? 'Sin planificar' : infoAgenda.fecha_entrega;
                }
                
            }
            //console.log(this.props);
            //fechaConstruccion = global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " ";

            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        level={1}
                        subTitle="Cambiar planificacion de construccion/vivienda"
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={false}>
                        
                        <Row>
                            <select.ClientesLotesSPV label={"Cliente"} idForm={config.id} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                            
                            <label.Label label={"Fecha de construccion"} value={FConst} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 3, 3]} />
                            <label.Label label={"Fecha de entrega"} value={FVivienda} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 3, 3]} />
                           
                        </Row>
                        <hr />
                        <Row>
                            <label.Label id="EstatusAgenda" label={"Estatus de agenda"} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 2, 2]} />
                            <label.Label id="TipoAgenda" label={"Tipo de agenda activa"} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 2, 2]} />
                            <label.Label id="FechaInicio" label={"Fecha Inicio"} value={FechaInicio} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 2, 2]} />
                            <label.Label id="FechaFin" label={"Fecha Fin"} value={FechaFin} idForm={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 6, 6]} />
                        </Row>
                        <br />
                        <h4></h4>
                        <Row>
                            <DatePicker id={"FechaInicioNueva"} startDays={this.GetStartDays()} label={"Nueva Fecha"} minuteStep={15} daysOfWeekDisabled={Desactivados} hoursDisabled={[0, 1, 2, 3, 4, 5, 6, 21, 22, 23, 24]} type="datetime" idFormSection={PAGE_CLIENTE_INFO_AGENDA} value={global.getObtenerFecha()} size={[12, 12, 3, 3]} validations={[validations.required()]} />
                            <ddl.TipoAgendaModificar id="TipoCambiar" idFormSection={PAGE_CLIENTE_INFO_AGENDA} idForm={PAGE_ID} size={[12, 12, 3, 3]} style={{ height: '60px' }} label="Tipo agenda modificar" validations={[validations.required()]} required={true} />

                            {/*<DatePicker daysOfWeekDisabled={[0]} value={global.getObtenerFecha()} startDays={5} label={"Nueva Fecha"} id="FechaInicioNueva" minuteStep={15}  idFormSection={PAGE_CLIENTE_INFO_AGENDA} size={[12, 12, 3, 3]} validations={[validations.required()]} type="datetime" />
                            <SPVHorariosAtencionDDL id="HoraFinCambio" idFormSection={PAGE_CLIENTE_INFO_AGENDA} validations={[validations.required()]} size={[12, 12, 2, 2]} />*/}
                            <Button keyBtn={"btnSaveAgendaModificada"} icon={"fas fa-save"} style={{ background: '#3498db', marginTop: '20px', color: '#fff' }} rounded={true} {...this.props} id="btn_comentarios_ot" onClick={this.onClickSave} />
                            <TextArea label={"Motivo cambio de fecha"} id="ObservacionesModificacion" rows={2} idFormSection={PAGE_CLIENTE_INFO_AGENDA} size={[6, 6, 5, 5]} />

                        </Row>
                    </page.OptionSection>
                    <div id="loadinggrid" style={{display:'none'}}>
                        <Updating text="" />
                    </div>
                    <div id="historialgrid" style={{ display: 'none' }}>
                        <div id="datagroupContainer" style={{ padding: '10px', background: '#fff' }}></div>

                        {//<page.OptionSection
                        //    id={config.id}
                        //    level={0}
                        //    subTitle="Historial de cambios"
                        //    icon="fa fa-history" collapsed={false} hideCollapseButton={true}>

                        //    <Row>
                        //        <page.SectionList
                        //            id={PAGE_CLIENTE_HISTORIAL}
                        //            parent={config.id}
                        //            icon="fas fa-cogs"
                        //            level={1}
                        //            hideNewButton={true}
                        //            listHeader={listHeaderReportePartidas}
                        //            size={[12, 12, 12, 12]}
                        //            readonly={true}
                        //            horizontalScrolling={true}
                        //            selectable={true}
                        //            drawOddLine={true}
                        //            items={createSuccessfulStoreObject([])}
                        //            formatter={(index: number, item: any) => {
                        //                let bgColor: string;
                                     

                        //                return <Row className="list-selectable-item" style={{ backgroundColor: bgColor }}>

                        //                    <Column size={[1, 1, 1, 1]} className="listItem-default-item text-center"><span className="badge badge-info bold">{item.ID}</span></Column>
                        //                    <Column size={[1, 1, 1, 1]} className="listItem-default-item listItem-overflow text-center">{!(item && item.IdAgenda) ? null : <span className="badge badge-success" style={{ marginRight: 5 }}>{item.IdAgenda}</span>}</Column>
                        //                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow text-center">{!(item && item.TipoAgenda) ? null : item.TipoAgenda}</Column>
                        //                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{!(item && item.NombrePlaza) ? null : item.NombrePlaza}</Column>
                        //                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{!(item && item.FechaOriginal) ? null : global.formatDateTimeDirect(item.FechaOriginal, true)}</Column>
                        //                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{!(item && item.FechaModificada) ? null : global.formatDateTimeDirect(item.FechaModificada, true)}</Column>
                        //                    <Column size={[3, 3, 3, 3]} className="listItem-default-item listItem-overflow text-center"><span className="badge badge-success" style={{ marginRight: 5 }}>{item.UsuarioModifico}</span>{item.NombreUsuario}</Column>
                        //                    <Column size={[2, 2, 2, 2]} className="listItem-default-item listItem-overflow text-center">{!(item && item.FechaModifico) ? null : global.formatDateTimeDirect(item.FechaModifico, true)}</Column>
                        //                    <Column size={[5, 5, 5, 5]} className="listItem-default-item listItem-overflow text-center">{!(item && item.MotivoModificacion) ? null : item.MotivoModificacion}</Column>


                        //                </Row>
                        //            }}>
                        //        </page.SectionList>
                        //    </Row>

                            //</page.OptionSection>
                        }

                    </div>
                  
                </Column>
            </page.Edit>
        };
    });

    interface IUbicacionClienteProps extends React.Props<any> {
        lote: any;
        ubicacionDetalle?: any;
        clienteEtapa?: any;
        size?: number[];
    };

    class ViewUbicacionDetalle extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {
            let datos: any[] = this.props.ubicacionDetalle ? this.props.ubicacionDetalle : [];
            let clienteEtapa: any = this.props.clienteEtapa;
            let fechaEscrituracion: any = "";
            let fechaLiberacion: any = "";
            let fechaConstruccion: any = "";
            let fechaEntrega: any = "";
            let fechaReprogramacion: any = "";
            let detalleConstruccion: any = "";
            let personaEntregaVivienda: any = "";
            // console.log(datos)
            if (datos.length > 0) {
                let item: any = datos[0];
                console.log(item)
                fechaEscrituracion = global.formatDateTimeDirect(item.firma_escritura) ? global.formatDateTimeDirect(item.firma_escritura) : " ";
                fechaLiberacion = global.formatDateTimeDirect(item.fec_liberacion) ? global.formatDateTimeDirect(item.fec_liberacion) : " ";
                fechaConstruccion = global.formatDateTimeDirect(item.fecha_construccion, true) ? global.formatDateTimeDirect(item.fecha_construccion, true) : " ";
                fechaEntrega = global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) ? global.formatDateTimeDirect(clienteEtapa.FechaLiberacion, true) : " ";
                fechaReprogramacion = global.formatDateTimeDirect(item.fecha_reprogramacion, true) ? global.formatDateTimeDirect(item.fecha_reprogramacion, true) : " ";
                detalleConstruccion = item.Detalles_construccion ? item.Detalles_construccion : " ";
                personaEntregaVivienda = item.Personaentregavivienda ? item.Personaentregavivienda : " ";
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                
            </Column>
        };
    };

    interface IUbicacionBaseProps extends page.IProps {
        ubicacion?: DataElement;
        size?: number[];
    };

    class UbicacionClienteView extends React.Component<IUbicacionBaseProps, {}>{
        render(): JSX.Element {
            let ubicacion: any = global.getData(this.props.ubicacion);
            let plazaValue: any = (item: any) => {
                return !item ? "" : !item.Nombre ? "" : item.Nombre;
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
              
            </Column>
        };
    };

    interface IReporteFallasProps extends IUbicacionBaseProps { };

    class ReporteFallasView extends React.Component<IReporteFallasProps, {}>{
        render(): JSX.Element {
            let supervisionExterna: number = undefined;

            if (this.props.ubicacion && global.isSuccessful(this.props.ubicacion)) {
                let plaza: any = global.getData(this.props.ubicacion).Plaza;
                supervisionExterna = plaza ? plaza.ValidarResponsablePlaza : 0;
            };

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
               
            </Column>
        };
    };

    interface IFormalizacionVentaButtonProps extends IButtonProps, page.IProps {
        clienteRef?: DataElement;
    };

    const FormalizacionVentaButton: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
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
            let id: number = global.getDataID(this.props.clienteRef);
            let win = window.open("scv/reportesFallas/imprimirDocumento/FormalizacionVenta/" + id, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn="btnSPVFormalizacionVenta" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });

    const EquipamientoViviendaButton: any = global.connect(class extends React.Component<IFormalizacionVentaButtonProps, {}> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.clienteRef = Forms.getDataValue("Cliente", config.id, state);
            return retValue;
        };
        static defaultProps: IFormalizacionVentaButtonProps = {
            icon: "fas fa-print",
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
            let id: number = global.getDataID(this.props.clienteRef);
            let win = window.open("scv/reportesFallas/imprimirDocumento/EquipamientoVivienda/" + id, "_blank")
        };
        render(): JSX.Element {
            if (global.isSuccessful(this.props.clienteRef)) {
                if (global.getDataID(this.props.clienteRef) > 0) {
                    return <Button {...this.props} keyBtn="btnSPVEquipamientoVivienda" onClick={this.onClick.bind(this)} />
                };
            };

            return null;
        };
    });
};