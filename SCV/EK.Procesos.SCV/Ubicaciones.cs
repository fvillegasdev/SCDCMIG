using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

using EK.Modelo.SCV.Interfaces;
using System.Text;

using Newtonsoft.Json.Linq;

namespace EK.Procesos.SCV
{
    public class Ubicaciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.IUbicaciones, d.SCV.Interfaces.IUbicaciones>,
        p.SCV.Interfaces.IUbicaciones
    {
        public Ubicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IUbicaciones dao)
            : base(factory, dao, "Ubicaciones")
        {
        }

        protected override async Task<IUbicaciones> afterGetItem(IUbicaciones item)
        {
            if (item != null && item.Desarrollo != null) {
                var daoDesarrollos = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();
                var parameters = new Dictionary<string, object>();
                parameters.Add("idDesarrollo", item.IdDesarrollo);
                //
                item.Desarrollo.FormatoClave = await daoDesarrollos.GetAll(parameters);
            }
            return item;
        }

        public async Task<object> GetUbicacionesGIS(int idDesarrollo)
        {
            List<object> retValue = new List<object>();
            var kFiles = Get<p.Kontrol.Interfaces.IKontrolFiles>();
            var filesPrototipos = new Dictionary<int, object>();

            var ubicaciones = await this.dao.Export(new Dictionary<string, object>() { { "idDesarrollo", idDesarrollo }, { "gis", 1 } });
            foreach (dynamic u in ubicaciones) {
                dynamic nu = JObject.FromObject(u);
                //
                if (u.IdPrototipo > 0) {
                    if (!filesPrototipos.ContainsKey(u.IdPrototipo))
                    {
                        var kfParameters = new Dictionary<string, object>()
                        {
                            { "tipo", "anexos" },
                            { "entityType", "prototipos" },
                            { "entityId", u.IdPrototipo},
                            { "activos", 1 }
                        };
                        //
                        filesPrototipos.Add(u.IdPrototipo, JArray.FromObject(await kFiles.GetAll(kfParameters)));
                    }
                    //
                    nu.Prototipo.Archivos = filesPrototipos[u.IdPrototipo];
                    //
                    retValue.Add(nu);
                }
            }
            //
            return retValue;
        }

        public async Task<object> GetUbicacion(Dictionary<string, object> parametros)
        {
            object retValue = null;
            var daoUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
            retValue = await daoUbicacion.GetUbicacion(parametros);
            return retValue;
        }


        public async Task<object> GetConsultaUbicaciones(Dictionary<string, object> parametros)
        {
           return await this.dao.GetConsultaUbicaciones(parametros);
        }


        private async Task formatClaves(m.SCV.Interfaces.IUbicaciones item)
        {
            var daoDesarrollos = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();
            var parameters = new Dictionary<string, object>();
            parameters.Add("idDesarrollo", item.IdDesarrollo);
            //
            var formato = await daoDesarrollos.GetAll(parameters);
            //
            await this.formatClaves(item, formato);
        }

        private async Task formatClaves(m.SCV.Interfaces.IUbicaciones item, List<m.SCV.Interfaces.IDesarrolloFormatoClave> formato)
        {
            await Task.FromResult(0);

            try
            {
                var clave = item.Clave;

                int longitudCadena = formato.Sum(x => x.Longitud);

                var newClave = "";

                if (clave.Length >= longitudCadena)
                {
                    newClave = clave.Substring(0, longitudCadena);
                }
                else
                {
                    newClave = clave.PadRight(longitudCadena, ' ');

                }

                var claveCorta = new StringBuilder();
                var claveFormato = new StringBuilder();
                var pos = 0;
                //
                if (formato != null && formato.Count > 0)
                {
                    foreach (var p in formato)
                    {
                        var l = p.Longitud;
                        var bloque = "";

                        if (l > 0)
                        {
                            bloque = newClave.Substring(pos, l);

                            // clave corta
                            var addChar = false;
                            foreach (var c in bloque)
                            {
                                if (c != '0' || addChar)
                                {
                                    claveCorta.Append(c);
                                    //
                                    addChar = true;
                                }
                            }

                            // clave formato
                            if (claveFormato.Length > 0)
                            {
                                claveFormato.Append("-");
                            }
                            claveFormato.Append(bloque);

                            pos += l;

                        }
                    }
                }

                item.ClaveCorta = claveCorta.ToString();
                item.ClaveFormato = claveFormato.ToString();
            }
            catch (Exception ex)
            {
                throw;
            }
           
        }



