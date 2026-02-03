using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;

namespace EK.Procesos.SCV
{
    public class Requisitos
          : p.Kontrol.BPBase<m.SCV.Interfaces.IRequisito, d.SCV.Interfaces.IRequisitos>,
        p.SCV.Interfaces.IRequisitos
    {
        public Requisitos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IRequisitos dao)
            : base(factory, dao, "requisitos")
        {
        }

        protected override async Task<m.SCV.Interfaces.IRequisito> saveModel(m.SCV.Interfaces.IRequisito item)
        {
            var caracteristicas = item.caracteristicas;

            item = await base.saveModel(item);

            int idRequisito = item.ID ?? 0;
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            // Se guardan las caracteristicas del requisito
            if (caracteristicas != null && caracteristicas.Count > 0)
            {
                foreach (var c in caracteristicas)
                {
                    if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        c.Estatus = estatus;
                        c.IdEstatus = estatus.ID;
                        c.IdRequisito = idRequisito;
                        c.Modificado = DateTime.UtcNow;
                        c.IdModificadoPor = base.getUserId();

                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {
                            c.Creado = DateTime.UtcNow;
                            c.IdCreadoPor = base.getUserId();
                        }

                        if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await this.dao.DeleteCaracteristica(c.ID.Value);
                        }
                        else
                        {
                            await this.dao.SaveCaracteristica(c);
                        }
                    }
                }
            }

            var parametros = new Dictionary<string, object> { { "IdRequisito", idRequisito } };
            item.caracteristicas = await this.dao.GetCaracteristicas(parametros);

            return item;
        }

        public async Task<List<m.SCV.Interfaces.IRequisitoCaracteristica>> GetCaracteristicas(Dictionary<string, object> parametros)
        {
            return await this.dao.GetCaracteristicas(parametros);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.Descripcion = obj.Descripcion;
            entity.TieneVencimiento = obj.TieneVencimiento;
            entity.Valores = obj.Valores;

            if (obj.WorkFlow != null)
            {
                entity.IdWorkFlow = obj.WorkFlow.ID;
                entity.IdWorkFlowClave = obj.WorkFlow.Clave;
                entity.IdWorkFlowNombre = obj.WorkFlow.Nombre;
            }

            entity.IdTipoRequisito = obj.TipoRequisito.ID;
            entity.IdTipoRequisitoClave = obj.TipoRequisito.Clave;
            entity.IdTipoRequisitoNombre = obj.TipoRequisito.Nombre;

            entity.IdTipoEntidad = obj.TipoEntidad.ID;
            entity.IdTipoEntidadClave = obj.TipoEntidad.Clave;
            entity.IdTipoEntidadNombre = obj.TipoEntidad.Nombre;
        }
    }
}