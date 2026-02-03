using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class SupervisoresUbicaciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISupervisorUbicacion, d.SCV.Interfaces.ISupervisoresUbicaciones>, p.SCV.Interfaces.ISupervisoresUbicaciones

    {
        public SupervisoresUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISupervisoresUbicaciones dao)
            : base(factory, dao, "SupervisoresUbicaciones")
        {
        }
        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisores(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "SoloSupervisores");
            parametros.Add("IdUsuario", base.getUserId());

            return await dao.getSupervisoresFraccionamientos(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getSupervisoresFraccionamientos(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "SupervisoresFraccionamientos");
            parametros.Add("IdUsuario", base.getUserId());

            return await dao.getSupervisoresFraccionamientos(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISupervisorUbicacion>> getUbicacionesFraccionamientos(Dictionary<string, object> parametros)
        {
            parametros.Add("OperacionEspecificaSP", "UbicacionesFraccionamientos");
            parametros.Add("IdUsuario", base.getUserId());

            return await dao.getUbicacionesFraccionamientos(parametros);
        }

        public override async Task<m.SCV.Interfaces.ISupervisorUbicacion> Save(m.SCV.Interfaces.ISupervisorUbicacion item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoSU = Get<d.SCV.Interfaces.ISupervisoresUbicaciones>();
            var itemUbicacion = Get<m.SCV.Interfaces.ISupervisorUbicacion>();

            try
            {
                BeginTransaction();

                var estatus = await bpCG.Get("ESTATUS", "A");
                item.IdEstatus = estatus.ID;
                item.Estatus = estatus;
               
                var ubicaciones = item.Ubicaciones;


                if (ubicaciones != null)
                {
                    foreach (var c in ubicaciones)
                    {

                       if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            itemUbicacion.ID = c.ID;
                            if (c.IdSupervisor == null)
                            {
                                itemUbicacion.IdSupervisor = null;
                                itemUbicacion.IdCoordinador = null;
                            }
                            else
                            {
                                itemUbicacion.IdSupervisor = (int)c.IdSupervisor;
                                itemUbicacion.IdCoordinador = (int)c.IdCoordinador;
                            }


                            itemUbicacion.Estado = c.Estado;
                            itemUbicacion.Version = c.Version;

                            itemUbicacion.Estatus = estatus;
                            itemUbicacion.IdEstatus = estatus.ID;
                            itemUbicacion.Modificado = DateTime.UtcNow;
                            itemUbicacion.IdModificadoPor = base.getUserId();
                            //await daoSU.SaveEntity(itemUbicacion, false, true);
                            //await daoSU.Save(itemUbicacion);
                            var parametros = new Dictionary<string, object>();
                            parametros.Add("IdSupervisor", itemUbicacion.IdSupervisor);
                            parametros.Add("IdCoordinador", itemUbicacion.IdCoordinador);
                            parametros.Add("ID", itemUbicacion.ID);
                            parametros.Add("Usuario", base.getUserId());
                            await daoSU.saveSupervisoresUbicaciones(parametros);
                        }
                    }
                }


                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return item;
        }
    }
}