        protected async override Task<m.SCV.Interfaces.IUbicaciones> saveModel(m.SCV.Interfaces.IUbicaciones item)
        {
            var caracteristicas = item.Caracteristicas;
            var seguimiento = item.Seguimiento;
            //
            await this.formatClaves(item);

            if (item.IdEstatusDeUbicacion > 0)
            {
                bool disponible = item.EstatusDeUbicacion.Naturaleza.Clave == "DIS" ? true : false;
                item.IdEstatusUbicacion = disponible;
            }
            else
            {
                base.SetReturnInfo(1, "El estatus de la ubicación es requerido");
                return null;
            }
            //
            item = await base.saveModel(item);
            //
            int idUbicacion = item.ID ?? 0;
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            if (caracteristicas != null && caracteristicas.Count > 0)
            {
                var daoCar = Get<d.SCV.Interfaces.ICaracteristicaAdicional>();
                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var tipoEntidad = await bpTipoEntidad.Get("SCVTIPOSENTIDADES", "U");

                foreach (var c in caracteristicas)
                {
                    if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        c.IdEntidad = idUbicacion;
                        c.Estatus = estatus;
                        c.IdEstatus = estatus.ID;
                        c.IdTipoEntidad = tipoEntidad.ID.Value;
                        c.Modificado = DateTime.UtcNow;
                        c.IdModificadoPor = base.getUserId();

                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {
                            c.Creado = DateTime.UtcNow;
                            c.IdCreadoPor = base.getUserId();
                        }

                        if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoCar.DeleteCaracteristica(c.ID.Value);
                        }
                        else
                        {
                            await daoCar.SaveCaracteristica(c);
                        }
                    }
                }
            }
            if (seguimiento != null && seguimiento.Count > 0)
            {
                var daoSeg = Get<p.SCV.Interfaces.ISeguimientoTecnico>();
                foreach(var seg in seguimiento)
                {
                    seg.IdUbicacion = item.ID;
                    await daoSeg.Save(seg);
                }
            }

            /*Actualice claves*/
             await this.formatClaves(item);
            await this.afterSaveItem(item);
            //
            return item;
        }

        public async Task ActualizaClaves(int idDesarrollo)
        {
            try
            {
                    BeginTransaction(true);
                    var daoDesarrollos = Get<d.SCV.Interfaces.IDesarrollosFormatoClave>();
                    var parameters = new Dictionary<string, object>();
                    parameters.Add("idDesarrollo", idDesarrollo);
                    //
                    var formato = await daoDesarrollos.GetAll(parameters);
                    //
                    parameters = new Dictionary<string, object>();
                    parameters.Add("idDesarrollo", idDesarrollo);
                    //
                    var ubicaciones = await this.dao.GetAll(parameters);

                    if (ubicaciones != null)
                    {
                        foreach (var u in ubicaciones)
                        {
                            await this.formatClaves(u, formato);

                            u.GetChanges().Clear();
                            u.Changed("ClaveCorta", true);
                            u.Changed("ClaveFormato", true);
                            u.IdModificadoPor = this.getUserId();
                            u.Modificado = DateTime.UtcNow;

                            await this.dao.SaveEntity(u);
                        }
                    }
              

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }
        }

        public async Task<m.SCV.Interfaces.IUbicaciones> ActualizaEstatusUbicacion(int idUbicacion, string claveEstatus)
        {
            m.SCV.Interfaces.IUbicaciones retValue = null;
            try
            {
                //BeginTransaction();
                var ubicacionesDAO = Get<d.SCV.Interfaces.IUbicaciones>();
                retValue = await ubicacionesDAO.GetById(idUbicacion);
                //Si la Ubicación está disponible, cambia estatus a No Disponible. Pendiente validar cuando no está disponible
                if (retValue.Estatus.Clave == "D" || retValue.Estatus.Clave == null)
                {
                    await ubicacionesDAO.UpdateEstatusUbicacion(idUbicacion, claveEstatus);
                }

                //Commit();
            }
            catch
            {
                //Rollback();
                throw;
            }
            return null;
        }

        public async Task<bool> ActualizaEstatusUbicacion(int idUbicacion, bool idEstatusUbicacion)
        {

            //IdEstatusUbicacion=Disponible=1
            //IdEstatusUbicacion=No Disponible=0

            m.SCV.Interfaces.IUbicaciones retValue = null;
            bool asignada = false;
            try
            {
               // BeginTransaction();
                var ubicacionesDAO = Get<d.SCV.Interfaces.IUbicaciones>();

                var bpUbicacionEstatus = Get<d.SCV.Interfaces.IUbicacionesEstatus>();

                string clave = idEstatusUbicacion == true ? "D" : "ENCIE";
                var estatusUbicacion =await bpUbicacionEstatus.GetByClave(clave);

                retValue = await ubicacionesDAO.GetById(idUbicacion);
                //Si la Ubicación está disponible ó se quiere liberar, cambia estatus
                //Disponible = true, No Disponible = false
                if (retValue.IdEstatusUbicacion != idEstatusUbicacion)
                {

                    retValue.IdEstatusDeUbicacion = estatusUbicacion.ID;
                    retValue.Changed("IdEstatusDeUbicacion", true);

                    retValue.IdEstatusUbicacion = idEstatusUbicacion;
                    retValue.Changed("IdEstatusUbicacion", true);
                    retValue.Cierre = true;
                    retValue.Changed("Cierre", true);
                    retValue.FechaCierre = DateTime.UtcNow; ;
                    retValue.Changed("FechaCierre", true);
                    await this.dao.SaveEntity(retValue, false);
                    asignada = true;
                }
                //Si la Ubicación está disponible, cambia estatus a No Disponible. Pendiente validar cuando no está disponible
                //if (retValue.Estatus.Clave == "D" || retValue.Estatus.Clave == null)
                //{
                //    await ubicacionesDAO.UpdateEstatusUbicacion(idUbicacion, claveEstatus);
                //}

               // Commit();
            }
            catch
            {
                //Rollback();
                throw;
            }
            return asignada;
        }


        public async Task<bool> UpdateStatusLocation(int idUbicacion,int? idEstatusDeUbicacion, string claveEstatus="")
        {
            try
            {

                BeginTransaction(true);
                m.SCV.Interfaces.IUbicaciones ubicacion = null;
                bool asignada = false;

                var daoUbicaciones = Get<d.SCV.Interfaces.IUbicaciones>();
                var daoUbicacionesEstatus = Get<EK.Datos.SCV.Interfaces.IUbicacionesEstatus>();

                ubicacion = await daoUbicaciones.GetById(idUbicacion);



                if (ubicacion != null && ubicacion.ID>0)
                {
                    ubicacion.Changed("IdEstatusDeUbicacion", true);
                    ubicacion.Changed("Modificado", true);
                    ubicacion.Changed("IdModificadoPor", true);

                    if (idEstatusDeUbicacion > 0)
                    {
                        ubicacion.IdEstatusDeUbicacion = idEstatusDeUbicacion;
                        asignada = true;
                    }
                    else if(claveEstatus!="")
                    {
                        var estatusUbicacion = daoUbicacionesEstatus.GetByClave(claveEstatus);
                        ubicacion.IdEstatusDeUbicacion = estatusUbicacion.Id;
                        asignada = true;
                    }
                    if (asignada)
                    {
                        ubicacion.Modificado = DateTime.UtcNow;
                        ubicacion.IdModificadoPor = base.getUserId();
                        await this.dao.SaveEntity(ubicacion, false);
                        return asignada;

                    }

                    base.SetReturnInfo(1, "No se actualizo el estatus de las ubicaciones", 1);
                    return false;
                }

                base.SetReturnInfo(1, "No se encontro ubicación", 1);
                return false;
            }
            catch
            {

                Rollback();
                throw;
            }
        }


        protected override void Log(dynamic entity, dynamic obj)
        {
            //            entity.ID = obj.ID;
            //            entity.Clave = obj.Clave;
            //            entity.Nombre = obj.Nombre;
            //            entity.IdSegmento = obj.Segmento.ID;
            //            entity.IdSegmentoDescripcion = obj.Segmento.Descripcion;
            //            entity.IdSegmentoIdContable = obj.Segmento.IdContable;
            //            entity.IdTipoUbicacion = obj.TipoUbicacion.ID;
            //            entity.IdTipoUbicacionNombre = obj.TipoUbicacion.Nombre;
            //            entity.IdTipoUbicacionClave = obj.TipoUbicacion.Clave;
            //            entity.SuperManzana = obj.SuperManzana;
            //            entity.Manzana = obj.Manzana;
            //            entity.Lote = obj.Lote;
            //            entity.Interior = obj.Interior;
            //            entity.NumeroExterior = obj.NumeroExterior;
            //            entity.Calle = obj.Calle;
            //            entity.IdDesarrollo = obj.Desarrollo.ID;
            //            entity.IdDesarrolloClave = obj.Desarrollo.Clave;
            //            entity.IdDesarrolloDescripcion = obj.Desarrollo.Descripcion;
            //            entity.IdPrototipo = obj.Prototipo.ID;
            //            entity.IdPrototipoClave = obj.Prototipo.Clave;
            //            entity.IdPrototipoNombre = obj.Prototipo.Nombre;
            //            entity.IdCentroCosto = obj.CentroCosto.ID;
            //            entity.IdCentroCostoClave = obj.CentroCosto.Clave;
            //            entity.IdCentroCostoDescripcion = obj.CentroCosto.Descripcion;
            //            entity.Superficie = obj.Superficie;
            //            entity.Excede = obj.Excedente;
            //            entity.FrenteUbicacion = obj.FrenteUbicacion;
            //            entity.RUC = obj.RUC;
            //            entity.RUV = obj.RUV;
            //            entity.FechaHabitabilidad = obj.FechaHabitabilidad;
            //            entity.FechaProgramada = obj.FechaProgramada;
            //            entity.FechaEntrega = obj.FechaEntrega;
            //            entity.Descripcion = obj.Descripcion;
            //            entity.ColindanciaGeneral = obj.ColindanciaGeneral;
            //            entity.ColindanciaComun = obj.ColindanciaComun;
            //            entity.Observaciones = obj.Observaciones;
            //            entity.IdEstatusUbicacion = obj.EstatusUbicacion.ID;
            //            entity.IdEstatusUbicacionNombre = obj.EstatusUbicacion.Nombre;
            //            entity.IdEstatusUbicacionClave = obj.EstatusUbicacion.Clave;
            //            entity.IdEstatusExpediente = obj.EstatusExpediente.ID;
            //            entity.IdEstatusExpedienteNombre = obj.EstatusExpediente.Nombre;
            //            entity.IdEstatusExpedienteClave = obj.EstatusExpediente.Clave;            
            //            entity.RecordType = Convert.ToInt32(obj.Estado);
            //            entity.RecordTypeName = obj.Estado.ToString();
            //            entity.Creado = obj.Creado;
            //            entity.IdCreadoPor = obj.CreadoPor.ID;
            //            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
            //            entity.Modificado = obj.Modificado;
            //            entity.IdModificadoPor = obj.ModificadoPor.ID;
            //            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
        }


        public async Task<object> GetUbicacionesEspecial(Dictionary<string, object> parametros)
        {
            return  await this.dao.GetUbicacionesEspecial(parametros);
        }

    }
}

