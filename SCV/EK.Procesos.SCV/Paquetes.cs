using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class Paquetes
        : p.Kontrol.BPBase<m.SCV.Interfaces.IPaquete, d.SCV.Interfaces.IPaquetes>, p.SCV.Interfaces.IPaquetes
    {
        public Paquetes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPaquetes dao)
            : base(factory, dao, "paquetes")
        {
        }

       
        public override async Task<m.SCV.Interfaces.IPaquete> Save(m.SCV.Interfaces.IPaquete item)
        {
            try
            {
                var paqueteUbicaciones = item.paqueteUbicaciones;
                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || item.ID <= 0)
                {
                    var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                    var estatus = await bpEstatus.Get("ESTATUSPAQUETE", "A");
                    item.Estatus = estatus;
                    item.IdEstatus = estatus.ID;
                }

                item = await base.saveModel(item);
                await this.guardarPaquetesUbicacion(paqueteUbicaciones,item.ID.Value);
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return item;
        }
        public async Task<int> guardarPaquetesUbicacion(List<m.SCV.Interfaces.IPaqueteUbicaciones> items, int idPaquete)
        {
            var daopaqueteUbicacion = Get<d.SCV.Interfaces.IPaqueteUbicaciones>();
            var bpUbicacion = Get<d.SCV.Interfaces.IUbicaciones>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUSPAQUETEUBICACIONES", "D");

            try
            {
                foreach (var item in items)
                {
                    if (item.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        item.Modificado = DateTime.UtcNow;
                        item.IdModificadoPor = base.getUserId();
                        if (item.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || item.ID<=0)
                        {
                            item.IdPaquete = idPaquete;
                            item.Estatus = estatus;
                            item.IdEstatus = estatus.ID;
                            item.Creado = DateTime.UtcNow;
                            item.IdCreadoPor = base.getUserId();
                            if (item.ID <= 0)
                            {
                                item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            }
                        }
                        if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {

                            await daopaqueteUbicacion.Delete(item.ID.Value);
                            if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                var ubicacion = await bpUbicacion.GetById(item.IdUbicacion);
                                if (ubicacion != null)
                                {
                                    ubicacion.IdPaquete = null;
                                    ubicacion.Paquete = null;
                                    ubicacion.Changed("IdPaquete", true);
                                    await bpUbicacion.Save(ubicacion);
                                }
                            }
                        }
                        else
                        {
                            await daopaqueteUbicacion.Save(item);
                            //aqui Mero
                            var ubicacion = await bpUbicacion.GetById(item.IdUbicacion);
                            if (ubicacion != null)
                            {
                                ubicacion.IdPaquete = item.IdPaquete;
                                ubicacion.Changed("IdPaquete", true);
                                await bpUbicacion.Save(ubicacion);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
            return 0;
        }
        public override async Task<m.SCV.Interfaces.IPaquete> Delete(int id)
        {
            m.SCV.Interfaces.IPaquete retValue = null;
            var daoPaqueteUbicacion = Get<EK.Datos.SCV.Interfaces.IPaqueteUbicaciones>();
            var parametros = new Dictionary<string, object> { { "IdPaquete", id } };

            BeginTransaction();
            try
            {
                retValue = await this.dao.GetById(id);
                var ubicaciones = await daoPaqueteUbicacion.GetAll(parametros);

                foreach (var item in ubicaciones)
                {
                    await daoPaqueteUbicacion.Delete(item.ID.Value);
                }
                Commit();
                BeginTransaction();

                await this.deleteItem(id, null);
                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }
                await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("Delete::" + ex.Message, ex); ;
            }
            return retValue;
        }
        public async Task<List<m.SCV.Interfaces.IPaqueteUbicaciones>> obtenerPaquetesUbicaciones(Dictionary<string, object> parametros)
        {
            var daoRP = Get<d.SCV.Interfaces.IPaqueteUbicaciones>();

            return await daoRP.GetAll(parametros);
        }

        public async Task<m.SCV.Interfaces.IPaquete> UpdateEstatus(Dictionary<string, object> parametros)
        {
            m.SCV.Interfaces.IPaquete retValue = null;
            object paqueteId = string.Empty;
            object claveEstatus = string.Empty;

            parametros.TryGetValue("ID", out paqueteId);
            parametros.TryGetValue("Estatus", out claveEstatus);

            int idPaquete = Convert.ToInt32(paqueteId);
            string clave = Convert.ToString(claveEstatus);

            try
            {
                var bpEstatusCliente = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusPaquete = await bpEstatusCliente.Get("ESTATUSPAQUETE", clave);

                var paquete = await this.GetById(idPaquete);
                //Si el cliente es prospecto se convierte en cliente.
                if (paquete != null && estatusPaquete != null)
                {
                    paquete.IdEstatus = estatusPaquete.ID.Value;
                    paquete.Changed("IdEstatus", true);

                    var EstatusVenta = await this.dao.SaveEntity(paquete, false);
                    //Regresamos la informacion del cliente ya con el Estatus Actualizado.
                    retValue = await this.GetById(idPaquete);
                }
            }
            catch(Exception ex)
            {
                Rollback();
                throw new ApplicationException("UpdateEstatus::" + ex.Message, ex);
            }
            
            return retValue;
        }

        public async Task<List<m.SCV.Interfaces.IPaqueteUbicaciones>> UpdateEstatusUbicacion(int idUbicacion, string claveEstatus)
        {
            var retValue = new List<m.SCV.Interfaces.IPaqueteUbicaciones>();
            var paquetesUbicacionDAO = Get<d.SCV.Interfaces.IPaqueteUbicaciones>();
            var estatusPaquete = "COM";
            try
            {
                var bpEstatusPaqueteUbicacion = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusUbicacion = await bpEstatusPaqueteUbicacion.Get("ESTATUSPAQUETEUBICACIONES", claveEstatus);
                var parametros = new Dictionary<string, object> { { "IdUbicacion", idUbicacion } };
                var idPaquete = 0;
                bool ubicacionActualizada = false;
                retValue = await paquetesUbicacionDAO.GetAll(parametros);
                if (retValue != null && retValue.Count > 0)
                {
                    foreach (var u in retValue)
                    {
                        if (u.Estatus.Clave != claveEstatus)
                        {
                            idPaquete = u.IdPaquete;
                            u.IdEstatus = estatusUbicacion.ID.Value;
                            u.Changed("IdEstatus", true);
                            await this.dao.SaveEntity(u, false);
                            ubicacionActualizada = true;
                        }
                    }

                }

                //Consulta si ya han sido reservadas todas las ubicaciones
                if (ubicacionActualizada)
                {
                    
                    parametros = new Dictionary<string, object> { { "IdPaquete", idPaquete }, { "claveEstatus", "D" } };
                    retValue = await paquetesUbicacionDAO.GetAll(parametros);
                    if (retValue != null)
                    {
                        if (retValue.Count > 0)
                        {
                            estatusPaquete = "A";
                        }
                        //Actualizar el estatus del paquete.
                        parametros = new Dictionary<string, object> { { "ID", idPaquete }, { "Estatus", estatusPaquete } };
                        await this.UpdateEstatus(parametros);
                    }
                }
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException("UpdateEstatusUbicacion::" + ex.Message, ex);
            }

            return retValue;
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            return await this.dao.GetAllPackage(parametros);
        }
    }
}