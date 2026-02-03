namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("esquemas", "scv");

    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters);
            props.config.dispatchCatalogoBase("esquemas/all/", f);
        };
        onNew(): any {
            global.go("/scv/esquemas/nuevo");
        };
        onExport(id: any, props: page.IProps): void {
            let idForm: string = [config.id, "filters"].join("$");
            let filters: any = Forms.getValues(idForm);
            let encodedFilters: string = global.encodeObject(filters);
            
            window.open("esquemas/exportar/" + encodedFilters);
        };
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "esquemas/delete", { id });
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 50 })
                .add({ data: "FaseExpediente.Nombre", width: 20 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onNew={this.onNew} onDelete={this.onDelete} onExport={this.onExport}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        }
    }
}