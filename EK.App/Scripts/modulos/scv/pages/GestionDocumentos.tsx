namespace EK.Modules.SCV.Pages.GestionDocumentos {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("GestionDocumentos", "scv");

    export class Vista extends page.Base {
        render(): JSX.Element {

            let formatResponsable: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {
                return "<span>" + row.Seguimiento.Posicion.Usuario.Nombre + "  " + row.Seguimiento.Posicion.Usuario.Apellidos + "</span>"
            }

            let formatEstatus: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {

                let clave: string = data && data.Clave ? data.Clave : "";
                if (data == "") return "";
                let retValue: any;

                switch (clave) {
                    case "NV":
                        retValue = "<div class='bg-blue bg-font-blue' style='padding:1px 0px; height:17px; width: 100%; font-weight: 600; text-align:center'>"+data.Nombre+"</div>";
                        break;
                    case "V":
                        retValue = "<div class='bg-red-flamingo bg-font-red-flamingo' style='padding:1px 0px; height:17px; width: 100%; font-weight: 600; text-align:center'>"+data.Nombre+"</div>";
                        break;
                    case "C":
                        retValue = "<div class='bg-green-jungle bg-font-green-jungle' style='padding:1px 0px; height:17px; width: 100%; font-weight: 600; text-align:center'>"+data.Nombre+"</div>";
                        break;

                    default:
                        retValue = "";
                        break;
                }
                return retValue;
            };

            let formatDocumento: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {

                let documento: string = row && row.KontrolFile && row.KontrolFile.Nombre ? row.KontrolFile.Nombre : "";
                let versionDocumento: string = row.KontrolFile && row.KontrolFile.Version ? "<span class='badge badge-primary'>" + row.KontrolFile.Version+ " </span>" : "";

             

                let w: any = window;
                let documentoVer: string = "$DocumentoModal";

                if (!w[documentoVer]) {
                    w[documentoVer] = (clave: string) => {
                        if (clave != null && clave != "") {
                            global.goModal("modalArchivosDocumento", "SCV/Seguimientos/Expediente/Documento/" + clave, "nuevo");
                        }
                        else
                        {
                            warning("Documento sin clave");
                        }
                    };
                };

                return versionDocumento+ " <a tarjet='_blank' onClick=\"window." + documentoVer + "('"+row.KontrolFile.Clave +"');\">"+documento+"</a>";
            };




            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addID({ data: "ID", title: "N° Exp ", width: 15 })
                .add({ data: "Categoria.Nombre", title: "Categoria ", width: 30 })
                .add({ data: "KontrolFile.Nombre", width: 30, render: formatDocumento })
                .add({ data: "Seguimiento", width: 20, render: formatResponsable })
                .add({ data: "Estatus", width: 10, render: formatEstatus })
                .toArray();
            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>

                    <input.Integer label="FOLIO" id="ID" size={[4, 1, 1, 1]} />
                    <ddl.DocumentosCategoriaDDL size={[6, 6, 6, 4]} id={"Categoria"} addNewItem={"SO"} />
                    <input.Text label="Documento" id="Documento" size={[4, 2, 2, 2]} />
                    <ddl.EstatusDocumentosDDL size={[6, 6, 2, 2]} id={"Estatus"} addNewItem={"SO"} />
                    <ddl.UsuariosDescendientesDDL size={[6, 6, 2, 2]} id={"Responsable"} addNewItem={"SO"} label="Responsable" />
                </page.Filters>


                <dt.PageTable columns={columns} />
                <modal.Modal id={"modalArchivosDocumento"} url={"about:blank"}></modal.Modal>


            </page.Main>;
        }

      };
    }
