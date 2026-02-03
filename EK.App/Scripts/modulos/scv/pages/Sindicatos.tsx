 //A '.tsx' file enables JSX support in the TypeScript compiler, 
 //for more information see the following page on the TypeScript wiki:
 //https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.Sindicatos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("sindicatos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ data: "Agente.Nombre", width: 20 })
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
