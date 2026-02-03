// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.CaracteristicaAdicional {
    "use strict";
    const PAGE_ID: string = "caracteristicaAdicional";
    const PAGE_MODULO: string = "scv";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, PAGE_MODULO);

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .add({ data: "TipoCaracteristica.Nombre", width: 20 }) 
                .add({ data: "TipoEntidad.Nombre", width: 20 }) 
                .addEstatus({ data:"Escriturado", width: 20})               
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };

    //const PAGE_ID: string = "caracteristicaAdicional";

    //interface IProps extends React.Props<any> {
    //    setSelected: (item: any) => void;
    //    obtenerCatalogo: () => void;
    //    items?: any;
    //};

    //export class PageCaracteristicaAdicional extends React.Component<IProps, IProps> {
    //    constructor(props: IProps) {
    //        super(props);
    //        this.onSelectedChanged = this.onSelectedChanged.bind(this);
    //    }

    //    onSelectedChanged(item: any): void {
    //        this.props.setSelected(item);
    //    }

    //    shouldComponentUpdate(nextProps: IProps, nextState: IProps): boolean {
    //        return true;
    //    }

    //    componentDidMount(): any {
    //        setCurrentEntityType(PAGE_ID);
    //        if (!isLoadingOrSuccessful(this.props.items)) {
    //            this.props.obtenerCatalogo();
    //        };
    //    }

    //    render(): JSX.Element {
    //        let $page: any = $ml[PAGE_ID];
    //        let $bc: any = $ml.bc;
    //        let bc: any = [$bc.global.ek, $bc.scv.cg, $bc.scv.caracteristicaAdicional];

    //        let columns: any[] = [
    //            { "title": $page.consulta.grid.headers.clave, "data": "Clave" },
    //            { "title": $page.consulta.grid.headers.nombre, "data": "Nombre" },
    //            { "title": $page.consulta.grid.headers.tipo, "data": "TipoCaracteristica.Nombre" },
    //            { "title": $page.consulta.grid.headers.tipoEntidad, "data": "TipoEntidad.Nombre" },
    //            { "title": $page.consulta.grid.headers.escriturado, "data": "Escriturado", render: EK.UX.Labels.formatBadgeOk },
    //            { "title": $page.consulta.grid.headers.estatus, "data": "Estatus", render: EK.UX.Labels.formatBadgeEstatus }
    //        ];

    //        let page: JSX.Element =
    //            <PageV2 id={PAGE_ID} breadcrumb={bc} title={$page.consulta.title}>
    //                <PageButtons>
    //                    <ExcelButton linkTo={"CaracteristicaAdicional/Exportar"} />
    //                    <PrintButton linkTo={"CaracteristicaAdicional/Imprimir"} />
    //                    <ViewButton />
    //                    <NewButton />
    //                </PageButtons>
    //                <PageTable columns={columns} onRowSelected={this.onSelectedChanged} />
    //            </PageV2>
    //        return page;
    //    }
    //};

    //class ViewButton extends React.Component<{}, {}> {
    //    static props: any = (state: any) => ({
    //        info: state.caracteristicaAdicional.selected,
    //        visible: isSuccessful(state.caracteristicaAdicional.selected)
    //    });

    //    static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
    //        onClick: (info: any): void => go("/scv/caracteristicaAdicional/" + info.data.ID)
    //    });

    //    component: any =
    //    ReactRedux.connect(ViewButton.props, ViewButton.dispatchs)(EK.UX.Buttons.ViewButton);

    //    render(): any {
    //        return <this.component {...this.props} />
    //    };
    //};

    //class NewButton extends React.Component<{}, {}> {
    //    static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
    //        onClick: (info: any): void => go("/scv/caracteristicaAdicional/nuevo")
    //    });

    //    component: any =
    //    ReactRedux.connect(null, NewButton.dispatchs)(EK.UX.Buttons.NewButton);

    //    render(): any {
    //        return <this.component {...this.props} />;
    //    };
    //};

    //class PageTable extends React.Component<any, any>{
    //    static props: any = (state: any) => ({
    //        data: state.caracteristicaAdicional.catalog,
    //        selectedItem: state.caracteristicaAdicional.selected.data
    //    });

    //    component: any =
    //    ReactRedux.connect(PageTable.props, null)(DataTableExt);

    //    render(): any {
    //        return <this.component {...this.props} />;
    //    };
    //};

    //class $caracteristicaAdicionalPage {
    //    static props: any = (state: any): any => {
    //        return {
    //            items: state.caracteristicaAdicional.catalog
    //        };
    //    };

    //    static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
    //        setSelected: (item: any): void => {
    //            let selected: any = item ? item : createFailedStoreObject({});
    //            dispatchSuccessful("caracteristicaAdicional-setSelected", selected);
    //            setCurrentEntity(selected);
    //        },
    //        obtenerCatalogo: (): any => {
    //            let key: string = "CaracteristicaAdicional/GetAll(0)";
    //            dispatchAsync("caracteristicaAdicional-catalog", key);
    //        }
    //    });
    //};

    //export const Consulta: any =
    //    ReactRedux.connect($caracteristicaAdicionalPage.props,
    //        $caracteristicaAdicionalPage.dispatchs)(PageCaracteristicaAdicional);
}