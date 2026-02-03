//A '.tsx' file enables JSX support in the TypeScript compiler, 
//for more information see the following page on the TypeScript wiki:
//https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.Kontrol.Pages.GruposUsuario {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("gruposusuario", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columnus: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 20 })
                .add({ data: "Descripcion", width: 20})
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columnus} />
            </page.Main>
        };
    };
};