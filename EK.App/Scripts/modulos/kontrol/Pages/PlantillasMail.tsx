namespace EK.Modules.Kontrol.Pages.Plantillas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("plantillas", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                
                .addClave({ width: 15 })
                .addNombre({ width: 60 })
                .add({data: "Categoria.Nombre", width: 15})
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
};