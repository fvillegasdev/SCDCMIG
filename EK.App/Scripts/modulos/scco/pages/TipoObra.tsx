namespace EK.Modules.SCCO.Pages.TipoObra {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TipoObra", "scco");

    interface IFiltroTipoObra extends page.IProps {
        EstadoEntidad: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IFiltroTipoObra, IFiltroTipoObra> {
        onFilter(props: any, filters: any, type?: string): any {

            //if (filters == undefined) {
            //    global.dispatchAsyncPost("load::currentEntity", "base/scco/TipoObra/GetBP/GetAllTipoObra", { "activos":1 });
            //} else {
            //    global.dispatchAsyncPost("load::currentEntity", "base/scco/TipoObra/GetBP/GetAll", { parametros: null });
            //}
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scco/tipoObra/GetBP/GetTipoObra", { parametros: f });
            
        };
        constructor(props: IFiltroTipoObra) {
            super(props);
        }
        
        render(): JSX.Element {
            //let estado:any=
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
}