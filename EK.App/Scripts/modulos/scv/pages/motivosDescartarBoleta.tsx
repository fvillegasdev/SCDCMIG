namespace EK.Modules.SCV.Pages.MotivosDescartarBoleta {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("motivosDescartarBoleta", "scv");
    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: "MOTIVOSRECHAZOBOLETAP" });

            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 60 })
                .addEstatus({ width: 20 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onDelete={this.onDelete}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};