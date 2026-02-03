#if RUBA
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ContratistasUbicaciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.IContratistaUbicacion, d.SCV.Interfaces.IContratistasUbicaciones>, p.SCV.Interfaces.IContratistasUbicaciones
    {
        public ContratistasUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IContratistasUbicaciones dao)
            : base(factory, dao, "sv_contratista_lote")
        { }

        public async Task<m.Kontrol.Interfaces.IBaseKontrol> SaveConfiguracion(m.SCV.Interfaces.IContratistaUbicacion item)
        {
            var bpCGV = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCGV.Get("ESTATUS", "A");

            try
            {
                BeginTransaction(true);

                var ubicaciones = item.Ubicaciones ?? new List<m.SCV.Interfaces.IUbicaciones>();
                var contratistas = item.Contratistas ?? new List<m.SCV.Interfaces.IContratistaUbicacion>();

                if (ubicaciones != null)
                {
                    foreach (var u in ubicaciones)
                    {
                        if (u.Contratistas != null && u.Contratistas.Count > 0)
                        {
                            foreach (var c in u.Contratistas)
                            {
                                if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                                {
                                    await this.dao.Delete((int)c.ID);
                                }
                                else
                                {
                                    c.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                                    c.IdModificadoPor = base.getUserId();
                                    c.Modificado = DateTime.UtcNow;
                                    c.Changed("IdModificadoPor", true);
                                    c.Changed("Modificado", true);
                                    await this.dao.SaveEntity(c);
                                }
                            }
                        }

                        if (contratistas != null && contratistas.Count > 0)
                        {
                            foreach (var c in contratistas)
                            {
                                var cu = Get<m.SCV.Interfaces.IContratistaUbicacion>();
                                cu.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                                cu.ContratistaDefault = c.ContratistaDefault;
                                cu.IdContratista = c.IdContratista;
                                cu.IdTipoContratista = c.IdTipoContratista;
                                cu.IdUbicacion = (int)u.ID;
                                cu.IdPlaza = u.IdPlaza;
                                cu.IdDesarrollo = u.DesarrolloClave;
                                cu.FechaCaptura = DateTime.UtcNow;
                                cu.IdEstatus = estatus.ID;
                                cu.Creado = DateTime.UtcNow;
                                cu.IdCreadoPor = base.getUserId();
                                cu.Modificado = DateTime.UtcNow;
                                cu.IdModificadoPor = base.getUserId();

                                await this.dao.SaveEntity(cu);
                            }
                        }
                    }
                }

                Commit();

                var retValue = Get<m.SCV.Interfaces.IContratistaUbicacion>();
                retValue.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;

                return retValue;
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IUbicaciones>> GetUbicaciones(Dictionary<string, object> parametros)
        {
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();

            try
            {
                //obtener ubicaciones
                var ubicaciones = await daoUB.GetAll(parametros);
                //obtener contratistas de las ubicaciones basado en fraccionamiento
                var contratistas = await this.dao.GetAll(parametros);
                //formar los grupos de contratistas por ubicación
                var contratistasGroup = contratistas.ToLookup(p => p.IdUbicacion);

                if (ubicaciones != null && ubicaciones.Count > 0)
                {
                    foreach (var u in ubicaciones)
                    {
                        u.Contratistas = contratistasGroup[(int)u.ID].ToList();
                    }
                }

                return ubicaciones;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IUbicaciones>> GetAllUbicacionesPlaza(Dictionary<string, object> parametros)
        {
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();

            try
            {
                //obtener ubicaciones
                var ubicaciones = await daoUB.GetAll(parametros);
                //obtener contratistas de las ubicaciones basado en fraccionamiento
                var contratistas = await this.dao.GetAll(parametros);
                //formar los grupos de contratistas por ubicación
                var contratistasGroup = contratistas.ToLookup(p => p.IdUbicacion);

                if (ubicaciones != null && ubicaciones.Count > 0)
                {
                    foreach (var u in ubicaciones)
                    {
                        u.Contratistas = contratistasGroup[(int)u.ID].ToList();
                    }
                }

                return ubicaciones;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> SaveRelContratistaLote(Dictionary<string, object> parametros)
        {
            var daoUB = Get<d.SCV.Interfaces.IUbicaciones>();

            try
            {
                //obtener ubicaciones
                //var id = base.IdUser;
                var id = base.getUserId();
                parametros.Add("IdUsuario", id);
                var saved = await daoUB.saveRelContratistaLote(parametros);
                //obtener contratistas de las ubicaciones basado en fraccionamiento
                //var contratistas = await this.dao.GetAll(parametros);
                //formar los grupos de contratistas por ubicación
                //var contratistasGroup = contratistas.ToLookup(p => p.IdUbicacion);

                return saved;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCV.Interfaces.IContratista> GetContratistaDefault(int idUbicacion)
        {
            var daoCO = Get<d.SCV.Interfaces.IContratistas>();
            m.SCV.Interfaces.IContratista retValue = null;

            try
            {
                var parametros = new Dictionary<string, object>();
                parametros.Add("idUbicacion", idUbicacion);

                var contratistasUbicacion = await this.dao.GetAll(parametros);
                if (contratistasUbicacion != null && contratistasUbicacion.Count > 0)
                {
                    var cdefault = contratistasUbicacion.FirstOrDefault(c => c.ContratistaDefault == "S");
                    if (cdefault != null)
                    {
                        retValue = await daoCO.GetById(cdefault.IdContratista);
                    }
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
#endif