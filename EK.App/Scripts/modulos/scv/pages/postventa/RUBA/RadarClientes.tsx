namespace EK.Modules.SCV.Pages.postventa.RUBA.RadarClientes {
    "use strict";
    const PAGE_ID: string = "RadarClientes";
    const PAGE_FILTERS_ID = `${PAGE_ID}$filters`;
    const UBICACION_CLIENTE_DETALLE_ID = `${PAGE_ID}$UbicacionCte`;
    const DXGRID_ID = `${PAGE_ID}DxGridContainer`;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);


    interface IVistaProps extends page.IProps {
        plazas?: DataElement;
        cliente?: DataElement;
        fraccionamientos?: DataElement;

    };

    interface IEditProps extends page.IProps {
        plaza?: DataElement;
        cliente?: DataElement;
        fraccionamientos?: DataElement;
        ubicacionDetalle?: DataElement;
        topincidencias: DataElement;
    };


    class Edicion$ extends React.Component<IEditProps, IEditProps> {
        //constructor(props: IEditProps) {
        //    super(props);
        //    this.saveRadarCliente = this.saveRadarCliente.bind(this);
        //};
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.cliente = Forms.getDataValue("Cliente", [config.id, "$filters"].join(""), state);
            retValue.plaza = Forms.getDataValue("PlazaInicial", [config.id, "$filters"].join(""), state);
            retValue.ubicacionDetalle = state.global.rc$UbicacionClienteDetalle;
            retValue.topincidencias = state.global.rc$TopIncidenciasCliente;
            return retValue;
        };

        componentWillReceiveProps(nextProps: IEditProps, { }): void {
            let changeAllData: any = false;
            if (global.getData(nextProps.plaza).ID != global.getData(this.props.plaza).ID) {
                changeAllData = true;
                Forms.updateFormElement(PAGE_FILTERS_ID, 'Cliente', null);
            };

            if (changeAllData) {

            } else {

                if (!nextProps.cliente) {
                    console.log('Eliminar datos del cliente');
                    return;
                }
                if (nextProps.cliente && global.getData(nextProps.cliente).ID !== global.getData(this.props.cliente).ID) {
                    let idUbicacion = global.getData(nextProps.cliente).ID;
                    if (idUbicacion !== undefined && idUbicacion !== null) {
                        console.log(idUbicacion)
                        console.log(global.getData(nextProps.cliente))
                        let encodedFilters: string = global.encodeObject({ idCliente: idUbicacion });
                        global.dispatchAsync("load::rc$UbicacionClienteDetalle", "base/scv/RadarClientes/GetBP/GetDatosCliente/" + encodedFilters, UBICACION_CLIENTE_DETALLE_ID);
                        global.dispatchDxTableAsyncGet(DXGRID_ID, "base/scv/RadarClientes/GetBP/GetTopFallasCliente/", encodedFilters, this.GetColumnas(), false)

                    } else {
                        this.ClearAllValues()
                    }
                }
            }
            if (hasChanged(this.props.ubicacionDetalle, nextProps.ubicacionDetalle)){
                if (isSuccessful(nextProps.ubicacionDetalle) && nextProps.ubicacionDetalle.data) {
                    console.log(nextProps.ubicacionDetalle)
                    this.SetDataResult(nextProps.ubicacionDetalle.data);
                }
            }

        };

        componentWillUnmount() {

        }
        componentDidMount() {
            let data = Forms.getValues(UBICACION_CLIENTE_DETALLE_ID);
            let filtros = Forms.getValues(PAGE_FILTERS_ID);
            if (filtros && !global.isEmptyObj(filtros)) {
                if (filtros.PlazaInicial && global.isEmptyObj(filtros.PlazaInicial)) {
                    let PlazasPV = EK.Store.getState().global.PLAZASPOSTVENTA ? EK.Store.getState().global.PLAZASPOSTVENTA.data : [];
                    if (PlazasPV.length > 0) {
                        for (let p of PlazasPV) {
                            if (p.ID && p.ID > 0) {
                                Forms.updateFormElement(PAGE_FILTERS_ID, 'PlazaInicial', p)
                                dispatchSuccessful("load::Plaza_Seleccionada", p);
                                break;
                                //
                            }
                        }
                    }
                }
                if (!filtros.Cliente && data && !global.isEmptyObj(data)) {
                    this.ClearAllValues();
                }
            }
        }
        GetColumnas() {
            let columnas = [
                { caption: "Familia", dataField: 'TipoFalla.Nombre' },
                { caption: "Componente", dataField: 'Falla.Descripcion' },
                { caption: 'Ubicacion', dataField: 'UbicacionFalla.Nombre' },
                { caption: 'Cantidad', dataField: 'cantidad', alignment:'center' }
            ];
            return columnas;
        }

        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.cliente, nextProps.cliente) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.ubicacionDetalle, nextProps.ubicacionDetalle) 
        };

        onFilter(props: page.IProps, filters: any, type?: string): void {
            if (!filters || global.isEmpty(filters)) { return; }
        }

        SetDataResult(data) {
            data.Estatus = this.GetEstatus(data.Estatus_cve);
            for (let key of Object.keys(data)) {
                if (!Array.isArray(data[key])) {
                    let value = this.isFecha(key) ? global.formatDateTimeDirect(data[key]) : data[key];
                    Forms.updateFormElement(UBICACION_CLIENTE_DETALLE_ID, key, value)
                }
            }
        }

        ClearAllValues() {
            let data =  Forms.getValues(UBICACION_CLIENTE_DETALLE_ID);
            for (let key of Object.keys(data)) {
                if (key !== 'Estatus') {
                    if (!Array.isArray(data[key])) {
                        Forms.updateFormElement(UBICACION_CLIENTE_DETALLE_ID, key, null)
                    }
                } else {
                    Forms.updateFormElement(UBICACION_CLIENTE_DETALLE_ID, key, {})
                }
            }
            try {
                $(`#${DXGRID_ID}`).dxDataGrid("dispose");
            } catch (ex) {}
        }

        ClearForm() {

            Forms.updateFormElement(UBICACION_CLIENTE_DETALLE_ID,'Estatus', { ID: -5, Clave: "T", Nombre: "Terminado" } );

        }

        isFecha(tag) {
            return tag.includes('fecha') ? true : false;
        }

        GetEstatus(cve) {
            cve = cve && cve !== null && cve !== undefined ? cve : 'X';
            let obj = {}
            switch (cve) {
                case "P": obj = { ID: -4, Clave: 'P', Nombre: 'Pausado' }
                    break;
                case "T": obj = { ID: -5, Clave: 'T', Nombre: 'Terminado' }
                    break;
                case "E": obj = { ID: -6, Clave: 'E', Nombre: 'En Proceso' }
                    break;
                default: obj = {};
            } 
            return obj;
        }

        formValid(json):boolean {
            let valid = true;
            for (let key of Object.keys(json)) {
                if (key === 'Problema' || key === 'Estatus_cve' || key === 'Observaciones') {
                    if (json[key] === null || json[key] === undefined || json[key].toString().trim() === '') {
                        valid = false;
                        break;
                    }
                }
               
            }
            return valid;
        }

         saveRadarCliente(model, loading):any {
            global.asyncPost("base/scv/RadarClientes/GetBP/SaveRadar/", { parametros: model }, (status2: AsyncActionTypeEnum, data2: any) => {
                switch (status2) {
                    case AsyncActionTypeEnum.successful:
                        loading.style.display = 'none';
                        if (data2 === 1) {
                            global.success('Informacion de cliente guardada con exito');
                        }
                        Forms.updateFormElement(PAGE_FILTERS_ID, 'Cliente', null);
                        break;
                    case AsyncActionTypeEnum.loading:
                        loading.style.display = 'block';
                        break;
                    case AsyncActionTypeEnum.failed:
                        loading.style.display = 'none';
                        break;
                }
            });    
        }

        getDateformatEU(datestring) {
            let d = datestring.split('/');
            let newDateString = `${d[2]}-${d[1]}-${d[0]}`;
            return newDateString;
        }

        SaveRadar(data) {
            let loading = document.getElementById('saving_loader');
            let model = {
                plaza: null,
                numcte: null,
                fecha_construccion: null,
                fecha_entrega: null,
                fecha_firma: null,
                fecha_escrituracion: null,
                ubicacion: null,
                Problema:null,
                Estatus_cve:null,
                Observaciones: null,
                id_cve_fracc:null
            }

            let formRadar = Forms.getValues(UBICACION_CLIENTE_DETALLE_ID);
            let filtros = Forms.getValues(PAGE_FILTERS_ID);

            if (!filtros.PlazaInicial && filtros.PlazaInicial.Clave != '-2') {
                global.info('Seleccione una plaza');
                return;
            }
            if (!filtros.Cliente) {
                global.info('Seleccione un cliente');
                return;
            }
            console.log(formRadar)
            this.getDateformatEU(formRadar.fecha_construccion)
            model.plaza = formRadar.plaza;
            model.numcte = filtros.Cliente.ID
            model.fecha_construccion = new Date( this.getDateformatEU(formRadar.fecha_construccion));
            model.fecha_entrega = new Date(this.getDateformatEU( formRadar.fecha_entrega));
            model.fecha_firma = new Date(this.getDateformatEU(formRadar.fecha_firma));
            model.fecha_escrituracion = new Date(this.getDateformatEU( formRadar.fecha_escrituracion));
            model.ubicacion = formRadar.ubicacion;
            model.Problema = formRadar.Problema;
            model.Estatus_cve = formRadar.Estatus.Clave;
            model.Observaciones = formRadar.Observaciones;
            model.id_cve_fracc = formRadar.id_cve_fracc;
            let valid = true;
            for (let key of Object.keys(model)) {
                if (key === 'Problema' || key === 'Estatus_cve' || key === 'Observaciones') {
                    if (model[key] === null || model[key] === undefined || model[key].toString().trim() === '') {
                        valid = false;
                        break;
                    }
                }

            }
            if (!valid) {
                global.info('Faltan datos por llenar');
                return;
            }
            console.log(model)
            this.saveRadarCliente(model, loading);
        }

      

        render(): JSX.Element {

            return <page.Main {...config}
                pageMode={PageMode.SoloGuardar}
                allowNew={false}
                allowDelete={false}
                allowSave={false}
                allowEdit={false}
                allowView={false}
                onFilter={() => { return }}>
                <Row id={'saving_loader'} style={{ display: 'none', background:'#fff', position:'absolute',width:'100%', height:'100%', zIndex:1000 }}>
                    <Updating text="" />
                </Row>
                    <page.Filters collapsed={false} refreshIcon="fa ">
                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <select.ClientesLotesSPV label="Cliente" key={"Cliente"} idForm={config.id} size={[12, 12, 4, 4]} required={true} validations={[validations.required()]} />
                        <Column size={[12, 12, 5, 5]}>
                            <Button {...this.props} onClick={()=>this.SaveRadar(this)} keyBtn={"btnSPVSave"} className={"btn btn-sm btn-success btn-save-ek-custom pull-right"}>
                                <i className="fas fa-save"></i> GUARDAR 
                            </Button>
                        </Column>
                   
                    </page.Filters>
                    <Row>
                     <ViewUbicacionDetalle size={[12, 12, 12, 12]} />
                    </Row>
                    <page.dxGridTable title="Resumen de incidencias" style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRID_ID} />
                    <Row>
                    <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                            <page.OptionSection
                                id={UBICACION_CLIENTE_DETALLE_ID}
                                parent={config.id}
                                level={1}
                                icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                                <Row>
                                    <input.Text id="Problema" label="Problema" maxLength={500} idFormSection={UBICACION_CLIENTE_DETALLE_ID} required={true} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                                </Row>
                                <Row>
                                    <ddl.EstatusRadarDDL id="Estatus" idFormSection={UBICACION_CLIENTE_DETALLE_ID} idForm={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} label="Estatus" validations={[validations.required()]} required={true} />
                                </Row>
                                <Row>
                                    <input.Text id="Observaciones" label="Observaciones" maxLength={500} idFormSection={UBICACION_CLIENTE_DETALLE_ID} required={true} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                                </Row>
                                <Row>
                                  
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
            </page.Main>
        }
    }

    interface IUbicacionClienteProps extends React.Props<any> {
        ubicacionCliente?: any;
        size?: number[];
    };

    class ViewUbicacionDetalle extends React.Component<IUbicacionClienteProps, {}>{
        render(): JSX.Element {

            return <Column size={this.props.size} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={UBICACION_CLIENTE_DETALLE_ID}
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.BadgeValue label="Ubicacion" id="ubicacion" idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 4, 4]} />
                        <label.Label label="Fecha de escrituracion" id="fecha_escrituracion" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Fecha de firma" id="fecha_firma" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Fecha de entrega Construccion" id="fecha_construccion" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Fecha de entrega al cliente" id="fecha_entrega" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 2, 2]} />
                    </Row>
                    <Row>
                        <label.Label label="Total de incidencias" id="incidenciasTotales" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 3, 3]} />
                        <label.Label label="Incidencias abiertas" id="incidenciasAbiertas" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 3, 3]} />
                    </Row>
                    <Row style={{display:'none'}}>
                        <label.Label id="id_cve_fracc" value={null} idForm={UBICACION_CLIENTE_DETALLE_ID} size={[12, 12, 3, 3]} />
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    export const Edicion: any = ReactRedux.connect(Edicion$.props, null)(Edicion$);

    let Edit: any = global.connect(class extends React.Component<IEditProps, {}> {
        render(): JSX.Element {
            return <span>WORKS</span>
        }
    })
}