//using EK.Drivers.Log;
//using Newtonsoft.Json;
//using System;
//using System.Threading.Tasks;
//using diSCV = EK.Datos.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using pKontrol = EK.Procesos.Kontrol;
//using System.Collections.Generic;

//namespace EK.Procesos.SCV
//{
//    public class Ubicaciones 
//        : pKontrol.ProcesoBase, Interfaces.IUbicaciones
//    {
//        private diSCV.IUbicaciones dao;
//        private const string catalogo = "ubicaciones";

//        public Ubicaciones(miKontrol.IContainerFactory factory, diSCV.IUbicaciones dao) : base(factory)
//        {
//            this.factory = factory;
//            this.dao = dao;
//        }

//        public async Task<object[]> GetAll(int id, int disponibles)
//        {
//            return await this.dao.GetAll(id, disponibles);
//        }

//        public async Task<List<miSCV.IUbicaciones>> Search(int idDesarrollo, string claveEstatus, string parametro)
//        {
//            return await this.dao.Search(idDesarrollo, claveEstatus, parametro);
//        }

//        public async Task<miSCV.IUbicaciones> GetById(int id)
//        {
//            var retValue = await this.dao.GetById(id);
//            return retValue;
//        }

//        public async Task<miSCV.IUbicaciones> Save(miSCV.IUbicaciones ubicacion)
//        {
//            var retValue = this.factory.GetInstance<miSCV.IUbicaciones>();

