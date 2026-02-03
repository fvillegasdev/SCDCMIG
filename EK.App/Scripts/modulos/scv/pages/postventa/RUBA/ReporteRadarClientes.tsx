namespace EK.Modules.SCV.Pages.Reportes.ReporteRadarClientes {
    "use strict";
    const PAGE_ID: string = "ReporteRadarClientes";
    const PAGE_BA_RESULT_ID: string = "DataReporteRadarClientesResult";
    const DXGRID_ID: string = "GridReporteRadarClientes";
    const DXGRIDGENERAL_ID: string = "GridReporteRadarGeneral";
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
                { from: 'Estatus', to: 'Estatus_cve' }
            ]

            global.dispatchDxTableAsyncPost(DXGRID_ID, "base/scv/RadarClientes/GetBP/GetConsultaRadarClientes/", retValue, this.GetColumnas(), true, 'Reporte_Radar',false,true,null,replace)
            global.dispatchDxTableAsyncPost(DXGRIDGENERAL_ID, "base/scv/RadarClientes/GetBP/GetConsultaRadarGeneral/", retValue, this.GetColumnasTotales(), true, 'Reporte_Radar_General',false,true,this.getSummariesTotales(),null)
           
        }


        GetColumnas() {
            let columnas = [
                { caption: "Plaza", dataField: 'PlazaNom' },
                { caption: "No.Cliente", dataField: 'numcte' },
                { caption: "Cliente", dataField: 'cliente' },
                {
                    caption: 'Fecha Ent.', dataField: 'fecha_entrega'
                     ,customizeText: (val) => {
                         //console.log(val.value)
                         let ndate = new Date(val.value);
                         let year = ndate.getFullYear();
                         if (year > 1) {
                             return `${ndate.getDate()}/${ndate.getMonth() + 1}/${ndate.getFullYear()}`
                         } else {
                             return ''
                         }
                    }
                },
                { caption: 'Fraccionamiento', dataField: 'nom_frac' },
                { caption: 'Historial incidencias', dataField: 'incidenciasTotales', alignment: 'center' },
                { caption: 'Incidencias abiertas', dataField: 'incidenciasAbiertas', alignment: 'center' },
                { caption: 'Resumen de incidencias', dataField: 'resumen', alignment: 'center' },
                { caption: 'Problema', dataField: 'Problema', alignment: 'center' },
                { caption: 'Estatus', dataField: 'Estatus', alignment: 'center', 
                    encodeHtml: false,
                    //customizeText: (val) => {
                    //    //console.log(val)
                    //    let clase = '';
                    //    switch (val.value) {
                    //        case "Terminado": clase = 'badge-terminado'
                    //            break;
                    //        case "En Proceso": clase = 'badge-proceso'
                    //            break;
                    //        case "Pausado": clase = 'badge-pausado'
                    //            break;
                    //    }
                    //    let TagEstatus = `<span class="badge ${clase}">${val.value}</span>`;
                    //    return TagEstatus;
                    //}
                },
                { caption: 'Observaciones', dataField: 'Observaciones', alignment: 'center' }
            ];
            return columnas;
        }

     

        GetColumnasTotales() {
            let columnas = [
                { caption: "Plaza", dataField: 'plaza' },
                { caption: "# Casos Resueltos", dataField: 'Terminadas' },
                { caption: "# Casos en Proceso", dataField: 'Proceso' },
                { caption: 'Total', dataField: 'Total' }
            ];
            return columnas;
        }

        getSummariesTotales() {
            let sum = [
                { column: 'Terminadas', summaryType: 'sum', customizeText(data) {return `${data.value}`} },
                { column: 'Proceso', summaryType: 'sum', customizeText(data) { return `${data.value}` } },
                { column: 'Total', summaryType: 'sum', customizeText(data) { return `${data.value}` } }
            ];
            return sum;
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
                onSave={() => {return }}>

                <page.FiltersV2 collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} /> 
                </page.FiltersV2>
                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRID_ID} />
                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRIDGENERAL_ID} />

            </page.Main>
        };

    });


};