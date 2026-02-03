using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV
{
    public class CheckLists
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICheckList, d.SCV.Interfaces.ICheckLists>, p.SCV.Interfaces.ICheckLists
    {

        public CheckLists(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICheckLists dao)
            : base(factory, dao, "CheckList")
        {
        }

        public override async Task<m.SCV.Interfaces.ICheckList> Save(m.SCV.Interfaces.ICheckList item)
        {
            try
            {
                BeginTransaction();
                var planAccion = item.PlanAccion;
                var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoPlanAccion = Get<d.SCV.Interfaces.ICheckListsPlanAccion>();

                var estatus = await bpCG.Get("ESTATUS", "A");
                item = await base.saveModel(item);
                int idCheckList = item.ID ?? 0;

                if (planAccion != null && planAccion.Count > 0)
                {
                    foreach (var itemPlanAccion in planAccion)
                    {
                        itemPlanAccion.IdCheckList = idCheckList; 
                        if (itemPlanAccion.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            itemPlanAccion.Estatus = estatus;
                            itemPlanAccion.IdEstatus = estatus.ID;
                            itemPlanAccion.Modificado = DateTime.UtcNow;
                            itemPlanAccion.IdModificadoPor = base.getUserId();
                            itemPlanAccion.Estado = itemPlanAccion.ID == null || itemPlanAccion.ID <= 0 ? m.Kontrol.KontrolEstadosEnum.Nuevo : itemPlanAccion.Estado  == m.Kontrol.KontrolEstadosEnum.Eliminado ? m.Kontrol.KontrolEstadosEnum.Eliminado : m.Kontrol.KontrolEstadosEnum.Modificado;

                            if (itemPlanAccion.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                itemPlanAccion.Creado = DateTime.UtcNow;
                                itemPlanAccion.IdCreadoPor = base.getUserId();
                            }

                            if (itemPlanAccion.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoPlanAccion.Delete(itemPlanAccion.ID.Value);
                            }
                            else
                            {
                                await daoPlanAccion.SaveEntity(itemPlanAccion, false, true);
                            }
                        }
                    }
                }
                item = await this.afterGetItem(item);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return item;
        }

        public async Task<List<m.SCV.Interfaces.ICheckListPlanAccion>> GetCheckListPlanAccion(Dictionary<string, object> parametros)
        {
            var daoPA = Get<d.SCV.Interfaces.ICheckListsPlanAccion>();

            var paramtetrosPA = new Dictionary<string, object>();
            paramtetrosPA.Add("IdCheckList", parametros["IdCheckList"]);

            return await daoPA.GetAll(paramtetrosPA);
        }

       
    }
}