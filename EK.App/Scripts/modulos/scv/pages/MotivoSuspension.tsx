namespace EK.Modules.SCV.Pages.MotivoSuspension {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("motivosuspension", "scv");

    interface IFiltroMotSus extends page.IProps
    {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroMotSus, IFiltroMotSus> {
        onFilter(props: any, filters: any, type?: string)
        {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/motivoSuspension/GetBP/GetMotivoSuspension", { parametros: f });
        }
        //onFilter(props: page.IProps, filters: any): any {
        //    let f: any = global.assign(filters, { clave: config.id });

        //    config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        //};
        //onDelete(id: any, props: page.IProps): void {
        //    dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        //};
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} /*onDelete={this.onDelete}*/>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};