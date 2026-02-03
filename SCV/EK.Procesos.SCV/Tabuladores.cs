using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace EK.Procesos.SCV
{
    public class Tabuladores
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITabuladores, d.SCV.Interfaces.ITabuladores>, p.SCV.Interfaces.ITabuladores
    {
        public Tabuladores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITabuladores dao)
            :  base(factory, dao, "tabuladores")
        {

        }



        public override async Task<m.SCV.Interfaces.ITabuladores> Save(m.SCV.Interfaces.ITabuladores item)
        {
            try
            {
                var configuracion = item.Configuracion;
                var daoConfiguracion = Get<d.SCV.Interfaces.ITabuladoresConfiguracion>();
                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");
                var tabulador = Get<m.SCV.Interfaces.ITabuladores>();

                bool nuevo = item.ID.Value > 0 ? false:true;

                if (!nuevo)
                {
                    tabulador = await this.dao.GetById(item.ID.Value);
                }

                item = await base.saveModel(item);

                if (item.Estado == m.Kontrol.KontrolEstadosEnum.Modificado && !nuevo)
                {
                    if (tabulador.IdDesarrollo != item.IdDesarrollo)
                    {
                        string desarrolloTabulador = tabulador.Desarrollo.Nombre != null ? tabulador.Desarrollo.Nombre : "--";
                        string desarrolloTabuladorItem = item.Desarrollo.Nombre != null ? item.Desarrollo.Nombre : "--";

                        await LogEvent(item.ID.Value, "tabuladores", 1053, "El desarrollo ha cambiado de " + desarrolloTabulador + " a " + desarrolloTabuladorItem);

                    }
                    if (tabulador.IdPlaza != item.IdPlaza)
                    {
                        string plazaTabulador = tabulador.Plaza.Nombre != null ? tabulador.Plaza.Nombre : "--";
                        string plazaTabuladorItem = item.Plaza.Nombre != null ? item.Plaza.Nombre : "--";

                        await LogEvent(item.ID.Value, "tabuladores", 1053, "La plaza ha cambiado de " + plazaTabulador + " a " + plazaTabuladorItem);
                    }
                }



                if (configuracion != null && configuracion.Count > 0)
                {
                    foreach (var elemento in configuracion)
                    {
                        if(elemento.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            elemento.IdTabulador = item.ID;
                            elemento.Estatus = estatus;
                            elemento.IdEstatus = estatus.ID;
                            elemento.Modificado = DateTime.UtcNow;
                            elemento.IdModificadoPor = base.getUserId();
                            if (elemento.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                elemento.Creado = DateTime.UtcNow;
                                elemento.IdCreadoPor = base.getUserId();                                
                            }
                            else if (elemento.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoConfiguracion.Delete(elemento.ID.Value);
                            }
                           
                            await daoConfiguracion.SaveEntity(elemento, true, true);
                        }                        
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return item;            
        }

        public override async Task<m.SCV.Interfaces.ITabuladores> Delete(int id)
        {
            BeginTransaction(true);
            m.SCV.Interfaces.ITabuladores retValue = null;

            try
            {
                var daoTabuladoresConfiguracion = Get<EK.Datos.SCV.Interfaces.ITabuladoresConfiguracion>();

                retValue = await this.dao.GetById(id);

                var parametros = new Dictionary<string, object> { { "idTabulador", id } };
                var configuracionTabulador = await daoTabuladoresConfiguracion.GetAll(parametros);

                foreach (var item in configuracionTabulador)
                {
                    await daoTabuladoresConfiguracion.Delete(item.ID.Value);
                }

                await this.deleteItem(id, null);
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
                await Log(retValue);
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            return retValue;
        }

        public new async Task<object> GetById (int id)
        {
            return await this.dao.ObtenerTabuladorPorID(id);
        }

        public async Task<List<m.SCV.Interfaces.ITabuladoresConfiguracion>> GetConfiguracionTabuladores(Dictionary<string,object> parametros)
        {
            var daoTabuladoresConfiguracion = Get<d.SCV.Interfaces.ITabuladoresConfiguracion>();
            return await daoTabuladoresConfiguracion.GetAll(parametros);
        }

        public async Task<object> ObtenerEjecucionesPorTabulador(Dictionary<string, object> parametros)
        {
            parametros.Add("ejecucionesTabulador", true);
            return await this.dao.ObtenerEjecucionesPorTabulador(parametros);
        }


        #region "Comiciones Periodicidad"
        public async Task<List<m.Kontrol.Interfaces.IPeriodicidad>> GetAllPeriodicidad(Dictionary<string, object> parametros)
        {
            var daoComisionesPeriodicidad = Get<d.Kontrol.Interfaces.IPeriodicidad>();
            return await daoComisionesPeriodicidad.GetAll(parametros);
        }
        #endregion
    }
}
