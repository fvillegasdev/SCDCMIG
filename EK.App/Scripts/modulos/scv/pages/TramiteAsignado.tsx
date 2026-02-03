namespace EK.Modules.SCV.Pages.TramiteAsignado {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tramiteasignado", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Desarrollo.Clave", title: "Desarrollo", width: 20 })
                .add({ data: "Prototipo.Nombre", title: "Prototipo", width: 20 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} >
                <dt.PageTable columns={columns} />
            </page.Main>;
        }
    }
}