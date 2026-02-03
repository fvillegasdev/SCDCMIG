namespace EK.Modules.SCV.Pages.Tramites {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tramites", "scv");

    interface ITramites extends page.IProps {

    };

    export class Vista extends page.Base{
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });

            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .addNombre({ width: 20})
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} >
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};