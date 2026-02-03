//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.TmComisiones {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("TMComisiones", "scv");
    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columnus: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 15 })
                .add({ data: "Nombre", width: 30 })
                //.addNaturaleza({ width: 10 })
                //.add({ data: "Naturaleza.Nombre", width: 10 })
                //.add({ data: "Compania.Nombre", width:30 })             
                .addEstatus({ width: 15 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columnus} />
            </page.Main>
        }
    }
}
