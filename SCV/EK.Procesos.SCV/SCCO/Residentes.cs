using System.Collections.Generic;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System;

namespace EK.Procesos.SCCO
{
    public class Residentes
        : p.Kontrol.BPBase<m.SCCO.Interfaces.IResidentes, d.SCCO.Interfaces.IResidentes>, p.SCCO.Interfaces.IResidentes
    {
        public Residentes(m.Kontrol.Interfaces.IContainerFactory factory, d.SCCO.Interfaces.IResidentes dao)
            : base(factory, dao, "Residentes")
        {
        }

        public override async Task<m.SCCO.Interfaces.IResidentes> GetById(int id)
        {
            var retValue = await this.dao.GetById(id);
            var daoRO = Get<d.SCCO.Interfaces.IResidenteObra>();
            
            retValue.ResidenteObras = await daoRO.GetAll(new Dictionary<string, object> { { "idResidente", id } });            
            retValue = await this.afterGetItem(retValue);
            return retValue;
        }

        public override async Task<m.SCCO.Interfaces.IResidentes> Save(m.SCCO.Interfaces.IResidentes item)
        {
            try
            {
                BeginTransaction(true);
                var residenteObras = item.ResidenteObras;

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var daoRO = Get<d.SCCO.Interfaces.IResidenteObra>();

                int idResidente = -1;

                item = await base.saveModel(item);
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                idResidente = item.ID ?? 0;

                if (residenteObras != null && residenteObras.Count > 0)
                {
                    foreach (var o in residenteObras)
                    {
                        if (o.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            o.IdResidente = idResidente;
                            o.Estatus = estatus;
                            o.Modificado = DateTime.UtcNow;
                            o.IdModificadoPor = base.getUserId();

                            if (o.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                o.Creado = DateTime.UtcNow;
                                o.IdCreadoPor = base.getUserId();
                            }
                            if (o.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                await daoRO.Delete(o.ID.Value);
                            else
                                await daoRO.SaveEntity(o, false, true);
                        }
                    }
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            item = await GetById(item.ID.Value);
            return item;
        }
    }
}