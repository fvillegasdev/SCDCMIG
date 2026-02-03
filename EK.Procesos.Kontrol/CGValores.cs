using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class CGValores
        : BPBase<m.Kontrol.Interfaces.IItemGeneral, d.Kontrol.Interfaces.ICGValores>, p.Kontrol.Interfaces.ICGValores
    {
        public CGValores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICGValores dao)
               : base(factory, dao, "")
        {

        }

        protected override async Task Log(IBaseKontrol obj)
        {
            await Task.FromResult(0);
        }

        public override async Task<IItemGeneral> Save(IItemGeneral item)
        {
            IItemGeneral retValue = null;
           
            try
            {
                BeginTransaction(true);

                if (item.ID <= 0)
                {
                    var bpCatalogo = Get<p.Kontrol.Interfaces.ICatalogosGenerales>();
                    item.Catalogo = await bpCatalogo.GetByClave(item.Catalogo.Clave);
                    item.IdCatalogo = item.Catalogo.ID;
                }
                retValue = await base.saveModel(item);

                await base.Log(retValue, item.Catalogo.Clave);
                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
        

        public override async Task<IItemGeneral> Delete(int id)
        {
            IItemGeneral retValue = null;

            try
            {
                BeginTransaction();

                retValue = await this.dao.GetById(id);

                await this.dao.Delete(id);

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

                await Log(retValue, retValue.Catalogo.Clave);

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
    }
}