

namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaDiasPromedioAtencion {
    const PAGE_ID: string = "DiasPromedioAtencion";
    const PAGE_PENDIENTE_RESULT_ID: string = "DiasPromedioAtencionResult";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_PENDIENTE_RESULT_ID]);
    declare const Map: any;
    export class Vista extends page.Base {
        componentDidMount(): void {
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Personalizado} allowNew={false} allowSave={false} allowEdit={false} allowDelete={false}>
                <Filtros />
                {<ResultView />}
            </page.Main>;
        };
    }
    interface IConsultaDiasPromedioAtencion extends page.IProps {
        plaza?: any;
        load?: any;
    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaDiasPromedioAtencion, {}> {
        constructor(props: IConsultaDiasPromedioAtencion) {
            super(props);
            this.onSelect = this.onSelect.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.plaza = state.global.Plaza_Seleccionada;
            return retValue;
        };
        componentDidMount(): void {
            Forms.updateFormElement(PAGE_ID, "Corte", "Plaza");

        };
        componentWillReceiveProps(nextProps: IConsultaDiasPromedioAtencion, nextState: IConsultaDiasPromedioAtencion): void {

            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        }
        onSelectReport(params: any): void {
            console.log(params)
            let loader = document.getElementById('loading');
            let loadedTable = document.getElementById('loadedData');

            const columns = [
                { caption: "Total Rep. Reales", dataField: "TodosReportes", alignment: 'center' },
                { caption: "Total Rep. Cerrados", dataField: "Cerrados", alignment: 'center' },
                { caption: "Total Rep. Abiertos", dataField: "Abiertos", alignment: 'center' },
                {
                    caption: "Días Promedio", dataField: "DiasPromedio", alignment: 'center', format: {
                        type: "fixedPoint",
                        precision: 2
                    } },
                {
                    caption: "Días Contratista", dataField: "DiasPromContratista", alignment: 'center', format: {
                        type: "fixedPoint",
                        precision: 2
                    } },
                { caption: "0 A 15", dataField: "Dias0A15", alignment: 'center' },
                { caption: "16 A 30", dataField: "Dias16A30", alignment: 'center' },
                { caption: "31 A 45", dataField: "Dias31A45", alignment: 'center' },
                { caption: "Mayor a 46", dataField: "DiasMas46", alignment: 'center' },
                { caption: "Cancelados", dataField: "Cancelados", alignment: 'center' },
                { caption: "No proceden", dataField: "NoProcede", alignment: 'center' },
            ];
            if (params.CORTE === "Plaza")
                columns.unshift({ caption: "Plaza", dataField: "Plaza", alignment: 'left' })
            else if (params.CORTE === "Vocaciones") {
                columns.unshift({ caption: "Vocaciones", dataField: "Vocacion", alignment: 'left' })
                columns.unshift({ caption: "Plaza", dataField: "Plaza", alignment: 'left' })
            }
            else if (params.CORTE === "Fraccionamiento") {
                columns.unshift({ caption: "Fraccionamiento", dataField: "Fraccionamiento", alignment: 'left' })
                columns.unshift({ caption: "Vocaciones", dataField: "Vocacion", alignment: 'left' })
                columns.unshift({ caption: "Plaza", dataField: "Plaza", alignment: 'left' })
            }
            global.asyncPost("base/kontrol/reportesFallasConsulta/GetBP/GetConsultaDiasPromedioAtencion/", { parametros: params }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'inherit';
                        const Totales = global.assign({}, data.reduce((p, c) => {
                            return {
                                TodosReportes: (p.TodosReportes + c.TodosReportes) || 0,
                                Cerrados: p.Cerrados + c.Cerrados,
                                Abiertos: p.Abiertos + c.Abiertos,
                                DiasPromedio: p.DiasPromedio + c.DiasPromedio,
                                DiasPromContratista: p.DiasPromContratista + c.DiasPromContratista,
                                Dias0A15: p.Dias0A15 + c.Dias0A15,
                                Dias16A30: p.Dias16A30 + c.Dias16A30,
                                Dias31A45: p.Dias31A45 + c.Dias31A45,
                                DiasMas46: p.DiasMas46 + c.DiasMas46,
                                Cancelados: p.Cancelados + c.Cancelados,
                                NoProcede: p.NoProcede + c.NoProcede
                            }
                        }));
                        Totales.Plaza = 'Totales';
                        data.push(Totales);
                        dispatchSuccessful('global-page-data', data, PAGE_PENDIENTE_RESULT_ID)
                        let fecha = Date.now();
                        let dataGrid = $("#datagroupContainer").dxDataGrid({
                            dataSource: data,
                            allowColumnReordering: true,
                            scrolling: {
                                columnRenderingMode: "virtual"
                            },
                            sorting: {
                                mode: "multiple" // or "multiple" | "none"
                            },
                            columnAutoWidth: true,
                            showBorders: false,
                            grouping: {
                                autoExpandAll: false,
                            },
                            searchPanel: {
                                visible: true
                            },
                            paging: {
                                pageSize: 10
                            },
                            pager: {
                                showPageSizeSelector: true,
                                allowedPageSizes: [10, 15, 25],
                                showInfo: true
                            },
                            groupPanel: {
                                visible: true
                            },
                            columns: columns,
                            columnFixing: { enabled: true },
                            showColumnLines: false,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            selection: {
                                mode: "single"
                            },
                            export: {
                                enabled: true,
                                fileName: "ConsultaPromedioDiasAtención_" + fecha,
                                allowExportSelectedData: false
                            }
                        }).dxDataGrid("instance");

                        break;
                    case AsyncActionTypeEnum.loading:
                        loader.style.display = 'block';
                        loadedTable.style.display = 'none'
                        break;
                    case AsyncActionTypeEnum.failed:
                        loader.style.display = 'none';
                        loadedTable.style.display = 'none';
                        break;
                }
            });

        }
        onSelect(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let Plaza = model.PlazaInicial.ID;
            let Vocaciones = model.Vocaciones.ID;
            let Fraccionamiento = global.filterFracc(model.Fraccionamientos)
            let FechaInicial = model.FechaInicial;
            let FechaFinal = model.FechaFinal;
            let Corte = model.Corte
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                PLAZA: Plaza,
                VOCACIONES: Vocaciones,
                FRACCIONAMIENTO: Fraccionamiento,
                FECHAINICIAL: FechaInicial,
                FECHAFINAL: FechaFinal,
                CORTE: Corte,
                SEGMENTO:segmento
            });
            if (p.FRACCIONAMIENTO === "" || p.FRACCIONAMIENTO === null || p.FRACCIONAMIENTO === undefined) {
                return global.warning("Favor de seleccionar un fraccionamiento.")
            }
            this.onSelectReport(p);
        }
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Consulta de Dias Promedio de Atención"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button keyBtn={"btnSPVFiltrarInformacion"} className={className} color={color} iconOnly={true} icon="fa fa-search" onClick={this.onSelect} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Column size={[12, 12, 12, 12]} style={{ padding: '10px' }}>

                        <ddl.PlazasDDL id="PlazaInicial" label="Plaza" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                        <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 2, 2]} />
                        <page.TagsFraccionamientosPlazaVV size={[12, 12, 4, 4]} id="Fraccionamientos" idForm={PAGE_ID} />

                        {/*<ddl.TagsFraccionamientos id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 4, 4]} />*/} 
                        <Column size={[12, 12, 12, 12]} style={{ padding: 0, paddingTop: 8 }}>
                        <Column size={[12, 12, 6, 6]} >
                                <page.OptionSection
                                    id={PAGE_ID}
                                    subTitle={<span>Corte a Nivel</span>}
                                    icon="fas fa-cog" level={1} collapsed={false} hideCollapseButton={true}>
                                    <Row>
                                        <Column size={[12, 12, 12, 12]} style={{ margin: "10px 0" }}>
                                            <RadioButton id="Plaza" label="Plaza" value="Plaza" idForm={PAGE_ID} groupName="Corte" size={[12, 12, 4, 4]} />
                                            <RadioButton id="VocacionesCheck" label="Vocaciones" value="Vocaciones" idForm={PAGE_ID} groupName="Corte" size={[12, 12, 4, 4]} />
                                            <RadioButton id="Fraccionamiento" label="Fraccionamiento" value="Fraccionamiento" idForm={PAGE_ID} groupName="Corte" size={[12, 12, 4, 4]} />
                                        </Column>
                                    </Row>
                                </page.OptionSection>
                        </Column>
                        <Column size={[12, 12, 6, 6]}>
                                <DatePicker id="FechaInicial" label="Fecha Inicial" type="date" idFormSection={PAGE_ID} value={new Date(global.getToday(true).getFullYear(), 0, 1)} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                                <DatePicker id="FechaFinal" label="Fecha Final" type="date" idFormSection={PAGE_ID} value={global.getObtenerFecha()} size={[12, 12, 6, 6]} required={true} validations={[validations.required()]} />
                            </Column>
                    </Column>
                    </Column>
                </page.OptionSection>
            </Column>;
        }
    });

    let ResultView: any = global.connect(class extends React.Component<IConsultaDiasPromedioAtencion, {}> {
        constructor(props: IConsultaDiasPromedioAtencion) {
            super(props);
        };
        static defaultProps: IConsultaDiasPromedioAtencion= {
            data: createSuccessfulStoreObject([]),
        };
        render(): JSX.Element {
            return <div ><Column size={[12, 12, 12, 12]} style={{ background: '#fff' }}>
                <br />
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="" />
                </div>

                <div id="loadedData" style={{ display: 'inherit' }}>
                    <div id="datagroupContainer" style={{ padding: '10px', background: '#fff', paddingBottom: '50px' }}></div>
                </div>

            </Column>
            </div>
        }
    });
}