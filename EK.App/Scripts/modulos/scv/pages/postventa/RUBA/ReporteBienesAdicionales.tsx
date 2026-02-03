namespace EK.Modules.SCV.Pages.Reportes.BienesAdicionales {
    "use strict";
    const PAGE_ID: string = "ReporteBienesAdicionales";
    const PAGE_FILTERS_ID: string = "ReporteBienesAdicionales$filters";
    const PAGE_BA_RESULT_ID: string = "DataReporteBienesAdicionalesResult";
    const DXGRID_ID: string = "GridBienesAdicionalesContainer";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IVistaProps extends page.IProps {
        plazas?: DataElement;
        fraccionamientos?: DataElement;
    };

    interface IVistaState extends page.IProps {
        childKey: number;
    };

    export const Vista: any = global.connect(class extends React.Component<IVistaProps, IVistaState> {
        constructor(props: IVistaProps) {
            super(props);
            this.state = { childKey: 0 };
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plazas = Forms.getDataValue("PlazaInicial", [config.id + "$filters"].join(""), state);
            retValue.fraccionamientos = state.global.ItemSeleccionadoDLLFracc;//Forms.getDataValue("Fraccionamientos", [config.id + "$filters"].join(""), state);
            return retValue;
        };


        onWillFilter(props: any, filters: any): any {
            let retValue: any = global.getFilters(filters);
            retValue.Fraccionamientos = filters.Fraccionamientos;
            retValue.Fraccs = '';
            //console.log(filters)
            //console.log(this.props.fraccionamientos)
            //if (retValue.Fraccionamientos && retValue.Fraccionamientos.length > 0) {
                //retValue.Fraccionamientos.forEach((f: any) => { delete f["ID"]; });
                if (this.props.fraccionamientos && this.props.fraccionamientos.data &&
                    this.props.fraccionamientos.data.length > 0) {
                    retValue.Fraccs = this.props.fraccionamientos.data.map(x => x.Clave).join(",");
                } else {
                    retValue.Fraccs = '';
                }
            //}

            if (filters === undefined || filters === null || this.isEmpty(filters)) {
               return null
            }

            return retValue;
        }
        onFilter(props: page.IProps, filters: any, type?: string): void {
           // console.log(filters);
            //let tries = EK.Store.getState().global.BusquedaInit ? EK.Store.getState().global.BusquedaInit.data : 0;

                if (filters !== undefined && filters !== null && !this.isEmpty(filters)) {
                    if (filters.Fraccs === '') {
                        global.info('Seleccione una opcion correcta en fraccionamientos');
                        return;
                    }
                    let encodedFilters: string = global.encodeObject({ fracc: filters.Fraccs });
                    let columnas = [
                        { caption: "Desarrollo", dataField: 'desarrollo' },
                        { caption: "Ubicacion", dataField: 'ubicacion' },
                        { caption: 'Indicador de entrega', dataField: 'entregado_s' },
                        { caption: 'Tipo Bien Adicional', dataField: 'tipo_bien_adicional' },
                        { caption: 'Nombre Bien Adicional Siembra', dataField: 'nom_siembra', alignment: 'center' },
                        { caption: 'Nombre Comercial del Bien Adicional', dataField: 'nom_comercial', alignment: 'center' }
                        
                    ];

                    global.startloadingDxGrid(DXGRID_ID);
                    global.asyncGet("base/scv/BienesAdicionales/GetBP/getListaBienesAdicionales/" + encodedFilters, (status: AsyncActionTypeEnum, data: any) => {
                        switch (status) {
                            case AsyncActionTypeEnum.successful:
                               // console.log(data)
                                for (let d of data) {
                                    d.entregado_s = d.entregado? 'SI': 'NO'
                                }
                                global.dispatchSuccessful("global-page-data", PAGE_BA_RESULT_ID);
                                global.loadDxGrid(DXGRID_ID, columnas, data, true);
                                break;
                        }
                    });
                }

            //}, 100)
            
        }

        isEmpty(obj) {
           return Object.keys(obj).length === 0;
        }

        componentDidMount(): void {
            let filtros = Forms.getValues(PAGE_FILTERS_ID);
            console.log(filtros)
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
            }
        }

        componentWillUnmount() {
            Forms.updateFormElement('ReporteBienesAdicionales$filters', 'Fraccionamientos', null);
        }
        componentWillReceiveProps(nextProps: IVistaProps): any {

        }
        onRowDoubleClick(item: any): any {
            return null;
        }

        render(): JSX.Element {

            return <page.Main {...config}
                pageMode={PageMode.Principal}
                allowNew={false}
                allowDelete={false}
                allowSave={false}
                allowEdit={false}
                allowView={false}
                onWillFilter={this.onWillFilter.bind(this)}
                onFilter={this.onFilter.bind(this)}>
                <page.Filters collapsed={false} refreshIcon="fa fa-search">
                    <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={config.id} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                    {/*<ddl.TagsFraccionamientosSoloPlaza id="Fraccionamientos" idForm={config.id} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                    <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={config.id} /> 
                </page.Filters>
                <page.dxGridTable style={{ width: '96%', margin: 'auto' }} size={[12, 12, 12, 12]} id={DXGRID_ID} />
             </page.Main>
        };
    });
   
};