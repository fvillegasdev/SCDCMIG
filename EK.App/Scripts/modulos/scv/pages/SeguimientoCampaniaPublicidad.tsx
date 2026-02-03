namespace EK.Modules.SCV.Pages.SeguimientoCampaniaPublicidad {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("SeguimientoCampaniaPublicidad", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 30 })
                .add({ title: "Medio Publicidad", width: 20, data: "MedioPublicidad.Nombre" })
                .add({ title: "Estado Campaña", width: 20, data: "EstadoCampania.Nombre" })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}