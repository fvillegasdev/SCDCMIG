namespace EK.Modules.SCV.Pages.paquetes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("paquetes", "scv");

    interface IPaquete extends page.IProps {
        entidadActual?: any;
    };

    export let Vista: any = global.connect(class extends React.Component<IPaquete, IPaquete> {
        constructor(props: IPaquete) {
            super(props);
        }
        static props: any = (state: any) => ({
            entidadActual: state.global.currentEntity,
            config: page.props(state),
        });
        render(): JSX.Element {
            let entidadActual: any = getData(this.props.entidadActual);
            let eliminar: boolean = entidadActual.Estatus && entidadActual.Estatus.Clave == "A" && entidadActual.CantidadUbicaciones==0 ? true : false;

            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                if (row.TipoPersona && row.TipoPersona.Clave === "F") {
                    return row.Nombre + " " + row.ApellidoPaterno + " " + row.ApellidoMaterno;
                }
                else {
                    return data;
                };
            };

            let formatCantidadUbicaciones: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<span class='badge badge-success'>" + row.CantidadUbicaciones + "</span>"
            }
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 60 })
                .add({ data: "CantidadUbicaciones", width: 10, render: formatCantidadUbicaciones })
                .add({ data: "Estatus", width: 20, render: label.formatBadgeFlujo })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} allowDelete={eliminar}>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};