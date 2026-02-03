namespace EK.Modules.SCV.Pages.UbicacionEstatus {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("ubicacionEstatus", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 50 })
                .add({ data: "Naturaleza.Nombre", width: 20})
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                    <ddl.EstatusDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <NaturalezaUbicacionesPDDL size={[12, 3, 3, 3]} addNewItem={"SO"} />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};

