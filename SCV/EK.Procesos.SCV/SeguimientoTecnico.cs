using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace EK.Procesos.SCV
{
    public class SeguimientoTecnico
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISeguimientoTecnico, d.SCV.Interfaces.ISeguimientoTecnico>, p.SCV.Interfaces.ISeguimientoTecnico
    {
        public SeguimientoTecnico(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISeguimientoTecnico dao)
            : base(factory, dao, "seguimientotecnico")
        {

        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            
        }

        public override async Task<ISeguimientoTecnico> Save(ISeguimientoTecnico item)
        {
            var parametros = new Dictionary<string, object>() {
                            { "idUbicacion", item.IdUbicacion},
                            { "idTramiteConfiguracion", item.ID }
                        };
            var seguimientoCheck = await this.GetAll(parametros);
            var seguimiento = Get<m.SCV.Interfaces.ISeguimientoTecnico>();
            var daoSeguimiento = Get<d.SCV.Interfaces.ISeguimientoTecnico>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            var estatusBaja = await bpEstatus.Get("ESTATUS", "B");
            try
            {
                if (seguimientoCheck.Count == 0)
                {
                    if (item.Completado != null)
                    {
                        seguimiento.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        seguimiento.IdTramite = item.ID;
                        seguimiento.IdUbicacion = item.IdUbicacion;
                        seguimiento.IdEstatus = estatus.ID;
                        seguimiento.Version = item.Version;
                        await daoSeguimiento.SaveEntity(seguimiento, false, true);
                    }
                }
                else
                {
                    seguimientoCheck[0].Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                    if (item.Completado == null || item.Completado == false)
                    {
                        seguimientoCheck[0].IdEstatus = estatusBaja.ID;
                    }
                    else
                    {
                        seguimientoCheck[0].IdEstatus = estatus.ID;
                    }
                    seguimientoCheck[0].Changed("IdEstatus", true);
                    await daoSeguimiento.SaveEntity(seguimientoCheck[0], false, false);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return item;
        }
    }
}