//            try
//            {
//                BeginTransaction();

//                var ubicacionesDAO = Get<diSCV.IUbicaciones>();

//                ubicacion.IdCreadoPor = base.getUserId();
//                ubicacion.IdModificadoPor = this.getUserId();

//                int idUbicacion = await ubicacionesDAO.Save(ubicacion);
//                retValue = await ubicacionesDAO.GetById((ubicacion.ID == null) || (ubicacion.ID == 0) ? idUbicacion : (int)ubicacion.ID);

//                if (ubicacion.Caracteristicas != null && ubicacion.Caracteristicas.Count > 0)
//                {
//                    var caracteristicasDAO = Get<diSCV.ICaracteristicaAdicional>();

//                    foreach (var c in ubicacion.Caracteristicas)
//                    {
//                        if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
//                        {
//                            await caracteristicasDAO.DeleteEntidadCaracteristica((int)c.ID);
//                        }
//                        else
//                        {
//                            c.IdCreadoPor = base.getUserId();
//                            c.IdModificadoPor = base.getUserId();

//                            await caracteristicasDAO.SaveEntidadCaracteristicas(idUbicacion, c);
//                        }
//                    }
//                }

//                retValue = await this.GetById(idUbicacion);

//                Commit();
//            }
//            catch (Exception ex)
//            {
//                Rollback();
//                throw ex;
//            }

