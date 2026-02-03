namespace EK.Modules.SCV.Pages.Reportes.ReporteRadarComunidades {
    "use strict";
    const PAGE_ID: string = "ReporteRadarComunidades";
    const DXGRID_ID: string = "GridReporteRadarComunidades";
    const DXGRIDGENERAL_ID: string = "GridReporteRadarGeneralComunidades";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IVistaProps extends page.IProps {
        autoSearch?: any;
    };

    interface IVistaState extends page.IProps {
        childKey: number;
    };

    export const Vista: any = global.connect(class extends React.Component<IVistaProps, IVistaState> {
        constructor(props: IVistaProps) {
            super(props);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.autoSearch = state.global.NoFirst;
            return retValue;
        };

        IsValidform(obj) {
            let valid = true;
            if (!Array.isArray(obj)) {
                if (obj.data) {
                    if (global.isEmptyObj(obj.data)) {
                        return false;
                    }
                }
                if (global.isEmptyObj(obj)) {
                    return false;
                } else {
                    for (let key of Object.keys(obj)) {
                        if (obj[key] === null || obj[key] === undefined || obj[key].toString().trim() === '') {
                            console.log(obj[key])

                            valid = false;
                            break;
                        }
                        if (obj[key].data && global.isEmptyObj(obj[key].data)) {
                            return false;
                        }
                    }
                }
            } else {
                if (obj.length > 0) {
                    return true;
                }
            }
            return valid;
        }


        componentWillUnmount() {
            delete EK.Store.getState().global.NoFirst;
        }
        componentDidMount() {

        }

        GetReporte(props: page.IProps, filters: any, type?: string) {
            //console.log(this.props)
            if (!this.props.autoSearch) {
                dispatchSuccessful('load::NoFirst', true)
                return;
            }
            //console.log(filters)
            if (!filters || global.isEmpty(filters)) { return; }
            if (!this.IsValidform(filters)) {
                global.info('Informacion faltante');
                return;
            }
            let retValue: any = global.getFilters(filters);
            retValue.Fraccs = filters.Fraccionamientos.map(x => x.Clave).join(",");
            retValue.IdPlaza = filters.PlazaInicial.Clave;
            let replace = [
                { from: 'estatusLabel', to: 'estatus' }
            ]
            retValue.ClaveEstatus = this.getClaveEstatus(retValue.Idestatus);
            //console.log(retValue)
            global.dispatchDxTableAsyncPost(DXGRID_ID, "base/scv/RadarClientes/GetBP/GetConsultaRadarComunidad/", retValue, this.GetColumnas(), true, 'Reporte_Radar_comunidades', false, true, null, replace)
            global.dispatchDxTableAsyncPost(DXGRIDGENERAL_ID, "base/scv/RadarClientes/GetBP/GetConsultaRadarcomunidadGeneral/", retValue, this.GetColumnasTotales(), true, 'Reporte_Radar_General_comunidades', false, true)

        }


        GetColumnas() {
            let columnas = [
                { caption: "Plaza", dataField: 'Plaza' },
                { caption: "Fraccinamiento", dataField: 'Fraccionamiento' },
                { caption: "Fecha 50% + 1", dataField: 'Fecha50mas1', dataType: 'date', format: 'dd/MM/yyyy' },
                { caption: 'Comite Vecinal', dataField: 'comiteVecinal' },
                { caption: 'Tienen AC', dataField: 'tieneAC', alignment: 'center' },
                { caption: 'Fondo convive entregado', dataField: 'fondoConvive', alignment: 'center' },
                { caption: 'Clientes en Riesgo', dataField: 'clientesRiesgo', alignment: 'center' },
                { caption: 'Clientes en Alto Riesgo', dataField: 'clientesAltoRiesgo', alignment: 'center' },
                { caption: 'Clientes Molestos', dataField: 'cientesMolestos'},
                { caption: 'Estatus', dataField: 'estatusLabel', alignment: 'center', encodeHtml: false },
                { caption: 'Pendientes en áreas comunes', dataField: 'pendientes', alignment: 'center' },
                { caption: 'Observaciones', dataField: 'observaciones', alignment: 'center' }
            ];
            return columnas;
        }



        GetColumnasTotales() {
            let columnas: any = [
                { caption: "Plaza", dataField: 'plaza' },
                { caption: "No. Fraccionamientos", dataField: 'totalFraccionamientos', alignment: 'center' },
                { caption: "Entregados", dataField: 'Terminados', alignment: 'center' },
                {
                    caption: 'Sin Entregar', alignment: 'center', columns: [
                        { caption: "Sin Atrasos", dataField: 'SinAtraso', alignment: 'center' },
                        { caption: "Con Atrasos", dataField: 'ConAtraso', alignment: 'center' }
                    ]
                },
                
                { caption: 'En Proceso', dataField: 'Proceso', alignment: 'center' }
            ]; 

            //columnas.splice(3, 0, {
            //    caption: "Sin Entregar",
            //    cellTemplate: function (container, options) {
            //        container.append("Sin Entregar");
            //    },
            //    colspan: 2, // Combinar 3 celdas
            //});

            return columnas;
        }

        getSummariesTotales() {
            let sum = [
                { column: 'Terminadas', summaryType: 'sum', customizeText(data) { return `${data.value}` } },
                { column: 'Proceso', summaryType: 'sum', customizeText(data) { return `${data.value}` } },
                { column: 'Total', summaryType: 'sum', customizeText(data) { return `${data.value}` } }
            ];
            return sum;
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

        getClaveEstatus(ID) {
            let items = this.getItemsEstatusDDL();
            let seleccionado = items.filter(x => x.ID === ID)[0];
            return seleccionado !== undefined ? seleccionado.Clave : '-2';
        }

        render(): JSX.Element {

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                allowSave={false}
                allowEdit={false}
                allowView={false}
                onFilter={this.GetReporte.bind(this)}
                onSave={() => { return }}>

                <page.FiltersV2 collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} />

                    <ddl.EstatusComDDL id="estatus" addAll={true} label="Estatus" idFormSection={PAGE_ID} size={[12, 12, 2, 2]} style={{ height: '60px' }} validations={[validations.required()]} required={true} />

                </page.FiltersV2>
                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRID_ID} />
                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRIDGENERAL_ID} />

            </page.Main>
        };

    });


};