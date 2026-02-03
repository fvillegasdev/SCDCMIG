using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class Clientes
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICliente, d.SCV.Interfaces.IClientes>, p.SCV.Interfaces.IClientes
    {
        public Clientes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IClientes dao)
               : base(factory, dao, "scvclientes")
        {
        }

        #region Public Functions



        public async Task<m.SCV.Interfaces.ICliente> GetByClienteId(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuarioEnCurso", base.getUserId());
            return await this.dao.GetByClienteId(parametros);
        }        
        public override async Task<object[]> Export(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuarioEnCurso", base.getUserId());
            return await this.dao.Export(parametros);
        }
        public override async Task<object[]> Search(string criteria)
        {
            var parameters = new Dictionary<string, object>()
                {
                    { "search", criteria },
                    { "idUsuario", base.getUserId() }
                };

            return await this.dao.Search(parameters);
        }
        public async Task<object> GetByCliente(Dictionary<string, object> parametros)
        {
            return await this.dao.GetByCliente(parametros);
        }

        private string codificaNombre(string nombre, string apPaterno, string apMaterno) {
            string retValue = $"{nombre}{apPaterno}{apMaterno}";
            //
            retValue = retValue.ToLower();
            retValue = Regex.Replace(retValue, @"[^\w]", "");
            //
            retValue = base.GetSHA1String(retValue);
            //
            return retValue;
        }

        public override async Task<m.SCV.Interfaces.ICliente> Save(m.SCV.Interfaces.ICliente item)
        {
           try
           {
            BeginTransaction(true);

            var referencias = item.Referencias;
            var refLaborales = item.RefLaborales;
            var scv_clientes_Asesores = item.Asesores;
            var telefonos = item.Telefonos;
            var correos = item.Correos;
            var CUSTOMFORM = item.CUSTOMFORM;
            var bitacora = item.Bitacora;
            var boletas = item.Boletas;

            var daoA = Get<d.SCV.Interfaces.IClienteAsesores>();

            var bpBitacora = Get<p.Kontrol.Interfaces.IBitacora>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            int idCliente = -1;

           bool clienteNuevo = item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo ? true : false;

           var estatus = await bpEstatus.Get("ESTATUS", "A");


                if (clienteNuevo)
                {
                    item.Prospecto = false;
                    item.IdEstatus = estatus.ID;
                }

                /*El estatus de un cliente  al iniciar es contacto*/
                
                var estatusCliente = await bpEstatus.Get("ESTATUSCLIENTE", "CON");
                item.HNombre = this.codificaNombre(item.Nombre, item.ApellidoPaterno, item.ApellidoMaterno);
                item.IdEstatusCliente = estatusCliente.ID.Value;
                item.FechaContacto = DateTime.Now;
                item = await base.saveModel(item);

                idCliente = item.ID ?? 0;

                /*Guardar boletas de prospeccion*/
                await this.SaveBoletas(boletas,item);

                /*Se guardarn las referencias*/
                await this.SaveReferencias(referencias, idCliente);

                /* Se guardan las referencias laborales*/
                await this.SaveReferenciasLaborales(refLaborales, idCliente);
                

                /*Guardar Contactos*/
                var tipoContactoTelefono = await bpEstatus.Get("TIPOCONTACTO", "TELEFONO");

                if (telefonos != null && telefonos.Count > 0)
                {
                    var telefonoNoPrincipales = telefonos.FindAll(x => x.Titular == false);
                    var telefonoPrincipales = telefonos.FindAll(x => x.Titular == true);

                    await this.SaveContactos(telefonoNoPrincipales, idCliente, (int)tipoContactoTelefono.ID);
                    await this.SaveContactos(telefonoPrincipales, idCliente, (int)tipoContactoTelefono.ID);
                }

                if (correos != null && correos.Count > 0)
                {
                    var correosNoPrincipales = correos.FindAll(x => x.Titular == false);
                    var correosPrincipales = correos.FindAll(x => x.Titular == true);

                    var tipoContactoCorreo = await bpEstatus.Get("TIPOCONTACTO", "CORREO");
                    await this.SaveContactos(correosNoPrincipales, idCliente, (int)tipoContactoCorreo.ID);
                    await this.SaveContactos(correosPrincipales, idCliente, (int)tipoContactoCorreo.ID);
                }

                /*Se guardan los asesores de cliente*/
                if (scv_clientes_Asesores != null && scv_clientes_Asesores.Count > 0)
                {
                    /*Obtener agente titular del cliente*/
                    var agenteTitular = await daoA.ObtenerTitularPorCliente(idCliente);

                    foreach (var r in scv_clientes_Asesores)
                    {
                        if (r.ID < 1)
                        {
                            r.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                        }
                        if (r.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            r.IdCliente = idCliente;
                            r.Estatus = estatus;
                            r.IdEstatus = estatus.ID;
                            r.Modificado = DateTime.UtcNow;
                            r.IdModificadoPor = base.getUserId();

                            if (r.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                r.Creado = DateTime.UtcNow;
                                r.IdCreadoPor = base.getUserId();
                            }

                            if (r.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoA.Delete(r.ID.Value, "scv_clientes_Asesores");
                            }
                            else
                            {
                                await daoA.SaveEntity(r, false, true);

                                /*Añadiendo elemento a bitacora (Cambio de agente titular)*/
                                if (agenteTitular != null && (agenteTitular.IdUsuario != r.IdUsuario) && (r.Titular == true))
                                {
                                    string titularOrginal = agenteTitular.Usuario.Nombre;
                                    string titularNuevo = r.Usuario.Nombre;

                                    /*Registro en bitacora la autorizacion del proceso*/
                                    await bpBitacora.SaveBitacora("Cambio de Agente titular de " + titularOrginal + " a " + titularNuevo,
                                                                  "scvclientes", "CATBT-SI-CAT", idCliente, "scvclientes", idCliente, null);
                                }

                            }
                        }


                    }
                }

                var param = new Dictionary<string, object> { { "idCliente", idCliente } };

                var clientesAsesores = await this.GetAsesoresClientes(param);

                if(clientesAsesores==null || clientesAsesores.Count==0)
                {

                    /*Si no hay asesores se agrega el usuario actual*/
                    var asesorCreador = Get<m.SCV.Interfaces.IClienteAsesores>();
                    asesorCreador.IdCliente = idCliente;
                    asesorCreador.ID = 0;
                    asesorCreador.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    asesorCreador.IdUsuario = base.getUserId();
                    asesorCreador.Estatus = estatus;
                    asesorCreador.IdEstatus = estatus.ID;
                    asesorCreador.Titular = true;
                    asesorCreador.Creado = DateTime.UtcNow;
                    asesorCreador.IdCreadoPor = base.getUserId();
                    asesorCreador.Modificado = DateTime.UtcNow;
                    asesorCreador.IdModificadoPor = base.getUserId();
                    await daoA.SaveEntity(asesorCreador, false, true);
                }

                /*Almacenar informacion de los campos personalizados*/
                if (CUSTOMFORM != null && CUSTOMFORM.Count > 0)
                {
                    var CustomForm = Get<p.Kontrol.Interfaces.IPersonalizarCampos>();
                    await CustomForm.SaveCustomForm(CUSTOMFORM, idCliente);
                }


               
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            return item;
        }

        public async Task<string> GetRFC(Dictionary<string, object> parametros)
        {
            object apPaterno = string.Empty;
            object apMaterno = string.Empty;
            object nombre = string.Empty;
            object fechaNacimiento = DateTime.Today;

            parametros.TryGetValue("ApellidoPaterno", out apPaterno);
            parametros.TryGetValue("ApellidoMaterno", out apMaterno);
            parametros.TryGetValue("Nombre", out nombre);
            parametros.TryGetValue("FechaNacimiento", out fechaNacimiento);

            return await Task.FromResult<string>(
                EK.Common.Procesos.MXTools.GenerateRFC(
                    Convert.ToString(apPaterno),
                    Convert.ToString(apMaterno),
                    Convert.ToString(nombre),
                    Convert.ToDateTime(fechaNacimiento)));
        }
        public async Task<string> GetCURP(Dictionary<string, object> parametros)
        {
            object apPaterno = string.Empty;
            object apMaterno = string.Empty;
            object nombre = string.Empty;
            object fechaNacimiento = DateTime.Today;
            dynamic estado = null;
            dynamic pais = null;
            dynamic genero = null;

            parametros.TryGetValue("ApellidoPaterno", out apPaterno);
            parametros.TryGetValue("ApellidoMaterno", out apMaterno);
            parametros.TryGetValue("Nombre", out nombre);
            parametros.TryGetValue("FechaNacimiento", out fechaNacimiento);
            parametros.TryGetValue("EstadoOrigen", out estado);
            parametros.TryGetValue("PaisOrigen", out pais);
            parametros.TryGetValue("Genero", out genero);

            var IdEstado = (estado.ID == null || estado == null ? 0 : estado.ID);
            var IdLocalidad = Convert.ToInt32(IdEstado);
            //Acceder capa datos de Localidades
            var daoA = Get<d.Kontrol.Interfaces.ILocalidades>();
            //Obtener Localidad Por Id
            var localidad = await daoA.obtenerLocalidadPorId(IdLocalidad);
            if (localidad != null)
            {
                if (localidad.ID > 0 && localidad.ID != null)
                {
                    estado.Tipo = localidad.Tipo;
                    //estado.Padre.Clave = localidad.Padre.Clave;
                }
            }

            string claveEstado = string.Empty;
            if (pais != null && pais.Clave != "MEX") {

                claveEstado = "NE";
            }
            else
            {
                if (estado != null)
                {
                    if (estado.Tipo != "E" && estado.Padre != null)
                    {
                        //claveEstado = estado.Padre.Clave;
                        claveEstado = localidad.Padre.Clave;
                    }
                    else
                    {
                        claveEstado = estado.Clave;
                    }
                }
            }

            string claveGenero = string.Empty;
            if (genero != null)
            {
                claveGenero = genero.Clave;
            }

            return await Task.FromResult<string>(
                EK.Common.Procesos.MXTools.GenerateCURP(
                    Convert.ToString(apPaterno),
                    Convert.ToString(apMaterno),
                    Convert.ToString(nombre),
                    Convert.ToDateTime(fechaNacimiento), 
                    claveGenero, 
                    claveEstado));
        }
        public async Task<List<m.SCV.Interfaces.IClienteReferencia>> GetReferencias(Dictionary<string, object> parametros)
        {
            var daoRP = Get<d.SCV.Interfaces.IClienteReferencia>();

            return await daoRP.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IClienteRefLaboral>> GetReferenciasLaborales(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteRefLaboral>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IClienteDesarrollos>> GetDesarrollosClientes(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteDesarrollo>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IClienteContactos>> GetContactoClientes(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteContacto>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IClienteAsesores>> GetAsesoresClientes(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClienteAsesores>();

            return await daoRL.GetAll(parametros);
        }
        public async Task<m.SCV.Interfaces.IConyuge> GetConyugeById(int id)
        {
            return await Task.FromResult((dynamic)new object());
        }
        public async Task<m.SCV.Interfaces.IClienteAdicional> GetInformacionAdicional(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAdicionalById(Convert.ToInt32(parametros["id"]));
        }
        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClientes>();
            if (parametros == null) {
                var p = new Dictionary<string, object>();
                p.Add("idUsuarioEnCurso", base.getUserId());
                return await daoRL.GetAllClientes(p);
            }
            parametros.Add("idUsuarioEnCurso", base.getUserId());
            return await daoRL.GetAllClientes(parametros);
        }
        public async Task<object> GetClientWithoutFile(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.IClientes>();
            parametros.Remove("operacion");
            parametros.Add("idUsuario", base.getUserId());
            return await daoRL.GetClientWithoutFile(parametros);
        }
        public async Task<m.SCV.Interfaces.ICliente> UpdateProspecto(int idCliente,string claveEstatus)
       {
            m.SCV.Interfaces.ICliente retValue = null;

            try
            {
                // BeginTransaction();
                var bpEstatusCliente = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
               // var mBitacora = Get<EK.Modelo.SCV.Interfaces.IBitacora>();
                var pBitacora = Get<EK.Procesos.Kontrol.Interfaces.IBitacora>();
                var estatusCliente = await bpEstatusCliente.Get("ESTATUSCLIENTE", claveEstatus);
                bool actualizar = false;

                var cliente = await this.GetById(idCliente);
                string estatusOriginal = cliente.EstatusCliente.Nombre;

                //Si el cliente es prospecto se convierte en cliente.
                if (cliente != null && estatusCliente!=null)
                {
                    cliente.IdEstatusCliente = estatusCliente.ID.Value;
                    cliente.Changed("IdEstatusCliente", true);

                    if (claveEstatus == "CLI" && (cliente.EstatusCliente.Clave!=claveEstatus))
                    {
                        cliente.FechaCliente = DateTime.UtcNow;
                        cliente.Changed("FechaCliente", true);
                        actualizar = true;
                    }

                    else if (claveEstatus == "PROPS" && cliente.EstatusCliente.Clave== "CON")
                    {
                        cliente.FechaProspecto = DateTime.UtcNow;
                        cliente.Changed("FechaProspecto", true);
                        actualizar = true;
                    }

                    if (actualizar == true)
                    {
                        var clienteActualizado = await this.dao.SaveEntity(cliente, false);

                        //Regresamos la informacion del cliente ya con el Estatus Actualizado.
                        retValue = await this.GetById(idCliente);

                        /*Registro en bitacora la autorizacion del proceso*/
                        await pBitacora.SaveBitacora("Cambio de estatus prospecto cliente de "+estatusOriginal+" a "+ estatusCliente.Nombre, "scvclientes", "CATBT-SI-CEP", idCliente, "scvclientes", idCliente, null);
                    }
                }

                //Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return retValue;
        }
        #endregion Public Functions
        #region Private Functions


        public async Task<m.SCV.Interfaces.IClienteContactos> GetContactoClienteById(int id)
        {
            var daoContactoCliente = Get<d.SCV.Interfaces.IClienteContacto>();
            return await daoContactoCliente.GetById(id);

        }
        //protected override Task Log(IBaseKontrol obj)
        //{
        //    return base.Log(obj);
        //}
        //private async Task Log(m.SCV.Interfaces.ICliente obj)
        //{
        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;


        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = obj.ModificadoPor.ID;
        //    entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

        //    await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
        //}

        //private async Task LogAdicionales(miSCV.IClienteAdicional obj)
        //{
        //    dynamic entity = new ElasticEntity();

        //    entity.ID = obj.ID;


        //    entity.IdEstatus = obj.Estatus.ID;
        //    entity.IdEstatusClave = obj.Estatus.Clave;
        //    entity.IdEstatusNombre = obj.Estatus.Nombre;

        //    entity.RecordType = Convert.ToInt32(obj.Estado);
        //    entity.RecordTypeName = obj.Estado.ToString();

        //    entity.Creado = obj.Creado;
        //    entity.IdCreadoPor = obj.CreadoPor.ID;
        //    entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

        //    entity.Modificado = obj.Modificado;
        //    entity.IdModificadoPor = obj.ModificadoPor.ID;
        //    entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

        //    await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
        //}
        #endregion Private Functions


        public  async Task<bool> ExistsContacto(Dictionary<string, object> parametros)
        {
            var daoClienteContacto = Get<d.SCV.Interfaces.IClienteContacto>();

            var retValue = false;
            int? idItem = 0;
            if (parametros != null)
            {
                if (parametros.ContainsKey("ID"))
                {
                    idItem = Convert.ToInt32(parametros["ID"]);
                    //
                    parametros.Remove("ID");
                    //
                }
            }

            
            List<m.SCV.Interfaces.IClienteContactos> items = await daoClienteContacto.GetAll(parametros);

            if (items != null)
            {
                if (items.Count > 0)
                {
                    foreach (var item in items)
                    {
                        if (item.ID != idItem)
                        {
                            retValue = true;
                            break;
                        }
                    }
                }
            }

            return retValue;
        }


        public async Task<List<m.SCV.Interfaces.IBoletasProspecccion>> GetBoletasProspeccionPorCliente(Dictionary<string, object> parametros)
        {
            object idCliente;
            parametros.TryGetValue("idCliente", out idCliente);

            var bpBoleta = Get<p.SCV.Interfaces.IBoletasProspeccion>();
            var moBoleta = Get<m.SCV.Interfaces.IBoletasProspecccion>();


            var boletasProspeccion = await bpBoleta.GetAll(parametros);

            var cliente = await this.GetById(Convert.ToInt32(idCliente));

            return boletasProspeccion;
        }

        public async Task<bool> SaveBoletas(List<m.SCV.Interfaces.IBoletasProspecccion> items, m.SCV.Interfaces.ICliente cliente)
        {
            try
            {
                BeginTransaction(true);
                var result = true;

                if (items != null && items.Count > 0)
                {
                    var daoBoleta = Get<d.SCV.Interfaces.IBoletasProspeccion>();
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUSBOLETAPROSPECCION", "ASIG");

                    foreach (var item in items)
                    {
                        if (item.ID < 0)
                        {
                            var CUSTOMFORM = item.CUSTOMFORM;

                            var boleta = Get<m.SCV.Interfaces.IBoletasProspecccion>();

                            /*Informacion de kontrol*/
                            boleta.ID = -1;
                            boleta.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            boleta.IdEstatus = estatus.ID;
                            boleta.Creado = DateTime.UtcNow;
                            boleta.Modificado = DateTime.UtcNow;
                            boleta.FechaAccion = DateTime.UtcNow;

                            boleta.IdCreadoPor = base.getUserId();
                            boleta.IdModificadoPor = base.getUserId();
                            boleta.IdUsuarioAccion = base.getUserId();



                            /*Informacion dela boleta*/
                            boleta.Nombre = cliente.Nombre;
                            boleta.ApellidoPaterno = cliente.ApellidoPaterno;
                            boleta.ApellidoMaterno = cliente.ApellidoMaterno;
                            boleta.FechaNacimiento = cliente.FechaNacimiento;
                            boleta.Domicilio = cliente.Domicilio;
                            boleta.FechaNacimiento = cliente.FechaNacimiento;
                            boleta.NSS = cliente.NSS;
                            boleta.CURP = cliente.CURP;
                            boleta.RFC = cliente.RFC;
                            boleta.IdTipoPersona = cliente.IdTipoPersona;
                            boleta.IdCliente = cliente.ID;
                            boleta.IdDesarrollo = item.IdDesarrollo;
                            boleta.IdMedioPublicidad =item.IdMedioPublicidad;
                            boleta.IdCampaniaPublicidad = item.IdCampaniaPublicidad;
                            boleta.IdPuntoVenta =item.IdPuntoVenta;
                            boleta.HNombre = this.codificaNombre(cliente.Nombre, cliente.ApellidoPaterno, cliente.ApellidoMaterno);
                            boleta.IdTipoFinanciamiento = item.IdTipoFinanciamiento;
                            boleta = await daoBoleta.SaveEntity(boleta, true);

                            int IdBoleta = boleta.ID >= 1 ? Convert.ToInt32(boleta.ID) : 0;

                            /*Almacenar informacion de los campos personalizados*/
                            if (CUSTOMFORM != null && CUSTOMFORM.Count > 0)
                            {
                                var CustomForm = Get<p.Kontrol.Interfaces.IPersonalizarCampos>();
                                await CustomForm.SaveCustomForm(CUSTOMFORM, IdBoleta);
                            }

                        }

                    }
                }

                Commit();
                return result;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<bool> SaveContactos(List<m.SCV.Interfaces.IClienteContactos> items, int idCliente, int idTipoContacto)
        {
            try
            {
                BeginTransaction(true);
                var result = true;

                var daoT = Get<d.SCV.Interfaces.IClienteContacto>();

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                foreach (var item in items)
                {
                    if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        item.IdCliente = idCliente;
                        item.Estatus = estatus;
                        item.IdEstatus = estatus.ID;
                        item.Modificado = DateTime.UtcNow;
                        item.IdModificadoPor = base.getUserId();

                        if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {


                            item.IdTipoContacto = idTipoContacto;
                            item.Creado = DateTime.UtcNow;
                            item.IdCreadoPor = base.getUserId();
                        }

                        if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoT.Delete(item.ID.Value);
                        }
                        else
                        {
                            await daoT.SaveEntity(item, false, true);
                        }
                    }
                }


                Commit();
                return result;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<bool> SaveReferencias(List<m.SCV.Interfaces.IClienteReferencia> items, int idCliente)
        {
            try
            {
                BeginTransaction(true);
                var result = true;

                var daoRP = Get<d.SCV.Interfaces.IClienteReferencia>();
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                if (items != null && items.Count > 0)
                {
                    foreach (var item in items)
                    {

                        if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            item.IdCliente = idCliente;
                            item.Estatus = estatus;
                            item.IdEstatus = estatus.ID;
                            item.Modificado = DateTime.UtcNow;
                            item.IdModificadoPor = base.getUserId();

                            if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                item.Creado = DateTime.UtcNow;
                                item.IdCreadoPor = base.getUserId();
                            }

                            if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoRP.Delete(item.ID.Value);
                            }
                            else
                            {
                                await daoRP.SaveEntity(item, false, true);
                            }
                        }
                    }
                }

                Commit();
                return result;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        public async Task<bool> SaveReferenciasLaborales(List<m.SCV.Interfaces.IClienteRefLaboral> items, int idCliente)
        {
            try
            {
                BeginTransaction(true);
                var result = true;

                var daoRL = Get<d.SCV.Interfaces.IClienteRefLaboral>();
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                if (items != null && items.Count > 0)
                {
                    foreach (var item in items)
                    {
                        if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            item.IdCliente = idCliente;
                            item.Estatus = estatus;
                            item.IdEstatus = estatus.ID;
                            item.Modificado = DateTime.UtcNow;
                            item.IdModificadoPor = base.getUserId();

                            if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                item.Creado = DateTime.UtcNow;
                                item.IdCreadoPor = base.getUserId();
                            }

                            if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoRL.Delete(item.ID.Value);
                            }
                            else
                            {
                                await daoRL.SaveEntity(item, false, true);
                            }
                        }
                    }
                }

                Commit();
                return result;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }


        #region "Clientes Asesores"

        public async Task<object> ObtenerAsesoresPorCliente(Dictionary<string, object> parametros)
        {
            var daoAsesores = Get<d.SCV.Interfaces.IClienteAsesores>();
            return await daoAsesores.ObtenerAsesoresCliente(parametros);
        }
        #endregion





    }
}
