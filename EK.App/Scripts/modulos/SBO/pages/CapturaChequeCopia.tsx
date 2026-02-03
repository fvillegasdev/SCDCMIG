/// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />
/// <reference path="../../../../Scripts/components/Breadcrumb.tsx" />
/// <reference path="../../../../Scripts/components/Buttons.tsx" />
/// <reference path="../../../../Scripts/components/Icon.tsx" />
/// <reference path="../../../../Scripts/components/Page.tsx" />
/// <reference path="../../../../Scripts/components/Portlet.tsx" />
/// <reference path="../../../../Scripts/components/store/Dispatchs.ts" />

namespace EK.Modules.SBO.Pages {
    "use strict";

    const idForm: string = "capturacheque"

    interface IChequesProps extends React.Props<any> {
        cargaDatos: () => void;
        setSelected: (item: any) => void;
        global?: any;
        
    }

    export class PageCapturaChequeC extends React.Component<IChequesProps, IChequesProps> {
        constructor(props: IChequesProps) {
            super(props);

            this.onSelectedChanged = this.onSelectedChanged.bind(this);
        }

        shouldComponentUpdate(nextProps: IChequesProps, nextState: IChequesProps): boolean {
            return false;
        }

        onSelectedChanged(item: any): void {
            this.props.setSelected(item);
            
        }

        componentDidMount(): any {
            let state: any = EK.Store.getState();
          this.props.cargaDatos();

        }

        render(): JSX.Element {
            let itemsBC: any = [
                { text: "SBO", link: "/" },
                { text: "Procesos Diarios", link: "/" },
                { text: "Cheques", link: "/capturacheque" }
            ];

            let dateFormat: (data: Date, type: any, row: any) => string = (data: any, type: any, row: any) => {
                var pad: string = "00";
                return (data !== undefined || data !== null) ?
                    (pad + data.getDate().toString()).slice(-pad.length) + "/" +
                    (pad + (data.getMonth() + 1).toString()).slice(-pad.length) + "/" +
                    data.getFullYear() : "";
            };

            let currencyFormat: (data: number, type: any, row: any) => string = (data: any, type: any, row: any) => {
                var pad: string = "00";
                return (data !== undefined || data !== null) ?
                    data.replace(/[$,]/g, '') : data;
            };


            let columns: any[] = [
                { "title": "Cheque", "data": "NumeroCheque" },
                { "title": "Banco", "data": "Banco.Descripcion" },
                { "title": "Cuenta", "data": "CuentaBancaria.Descripcion" },
                { "title": "Descripción", "data": "Descripcion" },
                { "title": "Fecha", "data": "FechaMovimiento", "render": dateFormat },
                {"title": "Monto", "data": "Monto"},
                { title: "Estatus", data: "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
            ];

            // create the page component
            let page: JSX.Element =
                <Page id="SBO006" >
                    <PageBar>
                        <Breadcrumb data={itemsBC} />
                    </PageBar>
                    <Row>
                        <LeftColumn>
                            <PageToolbar>
                                <PageTitle title="Administración de Cheques" />
                                <ButtonGroup>
                                    <ViewButton />
                                    <NewButton />
                                </ButtonGroup>
                            </PageToolbar>
                            <TableCheques id="tblCheques" columns={columns} onRowSelected={this.onSelectedChanged} />
                        </LeftColumn>
                        <RightColumn>
                            <PortletTab id="filtros">
                                <PortletTabPane title="Filtros" icon="fa fa-filter" >
                                    <DatePicker id="FechaInicio" label="Fecha de Inicio" size={[12, 12, 12, 12]} />
                                    <DatePicker id="FechaFin" label="Fecha de Final" size={[12, 12, 12, 12]} />
                                    <FilterButton icon={"fa fa-table"}
                                        iconOnly={false}
                                        inverse={false}
                                        color={ColorEnum.greenSharp}
                                        text="Consultar" />                       
                                </PortletTabPane>
                            </PortletTab>
                        </RightColumn>
                    </Row>
                </Page>;
            return page;
        }
    }
     const tableChequesProps: any = (state: any): any => {
         return {
             data: state.cheques.cheques
         };
     };


    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            setSelected: (item: any): void => {
                dispatchDefault("SBO-cheques-setSelected", item);
            },
            cargaDatos: (): void => {
                dispatchAsync("SBO-cheques-catalogo", "Cheques/GetCheques/");
            }
        };
    };

    const mapViewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                dispatch(EK.Global.action("forms-reset-state", { idForm }));
                go("sbo/procesos/capturacheque/" + info.selected.ID);
            }
        }
    };

    const mapViewButtonProps: any = (state: any) => {
        return {
            info: {
                selected: state.cheques.setSelected.data
            },
            visible: state.cheques.setSelected.data.ID !== undefined
        };
    };

    const mapNewButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => go("sbo/procesos/capturacheque/nuevo")
        };
    };

    // 
    // connect
    // 
    export let CapturaChequePageC: any = ReactRedux.connect(null, mapDispatchs)(PageCapturaChequeC);
    let TableCheques: any = ReactRedux.connect(tableChequesProps, null)(DataTableExt);
   let ViewButton: any = ReactRedux.connect(mapViewButtonProps, mapViewButtonDispatchs)(EK.UX.Buttons.ViewButton);
    let NewButton: any = ReactRedux.connect(null, mapNewButtonDispatchs)(EK.UX.Buttons.NewButton);
    let FilterButton: any = ReactRedux.connect(null, null)(Button);
}