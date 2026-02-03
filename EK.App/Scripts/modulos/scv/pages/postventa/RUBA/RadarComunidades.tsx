namespace EK.Modules.SCV.Pages.postventa.RUBA.RadarComunidades {
    "use strict";
    const PAGE_ID: string = "RadarComunidades";
    const PAGE_FILTERS_ID = `${PAGE_ID}$filters`;
    const COMUNIDAD_DETALLE_ID = `${PAGE_ID}$Detalle`;
    const DXGRID_ID = `${PAGE_ID}DxGridContainer`;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);


    interface IVistaProps extends page.IProps {
        plazas?: DataElement;
        //cliente?: DataElement;
        fraccionamientos?: DataElement;
    };

    interface IEditProps extends page.IProps {
        plaza?: DataElement;
        //cliente?: DataElement;
        fraccionamientos?: DataElement;
        fraccionamientoDetalle?: DataElement;
        topincidencias: DataElement;
    };



    class Edicion$ extends React.Component<IEditProps, IEditProps> {
          constructor(props: IEditProps) {
            super(props);
            this.formValid = this.formValid.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = Forms.getDataValue("PlazaInicial", [config.id, "$filters"].join(""), state);
            retValue.fraccionamientos = Forms.getDataValue("Fraccionamientos", [config.id, "$filters"].join(""), state);
            retValue.fraccionamientoDetalle = state.global.rc$fraccionamientoDetalle;
            return retValue;
        };

        componentWillReceiveProps(nextProps: IEditProps, { }): void {

            if (hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ) {
                if (nextProps.fraccionamientos && nextProps.fraccionamientos.data) {
                    if (global.getData(nextProps.fraccionamientos).ID !== global.getData(this.props.fraccionamientos).ID) {
                        if (nextProps.fraccionamientos.data.ID !== -2) {
                            this.ClearAllValues(this.GetDDLNameList())
                            console.log('Obtener informacion de fraccionamiento')
                            let filtros: any = { claveFracc: nextProps.fraccionamientos.data.Clave };
                            global.dispatchAsyncPost("load::rc$fraccionamientoDetalle", "base/scv/RadarClientes/GetBP/GetDatosFraccionamiento/", { parametros: filtros }, COMUNIDAD_DETALLE_ID);
                           // global.dispatchAsync("load::rc$UbicacionClienteDetalle", "base/scv/RadarClientes/GetBP/GetDatosFraccionamiento/" + encodedFilters, COMUNIDAD_DETALLE_ID);
                        }
                        else {
                            console.log('limpiar data de formulario');
                            this.ClearAllValues(this.GetDDLNameList())
                        }
                    }
                }
            }


            if (hasChanged(this.props.fraccionamientoDetalle, nextProps.fraccionamientoDetalle)) {
                if (isSuccessful(nextProps.fraccionamientoDetalle) && nextProps.fraccionamientoDetalle.data && nextProps.fraccionamientoDetalle.data.length > 0) {
                    console.log(nextProps.fraccionamientoDetalle)
                    this.SetDataResult(nextProps.fraccionamientoDetalle.data[0], this.GetDDLNameList());
                }
            }

        };


        componentDidMount() {

        }
        GetColumnas() {
            let columnas = [
                { caption: "Familia", dataField: 'TipoFalla.Nombre' },
                { caption: "Componente", dataField: 'Falla.Descripcion' },
                { caption: 'Ubicacion', dataField: 'UbicacionFalla.Nombre' },
                { caption: 'Cantidad', dataField: 'cantidad', alignment: 'center' }
            ];
            return columnas;
        }

        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.fraccionamientos, nextProps.fraccionamientos) ||
                hasChanged(this.props.plaza, nextProps.plaza) ||
                hasChanged(this.props.fraccionamientoDetalle, nextProps.fraccionamientoDetalle)
        };


        SetDataResult(data, ddl) {
            for (let key of Object.keys(data)) {
                if (!Array.isArray(data[key])) {
                    let value = this.isFecha(key) ? global.formatDateTimeDirect(data[key]) : data[key];
                    if (!this.isInArray(ddl, key)) {
                        Forms.updateFormElement(COMUNIDAD_DETALLE_ID, key, value);
                    } else {
                        Forms.updateFormElement(COMUNIDAD_DETALLE_ID, key, this.SetValueDDL(key, value));
                    }
                   
                }
            }
        }

        SetValueDDL(key, value) {
           let newValue = {};
           let list;
           switch (key) {
               case 'comiteVecinal': list = this.getItemsComiteVecinalDDL();
                   break;
               case 'tieneAC': list = this.getItemsTieneACDDL();
                   break;
               case 'fondoConviveEntregado': list = this.getItemsFondoConviveDDL();
                   break;
               case 'estatus': list = this.getItemsEstatusDDL();
                   break;
            }
            newValue = list.filter(x => x.Clave === value)[0];
            console.log(newValue)
            return newValue;
        }

        ClearAllValues(ddl) {
            let data = Forms.getValues(COMUNIDAD_DETALLE_ID);
            for (let key of Object.keys(data)) {
                if (!this.isInArray(ddl,key)) {
                    if (!Array.isArray(data[key])) {
                        Forms.updateFormElement(COMUNIDAD_DETALLE_ID, key, null)
                    }
                } else {
                    Forms.updateFormElement(COMUNIDAD_DETALLE_ID, key, {})
                }
            }
            
        }

        ClearDll(nameID) {
            switch (nameID) {

            }
        }

        isFecha(tag) {
            return tag.includes('fecha') ? true : false;
        }



        formValid(json, omitir?): boolean {
            let valid = true;
            for (let key of Object.keys(json)) {
                if (omitir) {
                    if (!this.isInArray(omitir, key)) {
                        if (json[key] === null || json[key] === undefined || json[key].toString().trim() === '') {
                            valid = false;
                            break;
                        }
                    }
                } else {
                        if (json[key] === null || json[key] === undefined || json[key].toString().trim() === '') {
                        valid = false;
                        break;
                    }
                }

            }
            return valid;
        }

        isInArray(array,key) {
            let index = array.findIndex(x => x === key)
            return index > -1 ? true : false;
        }

        GetDDLNameList() {
            let items = ['comiteVecinal', 'tieneAC', 'fondoConviveEntregado', 'estatus'];
            return items;
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
                    id_cve_fracc: null,
                    nom_fracc: null,
                    comite_vecinal: null,
                    tiene_ac: null,
                    fondo_convive_ent: null,
                    estatus: null,
                    pendientes_ac: null,
                    observaciones: null
                }

            let formRadar = Forms.getValues(COMUNIDAD_DETALLE_ID);
            let filtros = Forms.getValues(PAGE_FILTERS_ID);
            //console.log(filtros)
            console.log(formRadar)
            if (!filtros.PlazaInicial || !filtros.PlazaInicial.Clave) {
                global.info('Seleccione una plaza');
                return;
            }
            if (!filtros.Fraccionamientos || filtros.Fraccionamientos.Clave === '-2') {
                global.info('Seleccione un fraccionamiento');
                return;
            }
           
            //console.log(formRadar)
            model.plaza = filtros.PlazaInicial.Clave;
            model.id_cve_fracc = filtros.Fraccionamientos.Clave
            model.nom_fracc = filtros.Fraccionamientos.Nombre
            model.comite_vecinal = formRadar.comiteVecinal.Clave;
            model.tiene_ac = formRadar.tieneAC.Clave
            model.fondo_convive_ent = formRadar.fondoConviveEntregado.Clave
            model.estatus = formRadar.estatus.Clave;
            model.pendientes_ac = formRadar.pendientesAC;
            model.observaciones = formRadar.Observaciones;
           console.log(model)
            let valid = this.formValid(model);
            if (!valid) {
                global.info('Faltan datos por llenar')
                return;
            }
      
            this.saveRadarComunidad(model, loading);
        }

        saveRadarComunidad(model, loading): any {
            global.asyncPost("base/scv/RadarClientes/GetBP/SaveRadarComunidad/", { parametros: model }, (status2: AsyncActionTypeEnum, data2: any) => {
                switch (status2) {
                    case AsyncActionTypeEnum.successful:
                        loading.style.display = 'none';
                        if (data2 === 1) {
                            global.success('Informacion del fraccionamiento guardada con exito');
                        }
                        //Forms.updateFormElement(COMUNIDAD_DETALLE_ID, key, {})
                        Forms.updateFormElement(PAGE_FILTERS_ID, 'Fraccionamientos', {Clave:'-2', ID:-2,Nombre:'TODOS'});
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

        getItemsComiteVecinalDDL() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' },
                { ID: -6, Clave: 'P', Nombre: 'PROVISIONAL' }
            ];
            return items;
        }
        getItemsTieneACDDL() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' }
            ];
            return items;
        }
        getItemsFondoConviveDDL() {
            let items = [
                { ID: -4, Clave: 'S', Nombre: 'SI' },
                { ID: -5, Clave: 'N', Nombre: 'NO' },
                { ID: -6, Clave: 'P', Nombre: 'PARCIAL' },
                { ID: -7, Clave: 'N/A', Nombre: 'N/A' }
            ];
            return items;
        }
        getItemsEstatusDDL() {
            let items = [
                { ID: -4, Clave: 'T', Nombre: 'TERMINADO', bg: '#2ecc71', label: true },
                { ID: -5, Clave: 'E', Nombre: 'EN PROCESO', bg: '#f1c40f', label: true },
                { ID: -6, Clave: 'SA', Nombre: 'SIN ATRASO', bg: '#e67e22', label: true },
                { ID: -7, Clave: 'CA', Nombre: 'CON ATRASO', bg: '#e74c3c', label: true }
            ];
            return items;
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
                <Row id={'saving_loader'} style={{ display: 'none', background: '#fff', position: 'absolute', width: '100%', height: '100%', zIndex: 1000 }}>
                    <Updating text="" />
                </Row>
                <page.Filters collapsed={false} refreshIcon="fa ">
                    <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <page.FraccionamientosSingleDDL id={"Fraccionamientos"} size={[12, 4, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />

                    <Column size={[12, 12, 5, 5]}>
                        <Button {...this.props} onClick={() => this.SaveRadar(this)} keyBtn={"btnSPVSave"} className={"btn btn-sm btn-success btn-save-ek-custom pull-right"}>
                            <i className="fas fa-save"></i> GUARDAR
                            </Button>
                    </Column>
                 
                </page.Filters>
                <Row>
                    <ViewUDetalleComunidad />
                </Row>
                <Row>
                    <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                        <page.OptionSection
                            id={COMUNIDAD_DETALLE_ID}
                            parent={config.id} 
                            level={1}
                            icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                            <Row>
                                <ddl.ComiteVecinalDDL id="comiteVecinal" label="Comite Vecinal" idFormSection={COMUNIDAD_DETALLE_ID} idForm={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} validations={[validations.required()]} required={true} />
                                <ddl.TieneACDDL id="tieneAC" label="Tiene AC" idFormSection={COMUNIDAD_DETALLE_ID} idForm={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} validations={[validations.required()]} required={true} />
                                <ddl.FondoConviveDDL id="fondoConviveEntregado" label="Fondo convive entregado" idFormSection={COMUNIDAD_DETALLE_ID} idForm={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} validations={[validations.required()]} required={true} />
                                <ddl.EstatusComDDL id="estatus" label="Estatus" idFormSection={COMUNIDAD_DETALLE_ID} idForm={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} validations={[validations.required()]} required={true} />
                            </Row>
                            <Row>
                                <input.Text id="pendientesAC" label="Pendientes en áreas comunes" maxLength={500} idFormSection={COMUNIDAD_DETALLE_ID} required={true} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                            </Row>
                            <Row>
                                <input.Text id="Observaciones" label="Observaciones" maxLength={500} idFormSection={COMUNIDAD_DETALLE_ID} required={true} validations={[validations.required()]} size={[12, 12, 12, 12]} />
                            </Row>
                         
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Main>
        }
    }

    class ViewUDetalleComunidad extends React.Component<IVistaProps, {}>{
        render(): JSX.Element {

            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 10 }}>
                <page.OptionSection
                    id={COMUNIDAD_DETALLE_ID}
                    parent={config.id}
                    level={1}
                    icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                    <Row>
                        <label.Label label="Porcentaje Viv. Entregada" id="PorcentajeEntregado" value={null} idForm={COMUNIDAD_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Fecha 50% + 1" id="Fecha50_mas_1" value={null} idForm={COMUNIDAD_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Clientes en Riesgo" id="totalRiesgo" value={null} idForm={COMUNIDAD_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Clientes en Alto riesgo" id="totalAltoRiesgo" value={null} idForm={COMUNIDAD_DETALLE_ID} size={[12, 12, 2, 2]} />
                        <label.Label label="Clientes Molestos" id="totalCteMolestos" value={null} idForm={COMUNIDAD_DETALLE_ID} size={[12, 12, 2, 2]} />

                    </Row>
                </page.OptionSection>
            </Column>
        };
    };


    export const Edicion: any = ReactRedux.connect(Edicion$.props, null)(Edicion$);
}
