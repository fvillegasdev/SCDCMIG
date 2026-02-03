namespace EK.Modules.SCV.Pages.postventa.RUBA.ComiteReunionesGraficas {
    "use strict";
    const PAGE_ID = "ComiteReunionesGraficas";
    const MATERIALES = "Materiales";
    declare const DevExpress: any;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IComiteReunionesGraficas extends page.IProps {
        modeEdit: any,
        initTable?: (data: any) => void,
        loadCatalogo: () => void,
        entity: any,
        entityItem: any,
        loadData: any,
        comiteSelected: any,
        itemsLoad: (data) => void,
        MaterialesReunion: any,
        AgendaReuniones: any,
        Event: any
    };

    let getFirstAndLastDayOfMonth = (year, month) => {
        let primerDiaMes = new Date(year, month - 1, 1); 
        let ultimoDiaMes = new Date(year, month, 0);

        return {
            primerDiaMes: primerDiaMes,
            ultimoDiaMes: ultimoDiaMes
        };
    }
    export let Vista = global.connect(class extends React.Component<IComiteReunionesGraficas, {}> {
        constructor(props: IComiteReunionesGraficas) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })

        componentWillReceiveProps(nextProps: IComiteReunionesGraficas): void {

        }
        componentDidMount(): any {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            dispatchSuccessful("load::Event", [])
            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
        };
        render(): JSX.Element {
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "black";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <PageButtons>

                </PageButtons>
                <ComiteReunionesAgenda />

            </page.Main>;
        };
    });
    //========================================================================
    // AGENDA REUNIONES 
    //=========================================================================
    const ComiteReunionesAgenda: any = global.connect(class extends React.Component<IComiteReunionesGraficas, {}>{
        constructor(props: IComiteReunionesGraficas) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.AgendaReuniones = state.global.AgendaReuniones;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        componentWillReceiveProps(nextProps: IComiteReunionesGraficas): void {
            
            //if (hasChanged(this.props.Event, nextProps.Event) && global.isSuccessful(nextProps.Event)) {
            //    if (isSuccessful(nextProps.Event) && nextProps.Event.data.length > 0) {
            //        let data: any = global.getData(nextProps.Event);
            //        console.log(data[0])
            //        Forms.updateFormElement(PAGE_ID, "ComiteLabel", data[0].Comite)
            //        Forms.updateFormElement(PAGE_ID, "FechaLabel", data[0].FechaReunion.toLocaleDateString())
            //        Forms.updateFormElement(PAGE_ID, "RealizadaLabel", data[0].Realizada ? "SI" : "NO")
            //    };
            //};
        }
        componentWillUnmount() {
            Forms.reset(PAGE_ID);
            dispatchDefault("load::AgendaReuniones", null);
        };
       
        onSelect() {
            let loader = document.getElementById('loading');
            let loaded = document.getElementById('loadedData');
            let model = Forms.getValues(PAGE_ID)
            let Fraccionamiento = model.FraccInicial.ID
            let FechaInicio = model.FechaInicial
            let FechaFin = model.FechaFinal
            let TipoReunion = model.TipoReunion.ID

            if (Fraccionamiento === -2) {
                warning("No puede seleccionar la opcion TODOS en el campo Fraccionamiento, seleccione un Fraccionamiento valido", "Atención");
                return
            }


            if (FechaInicio.length === 7) {
                let date = FechaInicio.split('/');
                let mes = date[0];
                let anio = date[1];
                FechaInicio = new Date(anio, mes-1, 1);
               
            } else {
                let mes = FechaInicio.getMonth();
                let anio = FechaInicio.getFullYear();
                FechaInicio = new Date(anio, mes, 1);
            }

            if (FechaFin.length === 7) {
                let date = FechaFin.split('/');
                let mes = date[0];
                let anio = date[1];
                FechaFin = new Date(anio, mes, 0);
               
            } else {
                let mesFin = FechaFin.getMonth()+1;
                let anioFin = FechaFin.getFullYear();
                FechaFin = new Date(anioFin, mesFin, 0);
            }
            let parametros = global.assign({
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIO: FechaInicio,
                FECHAFIN: FechaFin,
                IDTIPOREUNION: TipoReunion
            })
            console.log(model);
            console.log(parametros);
            global.asyncPost("base/kontrol/Comites/GetBP/GetInfoGraficas/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        console.log(data)
                        dispatchSuccessful("load::InfoGraficas", data)
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';

                        let Fraccionamiento = Forms.getValue("FraccInicial", PAGE_ID);

                        let chart1 = $('#chart').dxChart({
                            dataSource: data,
                            title: Fraccionamiento,
                            commonSeriesSettings: {
                                argumentField: 'NameMonth',
                                type: 'bar',
                                hoverMode: 'allArgumentPoints',
                                selectionMode: 'allArgumentPoints',
                                label: {
                                    visible: true,
                                    format: {
                                        type: 'fixedPoint',
                                        precision: 0,
                                    },
                                },
                            },
                            series: {
                                argumentField: 'NameMonth',
                                valueField: 'total',
                                name: 'Meses',
                                type: 'bar',
                                //color: '#5B9BD5',
                            },
                            export: {
                                enabled: true,
                            },
                        });


                        let chart2 = $('#pie').dxPieChart({
                            palette: 'bright',
                            dataSource:data,
                            title: Fraccionamiento,
                            legend: {
                                orientation: 'horizontal',
                                itemTextPosition: 'right',
                                horizontalAlignment: 'center',
                                verticalAlignment: 'bottom',
                                columnCount: 4,
                            },
                            export: {
                                enabled: true,
                            },
                            series: [{
                                argumentField: 'NameMonth',
                                valueField: 'total',
                                label: {
                                    visible: true,
                                    font: {
                                        size: 16,
                                    },
                                    connector: {
                                        visible: true,
                                        width: 0.5,
                                    },
                                    position: 'columns',
                                    //customizeText(arg) {
                                    //    return `${arg.valueText} (${arg.percentText})`;
                                    //},
                                },
                            }],
                        });

                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loaded.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loaded.style.display = 'inherit';
                        break;
                }
            })
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let textTitle = "";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }

            return <div id="">
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="Cargando..." />
                </div>
                <Row id="loadedData">
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={textTitle}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >
                                <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"FILTROS"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <PlazasDDL id={"PlazaInicial"} size={[12, 12, 4, 4]} label={"PLAZAS"} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                <VocacionesSPVDDL id={"Vocaciones"} label="Segmento" idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />
                                                <FraccionamientosDDL id={"FraccInicial"} size={[12, 12, 4, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                <DatePicker id="FechaInicial" label="Fecha Inicial" type="month" formato={"mm/yyyy"} idFormSection={PAGE_ID} initialValue={new Date(global.getObtenerFecha().getFullYear(), 0)} value={new Date(global.getObtenerFecha().getFullYear(), 0)} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                                <DatePicker id="FechaFinal" label="Fecha Final" type="month" formato={"mm/yyyy"} idFormSection={PAGE_ID} initialValue={new Date(global.getObtenerFecha().getFullYear(), global.getObtenerFecha().getMonth())} value={new Date(global.getObtenerFecha().getFullYear(), global.getObtenerFecha().getMonth() )} size={[12, 12, 3, 3]} required={true} validations={[validations.required()]} />
                                                <ddl.TipoReunion id={"TipoReunion"} size={[12, 12, 6, 6]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </page.OptionSection>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"Graficas"}
                            level={2}
                            icon={"fa fa-chart"}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={""}
                                        level={1}
                                        icon={"fa fa-calendar"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 6, 6]}>
                                                <div id="chart"></div>
                                            </Column>
                                            <Column size={[12, 12, 6, 6]}>
                                                <div id="pie"></div>
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </div >
        };
    });
};