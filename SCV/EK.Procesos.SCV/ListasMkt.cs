using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV
{
    public class ListasMkt
    : p.Kontrol.BPBase<m.SCV.Interfaces.IListasMkt, d.SCV.Interfaces.IListasMkt>,
    p.SCV.Interfaces.IListasMkt
    {
        public ListasMkt(m.Kontrol.Interfaces.IContainerFactory factory,
            d.SCV.Interfaces.IListasMkt dao)
            : base(factory, dao, "scv_ListasMkt")
        {
        }


        public async Task<m.SCV.Interfaces.IListasMkt> GetByListaMktId(Dictionary<string, object> parametros)
        {
            return await this.dao.GetByListaMktId(parametros);
        }

        public override async Task<m.SCV.Interfaces.IListasMkt> Save(m.SCV.Interfaces.IListasMkt item)
        {
            //Obteniendo IdListaMarketing

            var elementoRecibido = item;

            item.fGenerada = Today();
            //Guardardo elemento actual
            item = await base.saveModel(item);
            var daoListasMarketing = Get<d.SCV.Interfaces.IListasMktDet>();

            int IdListaMkt = item.ID ?? 0;


            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");


            //EntidadesAdicionales
            try
            {
                var daoConfiguracionCriterios = Get<d.SCV.Interfaces.IListasMktDet>();
                var daoSeleccionarCriterios = Get<d.SCV.Interfaces.ICriterios>();
                var ConfiguracionCriterios = Get<m.SCV.Interfaces.IListasMktDet>();
                var daoConfiguracionClientes = Get<d.SCV.Interfaces.IListaMarketingCliente>();
                //Obtener ID para Clientes que cumplan con los criterios 
                var ConfiguracionClientes = Get<m.SCV.Interfaces.IListaMarketingCliente>();
                //Elimina Registros anteriores para la ListaMarketing 
                await daoConfiguracionCriterios.Delete(IdListaMkt, "IdListaMkt", "scv_ListasMktDet");



                    //Guardar Informacion Adicional
                    if ((ConfiguracionCriterios != null))
                    {
                        if (IdListaMkt >= -1)
                        {
                            ConfiguracionCriterios.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                            ConfiguracionCriterios.Estatus = estatus;
                            ConfiguracionCriterios.IdEstatus = elementoRecibido.IdEstatus;
                            ConfiguracionCriterios.Creado = DateTime.UtcNow;
                            ConfiguracionCriterios.IdCreadoPor = base.getUserId();
                            ConfiguracionCriterios.Version = elementoRecibido.Version;
                            ConfiguracionCriterios.IdListaMkt = IdListaMkt;

                        if (elementoRecibido.FechaInicial != null)
                        {
                            DateTime fFecha = (elementoRecibido.FechaInicial.Value).ToUniversalTime();
                            var day = fFecha.Day;
                            var month = fFecha.Month;
                            string Month = month.ToString();
                            string Day = day.ToString();
                            if (month < 10)
                            {
                                Month = "0" + Month;
                            }
                            else
                            {
                                Month = month.ToString();
                            }
                            if (day < 10)
                            {
                                Day = "0" + day;
                            }
                            else
                            {
                                Day = day.ToString();
                            }
                            var year = fFecha.Year;
                            var sFecha = (year + "-" + Month + "-" + Day + " 00:00:00.000");
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("FechaInicial");
                            ConfiguracionCriterios.Valor = sFecha;
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.FechaFinal != null)
                        {
                            DateTime fFecha = (elementoRecibido.FechaFinal.Value).ToUniversalTime();
                            var day = fFecha.Day;
                            var month = fFecha.Month;
                            string Month = month.ToString();
                            string Day = day.ToString();
                            if (month < 10)
                            {
                                Month = "0" + Month;
                            }
                            else
                            {
                                Month = month.ToString();
                            }
                            if (day < 10)
                            {
                                Day = "0" + day;
                            }
                            else { 
                                Day = day.ToString();
                            }
                            var year = fFecha.Year;
                            var sFecha = (year + "-" + Month + "-" + Day + " 00:00:00.000");
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("FechaFinal");
                            ConfiguracionCriterios.Valor = sFecha;
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Genero != null)
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Genero");
                            ConfiguracionCriterios.Valor = elementoRecibido.Genero.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Regimen != null && elementoRecibido.Origen.Clave != "BP")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Regimen");
                            ConfiguracionCriterios.Valor = elementoRecibido.Regimen.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.TipoPersona != null)
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("TipoPersona");
                            ConfiguracionCriterios.Valor = elementoRecibido.TipoPersona.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Giro != null)
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Giro");
                            ConfiguracionCriterios.Valor = elementoRecibido.Giro.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.EstadoCivil != null && elementoRecibido.Origen.Clave != "BP")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("EstadoCivil");
                            ConfiguracionCriterios.Valor = elementoRecibido.EstadoCivil.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Empresa != null && elementoRecibido.Origen.Clave != "BP")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Empresa");
                            ConfiguracionCriterios.Valor = elementoRecibido.Empresa.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.RangoIngresos != null && elementoRecibido.Origen.Clave != "BP" && elementoRecibido.RangoIngresos.Clave != "-1")                         {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("RangoIngresos");
                            ConfiguracionCriterios.Valor = elementoRecibido.RangoIngresos.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Desarrollo != null) 
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Desarrollo");
                            ConfiguracionCriterios.Valor = elementoRecibido.Desarrollo.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Ciudad != null)
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Ciudad");
                            ConfiguracionCriterios.Valor = elementoRecibido.Ciudad.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }


                        if (elementoRecibido.Etapa != null && elementoRecibido.Origen.Clave != "BP" && elementoRecibido.Etapa.Clave != "-1")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Etapa");
                            ConfiguracionCriterios.Valor = elementoRecibido.Etapa.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.AreaOrganizacion != null && elementoRecibido.Origen.Clave == "USR" && elementoRecibido.AreaOrganizacion.Clave != "-1")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("AreaOrganizacion");
                            ConfiguracionCriterios.Valor = elementoRecibido.AreaOrganizacion.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Posicion != null && elementoRecibido.Origen.Clave == "USR" && elementoRecibido.Posicion.Clave != "-1")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Posicion");
                            ConfiguracionCriterios.Valor = elementoRecibido.Posicion.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.Grupo != null && elementoRecibido.Origen.Clave == "USR" && elementoRecibido.Grupo.Clave != "-1")
                        {
                            ////Obtiene el ID para el criterio 
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("Grupo");
                            ConfiguracionCriterios.Valor = elementoRecibido.Grupo.ID.ToString();
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.VigenciaInicio != null)
                        {
                            DateTime fFecha = (elementoRecibido.VigenciaInicio.Value).ToUniversalTime();
                            var day = fFecha.Day;
                            var month = fFecha.Month;
                            string Month = month.ToString();
                            string Day = day.ToString();
                            if (month < 10)
                            {
                                Month = "0" + Month;
                            }
                            else
                            {
                                Month = month.ToString();
                            }
                            if (day < 10)
                            {
                                Day = "0" + day;
                            }
                            else
                            {
                                Day = day.ToString();
                            }
                            var year = fFecha.Year;
                            var sFecha = (year + "-" + Month + "-" + Day + " 00:00:00.000");
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("VigenciaInicio");
                            ConfiguracionCriterios.Valor = sFecha;
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }

                        if (elementoRecibido.VigenciaFin != null)
                        {
                            DateTime fFecha = (elementoRecibido.VigenciaFin.Value).ToUniversalTime();
                            var day = fFecha.Day;
                            var month = fFecha.Month;
                            string Month = month.ToString();
                            string Day = day.ToString();
                            if (month < 10)
                            {
                                Month = "0" + Month;
                            }
                            else
                            {
                                Month = month.ToString();
                            }
                            if (day < 10)
                            {
                                Day = "0" + day;
                            }
                            else
                            {
                                Day = day.ToString();
                            }
                            var year = fFecha.Year;
                            var sFecha = (year + "-" + Month + "-" + Day + " 00:00:00.000");
                            var nombreCriterio = await daoSeleccionarCriterios.GetByClave("VigenciaFin");
                            ConfiguracionCriterios.Valor = sFecha;
                            ConfiguracionCriterios.IdCriterio = nombreCriterio.ID.ToString();
                            await daoConfiguracionCriterios.SaveEntity(ConfiguracionCriterios, false, true);
                        }



                        /*  ---------------------------------------------------------------  */


                        //Elimina Registros anteriores para la ListaMarketing 
                        await daoConfiguracionClientes.Delete(IdListaMkt, "IdListaMkt", "scv_ListaMarketingCliente");


                        var parametros = new Dictionary<string, object> { { "IdLista", IdListaMkt } };
                        var ClientesRet = await daoConfiguracionClientes.GetAll(parametros);

                        if (ConfiguracionClientes != null && ClientesRet != null)
                        {
                            //Informacion adicional Clientes
                            ConfiguracionClientes.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                            ConfiguracionClientes.IdListaMkt = IdListaMkt;
                            ConfiguracionClientes.Estatus = estatus;
                            ConfiguracionClientes.IdEstatus = elementoRecibido.IdEstatus;
                            ConfiguracionClientes.Creado = DateTime.UtcNow;
                            ConfiguracionClientes.IdCreadoPor = base.getUserId();

                            if (elementoRecibido.Origen.Clave == "CLI" || elementoRecibido.Origen.Clave == "PROS")
                            {
                                for (var i = 0; i < ClientesRet.Count; i++)
                                {
                                    ConfiguracionClientes.IdCliente = ClientesRet[i].Cliente.ID;
                                    await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                                }
                            }
                            if (elementoRecibido.Origen.Clave == "BP")
                            { 
                                for (var i = 0; i < ClientesRet.Count; i++)
                                {
                                    ConfiguracionClientes.IdCliente = ClientesRet[i].Boleta.ID;
                                    await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                                }
                            }
                            if (elementoRecibido.Origen.Clave == "USR")
                            {
                                for (var i = 0; i < ClientesRet.Count; i++)
                                {
                                    ConfiguracionClientes.IdCliente = ClientesRet[i].Usuario.ID;
                                    await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                                }
                            }
                            var ConfiguracionLista = Get<m.SCV.Interfaces.IListasMkt>();
                            var daoConfiguracionLista = Get<d.SCV.Interfaces.IListasMkt>();
                            ConfiguracionLista.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                            ConfiguracionLista = await daoConfiguracionLista.GetById(IdListaMkt);
                            ConfiguracionLista.Alcance = ClientesRet.Count;
                            item = await base.saveModel(ConfiguracionLista);

                        }

                    }
                }

            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }
            return item;
        }

        public async Task<int> actualizarDetalle(Dictionary<string, object> parametros)
        {
            var daoConfiguracionClientes = Get<d.SCV.Interfaces.IListaMarketingCliente>();
            var ConfiguracionClientes = Get<m.SCV.Interfaces.IListaMarketingCliente>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            object ListaID = string.Empty;
            object origenClave = string.Empty;
            parametros.TryGetValue("id", out ListaID);
            parametros.TryGetValue("origen", out origenClave);
            string Origen = origenClave.ToString();
            int IdListaMkt = Convert.ToInt32(ListaID);

            //Elimina Registros anteriores para la ListaMarketing 
            await daoConfiguracionClientes.Delete( IdListaMkt, "IdListaMkt", "scv_ListaMarketingCliente");


            var parameters = new Dictionary<string, object> { { "IdLista", IdListaMkt } };
            var ClientesRet = await daoConfiguracionClientes.GetAll(parameters);

            if (ConfiguracionClientes != null && ClientesRet != null)
            {
                //Informacion adicional Clientes
                ConfiguracionClientes.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                ConfiguracionClientes.IdListaMkt = IdListaMkt;
                ConfiguracionClientes.Estatus = estatus;
                ConfiguracionClientes.IdEstatus = estatus.ID;
                ConfiguracionClientes.Creado = DateTime.UtcNow;
                ConfiguracionClientes.IdCreadoPor = base.getUserId();

                if (Origen == "USR")
                {
                    for (var i = 0; i < ClientesRet.Count; i++)
                    {
                        ConfiguracionClientes.IdCliente = ClientesRet[i].Usuario.ID;
                        await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                    }
                }
                else if(Origen != "BP")
                {
                    for (var i = 0; i < ClientesRet.Count; i++)
                    {
                        ConfiguracionClientes.IdCliente = ClientesRet[i].Cliente.ID;
                        await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                    }
                }else
                {
                    for (var i = 0; i < ClientesRet.Count; i++)
                    {
                        ConfiguracionClientes.IdCliente = ClientesRet[i].Boleta.ID;
                        await daoConfiguracionClientes.SaveEntity(ConfiguracionClientes, false, true);
                    }
                }
            }
        

            var ConfiguracionLista = Get<m.SCV.Interfaces.IListasMkt>();
            var daoConfiguracionLista = Get<d.SCV.Interfaces.IListasMkt>();
            ConfiguracionLista.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
            ConfiguracionLista = await daoConfiguracionLista.GetById(IdListaMkt);
            ConfiguracionLista.fGenerada = Today();
            ConfiguracionLista.Alcance = ClientesRet.Count;
            ConfiguracionLista = await base.saveModel(ConfiguracionLista);


            return 0;
        }
    }



}