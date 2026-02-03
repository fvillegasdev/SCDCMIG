using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO
{
    public class InsumosMateriales
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IInsumoMaterial, d.SCCO.Interfaces.IInsumosMateriales>, p.SCCO.Interfaces.IInsumosMateriales
    {
        public InsumosMateriales(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IInsumosMateriales dao)
            : base(factory, dao, "scco_InsumosMateriales")
        {
        }

        public override async Task<m.SCCO.Interfaces.IInsumoMaterial> GetById(int id)
        {
            var daoTP = Get<d.SCCO.Interfaces.IInsumosMaterialesToleranciaProcesos>();

            var retValue = await this.dao.GetById(id);
            retValue.ToleranciaProcesos = await daoTP.GetAll(new Dictionary<string, object> { { "idInsumoMaterial", id } });
            retValue = await this.afterGetItem(retValue);

            return retValue;
        }

        public async override Task<List<m.SCCO.Interfaces.IInsumoMaterial>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario", base.getUserId());
            return await base.GetAll(parametros);
        }

        public override async Task<m.SCCO.Interfaces.IInsumoMaterial> Save(m.SCCO.Interfaces.IInsumoMaterial item)
        {
            try
            {
                BeginTransaction(true);

                var toleranciaProcesos = item.ToleranciaProcesos;
                var insumo = Get<m.SCCO.Interfaces.IInsumo>();
                var bpInsumos = Get<p.SCCO.Interfaces.IInsumos>();
                var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                var daoTP = Get<d.SCCO.Interfaces.IInsumosMaterialesToleranciaProcesos>();
                var bpEstatus = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                int idInsumo = -1;
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                idInsumo = item.ID ?? 0;

                if (item != null && item.IdInsumo > 0)
                {
                    insumo = await bpInsumos.GetById(item.IdInsumo);
                }

                var Clasificacion = await bpCG.Get("Clasificacion", "INSUMO");

                insumo.Clave = item.Clave;
                insumo.Nombre = item.Nombre;
                insumo.Estatus = item.Estatus;
                insumo.IdEstatus = item.IdEstatus;
                insumo.Clasificacion = Clasificacion;
                insumo.IdClasificacion = Clasificacion.ID.Value;
                insumo.ClaveInsumo = item.ClaveInsumo;
                insumo.IdUnidadMedida = item.IdUnidadMedida;
                insumo = await bpInsumos.Save(insumo);

                item.IdInsumo = (int)insumo.ID;
                item = await base.saveModel(item);

                if (toleranciaProcesos != null && toleranciaProcesos.Count > 0)
                {
                    foreach (var t in toleranciaProcesos)
                    {
                        if (t.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            t.IdInsumoMaterial = idInsumo;
                            t.Estatus = estatus;
                            t.Modificado = DateTime.UtcNow;
                            t.IdModificadoPor = base.getUserId();

                            if (t.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                t.Creado = DateTime.UtcNow;
                                t.IdCreadoPor = base.getUserId();
                            }

                            if (t.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoTP.Delete(t.ID.Value);
                            }
                            else
                            {
                                await daoTP.SaveEntity(t, false, true);
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
            item = await GetById(item.ID.Value);
            return item;
        }

        public override async Task<m.SCCO.Interfaces.IInsumoMaterial> Delete(int id)
        {
            var retValue = await base.Delete(id);
            if (retValue != null)
            {
                var daoBase = Get<d.SCCO.Interfaces.IInsumos>();
                await daoBase.Delete(retValue.IdInsumo);
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IInsumoMaterial> GetByIdInsumo(int idInsumo)
        {
            var item = await this.dao.GetByIdInsumo(idInsumo);
            return await this.GetById((int)item.ID);
        }
    }
}