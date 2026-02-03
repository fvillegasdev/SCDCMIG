using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class Contratistas
        : p.Kontrol.BPBase<m.SCV.Interfaces.IContratista, d.SCV.Interfaces.IContratistas>, p.SCV.Interfaces.IContratistas
    {
        public Contratistas(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IContratistas dao)
            : base(factory, dao, "Contratistas")
        { }

        public override async Task<List<m.SCV.Interfaces.IContratista>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("idUsuario", base.getUserId());
            return await base.GetAll(parametros);
        }

        public override async Task<m.SCV.Interfaces.IContratista> GetById(int id)
        {
            var retValue = await this.dao.GetById(id);
            int idproveedor = retValue.IdProveedor;

            var daoPr = Get<d.SCP.Interfaces.IProveedores>();
            retValue.Proveedor = await daoPr.GetById(idproveedor);
            
            retValue = await this.afterGetItem(retValue);
            return retValue;
        }

        public async override Task<m.SCV.Interfaces.IContratista> Save(m.SCV.Interfaces.IContratista item)
        {
            item.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;
            if (item != null)
            {
                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();

            }

            if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo)
            {
                item.Creado = DateTime.UtcNow;
                item.IdCreadoPor = base.getUserId();

            }

            ((m.Kontrol.Interfaces.IBaseKontrol)(item)).ID = item.ID;

            item = await this.dao.Save(item);
            item.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            await this.afterSaveItem(item);
            await this.afterSaveItem(item, item);
            await Log(item);

            return item;
        }

        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalle>> GetOrdenesTrabajo(Dictionary<string, object> parametros)
        {
            return await this.dao.GetOrdenesTrabajo(parametros);
        }
        public async Task<List<m.SCV.Interfaces.IAgendaContratistaDetalleAreasComunes>> GetOrdenesTrabajoAreasComunes(Dictionary<string, object> parametros)
        {
            return await this.dao.GetOrdenesTrabajoAreasComunes(parametros);
        }
    }
}