//            await this.Log(retValue);

//            return retValue;
//        }

//        public async Task<miSCV.IUbicaciones> ActualizaEstatusUbicacion(int idUbicacion, string claveEstatus)
//        {
//            miSCV.IUbicaciones retValue = null;
//            try
//            {
//                BeginTransaction();
//                var ubicacionesDAO = Get<diSCV.IUbicaciones>();
//                retValue = await ubicacionesDAO.GetById(idUbicacion);
//                //Si la Ubicación está disponible, cambia estatus a No Disponible. Pendiente validar cuando no está disponible
//                if (retValue.EstatusUbicacion.Clave == "D" || retValue.EstatusUbicacion.Clave == null)
//                {
//                       await ubicacionesDAO.UpdateEstatusUbicacion(idUbicacion, claveEstatus);
//                }

//                Commit();
//            }
//            catch
//            {
//                Rollback();
//                throw;
//            }
//            return null;
//        }


//        public async Task Log(miSCV.IUbicaciones obj)
//        {
//            dynamic entity = new ElasticEntity();

//            entity.ID = obj.ID;
//            entity.Clave = obj.Clave;
//            entity.Nombre = obj.Nombre;
//            entity.IdSegmento = obj.Segmento.ID;
//            entity.IdSegmentoDescripcion = obj.Segmento.Descripcion;
//            entity.IdSegmentoIdContable = obj.Segmento.IdContable;
//            entity.IdTipoUbicacion = obj.TipoUbicacion.ID;
//            entity.IdTipoUbicacionNombre = obj.TipoUbicacion.Nombre;
//            entity.IdTipoUbicacionClave = obj.TipoUbicacion.Clave;
//            entity.SuperManzana = obj.SuperManzana;
//            entity.Manzana = obj.Manzana;
//            entity.Lote = obj.Lote;
//            entity.Interior = obj.Interior;
//            entity.NumeroExterior = obj.NumeroExterior;
//            entity.Calle = obj.Calle;
//            entity.IdDesarrollo = obj.Desarrollo.ID;
//            entity.IdDesarrolloClave = obj.Desarrollo.Clave;
//            entity.IdDesarrolloDescripcion = obj.Desarrollo.Descripcion;
//            entity.IdPrototipo = obj.Prototipo.ID;
//            entity.IdPrototipoClave = obj.Prototipo.Clave;
//            entity.IdPrototipoNombre = obj.Prototipo.Nombre;
//            entity.IdCentroCosto = obj.CentroCosto.ID;
//            entity.IdCentroCostoClave = obj.CentroCosto.Clave;
//            entity.IdCentroCostoDescripcion = obj.CentroCosto.Descripcion;
//            entity.Superficie = obj.Superficie;
//            entity.Excede = obj.Excedente;
//            entity.FrenteUbicacion = obj.FrenteUbicacion;
//            entity.RUC = obj.RUC;
//            entity.RUV = obj.RUV;
//            entity.FechaHabitabilidad = obj.FechaHabitabilidad;
//            entity.FechaProgramada = obj.FechaProgramada;
//            entity.FechaEntrega = obj.FechaEntrega;
//            entity.Descripcion = obj.Descripcion;
//            entity.ColindanciaGeneral = obj.ColindanciaGeneral;
//            entity.ColindanciaComun = obj.ColindanciaComun;
//            entity.Observaciones = obj.Observaciones;
//            entity.IdEstatusUbicacion = obj.EstatusUbicacion.ID;
//            entity.IdEstatusUbicacionNombre = obj.EstatusUbicacion.Nombre;
//            entity.IdEstatusUbicacionClave = obj.EstatusUbicacion.Clave;
//            entity.IdEstatusExpediente = obj.EstatusExpediente.ID;
//            entity.IdEstatusExpedienteNombre = obj.EstatusExpediente.Nombre;
//            entity.IdEstatusExpedienteClave = obj.EstatusExpediente.Clave;            
//            entity.RecordType = Convert.ToInt32(obj.Estado);
//            entity.RecordTypeName = obj.Estado.ToString();
//            entity.Creado = obj.Creado;
//            entity.IdCreadoPor = obj.CreadoPor.ID;
//            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;
//            entity.Modificado = obj.Modificado;
//            entity.IdModificadoPor = obj.ModificadoPor.ID;
//            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

//            await this.factory.GetInstance<ILogger>().AddAsync(catalogo, entity);
//        }
//    }
//}