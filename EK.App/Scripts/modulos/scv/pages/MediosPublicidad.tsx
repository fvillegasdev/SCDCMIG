namespace EK.Modules.SCV.Pages.MediosPublicidad {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("mediosPublicidad", "scv");
    export class Vista extends page.Base {
        onFilter(props: page.IProps, filters: any): any {
            let f: any = global.assign(filters, { clave: config.id });
            config.dispatchCatalogoBase("/base/kontrol/CGValores/all/", f);
        };
        onDelete(id: any, props: page.IProps): void {
            dispatchAsyncPut("global-current-entity", "/base/scv/CGValores/Delete/", { id });
        };
        render(): JSX.Element {


            let formatIcono: (data: any, type: any, row: any) => any = (data: any, type: any, row: any) =>
            {
                //if (row.Icono != null)
                //{
                let color: string = row.Color != null ? row.Color : "";

                let bgColor: string = row.BGColor != null ? row.BGColor : "";

                let icono: string = row.Icono != null ? row.Icono : "";

                let estiloPersonalizado: React.CSSProperties = {
                    color: color,
                    backgroundColor: bgColor,
                    fontSize: "15px"
                };

                let keySystem: boolean = row.Sistema && row.Sistema == true ? true : false;
                let stringpadlock: string = keySystem ? "<span style='color:#ffc107;float:right;margin-left:15px;' class='fas fa-lock'></span>" : "";
                    
                let result: string = "<div class='col-lg-12 col-md-12 col-sm-1 col-xs-1'>" +
                    "<span style=' marginRight: 3px; '>" + row.Clave + "</span>" +
                    "<div style= 'float: right;' ><span style='color:" + color + "; backgroud-color:" + bgColor +
                    ";font-size:15px' class='" + icono + "' ></span >" + stringpadlock + "</div>" + "</div > ";

                    return result;
            };

            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "Icono", width: "200px", title: "Clave", render: formatIcono })
                //.addClave({ width: 20, render: formatIcono })
                .addNombre({ width: 70 })
                .addEstatus({ width: 10 })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} onDelete={this.onDelete} >
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    };
}

