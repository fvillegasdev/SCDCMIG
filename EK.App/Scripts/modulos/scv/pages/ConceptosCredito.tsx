namespace EK.Modules.SCV.Pages.ConceptosCredito {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("conceptosCredito", "scv");

    interface IFiltroConCred extends page.IProps
    {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroConCred, IFiltroConCred> {
        //onFilter(props: page.IProps, filters: any): any {
        //    let f: any = global.assign(filters, { clave: config.id });

        //    config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        //};
        //onDelete(id: any, props: page.IProps): void {
        //    dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        //};
        onFilter(props: any, filters: any, type?: string) {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/conceptosCredito/GetBP/GetConceptosCredito", {parametros : f});
        }

        constructor(props: IFiltroConCred) {
            super(props);
        }

        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 60 })
                .add({ data: "TipoConcepto.Nombre", width: 20 })
                .addEstatus({ width: 20 })
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
};