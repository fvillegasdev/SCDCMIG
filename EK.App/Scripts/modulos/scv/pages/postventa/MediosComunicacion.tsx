namespace EK.Modules.SCV.Pages.postventa.MediosComunicacion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("SPVMEDIOSCOMUNICACION", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });
            var pathRoute = global.getFullUrl("/base/kontrol/CGValores/all/", "");
            config.dispatchCatalogoBase(pathRoute , f);
        };
        onDelete(id: any, props: page.IProps): void {
            var pathRoute = global.getFullUrl("/base/scv/CGValores/Delete/", "");
            dispatchAsyncPut("global-current-entity", pathRoute , { id });
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
