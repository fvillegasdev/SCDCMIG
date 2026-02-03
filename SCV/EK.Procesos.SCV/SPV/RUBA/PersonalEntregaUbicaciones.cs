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
    public class PersonalEntregaUbicaciones
        : p.Kontrol.BPBase<m.SCV.Interfaces.IEntregaUbicacionResponsable, d.SCV.Interfaces.IEntregaUbicacionesResponsables>, p.SCV.Interfaces.IPersonalEntregaUbicaciones

    {
        public PersonalEntregaUbicaciones(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IEntregaUbicacionesResponsables dao)
            : base(factory, dao, "PersonalEntregaUbicaciones")
        {
        }

        public async Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsable>> getPersonalEntregaVivienda(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.IEntregaUbicacionesResponsables>();
            parametros.Add("OperacionEspecificaSP", "PosiblesUsuariosEntrega");
            parametros.Add("IdUsuario", base.getUserId());

            return await localDAO.getInformacionPersonalEntrega(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getAsignado(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.IEntregaUbicacionesResponsables>();
            parametros.Add("OperacionEspecificaSP", "FraccionamientosAsignados");
            parametros.Add("IdUsuario", base.getUserId());

            return await localDAO.getFraccionamientos(parametros);
        }

        public async Task<List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento>> getNoAsignado(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.IEntregaUbicacionesResponsables>();
            parametros.Add("OperacionEspecificaSP", "FraccionamientosDisponibles");
            parametros.Add("IdUsuario", base.getUserId());

            return await localDAO.getFraccionamientos(parametros);
        }

        public override async Task<m.SCV.Interfaces.IEntregaUbicacionResponsable> Save(m.SCV.Interfaces.IEntregaUbicacionResponsable item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoPE = Get<d.SCV.Interfaces.IEntregaUbicacionesResponsables>();
            var itemFraccionamiento = Get<m.SCV.Interfaces.IEntregaUbicacionResponsable>();
            try
            {
                BeginTransaction();

                var estatus = await bpCG.Get("ESTATUS", "A");
                item.IdEstatus = estatus.ID;
                item.Estatus = estatus;
               
                var fraccionamientos = item.Fraccionamiento;

                if (fraccionamientos != null)
                {
                    foreach (var c in fraccionamientos)
                    {
                        itemFraccionamiento.ID = c.ID;
                        itemFraccionamiento.IdFraccionamiento = c.Clave;
                        itemFraccionamiento.IdPlaza = item.IdPlaza;
                        itemFraccionamiento.IdUsuario = item.IdUsuario;
                        itemFraccionamiento.Estado = c.Estado;
                        itemFraccionamiento.Version = c.Version;
                        if (itemFraccionamiento.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            itemFraccionamiento.Estatus = estatus;
                            itemFraccionamiento.IdEstatus = estatus.ID;
                            itemFraccionamiento.Modificado = DateTime.UtcNow;
                            itemFraccionamiento.IdModificadoPor = base.getUserId();
                            if (itemFraccionamiento.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                itemFraccionamiento.Creado = DateTime.UtcNow;
                                itemFraccionamiento.IdCreadoPor = base.getUserId();
                            }
                            if (itemFraccionamiento.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                               await daoPE.Delete(itemFraccionamiento.ID.Value);
                            }
                            else
                            {
                                await daoPE.SaveEntity(itemFraccionamiento, false, true);
                            }
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