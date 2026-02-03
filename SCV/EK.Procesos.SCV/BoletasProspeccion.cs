using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace EK.Procesos.SCV
{
    public class BoletasProspeccion
        : p.Kontrol.BPBase<m.SCV.Interfaces.IBoletasProspecccion, d.SCV.Interfaces.IBoletasProspeccion>, p.SCV.Interfaces.IBoletasProspeccion
    {
        public BoletasProspeccion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IBoletasProspeccion dao)
            : base(factory, dao, "boletasProspeccion")
        {
        }

        public override async Task<object[]> Export(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuarioEnCurso", base.getUserId());
            return await this.dao.Export(parametros);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Giro = obj.Giro;
            entity.Correo = obj.Correo;
            entity.Telefono = obj.Telefono;
        }
        private string codificaNombre(string nombre, string apPaterno, string apMaterno)
        {
            string retValue = $"{nombre}{apPaterno}{apMaterno}";
            //
            retValue = retValue.ToLower();
            retValue = Regex.Replace(retValue, @"[^\w]", "");
            //
            retValue = base.GetSHA1String(retValue);
            //
            return retValue;
        }
        public override async Task<m.SCV.Interfaces.IBoletasProspecccion> Save(m.SCV.Interfaces.IBoletasProspecccion item)
        {
            var CUSTOMFORM = item.CUSTOMFORM;
            int IdBoleta = item.ID >= 1 ? Convert.ToInt32(item.ID) : 0;


            try
            {
                BeginTransaction(true);
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    var estatus = await bpEstatus.Get("ESTATUSBOLETAPROSPECCION", "CAP");
                    item.IdEstatus = estatus.ID;
                }
                item.HNombre = this.codificaNombre(item.Nombre, item.ApellidoPaterno, item.ApellidoMaterno);

                /*Origen de la boleta de prospeccion por aplicacion*/
                if (item.ID < 1)
                {
                    var origenLead = await bpEstatus.Get("OrigenLead", "APLI");
                    item.IdOrigen = origenLead.ID;
                }

                item = await base.saveModel(item);

                /*Almacenar informacion de los campos personalizados*/
                if (CUSTOMFORM != null && CUSTOMFORM.Count > 0)
                {
                    var CustomForm = Get<p.Kontrol.Interfaces.IPersonalizarCampos>();
                    await CustomForm.SaveCustomForm(CUSTOMFORM, IdBoleta);
                }

                Commit();
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
            return item;
        }

        public async Task<m.SCV.Interfaces.IBoletasProspecccion> GetByBoletaProspectoId(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuarioEnCurso", base.getUserId());
            return await this.dao.GetByIdBoleta(parametros);
        }
      
        public new  async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("IdUsuarioEnCurso", base.getUserId());
            return await this.dao.GetAllBoleta(parametros);
        }

        public async Task<m.SCV.Interfaces.IBoletasProspecccion> GenerateCliente(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);

            string traceinfo = "";

            int idBoletaProspeccion = Convert.ToInt32(parametros["IdBoletaProspeccion"]);
            int? idAsesor = Convert.ToInt32(parametros["IdAsesor"]);

            //Instancia Procesos de negocio
            var bpClientes = Get<EK.Procesos.SCV.Interfaces.IClientes>();
            var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            //Instancia Modelos
            var mClientes = Get<EK.Modelo.SCV.Interfaces.ICliente>();
            var mboletaProspeccion = Get<EK.Modelo.SCV.Interfaces.IBoletasProspecccion>();
            var mClienteContactoCorreo = Get<EK.Modelo.SCV.Interfaces.IClienteContactos>();
            var mClienteContactoTelefono = Get<EK.Modelo.SCV.Interfaces.IClienteContactos>();
            var mClienteContactoCelular = Get<EK.Modelo.SCV.Interfaces.IClienteContactos>();
            var mClienteAsesor = Get<EK.Modelo.SCV.Interfaces.IClienteAsesores>();
            var mClienteDesarrollo = Get<EK.Modelo.SCV.Interfaces.IClienteDesarrollos>();
            var mBitacora = Get<EK.Modelo.Kontrol.Interfaces.IBitacora>();
            mClientes.Telefonos = new List<m.SCV.Interfaces.IClienteContactos>();


            //Obteniendo Boleta de prospeccion por Id
            mboletaProspeccion = await dao.GetById(idBoletaProspeccion);

            if(mboletaProspeccion.IdDesarrollo <0 || mboletaProspeccion.IdDesarrollo==null)
            {
                base.SetReturnInfo(1, "La boleta de prospección no cuenta con un desarrollo", 1);
                return mboletaProspeccion;
            }

            traceinfo = "GetByIdBoleta";

            int? idTipoPersona = mboletaProspeccion.IdTipoPersona;
            var estatus = await bpCatalogoG.Get("ESTATUS", "A");
            var estatusCliente = await bpCatalogoG.Get("ESTATUSCLIENTE", "CON");
            var estatusBoletaProspeccion = await bpCatalogoG.Get("ESTATUSBOLETAPROSPECCION", "ASIG");

            if (mboletaProspeccion.IdTipoPersona == null)
            {
                var tipoPersona = await bpCatalogoG.Get("SCVTIPOPERSONA", "F");
                idTipoPersona = tipoPersona.ID;
            }

            mClientes.ID = - 1;
            mClientes.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
            mClientes.Nombre = mboletaProspeccion.Nombre;
            mClientes.ApellidoPaterno = mboletaProspeccion.ApellidoPaterno;
            mClientes.ApellidoMaterno = mboletaProspeccion.ApellidoMaterno;
            mClientes.FechaNacimiento = mboletaProspeccion.FechaNacimiento;
            mClientes.IdEstatusCliente = estatusCliente.ID.Value;
            mClientes.FechaContacto = DateTime.Now;
            mClientes.RFC = mboletaProspeccion.RFC;
            mClientes.CURP = mboletaProspeccion.CURP;
            mClientes.IdGenero = mboletaProspeccion.IdGenero;
            mClientes.IdEstadoOrigen = mboletaProspeccion.EstadoOrigen.ID;
            mClientes.IdAsentamiento = mboletaProspeccion.IdAsentamiento;
            mClientes.NSS = mboletaProspeccion.NSS;
            mClientes.IdEstatus = estatus.ID;
            mClientes.Domicilio = mboletaProspeccion.Domicilio;
            mClientes.NumExterior = mboletaProspeccion.NumeroExterior;
            mClientes.IdTipoPersona =idTipoPersona;
            mClientes.IdGiro = mboletaProspeccion.IdGiro;


            //Agregando Correo
            if (mboletaProspeccion.Correo != null)
            {
                //var tipoContacto = await bpEstatus.Get("TIPOCONTACTO", "CORREO");
                mClienteContactoCorreo.ID = -1;
                mClienteContactoCorreo.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                mClienteContactoCorreo.IdEstatus = estatus.ID;
                mClienteContactoCorreo.Contacto = mboletaProspeccion.Correo;
                mClienteContactoCorreo.Titular = true;
                //mClienteContacto.IdTipoContacto = tipoContacto.ID.Value;
                //Agregando correo a listado
                mClientes.Correos = new List<m.SCV.Interfaces.IClienteContactos>();
                mClientes.Correos.Add(mClienteContactoCorreo);
            }
            //Agregando telefono
            bool telefonoPrincipal = true;
            if (mboletaProspeccion.Telefono != null)
            {
                
                //var tipoContacto = await bpEstatus.Get("TIPOCONTACTO", "TELEFONO");
                var tipoTelefono = await bpCatalogoG.Get("TIPOTELEFONO", "CS");
                mClienteContactoTelefono.ID = -1;
                mClienteContactoTelefono.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                mClienteContactoTelefono.IdEstatus = estatus.ID;
                mClienteContactoTelefono.Contacto = mboletaProspeccion.Telefono;
                mClienteContactoTelefono.Titular = true;
                //mClienteContacto.IdTipoContacto = tipoContacto.ID.Value;
                mClienteContactoTelefono.IdTipoTelefono = tipoTelefono.ID.Value;
                mClienteContactoTelefono.Nombre = mboletaProspeccion.Nombre + " " + mboletaProspeccion.ApellidoPaterno + " " + mboletaProspeccion.ApellidoPaterno; ;
                //Agregando correo a listado
                mClientes.Telefonos.Add(mClienteContactoTelefono);
                telefonoPrincipal = false;
            }
            //Agregando Celular
            if (mboletaProspeccion.Celular != null && (mboletaProspeccion.Celular!=mboletaProspeccion.Telefono))
            {
                //var tipoContacto = await bpEstatus.Get("TIPOCONTACTO", "TELEFONO");
                var tipoTelefono = await bpCatalogoG.Get("TIPOTELEFONO", "C");

                mClienteContactoCelular.ID = -1;
                mClienteContactoCelular.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                mClienteContactoCelular.IdEstatus = estatus.ID;
                mClienteContactoCelular.Contacto = mboletaProspeccion.Celular;
                mClienteContactoCelular.Titular = telefonoPrincipal;
                //mClienteContacto.IdTipoContacto = tipoContacto.ID.Value;
                mClienteContactoCelular.IdTipoTelefono = tipoTelefono.ID.Value;
                mClienteContactoCelular.Nombre = mboletaProspeccion.Nombre + " " + mboletaProspeccion.ApellidoPaterno + " " + mboletaProspeccion.ApellidoPaterno; ;
                //Agregando correo a listado
                mClientes.Telefonos.Add(mClienteContactoCelular);
            }
            //Agregando Asesor
            int IdUsuarioAsesor = idAsesor != 0 ? Convert.ToInt32(idAsesor) : base.getUserId();
            mClienteAsesor.ID = -1;
            mClienteAsesor.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            mClienteAsesor.IdUsuario = IdUsuarioAsesor;
            mClienteAsesor.Estatus = estatus;
            mClienteAsesor.IdEstatus = estatus.ID;
            mClienteAsesor.Titular = true;
            mClienteAsesor.Creado = DateTime.UtcNow;
            mClienteAsesor.IdCreadoPor = base.getUserId();
            mClienteAsesor.Modificado = DateTime.UtcNow;
            mClienteAsesor.IdModificadoPor = base.getUserId();
            mClientes.Asesores = new List<m.SCV.Interfaces.IClienteAsesores>();
            mClientes.Asesores.Add(mClienteAsesor);
            //Generando Elemento en bitacora
            mBitacora.ID = -1;
            mBitacora.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            mBitacora.Comentarios = "Se registro como Contacto";
            mClientes.Bitacora = new List<m.Kontrol.Interfaces.IBitacora>();
            mClientes.Bitacora.Add(mBitacora);
            //GuardandoCliente
            traceinfo = traceinfo+"/Generacion de objeto cliente";

            try
            {
                var cliente = await bpClientes.Save(mClientes);
                traceinfo = traceinfo+"/Guardado del cliente";

                //Guardando boleta prospeccion con nuevo estatus

                //var boleta = await this.GetById(idBoletaProspeccion);

                traceinfo = traceinfo+"/GetByIdBoleta";

                mboletaProspeccion.IdEstatus = estatusBoletaProspeccion.ID;
                mboletaProspeccion.FechaAccion = DateTime.UtcNow;
                mboletaProspeccion.IdUsuarioAccion = base.getUserId();
                mboletaProspeccion.IdCliente = cliente.ID.Value;
                mboletaProspeccion.IdModificadoPor = base.getUserId();
                mboletaProspeccion.Modificado = DateTime.UtcNow;
                traceinfo = traceinfo + "/BeforeSave Boleta";

                await this.SaveEntity(mboletaProspeccion);

                traceinfo = traceinfo + "/AfterSave Boleta";

                Commit();
            }
            catch(Exception ex)
            {
                Rollback();
                throw new ApplicationException(traceinfo+ex.Message, ex);
            }
           
            return mboletaProspeccion;
        }

        public async Task<m.SCV.Interfaces.IBoletasProspecccion> RejectBoleta(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);
            int idBoletaProspeccion =Convert.ToInt32(parametros["IdBoletaProspeccion"]);
            int idMotivoRechazo= Convert.ToInt32(parametros["IdMotivoRechazo"]);

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var mboletaProspeccion = Get<EK.Modelo.SCV.Interfaces.IBoletasProspecccion>();
            var pboletaProspeccion = Get<EK.Procesos.SCV.Interfaces.IBoletasProspeccion>();
            var estatusBoletaProspeccion = await bpEstatus.Get("ESTATUSBOLETAPROSPECCION", "DE");

            mboletaProspeccion = await dao.GetById(idBoletaProspeccion);
            mboletaProspeccion.Estatus = estatusBoletaProspeccion;
            mboletaProspeccion.IdEstatus = estatusBoletaProspeccion.ID;
            mboletaProspeccion.IdMotivoRechazo = idMotivoRechazo;
            mboletaProspeccion.FechaAccion = DateTime.UtcNow;
            mboletaProspeccion.IdUsuarioAccion=base.getUserId();
            var result=await  pboletaProspeccion.Save(mboletaProspeccion);
            Commit();
            return result;
        }

        public async Task<m.SCV.Interfaces.IBoletasProspecccion> GenerateDeveloment(Dictionary<string, object> parametros)
        {
            BeginTransaction(true);
            int idBoletaProspeccion = Convert.ToInt32(parametros["IdBoletaProspeccion"]);
            string NBoletaProspeccion = Convert.ToString(parametros["IdBoletaProspeccion"]);
            int idCliente = Convert.ToInt32(parametros["IdCliente"]);

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var mboletaProspeccion = Get<EK.Modelo.SCV.Interfaces.IBoletasProspecccion>();
            var mClienteDesarrollo= Get<EK.Modelo.SCV.Interfaces.IClienteDesarrollos>();
            var pboletaProspeccion = Get<EK.Procesos.SCV.Interfaces.IBoletasProspeccion>();
            var daoClienteDesarrollo = Get<EK.Datos.SCV.Interfaces.IClienteDesarrollo>();

            var pBitacora = Get<EK.Procesos.Kontrol.Interfaces.IBitacora>();

            //Obteniendo Estatus
            var estatusBoletaProspeccion = await bpEstatus.Get("ESTATUSBOLETAPROSPECCION", "ASIG");

            //Obteniendo Boleta
            mboletaProspeccion = await dao.GetById(idBoletaProspeccion);

            if (mboletaProspeccion.IdDesarrollo > 0)
            {
                //Actualizando Estatus
                mboletaProspeccion.Estatus = estatusBoletaProspeccion;
                mboletaProspeccion.IdEstatus = estatusBoletaProspeccion.ID;
                mboletaProspeccion.FechaAccion = DateTime.Now;
                mboletaProspeccion.IdUsuarioAccion = base.getUserId();
                mboletaProspeccion.IdCliente = idCliente;
                var resultBoleta= await pboletaProspeccion.Save(mboletaProspeccion);

                /*Registro en bitacora la autorizacion del proceso*/
                await pBitacora.SaveBitacora("Asociación Boleta N° "+NBoletaProspeccion, "scvclientes", "CATBT-SI-AB", idCliente, "scvclientes", idCliente, null);

                base.SetReturnInfo(1, "Boleta de prospección asignada a prospecto cliente", 3);
                Commit();
                return resultBoleta;
            }
            base.SetReturnInfo(1, "La boleta de prospección no cuenta con un Desarrollo", 1);
            Commit();
            return null;
          
        }


        public async Task<m.SCV.Interfaces.IBoletasProspecccion> CreateBoletaProspeccion(Dictionary<string, object> parametros)
        {
            //parametros.TryGetValue("leadItem", out object value);
            string paramsLeadItem = parametros["leadItem"].ToString();
            var Item = Get<m.SCV.Interfaces.IBoletasProspecccion>();

            dynamic jObject = null;
            if (jObject == null)
            {
                jObject = JsonConvert.DeserializeObject(paramsLeadItem);
                var fechaNac = jObject.GetValue("EK_fecha_nacimiento").ToString();

                Item.Nombre = jObject.GetValue("EK_nombre").ToString();
                Item.ApellidoPaterno = jObject.GetValue("EK_apaterno").ToString();
                Item.ApellidoMaterno = jObject.GetValue("EK_amaterno").ToString();
                Item.Telefono = jObject.GetValue("EK_telefono").ToString();
                Item.Celular = jObject.GetValue("EK_celular").ToString();
                Item.Correo = jObject.GetValue("EK_correo").ToString();

                Item.NSS = jObject.GetValue("EK_nss").ToString();
                Item.FechaNacimiento = (fechaNac != "") ?  Convert.ToDateTime(fechaNac) : Convert.ToDateTime("1900-01-01");

                string claveDesarrollo = jObject.GetValue("EK_desarrollo").ToString();
                var daoSeleccionarDesarrollos = Get<d.SCV.Interfaces.IDesarrollos>();
                var Desarrollo = await daoSeleccionarDesarrollos.GetByClave(claveDesarrollo);
                if (Desarrollo != null)
                {
                    Item.Desarrollo = Desarrollo;
                    Item.IdDesarrollo = Convert.ToInt32(Desarrollo.ID);
                }
                else {
                    return null;
                }
                Item.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            }
            return await Save(Item);
        }


        public  async Task<object> SaveLead(Dictionary<string,object> parametros)
        {
            try
            {
                BeginTransaction(true);

                bool  isValidToken = await IsValidToken(parametros);

                if (!isValidToken)
                {
                    throw new ApplicationException("Token no valido");
                }

                object token = "";
                object nombre = "";
                object apellidoPaterno = "";
                object correoElectronico = "";
                object telefono = "";
                object celular = "";
                object comentarios = "";

                object claveDesarrollo = "";
                object claveCampania = "";
                object claveMedioPublicidad = "";
                object source = "";
                object claveOrigenLead = "";


                parametros.TryGetValue("Nombre", out nombre);
                parametros.TryGetValue("ApellidoPaterno", out apellidoPaterno);
                parametros.TryGetValue("CorreoElectronico", out correoElectronico);
                parametros.TryGetValue("Telefono", out telefono);
                parametros.TryGetValue("Celular", out celular);
                parametros.TryGetValue("Comentarios", out comentarios);
                parametros.TryGetValue("Desarrollo", out claveDesarrollo);
                parametros.TryGetValue("Campania", out claveCampania);
                parametros.TryGetValue("MedioPublicidad", out claveMedioPublicidad);
                parametros.TryGetValue("Id", out source);
                parametros.TryGetValue("token", out token);
                parametros.TryGetValue("OrigenLead", out claveOrigenLead);

                if (claveOrigenLead == null || claveOrigenLead.ToString()=="")
                {
                    throw new ApplicationException("No se especifico un origen para el Lead");
                }




                /**/
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoDesarrollo = Get<EK.Datos.SCV.Interfaces.IDesarrollos>();
                var daoMedioPublicidad = Get<EK.Datos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoCampaniaPublicidad = Get<EK.Datos.SCV.Interfaces.ICampaniaPublicidad>();


                /*OBTENIENDO ESTATUS*/
                var estatus = await bpEstatus.Get("ESTATUSBOLETAPROSPECCION", "CAP");


                var item = Get<EK.Modelo.SCV.Interfaces.IBoletasProspecccion>();
                var daoBoletaProspeccion = Get<EK.Datos.SCV.Interfaces.IBoletasProspeccion>();

                string idSource = Convert.ToString(source);

                var consultaBoletabySource = await daoBoletaProspeccion.GetByIdSource(idSource);

                if (consultaBoletabySource!=null && consultaBoletabySource.ID > 0)
                {
                    item = consultaBoletabySource;
                }
                else
                {

                    item.ID = -1;
                    item.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    item.IdEstatus = estatus.ID;
                    item.Nombre = nombre.ToString();
                    item.ApellidoPaterno = apellidoPaterno.ToString();
                 

                    if (correoElectronico != null && correoElectronico.ToString()!="")
                    {
                        item.Correo = correoElectronico.ToString();
                    }

                    if (telefono != null && telefono.ToString() != "")
                    {
                        item.Telefono = telefono.ToString();
                    }

                    if (celular != null && celular.ToString() != "")
                    {
                        item.Celular = celular.ToString();
                    }

                    if (comentarios != null && comentarios.ToString() != "")
                    {
                        item.Comentarios = comentarios.ToString();
                    }

                    if (claveDesarrollo!=null && claveDesarrollo.ToString() != "")
                    {
                        if (claveDesarrollo.ToString().Length > 20)
                        {
                            throw new ApplicationException("La clave del desarrollo excede la longitud permitida");
                        }
                        var parameters = new Dictionary<string, object>();
                        parameters.Add("clave", claveDesarrollo.ToString());
                        parameters.Add("omitirClasificador", true);
                        var desarrollo = await daoDesarrollo.GetByIdDesarrollo(parameters);

                        if (desarrollo != null)
                        {
                            item.IdDesarrollo = desarrollo.ID;
                        }
                    }

                    if (claveMedioPublicidad!=null && claveMedioPublicidad.ToString() != "")
                    {
                        if (claveMedioPublicidad.ToString().Length > 50)
                        {
                            throw new ApplicationException("La clave del medio de publicidad excede la longitud permitida");
                        }

                        var medioPublicidad = await daoMedioPublicidad.GetByClave("MEDIOSPUBLICIDAD", claveMedioPublicidad.ToString());

                        if (medioPublicidad != null)
                        {
                            item.IdMedioPublicidad = medioPublicidad.ID;
                        }
                    }

                    if (claveCampania!=null && claveCampania.ToString() != "")
                    {
                        if (claveCampania.ToString().Length > 25)
                        {
                            throw new ApplicationException("La clave de la campañia de publicidad excede la longitud permitida");
                        }
                        var campaniaPublicidad = await daoCampaniaPublicidad.GetByClave(claveCampania.ToString());

                        if (campaniaPublicidad != null)
                        {
                            item.IdCampaniaPublicidad = campaniaPublicidad.ID;
                        }
                     
                    }

                    /*origen de lead*/
                    item.IdSource =Convert.ToString(source);

                    /*Datos de kontrol*/
                    item.IdModificadoPor = base.getUserId();
                    item.IdCreadoPor = base.getUserId();
                    item.Modificado = DateTime.UtcNow;
                    item.Creado = DateTime.UtcNow;
                    item.HNombre = this.codificaNombre(item.Nombre, item.ApellidoPaterno, item.ApellidoMaterno);


                    /*Origen de lead*/
                    var origenLead = await bpEstatus.Get("OrigenLead",claveOrigenLead.ToString());
                    item.IdOrigen = origenLead.ID;

                    item = await this.dao.SaveEntity(item);
                }

                Commit();

                return item;

            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

    }
}