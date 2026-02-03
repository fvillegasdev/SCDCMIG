namespace EK.Modules.SCV.Pages.TramiteAsignado {
    "use strict";
    
    const TRAMITES_ID: string = "Tramites";
    const config: page.IPageConfig = global.createPageConfig("tramiteasignado", "scv", [TRAMITES_ID]);
    const PAGE_ID: string = "Asignacion de trámites";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addEstatus()
                .addObject("Desarrollo")
                .addVersion()
                .addObject("Prototipo")
                .addObject(TRAMITES_ID)
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let idAsign = getDataID(props.entidad);
            if (idAsign < 0) {
                global.dispatchSuccessful("global-page-data", [], TRAMITES_ID);
            }
            else {
                let parametros: any = global.assign({ asignacion: 1, idTramiteAsignado: idAsign });
                //props.config.dispatchCatalogoBase("base/scv/planesPagos/Get/GetListConfiguracionById/", parametros, scv_Planes_Pagos_Configuracion);
                props.config.dispatchCatalogoBase("base/scv/TramiteAsignado/Get/GetTramites/", parametros, TRAMITES_ID);
            }
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>
        }
    };

    const tramitesHeader: JSX.Element =
        <Column size={[12, 12, 12, 12]}>
            <Row>
                <Column size={[9, 9, 9, 9]} className="list-default-header">{"Nombre"}</Column>
                <Column size={[3, 3, 3, 3]} className="list-default-header">{"Asignar"}</Column>
            </Row>
        </Column>

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-book">
                        <Row>
                            <label.EntidadDescripcion id="Desarrollo" />
                            <label.Entidad id="Prototipo" />
                            <TramitesAsignados />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>
        }
    }

    interface ITramitesAsignados extends page.IProps {
        tramites: any;
        tramitesAsignados: any;
        tramitesNoAsignados: any;
        desarrollo?: any;
    };

    //class Edit extends page.Base {
    export let Edit: any = global.connect(class extends React.Component<ITramitesAsignados, ITramitesAsignados>{
        constructor(props: ITramitesAsignados) {
            super(props);
        };

        shouldComponentUpdate(nextProps: ITramitesAsignados, nextState: ITramitesAsignados): boolean {
            return true;
        };
        render(): JSX.Element {
            return <page.Edit>
                <Column>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        collapsed={false}
                        hideCollapseButton={true}
                        icon="fas fa-book">
                        <Row>
                            <ddl.DesarrollosDDL id="Desarrollo" IdFormSection={config.id} size={[12, 12, 12, 12]} />
                            <Prototipos id="Prototipo" addNewItem={"SO"} size={[12, 12, 12, 12]} idFormSection={config.id} addNewItemText={"Todos"} />
                            <TramitesAsignados />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>
        }
    })
    interface IPrototipoPorDesarrollo extends IDropDrownListProps {
        desarrollo?: any;
    }

    export let Prototipos: any = global.connect(class extends React.Component<IPrototipoPorDesarrollo, {}> {
        constructor(props: IPrototipoPorDesarrollo) {
            super(props);
            this.cargarElementos = this.cargarElementos.bind(this);
        }
        static props: any = (state: any) => ({
            items: state.global.PROTOTIPOSPORDESARROLLO,
            desarrollo: Forms.getValue("Desarrollo", config.id, state)
        });
        static defaultProps: IDropDrownListProps = {
            id: "Prototipo",
            items: createDefaultStoreObject([]),
            label: "Prototipo",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        cargarElementos(idDesarrollo: number): void {
            let url: string = global.encodeAllURL("scv", "Prototipos", { idDesarrollo: idDesarrollo, activos: 1 });
            dispatchAsync("load::PROTOTIPOSPORDESARROLLO", url);

        }
        componentDidMount(): void {
            let desarrollo: any = this.props.desarrollo;
            if (!isLoadingOrSuccessful(this.props.items) && desarrollo && desarrollo.ID > 0) {
                this.cargarElementos(desarrollo.ID);
            };
        };
        componentWillReceiveProps(nextProps: IPrototipoPorDesarrollo, nextState: IPrototipoPorDesarrollo): any {
            let desarrollo: any = nextProps.desarrollo;
            if (global.hasChanged(this.props.desarrollo, nextProps.desarrollo) && desarrollo && desarrollo.ID > 0) {
                this.cargarElementos(desarrollo.ID);
            };
        };

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });



    export let TramitesAsignados: any = global.connect(class extends React.Component<ITramitesAsignados, ITramitesAsignados> {
        constructor(props: ITramitesAsignados) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.tramites = Forms.getValue(TRAMITES_ID, config.id);
            return retValue;
        };
        shouldComponentUpdate(nextProps: ITramitesAsignados, nextState: ITramitesAsignados): boolean {
            return global.hasChanged(this.props.tramites, nextProps.tramites);
        };
        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            return <page.SectionList
                id={TRAMITES_ID}
                parent={config.id}
                level={1}
                readOnly={true}
                size={[12, 6, 6, 6]}
                header={tramitesHeader}
                hideNewButton={true}
                readonly={false}
                addRemoveButton={false}
                style={{ paddingTop: '10px' }}
                items={createSuccessfulStoreObject([])}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addVersion()
                        .addNombre()
                        .addBoolean("Asignado")
                        .addEstatus()
                        .toObject();
                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[9, 9, 9, 9]} className="listItem-default-header">
                            <span>{item.Nombre}</span>
                        </Column>
                        <Column size={[3, 3, 3, 3]} className="listItem-default-header">
                            { estadoEntidad ?
                                <span>{EK.UX.Labels.badgeEstatus(item.Asignado)}</span> : 
                                <checkBox.CheckBox id="Asignado" textAlign="center" index={index} property={"Tramites"}
                                    value={item.Asignado} idFormSection={config.id} />
                            }                            
                        </Column>
                    </Row>
                }}>
                <Row>
                    <label.Nombre id="Tramite" />
                    <checkBox.CheckBox id="Asignado" />
                </Row>
            </page.SectionList>
        }
    })
}