using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using EK.Procesos.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class PersonalizarCampos
        : BPBase<m.Kontrol.Interfaces.IPersonalizarCampo, d.Kontrol.Interfaces.IPersonalizarCampos>, p.Kontrol.Interfaces.IPersonalizarCampos
    {
        public PersonalizarCampos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPersonalizarCampos dao)
               : base(factory, dao, "PersonalizarCampos")
        {
        }

        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros)
        {
            string IdClave = Convert.ToString(parametros["IdClaveOpcion"]);
            var daoOpciones = Get<d.Kontrol.Interfaces.IOpciones>();

            m.Kontrol.Interfaces.IOpcionModulo opcion = await daoOpciones.GetByClave(IdClave);

            var parametros_peticion = new Dictionary<string, object>()
                {
                    { "idClaveOpcion",  opcion.ID }
                };
            //,
            //{ "idClaveEntidad",  Convert.ToString(parametros["IdEntidad"]) }
            return await this.dao.GetCustomForm(parametros_peticion);
        }

        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>> GetAllSecciones(Dictionary<string, object> parametros)
        {
            var daoEntidades = Get<d.Kontrol.Interfaces.IPersonalizarCamposSecciones>();
            return await daoEntidades.GetAll(parametros);
        }

        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>> GetAllConfiguracion(Dictionary<string, object> parametros)
        {
            var daoConfiguracion = Get<d.Kontrol.Interfaces.IPersonalizarCamposConfiguracion>();
            return await daoConfiguracion.GetAll(parametros);
        }


        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor>> GetCustomFormValue(Dictionary<string, object> parametros)
        {
            List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> retValue;

            parametros.TryGetValue("ClaveOpcion", out object ClaveOpcion);
            parametros.TryGetValue("OperacionEspecificaSP", out object OperacionEspecificaSP);
            parametros.TryGetValue("IdRegistro", out object Registro);
            string opcionClave = ClaveOpcion != null ? ClaveOpcion.ToString() : "";
            int IdRegistro = Registro != null ? Convert.ToInt32(Registro) : -1;

            var daoOpciones = Get<d.Kontrol.Interfaces.IOpciones>();
            var opcionModel = Get<m.Kontrol.Interfaces.IOpcionModulo>();
            int idOpcion = 0;
            
            var parametros_peticion_2 = new Dictionary<string, object>();
            parametros_peticion_2.Add("idRegistro", IdRegistro);

            if (OperacionEspecificaSP != null)
            {
                parametros_peticion_2.Add("OperacionEspecificaSP", OperacionEspecificaSP.ToString());
                parametros_peticion_2.Add("Entidad", opcionClave);
            }
            else
            {
                opcionModel = await daoOpciones.GetByClave(opcionClave);
                idOpcion = (Int32)opcionModel.ID;
                parametros_peticion_2.Add("idOpcion", idOpcion);
            }

            retValue = await this.dao.GetCustomFormValue(parametros_peticion_2);
            if (retValue.Count > 0)
            {
                foreach (var r in retValue)
                {
                    dynamic instance = null;
                    if (r.PersonalizarCampos.TipoCampo.Clave == "ENT")
                    {
                        string tipoEntidad = r.PersonalizarCampos.TipoEntidad.Clave;
                        string[] stringBP;
                        stringBP = tipoEntidad.Split('/');
                        string modulo = "";
                        string bp = "";
                        if (stringBP.Length > 0)
                        {
                            modulo = stringBP[0].ToUpper();
                            //bp = new CultureInfo("es-MX").TextInfo.ToTitleCase(stringBP[1]);
                            bp = stringBP[1];
                        }
                        string bpType = "EK.Procesos." + modulo + ".Interfaces.I" + bp + ", EK.Procesos." + modulo;
                        var type = Type.GetType(bpType);
                        instance = factory.GetInstance(type);
                        var Value = await instance.GetById(Convert.ToInt32(r.ValorRegistro));
                        if (Value != null)
                        {
                            r.PersonalizarCampos.Nombre = Value.Nombre;
                            r.PersonalizarCampos.Clave = Value.Clave;
                        }
                    }
                }
            }
            return retValue;
        }
        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>> deleteConfigurationById(Dictionary<string, object> parametros)
        {
            List<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion> retValue;

            var daoCamposConfiguracion = Get<d.Kontrol.Interfaces.IPersonalizarCamposConfiguracion>();
            var daoPersonalizarCampoValores = Get<d.Kontrol.Interfaces.IPersonalizarCamposValores>();

            var daoConfiguracion = Get<d.Kontrol.Interfaces.IPersonalizarCampos>();

            parametros.TryGetValue("IdCampoOpcion", out object idCampoOpcion);
            int IdCampoOpcion = idCampoOpcion != null ? Convert.ToInt32(idCampoOpcion) : 0;
            parametros.TryGetValue("OperacionEspecificaSP", out object operacionEspecificaSP);
            string OperacionEspecificaSP = operacionEspecificaSP != null ? operacionEspecificaSP.ToString() : "";

            var param1 = new Dictionary<string, object>();
            param1.Add("IdCampoOpcion", IdCampoOpcion);
            param1.Add("OperacionEspecificaSP", OperacionEspecificaSP);

            int configCountValue = await daoConfiguracion.GetConfigCountValue(param1);

            var campoConfiguracion = Get<m.Kontrol.Interfaces.IPersonalizarCampoConfiguracion>();

            campoConfiguracion = await daoCamposConfiguracion.GetById(IdCampoOpcion);

            if(configCountValue > 1)
            {

                campoConfiguracion.Visible = false;
                campoConfiguracion.Changed("Visible", true);
                campoConfiguracion.Modificado = DateTime.UtcNow;
                campoConfiguracion.Changed("Creado", true);
                campoConfiguracion.IdModificadoPor = base.getUserId();
                campoConfiguracion.Changed("Modificado", true);
                campoConfiguracion.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;

                await daoCamposConfiguracion.SaveEntity(campoConfiguracion,true,false);
            }
            else
            {
                await daoPersonalizarCampoValores.Delete(IdCampoOpcion, "IdCampoOpcion", "PersonalizarCampos_Valores");
                await daoCamposConfiguracion.Delete(IdCampoOpcion);
            }

            var param2 = new Dictionary<string, object>();
            parametros.TryGetValue("IdTipoEntidad", out object Entidad);
            int IdTipoEntidad = Entidad != null ? Convert.ToInt32(Entidad) : 0;
            param2.Add("IdTipoEntidad", IdTipoEntidad);

            retValue = await GetAllConfiguracion(param2);

            return retValue;
        }
        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>> deleteSectionById(Dictionary<string, object> parametros)
        {
            parametros.TryGetValue("idSeccion", out object IdSeccion);
            int idSeccion = IdSeccion != null ? Convert.ToInt32(IdSeccion) : 0;

            var daoSecciones = Get<d.Kontrol.Interfaces.IPersonalizarCamposSecciones>();
            await daoSecciones.Delete(idSeccion);

            parametros.TryGetValue("idTipoEntidad", out object IdTipoEntidad);
            int idTipoEntidad = IdTipoEntidad != null ? Convert.ToInt32(IdTipoEntidad) : 0;
            var param1 = new Dictionary<string, object>();
            param1.Add("idTipoEntidad", idTipoEntidad);

            var daoEntidades = Get<d.Kontrol.Interfaces.IPersonalizarCamposSecciones>();
            return await daoEntidades.GetAll(param1);
        }

        public async Task<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> SaveCustomForm(List<m.Kontrol.Interfaces.IPersonalizarCampo_Valor> item, int ArgIdRegistro)
        {

            try
            {
                if (item.Count > 0)
                {
                    var daoCUSTOMFORM = Get<d.Kontrol.Interfaces.IPersonalizarCampos>();
                    //Estatus Activo
                    var idEntidad = -1;
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUS", "A");
                    foreach (var fila in item)
                    {
                        fila.IdCampoOpcion = Convert.ToInt32(fila.PersonalizarCampos.Configuracion.ID);
                        idEntidad = -1;

                        if (fila.IdRegistro > 0)
                        {
                            idEntidad = fila.IdTemporal;

                        }

                        fila.ID = idEntidad;
                        fila.IdRegistro = ArgIdRegistro;
                        fila.Modificado = DateTime.UtcNow;
                        fila.IdModificadoPor = base.getUserId();
                        fila.IdEstatus = estatus.ID;
                        fila.Valor = fila.ValorRegistro;
                        fila.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        if (fila.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || fila.ID < 1)
                        {
                            fila.Creado = DateTime.UtcNow;
                            fila.IdCreadoPor = base.getUserId();
                            fila.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        }
                        await daoCUSTOMFORM.SaveEntity(fila, false, true);
                    }


                }
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al actualizar el registro en el Formulario Personalizado.", ex);
            }

            return null;
        }
        //public  async override Task<List<m.Kontrol.Interfaces.ICitas>> GetAll(Dictionary<string, object> parametros)
        //{
        //    parametros.Add("IdOwner", base.getUserId());
        //    parametros.Add("todas", true);
        //    return await this.dao.GetAll(parametros);
        //}

        //protected override async Task afterSaveItem(ICitas item)
        //{
        //    var bpOption = Get<p.Kontrol.Interfaces.IOpciones>();
        //    var bpUsuario = Get<p.Kontrol.Interfaces.IUsuario>();
        //    var optionAut = await bpOption.GetByClave("citas");
        //    var pm = await GetGlobalParameters("INSTALACION");
        //    string optionPath = optionAut.Ruta;
        //    string linkTarea;

        //    if (optionPath.Contains(":id"))
        //    {
        //        linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}".Replace(":id", "");
        //    }
        //    else
        //    {
        //        if (!optionPath.EndsWith("/"))
        //        {
        //            linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}/";
        //        }
        //        else
        //        {
        //            linkTarea = $"{pm.Value<string>("SitioWeb")}{optionPath}";
        //        }
        //    }

        //    var parametros = new Dictionary<string, object>()
        //    {
        //        { "Link", linkTarea + item.ID.Value.ToString() }
        //    };
        //    await SendNotification(await bpUsuario.GetById(this.getUserId()), "US-CITA", linkTarea, item, parametros);
        //}
        protected override void Log(dynamic entity, dynamic obj)
        {
            //entity.ID = obj.ID;
            //entity.Clave = obj.Clave;
            //entity.Nombre = obj.Nombre;
            //entity.Domicilio = obj.Domicilio;
            //entity.IdLocalidad = obj.Localidad.ID;
            ////entity.CodigoPostal = obj.CodigoPostal;
            //entity.Telefono = obj.Telefono;
            //entity.Telefono2 = obj.Telefono2;
            //entity.Celular = obj.Celular;
            //entity.Fax = obj.Fax;
            //entity.Email = obj.Email;
            //entity.Contacto = obj.Contacto;
            //entity.IdAgente = obj.Agente.ID;
            //entity.IdAgenteNombre = obj.Agente.Nombre;
            //entity.IdAgenteExterno = obj.AgenteExterno.ID;
            //entity.IdAgenteExternoNombre = obj.AgenteExterno.Nombre;
            //entity.IdEstatus = obj.Estatus.ID;
            //entity.IdEstatusClave = obj.Estatus.Clave;
            //entity.IdEstatusNombre = obj.Estatus.Nombre;
            //entity.RecordType = Convert.ToInt32(obj.Estado);
            //entity.RecordTypeName = obj.Estado.ToString();
            //entity.Creado = obj.Creado;
            //entity.IdCreadoPor = obj.CreadoPor.ID;
            //entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            //entity.Modificado = obj.Modificado;
            //entity.IdModificadoPor = obj.ModificadoPor.ID;
            //entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
        }


    }
}