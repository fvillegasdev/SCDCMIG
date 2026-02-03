namespace EK.Modules.SCV.Pages.postventa.MotivosCancelacionPV {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("MotivosCancelacionPV", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 5 })
                .addClave({ width: 15 })
                .addNombre({ width: 40 })
                .add({ data: "Uso.Nombre", width: 15 })
                .add({ data: "Motivo.Nombre", width: 15 })
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