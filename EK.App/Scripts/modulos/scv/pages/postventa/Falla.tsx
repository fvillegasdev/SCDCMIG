namespace EK.Modules.SCV.Pages.postventa.Falla {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("Fallas", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                //.add({ data: "Siglas", width: 20 })
                .addDescripcion({ width: 30, title:"Nombre" })
                .add({ data: "Impacto.Nombre", width: 35 })
                .add({ data: "TipoFalla.Nombre", width: 35 ,title: "Tipo de componente" })
                //.add({ data: "UsoFalla.Nombre", width: 20 })
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