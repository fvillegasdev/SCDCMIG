namespace EK.Modules.SCV.Pages.Clientes {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("scvclientes", "scv");


    export class Vista extends page.Base {
        onFilter(props: any, filters: any): any {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/ScvClientes/GetBP/GetAll", { parametros: f });
        };
        constructor(props: page.IProps) {
            super(props);
            this.onclick = this.onclick.bind(this);
        };
        onclick(item: any) {
            let itemFinal: Element;
            itemFinal = item;
            dispatchSuccessful("load::Cliente_Expediente_Seleccionado", itemFinal);
        };
        componentWillUnmount() {
        }
        
        render(): JSX.Element {
            let ml: any = config.getML();
            let formatNombre: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                if (row.TipoPersona && row.TipoPersona.Clave === "F") {
                    return row.Nombre + " " + row.ApellidoPaterno + " " + row.ApellidoMaterno ;
                }
                else {
                    return data;
                };
            };

            let formatNombreTitular: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                let nombre = "Usuario Sin Posición";
                let Color = "badge badge-danger";

                if (row.Posiciones && row.Posiciones.Clave) {
                    nombre = row.Posiciones.Nombre;
                    Color = "badge badge-success";
                }
                let nombreTitular: string = row.Titular ? row.Titular.Nombre? row.Titular.Nombre + " " + row.Titular.Apellidos:"":"";
                return nombreTitular + " " + "<div class='" + Color + "'>" + nombre + "</div>";
            };
           

            let formatCantidadExpedientes: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                var ruta = row.CantidadExpedientes == 0 ? "/#/scv/clientes" : "../#/scv/expedientes?cliente=" + row.ID;
                return "<div class='btn green-meadow btn-circle  btn-xs col-md-4'> <a style='color:white'  href='" + ruta + "' >" + row.CantidadExpedientes + "</a></div>";
            };

            

            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ width: 5 })
                .add({ data: "TipoPersona.Nombre", width: 10 })
                .add({ data: "RFC", width: 13 })
                .add({ data: "Nombre", width: 20, render: formatNombre })
                .add({ data: "Agente", width: 32, render: formatNombreTitular })
                .addDate({ width: 10, data: "Creado" })
                .add({ data: "CantidadExpedientes", width: 10, render: formatCantidadExpedientes })
                .addEstatus({ width: 10 })
                .toArray();
            let urlAddress: string;
            if (global.isSuccessful(this.props.entidad)) {
                urlAddress = "/SCV/Clientes/Direccion/" + global.getData(this.props.entidad).Domicilio;
            }
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter}>
                <page.Filters>
                    
                    <ddl.DesarrollosDDL size={[12, 12, 4, 4]} addNewItem={"VT"} />
                    <ddl.UsuariosDescendientesDDL size={[12, 12, 4, 4]} id={"Usuario"} addNewItem={"VT"} label="Titular" />
                    <ddl.EstatusDDL size={[12, 4, 2, 2]} addNewItem={"VT"}/>
                    <ddl.EstatusClienteDDL size={[12, 4, 2, 2]} addNewItem={"VT"}  label="Estatus Prospección"/>

                    <input.Date id={"CreadoDesde"} type="date" size={[12, 2, 2, 2]} label="Fecha Inicio"
                        validations={[validations.lessEqualThan("CreadoHasta", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")]} />

                    <input.Date id={"CreadoHasta"} type="date" size={[12, 2, 2, 2]} label="Fecha Fin"
                        validations={[validations.greaterEqualThan("CreadoDesde", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")]} />

                </page.Filters>
                <dt.PageTable columns={columns} onRowSelected={this.onclick} />
            </page.Main>;
        };
    };
};