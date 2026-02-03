namespace EK.Modules.SCV.Pages.scco.Contratistas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Contratistas", "scco");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 10 })
                .addNombre({ width: 30 })
                //.add({ data: "TipoConvenio", title:'Tipo Convenio' width: 20 })
                .addEstatus({ width: 20 })
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