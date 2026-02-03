namespace EK.Modules.SCV.Pages.postventa.RUBA.EntregaPaquetes {
    //Entrega Paquetes
    const config: page.IPageConfig = global.createPageConfig("EntregaPaquetes", "scv");
    const PAGE_ID: string = "EntregaPaquetes";
    const SECTION_CONCEPTO_ID: string = "ConsultaVE";

    export class Vista extends page.Base {
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion}>
                <Filtros />
                <ResultView />
            </page.Main>;
        };
    };

    interface IProps extends React.Props<any> {
        item?: any;
        EntregaPaquetesResult?: DataElement;
        isNew?: boolean;
        global?: any;
    }
    interface IState {
        viewMode?: boolean;
    }

    interface IConsultaViviendaEntregableProps extends React.Props<any> {
        EntregaPaquetesResult?: DataElement;
        bloqueado?: any;
    };

    interface ConsultaViviendaEntregableState {

        bloqueado?: any;
    };

    class Filtros extends page.Base {

        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);

            this.onSelectEntregaPaquetesResult = this.onSelectEntregaPaquetesResult.bind(this);
        };

        static props: any = (state: any) => ({

            EntregaPaquetesResult: state.forms[PAGE_ID],
            bloqueado: state.global.TMBloqueado,
            config: global.getPageConfig(state.global.pageConfig)

        });


        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({


        });


        onSelectEntregaPaquetesResult(changeViewMode?: boolean): void {

            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };

            let model: EditForm = Forms.getForm(PAGE_ID);
            let removedItems: number = 0;

            let item: any = model
                .addObject("PlazaInicial")
                .addDate("FechaInicio")
                .addDate("FechaFinal")
                .addObject("Segmentos")
                .addObject("FraccInicial")
                .toObject();

            global.dispatchAsyncPost("global-page-data", "EntregaPaquetes/GetEntregaPaquetes/", item, "EntregaPaquetesResult");

        }

        render(): JSX.Element {

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Entrega Paquetes"}
                    level={1}
                    icon="icon-folder"
                    collapsed={false}>
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            <PlazasDDL id={"PlazaInicial"} size={[3, 3, 3, 3]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                            <input.Date id="FechaInicio" idForm={PAGE_ID} size={[3, 3, 3, 3]} validations={[
                                validations.required()
                            ]} />
                            <input.Date id="FechaFinal" idForm={PAGE_ID} size={[3, 3, 3, 3]} validations={[
                                validations.required()
                            ]} />
                            <TipoViviendaDDL id={"Segmentos"} size={[3, 3, 3, 3]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                        </Column>
                        <Column size={[12, 12, 12, 12]} >
                            <select.Fraccionamientos id={"FraccInicial"} idForm={PAGE_ID} size={[3, 3, 3, 3]} />    
                            <div style={{ marginTop: "15px" }}>
                                <Column size={[11, 11, 11, 11]} > </Column>
                                <Button size={[2, 2, 2, 2]} className="btn btn-lg blue" icon="fa fa-search" onClick={this.onSelectEntregaPaquetesResult} ></Button>
                            </div>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;

        }
    };


    interface IConsultaViviendaEntregableProps extends page.IProps {
        viviendasentregables?: DataElement;
        obtenerViviendaEntregable?: (PlazaInicial: any, PlazaFinal: any, FechaInicial: any, FechaFinal: any, HipotecaVerde: any,
            Equipamiento: any, FraccInicial: any, FraccFinal: any, ClienteIni: any, ClienteFin: any, Segmento: any, ViviendaEntregada: any, Financiamiento: any) => void;
    };

    interface ConsultaViviendaEntregableState {

    };

    let ResultView: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);



        };


        static props: any = (state: any) => ({

            data: state.global.catalogo$EntregaPaquetesResult

        });

        static defaultProps: IConsultaViviendaEntregableProps = {

            data: createSuccessfulStoreObject([]),

        };


        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({


        });

        render(): JSX.Element {
            return <Column size={[12, 12, 12, 12]}>
                <OptionSection
                    title="Detalles Entrega Paquetes"
                    id={SECTION_CONCEPTO_ID}
                    icon="fa fa-table"
                    level={1}
                    collapsed={false}>
                    <PanelUpdate info={this.props.data}>
                    <List
                        items={getData(this.props.data)}
                        readonly={false}
                        addRemoveButton={false}
                        dragAndDrop={false}
                        aggregate={(item: any, values: any) => {

                            return values;
                        }}
                        listFooter={(values: any) => {
                            let iStyle: React.CSSProperties = {
                                backgroundColor: null
                            };
                            return <div>

                            </div>;
                        }}
                        listHeader={<div>
                            <Row>
                                <Column>
                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{}</Column>
                                    <Column size={[4, 4, 4, 4]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs">{"CLIENTE"}</Column>
                                    <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"FRACCIONAMIENTO"}</Column>
                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"ET"}</Column>
                                    <Column size={[1, 1, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm">{"MZ"}</Column>
                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"LT"}</Column>
                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"INT"}</Column>
                                    <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"EXT"}</Column>
                                </Column>
                            </Row>
                        </div>}
                        formatter={(index: number, item: any) => {
                            return <Row style={{ textAlign: "left" }} id={"row_concepto_" + item.numcte} className="panel-collapsed" >
                                <Column size={[12, 12, 12, 12]} className="listItem-default-header">
                                    <Row>
                                        <Column size={[1, 1, 1, 1]} >
                                            <CollapseButton idElement={"row_concepto_" + item.numcte} className="button-panel-plus" collapsedClass="panel-collapsed" collapsedUpIcon="fa fa-caret-up" collapsedDownIcon="fa fa-caret-down" style={null} collapsed={true} iconOnly={true} />
                                        </Column>
                                        <Column size={[4, 4, 4, 4]} className="listItem-left-header hidden-xs bold">
                                            {item.numcte + ' - ' + item.nom_cte + item.ap_paterno_cte + item.ap_materno_cte}
                                        </Column>
                                        <Column size={[2, 2, 2, 2]} className="listItem-right-header">
                                            {item.id_cve_fracc + ' - ' + item.nom_fracc}
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs hidden-sm hidden-md">
                                            {item.id_num_smza}
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs hidden-sm">
                                            {item.id_num_mza}
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header hidden-xs hidden-sm hidden-md">
                                            {item.id_num_lote}
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                            {item.id_num_interior}
                                        </Column>
                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                            {item.id_num_exterior}
                                        </Column>
                                    </Row>
                                </Column>
                                <Row>
                                    <Column
                                        xs={{ size: 11 }}
                                        sm={{ size: 11, offset: 1 }}
                                        md={{ size: 11, offset: 1 }}
                                        lg={{ size: 11, offset: 1 }}
                                        className="panel-detail well well-sm">
                                        <List
                                            items={[item]}
                                            readonly={true}
                                            aggregate={(item: any, values: any) => {

                                                return values;
                                            }}
                                            listHeader={<div>
                                                <Row>
                                                    <Column size={[11, 11, 11, 11]}>
                                                        <Column size={[1, 1, 1, 1]}>{}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"DESC.VIV"}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs">{"LIBERAC."}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"CONSTRUC."}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"PROGRAM."}</Column>
                                                        <Column size={[1, 1, 2, 1]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm">{"F.ENTREGA"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold hidden-xs hidden-sm hidden-md">{"ENTREGA"}</Column>
                                                        <Column size={[1, 1, 1, 1]} style={{ textAlign: "center" }} className="list-default-header bold">{"H.VERDE"}</Column>
                                                        <Column size={[2, 2, 2, 2]} style={{ textAlign: "center" }} className="list-default-header bold">{"GERENTE"}</Column>
                                                    </Column>
                                                </Row>
                                            </div>


                                            }
                                            addRemoveButton={false}
                                            formatter={(index_e: number, item: any): any => {
                                                return <Row id={"row_concepto_" + item.numcte}>
                                                    <Column size={[11, 11, 11, 11]}>
                                                        <Column size={[1, 1, 1, 1]}></Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                            {item.desc_segm}
                                                        </Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                           {item.fec_liberacion}
                                                        </Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                           {item.fecha_construccion}
                                                        </Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                            {item.fecha_programacion}
                                                        </Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                           {item.fecha_entrega}
                                                        </Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                            {item.nom_ent_viv}
                                                        </Column>
                                                        <Column size={[1, 1, 1, 1]} className="listItem-center-header">
                                                            {item.hipoteca_verde ? <i className="fa fa-check"></i>
                                                                : <i className="fas fa-times"></i>
                                                            }
                                                        </Column>
                                                        <Column size={[2, 2, 2, 2]} className="listItem-center-header">
                                                            {item.nom_gerente}
                                                        </Column>
                                                    </Column>

                                                </Row>
                                            }} />
                                    </Column>
                                </Row>
                            </Row>;
                        }} />
                    </PanelUpdate>
                </OptionSection>
            </Column>
        }
    });
};
