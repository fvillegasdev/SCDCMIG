namespace EK.Modules.SCV.Pages.BoletaProspeccion {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("boletasProspeccion", "scv");
    const w: any = window;

    let encontrarEntidad: (id: number) => any = (id: number): any => {
        var entidades = getData(EK.Store.getState().global.currentCatalogo);
        var entidad = null;
        for (var i = 0; i < entidades.length; i++) {
            if (entidades[i].ID == id) {
                entidad = entidades[i];
                break
            }
        }
        return entidad;
    };
    w.mostrarDetalleBoletaDuplicadaCliente = (id) => {
        var entidad = encontrarEntidad(id);
        let detalleDuplicada: string = "<ul class='list-group'>" +
            "<li style='font-size:11px;' class='list-group-item'>Nombre <span  class='badge badge-warning'>" + entidad.CantidadPorNombre + "</span></li>" +
            "<li style='font-size:11px;' class='list-group-item'>CURP <span class='badge badge-danger'>" + entidad.CantidadPorCURP + "</span></li>" +
            "<li style='font-size:11px;' class='list-group-item'>RFC <span class='badge badge-danger'>" + entidad.CantidadPorRFC + "</span></li>" +
            "<li style='font-size:11px;' class='list-group-item'>Correo <span class='badge badge-danger'>" + entidad.CantidadPorCorreo + "</span></li>" +
            "<li style='font-size:11px;' class='list-group-item'>Celular <span class='badge badge-danger'>" + entidad.CantidadPorCelular + "</span></li>" +
          " </ul>";

        let link: any = $("#" +id);
        link.popover({
            trigger: "focus",
            html: true,
            content: detalleDuplicada,
            title: "Coincidencias por cliente",
            container: 'body',
            placement: "right"
        }).dblclick(function () {
            link.popover("hide");
        }).on("mouseenter", function () {
            link.popover("show");
        }).on("mouseleave", function () {
            link.popover("hide");
        }).on("show.bs.popover", function () {
            $(this).data("bs.popover").tip().css("max-width", "800px");
        });
    };
    w.mostrarDetalleBoletaDuplicada = (id) => {
        var entidad = encontrarEntidad(id);
        let parametros: any = global.encodeParameters({ id: entidad.ID, operacion:'ConsultarPorHNombre'});

        global.asyncGet("base/kontrol/boletasProspeccion/Get/GetAll/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
            if (status === AsyncActionTypeEnum.successful) {
                //let detalleDuplicada: string = "<li style='font-size:11px;' class='list-group-item'>Nombre <span  class='badge badge-danger'>" + entidad.CantidadPorNombreBoleta + "</span></li>";
                //for (var i = 0; i < data.length; i++) {
                //    let apellidoPaterno: string = data[i].ApellidoPaterno ? data[i].ApellidoPaterno : "";
                //    let apellidoMaterno: string = data[i].ApellidoMaterno ? data[i].ApellidoMaterno : "";

                //    detalleDuplicada = detalleDuplicada + "<div style='margin:1%'><span  class='badge badge-warning'>" + entidad.CantidadPorNombreBoleta + "</span> " + data[i].Nombre + " " + apellidoPaterno + " " + apellidoMaterno + "</div>";
                //}
                let detalleDuplicada: string = "<li style='font-size:11px;' class='list-group-item'>Nombre <span  class='badge badge-danger'>" + entidad.CantidadPorNombreBoleta + "</span></li>";
                detalleDuplicada = detalleDuplicada + "<li style='font-size:11px;' class='list-group-item'>CURP <span  class='badge badge-danger'>" + entidad.CantidadPorCURPBoleta + "</span></li>";
                detalleDuplicada = detalleDuplicada + "<li style='font-size:11px;' class='list-group-item'>RFC <span class='badge badge-danger'>" + entidad.CantidadPorRFCBoleta + "</span></li>";
                detalleDuplicada = detalleDuplicada + "<li style='font-size:11px;' class='list-group-item'>Correo <span class='badge badge-danger'>" + entidad.CantidadPorCorreoBoleta + "</span></li>";
                detalleDuplicada = detalleDuplicada + "<li style='font-size:11px;' class='list-group-item'>Celular <span class='badge badge-danger'>" + entidad.CantidadPorCelularBoleta + "</span></li>";
                detalleDuplicada = detalleDuplicada+"</ul>";
                    
                let link: any = $("#DB" + id);
                link.popover({
                    trigger: "focus",
                    html: true,
                    content: detalleDuplicada,
                    title: "Coincidencias por Boleta",
                    container: 'body',
                    placement: "right"
                }).click(function () {
                    link.popover("hide");
                }).on("mouseenter", function () {
                    link.popover("show");
                }).on("mouseleave", function () {
                    link.popover("hide");
                }).on("show.bs.popover", function () {
                    $(this).data("bs.popover").tip().css("max-width", "800");
                    $(this).data("bs.popover").tip().css("width", "400px");

                });               
            }
        });

       
    };
    interface IBoletaProspeccionProps extends page.IProps {
        entidad?: any;
        clasificadores?: any;
        boletaAsignada?: any;

    };
    export let Vista: any = global.connect(class extends React.Component<IBoletaProspeccionProps, {}> {
        constructor(props: IBoletaProspeccionProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.id = config.id;
            retValue.entidad = state.global.currentCatalogo;
            retValue.clasificadores = state.global.app;
            retValue.boletaAsignada = state.global.BoletaAsignada;
            return retValue;
        };
        onFilter(props: any, filters: any, type?: string): any {
            //let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);

            let hasfilters: any = JSON.stringify(filters) == '{}' ? true : false;

            let usAsc: any = getData(EK.Store.getState().global.USUARIOSDESCENDIENTES);
            
            if (hasfilters)
            {
                let parametros: any = global.encodeParameters({ clave: 'CAP', clavecatalogo: 'ESTATUSBOLETAPROSPECCION' });

                global.asyncGet("base/kontrol/CatalogosGeneralesValores/Get/GetAll/" + parametros, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        Forms.updateFormElement(config.id + "$filters", "Estatus", { ID: data[0].ID, Clave: 'CAP' });
                        Forms.updateFormElement(config.id + "$filters", "Desarrollo", { ID: -1, Clave: 'Ver Todos' });
                        page.applyFilter(props);
                    }
                });
            }
            else
            {
                //if (f != null && filters.Usuario.ID <=0)
                //{
                //    Forms.updateFormElement(config.id + "$filters", "Usuario", { ID: usAsc[1].ID, Clave: usAsc[1].Clave });
                //    page.applyFilter(props);
                //   // f.IdUsuario = usAsc[1].ID;
                //}

                let fi: any = global.isEmpty(filters) ? null : global.getFilters(filters);

               // dispatchAsync("load::currentCatalogo", "base/scv/boletasProspeccion/all/" + global.encodeObject(f));

                props.config.dispatchCatalogoBasePost("base/scv/boletasProspeccion/GetBP/GetAll", { parametros: fi });


            }
    
        };
        componentDidMount()
        {
            Forms.updateFormElement(config.id, "Propietario", { ID: -1, Clave: 'Usuario actual' });
        }
        shouldComponentUpdate(nextProps: IBoletaProspeccionProps, nextState: IBoletaProspeccionProps): boolean {
            return hasChanged(this.props.entidad, nextProps.entidad);
        };
        componentWillReceiveProps(nextProps: IBoletaProspeccionProps, nextState: IBoletaProspeccionProps): any
        {
            if (global.hasChanged(this.props.boletaAsignada, nextProps.boletaAsignada)) {

                if (isSuccessful(nextProps.boletaAsignada))
                {
                    let boleta: any = getData(nextProps.boletaAsignada);

                    if (boleta && boleta.ID)
                    {
                        if (boleta.IdCliente > 0)
                        {
                            success("Boleta Asignada");
                        }
                        page.applyFilter(this.props);
                    }
                }
            };
        };
        render(): JSX.Element {

            let clasificadores: any = getData(this.props.clasificadores).Clasificadores;

            /* Funcion para la busqueda de clasificadores requeridoa para acciones  */
            let busquedaClasificador: any = (clave: any) => {
                let result: boolean = false;
                for (var i = 0; i < clasificadores.length; i++) {
                    if (clasificadores[i].TipoClasificador.Clave == "ASIGNACIÓN" && clasificadores[i].Clasificador.Clave == clave) {
                        result = true;
                        break;
                    }
                }
                return result;
            };

            /* Asignar una boleta de prospeccion a un cliente con coincidencias */
            let asociacion: boolean = busquedaClasificador("P-ASOCIAR-BOLETA");

            /* Asignar una boleta de prospeccion a cualquier cliente existente */
            let asociacionEspecial: boolean = busquedaClasificador("P-ASOCIACION-ESPECIAL-BOLETA");

            /*Registrar una boleta de prospeccion como un cliente nuevo */
            let registrarBoleta: boolean = busquedaClasificador("P-REGISTRO-BOLETA");
            

            /* Descartar Boleta */
            let descartar: boolean = busquedaClasificador("P-DESCARTAR-BOLETA");


            let tipoAsignacion: string = asociacionEspecial ? "registrarCoincidenciasEspecial" : asociacion ? "registrarCoincidencias" : "";

            let formatNombre: (data: any, row: any, type: any) => any = (data: any, row: any, type: any) =>
            {
                let cantidadCoincidenciasCliente: number = row.CantidadPorCURP + row.CantidadPorRFC + row.CantidadPorCorreo + row.CantidadPorCelular;

                let cantidadCoincidenciasClienteTotal: number = row.CantidadPorNombre + cantidadCoincidenciasCliente;

                /*Registros duplicados  en boleta*/
                let cantidadCoincidenciasBoletasTotal: number = row.CantidadPorNombreBoleta + row.CantidadPorRFCBoleta + row.CantidadPorCURPBoleta + row.CantidadPorCorreoBoleta + row.CantidadPorCelularBoleta;


                //let apellidoPaterno: string = row.ApellidoPaterno ? row.ApellidoPaterno : "";
                //let apellidoMaterno: string = row.ApellidoMaterno ? row.ApellidoMaterno : "";

                return <div key={"fila_N" + row.ID}>

                    <span style={{ marginRight: "3px" }}> {row.NombreCompleto} </span>

                    <div style={{ float: "right" }}>
                        {cantidadCoincidenciasCliente > 0 && row.Estatus.Clave == 'CAP' ?
                            <i style={{ color: "#E65100", fontSize: "13px", marginRight: "5px", marginTop: "2px" }} className='fas fa-exclamation-triangle' ></i > : null}

                        {cantidadCoincidenciasClienteTotal > 0 && row.Estatus.Clave == 'CAP' ?
                            <span id={row.ID} style={{ backgroundColor: "#67809F", fontSize:"13px" }} ref='link' role='button' data-trigger='focus' data-toggle='popover' onMouseEnter={() => window["mostrarDetalleBoletaDuplicadaCliente"]((row.ID))} className='popovers badge'> {cantidadCoincidenciasClienteTotal}</span > : null}

                        {cantidadCoincidenciasBoletasTotal > 0 ?
                            <span id={"DB" + row.ID} style={{ backgroundColor: "#9B59B6", fontSize: "13px" }} ref='link' role='button' data-trigger='focus' data-toggle='popover' onMouseEnter={() => window["mostrarDetalleBoletaDuplicada"]((row.ID))}  className='popovers badge'>{cantidadCoincidenciasBoletasTotal}</span> : null
                        }
                   </div>
                </div>;
            };

            let formatUsuario: (data: any, row: any, type: any) => string = (data: any, row: any, type: any) => {
                return  row.CreadoPor.Nombre + " " + row.CreadoPor.Apellidos;
            };

            let formatAcciones: (data: any, row: any, type: any) => any = (data: any, row: any, type: any) => {
                //Estatus
                let estatus: string = row.Estatus.Clave;

                let cantidadCoincidenciasCliente: number = row.CantidadPorCURP + row.CantidadPorRFC + row.CantidadPorCorreo + row.CantidadPorCelular;
                let registrarWindowFn: string = "$registrarProspectoCliente";
                if (!w[registrarWindowFn]) {
                    w[registrarWindowFn] = (id: number) => {
                        let propietario: any = Forms.getValue("Propietario", config.id);
                        let idAsesor: number = propietario && propietario.ID > 0 ? propietario.IdUsuario : 0;
                        let p: string = global.assign({ IdBoletaProspeccion: id, IdAsesor: idAsesor });

                        global.dispatchAsyncPost("load::BoletaAsignada", "base/scv/boletasProspeccion/GetBP/GenerateCliente/", { parametros: p });
                        dispatchUpdating("global-current-catalogo", []);
                    };
             };

                let registrarCoincidenciasWindowFn: string = "$registrarCoincidenciaProspectoCliente";
                if (!w[registrarCoincidenciasWindowFn]) {
                    w[registrarCoincidenciasWindowFn] = (id: number) => {
                        let valor: any = global.assign({ id: id, accion: tipoAsignacion})
                        dispatchSuccessful("global-current-catalogo", valor, "accion")
                        let modalObject: any = $("#boletaProspeccionModal");
                        modalObject.modal();
                    };
                };

                let descartarWindowFn: string = "DescartarBoletaProspeccion";
                if (!w[descartarWindowFn]) {
                    w[descartarWindowFn] = (id: number) => {
                        let valor: any = global.assign({ id: id, accion: "descartaBoleta" })
                        dispatchSuccessful("global-current-catalogo", valor, "accion")
                        let modalObject: any = $("#boletaProspeccionModal");
                        modalObject.modal();
                    };
                };


                /*Se permite registrar como prospecto Cliente si el estatus es CAP, se tiene un clasificador de asignacion y no existen coincidencias con el catalogo de prospectos-clientes*/
                /*Acciones Registrar*/
                /*Acciones Descartar*/
                return <div key={row.ID+"_Fila"} style={{ textAlign: "center" }}>
                    {estatus == "CAP" && registrarBoleta == true && cantidadCoincidenciasCliente == 0 ?
                        <a style={{ fontSize:"10px" }} className='btn btn-circle green btn-xs' onClick={() => window[registrarWindowFn]((row.ID))} title='Registrar Prospecto Cliente'><i className='fa fa-check'></i></a> :
                        <a style={{ fontSize: "10px" }} className='btn btn-circle grey-salsa btn-xs'><i className='fa fa-check'></i></a>
                    }

                    {estatus == "CAP" && (asociacion || asociacionEspecial) ?
                        <a style={{ fontSize: "10px" }} className='btn btn-circle yellow btn-xs' onClick={() => window[registrarCoincidenciasWindowFn]((row.ID))} title='Asociar Prospecto Cliente'><i className='fa fa-users'></i></a> :
                        <a style={{ fontSize: "10px" }} className='btn btn-circle grey-salsa btn-xs'><i className='fa fa-users'></i></a>
                    }


                    {estatus == "CAP" && descartar == true ?
                        <a style={{ fontSize: "10px" }} className='btn btn-circle red btn-xs' onClick={() => window[descartarWindowFn]((row.ID))} title='Descartar Boleta'><i className='fas fa-times'></i></a> :
                        <a style={{ fontSize: "10px" }} className='btn btn-circle grey-salsa btn-xs' > <i className='fas fa-times'></i></a >
                    }
                    </div>;
            };

            let formatEstatus: (data: any, type: any, row: any) => string = (data: any, type: any, row: any) => {

                let clave: string = data && data.Clave ? data.Clave : "";
                let retValue: any;

                switch (clave) {
                    case "ASIG":
                        retValue = <div className='bg-green-jungle bg-font-green-jungle' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "DE":
                        retValue = <div className='bg-red-flamingo bg-font-red-flamingo' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;
                    case "CAP":
                        retValue = <div className='bg-blue bg-font-blue' style={{ padding: "1px 0px", height: "17px", width: "100%", fontWeight: 600, textAlign: "center" }}>{data.Nombre}</div>
                        break;

                    default:
                        retValue = "";
                        break;
                }

                return retValue;
            };


            let formatMedioPublicidad: (data: any, row: any, type: any) => any = (data: any, row: any, type: any) =>
            {
                if ((row.MedioPublicidad && row.MedioPublicidad.ID) || (row.CampaniaPublicidad && row.CampaniaPublicidad.MedioPublicidad))
                {
                    let color: string = row.CampaniaPublicidad.MedioPublicidad.Color != null ?
                        row.CampaniaPublicidad.MedioPublicidad.Color :
                        row.MedioPublicidad.Color;

                    let bgColor: string = row.CampaniaPublicidad.MedioPublicidad.BGColor != null ?
                        row.CampaniaPublicidad.MedioPublicidad.BGColor :
                        row.MedioPublicidad.BGColor;


                    let icono: string = row.CampaniaPublicidad.MedioPublicidad.Icono != null ?
                        row.CampaniaPublicidad.MedioPublicidad.Icono :
                        row.MedioPublicidad.Icono;


                    let estiloPersonalizado: React.CSSProperties = {
                        color: color,
                        backgroundColor: bgColor,
                        fontSize: "15px"
                    };
                    return <Column size={[12, 12, 1, 1]}>
                        <span style={estiloPersonalizado} className={icono}></span>
                    </Column>
                }
               
                return null;
            };


            let ml: any = config.getML();
            let cliente = ml.form.Cliente.label;

            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "ID", title: "Acciones", width: "150px", format: formatAcciones })
                .addID({ width: "70px", title: "No. B" })

                .add({ data: "MedioPublicidad.Nombre", width: "70px", title: "", format: formatMedioPublicidad })
                .add({ data: "NombreCompleto", width: "300px", title:"Nombre", format: formatNombre })
                .add({ data: "Nombre", hidden: true })
                .add({ data: "ApellidoPaterno", hidden: true })
                .add({ data: "ApellidoMaterno", hidden: true })
                .add({ data: "Origen.Nombre", width: "150px", title:"Origen" })
                .add({ data: "CreadoPor.Nombre", width: "160px", format: formatUsuario })
                .add({ data: "Desarrollo.Descripcion", width: "200px", title:"Desarrollo" })
                .addDateFormat({ width: "150px", data: "Creado" })
                .add({ data: "Correo", width: "150px" })
                .add({ data: "Celular", width: "150px", format: global.formatTelefono })
                .add({ data: "CampaniaPublicidad.Nombre", width: "150px", title:"Campaña de Publicidad" })
                .add({ data: "Estatus", width: "150px", format: formatEstatus })
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} >
                {(registrarBoleta) ?
                    <Row className="ek-sombra" style={{ marginLeft: 0, marginRight: 0, marginBottom: 6, border: "solid 2px #90CAF9", backgroundColor: "#E3F2FD" }}>
                        <Column size={[10, 11, 11, 11]} style={{ marginBottom: "3px", marginLeft:"-15px" }}>
                            <ddl.AgentesDDL label={ml.form.Propietario.label} size={[12, 12, 4, 4]} addNewItem={"SO"} addNewItemText={"Usuario actual"} id={"Propietario"} style={{ backgroundColor: "#E3F2FD" }} usuarioJerarquia={true}/>
                        </Column>
                        <Column size={[2, 1, 1, 1]} style={{ height: 40, paddingTop: 12 }} className="text-right">
                        </Column>
                    </Row>
                    : null
                }

                <page.Filters>
                    <DesarrollosFiltroBoletaDDL size={[12, 12, 4, 4]} id={"Desarrollo"} addNewItem={"VT"} />
                    <ddl.EstatusBoletaProspeccion size={[12, 12, 4, 4]} id={"Estatus"} addNewItem={"VT"} />


                    <input.Date id={"CreadoDesde"}  type="date" size={[12, 2, 2, 2]} label="Fecha Inicio"
                         validations={[
                            validations.lessEqualThan("CreadoHasta", "VIGENCIA, la fecha de inicio debe ser menor a la fecha de finalización")]} />

                    <input.Date id={"CreadoHasta"}  type="date" size={[12, 2, 2, 2]}  label="Fecha Fin"
                        validations={[
                            validations.greaterEqualThan("CreadoDesde", "VIGENCIA, la fecha de fin debe ser menor a la fecha de inicio")]} />

                    <ddl.UsuariosDescendientesDDL size={[12, 3, 3, 3]} id={"Usuario"} addNewItem={"VT"} />
                    <ddl.CampaniaPublicidadDDL size={[12, 3, 3, 3]} addNewItem={"SO"} id={"CampaniaPublicidad"} />
                    <ddl.MediosPublicidadDDL size={[12, 3, 3, 3]} addNewItem={"SO"} id={"MedioPublicidad"} />
                    <OrigenBoletaDDL size={[12, 3, 3, 3]} addNewItem={"SO"} id={"Origen"}/>

                </page.Filters>

                <dt.DataTableExtended dtConfig={dtConfig} />
                <ModalBoletaProspeccion />


            </page.Main>;
        };
    });

    interface IModalBoleta extends page.IProps {
        ml?: string;
        clasificadores?: any;
    };
    let ModalBoletaProspeccion: any = global.connect(class extends React.Component<IModalBoleta, {}>{
        constructor(props: IModalBoleta) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.id = config.id;
            retValue.ml = $ml[config.id];
            retValue.clasificadores = state.global.app;
            retValue.data = state.global.currentCatalogo$accion;
            return retValue;
        };
        onClose(): void {
            dispatchSuccessful("global-current-catalogo", "", "accion")
            let modalObject: any = $("#boletaProspeccionModal");
            modalObject.modal("hide");
        };
        onSelectModal(): void {
            let modalObject: any = $("#boletaProspeccionModal");
            modalObject.modal();
        }
        guardarProspectoCliente(id: number): void
        {
            let ml: any = this.props.ml;
            let cliente: any = Forms.getValue("CienteCoincidencia", config.id);
            let clienteTodos: any = Forms.getValue("Cliente", config.id);
            if (cliente && cliente.ID > 0 && clienteTodos && clienteTodos.ID > 0) {
                warning("Seleccione solamente un cliente")
            }
            else if ( (cliente && cliente.ID > 0) || (clienteTodos && clienteTodos.ID > 0))
            {
                let idcliente: number = cliente && cliente.ID > 0 ? cliente.ID : clienteTodos.ID;
                dispatchAsync("global-current-catalogo", "base/scv/boletasProspeccion/Get/GenerateDeveloment/" + global.encodeObject({ IdBoletaProspeccion: id, IdCliente: idcliente}));
                dispatchSuccessful("global-current-catalogo", "", "accion")
                page.applyFilter(this.props)
                this.onClose();
            }
            else {
                warning(ml.validaciones.RegistrarDesarrollo);
            }
        }
        descartarBoleta(id: number): void {
            let ml: any = this.props.ml;
            let motivo: any = Forms.getValue("Motivo", config.id);
            if (motivo && motivo.ID && motivo.ID > 0) {
                dispatchAsync("global-current-catalogo", "base/scv/boletasProspeccion/Get/RejectBoleta/" + global.encodeObject({ IdBoletaProspeccion: id, IdMotivoRechazo: motivo.ID }));
                dispatchSuccessful("global-current-catalogo", "", "accion")
                page.applyFilter(this.props)
                warning(ml.mensajes.boletaDescartada)
                this.onClose();
            }
            else
            {
                warning(ml.validaciones.DescartarBoleta);
            }

        };
        render(): JSX.Element {
            let data: any = getData(this.props.data);
            let accion: string = data.accion;
            let id: number = data.id;
            let ml: any = this.props.ml;

            let tituloModal: any = accion == "registrarCoincidencias" || accion == "registrarCoincidenciasEspecial" ?
                <div style={{ alignItems: "left", marginBottom: "2%", marginLeft: "1%" }}>
                    <h4 className="modal-title"><span className="fa fa-retweet"></span> {" " +ml.sections.prospectoExistente}</h4>
                </div>
                :
                <div style={{ alignItems: "left", marginBottom: "2%", marginLeft: "1%" }}>
                    <h4 className="modal-title"><span className="fas fa-times-circle"></span> {" " + ml.sections.descartarProspecto}</h4>
                </div>;

            let estiloPersonalizado: React.CSSProperties = {
                height: accion == "descartaBoleta" ? "200px" : "350px"
            };

            return <modal.Modal id="boletaProspeccionModal" header={""} style={estiloPersonalizado}>
                <Row>
                    <div>
                        {accion == "registrarCoincidenciasEspecial" ?
                            <div>
                                <h6 className="modal-title">{tituloModal}</h6>
                                <Asociacion idBoleta={id} />
                            </div> :
                            accion == "registrarCoincidencias" ?
                                <div>
                                    <h6 className="modal-title">{tituloModal}</h6>
                                    <ClientesDDL addNewItem={"SO"} label={ml.form.CienteCoincidencia.label} idBoleta={id} id="CienteCoincidencia" size={[12, 12, 6, 6]} />
                                    <AlertaSinCoincidencias />
                                </div> : null
                        }
                        {accion == "descartaBoleta" ?
                            <div>
                                <h6 className="modal-title">{tituloModal}</h6>
                                <ddl.MotivosRechazoBoletaProspeccion size={[12, 12, 6, 6]} addNewItem={"SO"} />
                            </div> : null
                        }
                    </div>
                    <Column size={[12, 12, 12, 12]} style={{ padding: "15px", textAlign: "right", borderTop: "1px solid #e5e5e5" }}>
                        <button type="button" onClick={this.onClose} className="btn dark btn-outline" style={{ marginRight: "1%" }} data-dismiss="modal">{ml.buttons.cancelar}</button>
                            {accion == "registrarCoincidencias" || accion == "registrarCoincidenciasEspecial" ?
                            <button type="button" className="btn blue" onClick={(e) => this.guardarProspectoCliente(id)} ><i className="fa fa-check"></i> {ml.buttons.aceptar}</button> :
                               accion == "descartaBoleta" ?
                                <button type="button" className="btn red" onClick={(e) => this.descartarBoleta(id)} ><i className="fas fa-times-circle"></i> {ml.buttons.descartar}</button> : null
                            }
                    </Column>
                </Row>
              
            </modal.Modal>
        }
    });

    interface IAsociacion extends React.Props<any> {
        opcion1?: any;
        opcion2?: any;
        idBoleta?: number;
    };
    let Asociacion: any = global.connect(class extends React.Component<IAsociacion, {}>{
        constructor(props: IAsociacion) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            return retValue;
        };
        onChangeAccion(id: any): void {
            if (id == "panel1") {
                $("#panel1").css("backgroundColor", "#dff4f5");
                $("#panel1").css("border", "solid 2px #90CAF9");

                $("#panel2").css("backgroundColor", "#f5f5f5");
                $("#panel2").css("border", "solid 2px #FFFFFF");

                Forms.updateFormElement(config.id, "Cliente", null);
            }
            else
            {
                $("#panel1").css("backgroundColor", "#f5f5f5");
                $("#panel1").css("border", "solid 2px #FFFFFF");


                $("#panel2").css("backgroundColor", "#dff4f5");
                $("#panel2").css("border", "solid 2px #90CAF9");



                Forms.updateFormElement(config.id, "CienteCoincidencia", { ID: -1, Clave: 'Seleccione una opción' });
            }

        };
        render(): JSX.Element {
            let ml: any = config.getML();
            return <Column>
                    <div>
                    <div className="panel-group" id="accordion">
                        <div className="panel panel-default" style={{ marginBottom: "1%" }}>
                            <div className="panel-heading" id="panel1" style={{ border: "solid 2px #90CAF9", backgroundColor: "#E3F2FD" }}>
                                <i className={"fas fa-arrow-alt-circle-right"} style={{ marginRight: "1%" }}></i>
                                <a style={{ fontWeight:300 }} data-toggle="collapse" onClick={(e) => this.onChangeAccion("panel1")} data-parent="#accordion" href="#collapse1">{ml.panelAsociacion.coincidencia}</a>
                            </div>

                                <div id="collapse1" className="panel-collapse collapse in">
                                    <div className="panel-body">
                                    <ClientesDDL addNewItem={"SO"} label={ml.form.CienteCoincidencia.label} idBoleta={this.props.idBoleta} id="CienteCoincidencia" size={[12, 12, 6, 6]} />
                                        <AlertaSinCoincidencias/>
                                </div>
                                </div>

                       </div>

                        <div className="panel panel-default">
                            <div className="panel-heading" id="panel2" >
                                <i className={"fas fa-arrow-alt-circle-right"} style={{ marginRight: "1%" }}></i>
                                <a style={{ fontWeight: 300 }} data-toggle="collapse" onClick={(e) => this.onChangeAccion("panel2")} data-parent="#accordion" href="#collapse2">{ml.panelAsociacion.catalogo}</a>
                                </div>

                                <div id="collapse2" className="panel-collapse collapse">
                                    <div className="panel-body">
                                    <select.SCVClientes label={ml.form.Cliente.label} id="Cliente" size={[12, 12, 6, 6]} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Column>
        }
    });

    interface IAlertaSinCoincidencias extends React.Props<any> {
        elementos?: number;
    };
    let AlertaSinCoincidencias: any = global.connect(class extends React.Component<IAlertaSinCoincidencias, {}>{
        constructor(props: IAlertaSinCoincidencias) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.elementos = state.global.Clientes
            return retValue;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let elementos: any = getData(this.props.elementos);
            if (elementos && elementos.length>0)
            {
                return null;
            }
            return <Column size={[12, 12, 12, 12]}>
                <Column size={[12, 7, 7, 7]} style={{ marginTop: "1%", marginLeft: "-3%", paddingRight:"5%" }}>
                    <EK.Modules.SCV.Pages.ListaPrecios.Alerta mensaje={ml.mensajes.sinCoincidencias} color="Amarillo"/>
                </Column>
            </Column>
        }
    });

    interface ICliente extends IDropDrownListProps {
        idBoleta?: number;
    }
    let ClientesDDL: any = global.connect(class extends React.Component<ICliente, {}> {
        static props: any = (state: any) => ({
            items: state.global.Clientes,
        });
        static defaultProps: ICliente = {
            id: "Cliente",
            items: createDefaultStoreObject([]),
            label: "Cliente",
            helpLabel: "Seleccione el Cliente",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            idBoleta: null,
            itemFormatter: (item, container): any => {
                if (item.ID) {
                    if (item.ID > 0) {
                        let apellidoM: string = item.ApellidoMaterno ? item.ApellidoMaterno : "";
                        return $([
                            "<span class='badge badge-success'>" + item.ID + " " + "</span>",
                            "<span>",
                            item.Nombre + " " + item.ApellidoPaterno + " " + apellidoM + " ",
                            "</span>",
                            "<span class='badge badge-success'>Titular:" + item.Titular.Nombre + " " + item.Titular.Apellidos + "<span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span>"+item.Nombre +"</span>" ].join(""));
                    }
                }
                else if (item.text != "") {
                    return $(["<span class='bold'>", item.text, "</span>"].join(""));
                }
            },
            selectionFormatter: (item): any => {
                if (item.ID) {
                    if (item.ID > 0) {
                        let apellidoM: string = item.ApellidoMaterno ? item.ApellidoMaterno : "";
                        return $([
                            "<span class='badge badge-success'>" + item.ID + " " + "</span>",
                            "<span>",
                            item.Nombre + " " + item.ApellidoPaterno + " " + apellidoM + " ",
                            "</span>",
                            " <span class='badge badge-success'> Titular:" + item.Titular.Nombre + " " + item.Titular.Apellidos + "<span>"
                        ].join(""));
                    }
                    else {
                        return $(["<span>" + item.Nombre + "</span>"].join(""));
                    }
                   
                }
                else if (item.text != "")
                    return item.text;
            }
        };
        componentDidMount(): void {
            Forms.updateFormElement(config.id, "CienteCoincidencia", { ID: -1, Clave: 'Seleccione una opción' });
            global.dispatchSuccessful("load::Clientes", []);
            if (this.props.idBoleta != null && this.props.idBoleta > 0) {
                dispatchAsync("load::Clientes", "base/kontrol/scvClientes/Get/GetAll/" + global.encodeObject({ idBoletaProspeccion: this.props.idBoleta }));
            }
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        }
    });


    export let DesarrollosFiltroBoletaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.DesarrollosFiltroBP
        });
        static defaultProps: IDropDrownListProps = {
            id: "Desarrollo",
            items: createDefaultStoreObject([]),
            label: "Desarrollo",
            helpLabel: "Seleccione un desarrollo",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("scv", "desarrollos", { activos: 1 });
                dispatchAsync("load::DesarrollosFiltroBP", url);
            };
        };
        render(): any
        {
            let itemsModificados: DataElement = this.props.items;

            if (isSuccessful(this.props.items)) {
                let nuevoItem: any = {};
                nuevoItem['ID'] = -2;
                nuevoItem['Nombre'] = 'Sin Desarrollo';
                nuevoItem['Clave'] = 'SD';
                if (itemsModificados.data.length > 0) {
                    let existe = false;
                    let elementos: any = itemsModificados.data;
                    elementos.forEach((Value: any, index: number) => {
                        if (Value.Clave === "SD")
                            existe =true;
                    });
                    if (existe == false) {
                        itemsModificados.data.unshift(nuevoItem);
                    }
                }
            }

            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} items={itemsModificados} />;
        }

    });


    export let OrigenBoletaDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.OrigenLeadDDL
        });
        static defaultProps: IDropDrownListProps = {
            id: "Origen",
            items: createDefaultStoreObject([]),
            label: "Origen",
            helpLabel: "Seleccione un Origen",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
            nuevoItem: undefined,
            cargarDatos: true,
            addNewItem: undefined,
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::OrigenLeadDDL", "catalogos/get(OrigenLead)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}  />;
        }
    });

};
