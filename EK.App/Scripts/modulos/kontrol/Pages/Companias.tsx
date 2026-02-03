namespace EK.Modules.Kontrol.Pages.Companias {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("companias", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 10 })
                .add({ data: "Rfc", width: 20 })
                .addNombre({ width: 60 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} allowDelete={false}
                allowEdit={false}
                allowNew={false}>
                <page.Filters>
                    <buttons.EstatusFilter />
                    <buttons.BooleanFilter id="Vivienda" defaultState={-1} onValue={1} offValue={0} noneValue={-1} />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
};