namespace EK.Modules.SCV.Pages.SCVDocumentosExpediente {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("documentosExpediente", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 40 })
                .add({ data: "NumeroCopias", width: 20 })
                .add({ data: "TipoDocumento.Nombre", width: 20 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    }
}