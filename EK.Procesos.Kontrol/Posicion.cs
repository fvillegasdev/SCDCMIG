using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Posicion
        : BPBase<m.Kontrol.Interfaces.IPosicion, d.Kontrol.Interfaces.IPosiciones>, p.Kontrol.Interfaces.IPosicion
    {
        public Posicion(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPosiciones dao)
               : base(factory, dao, "posiciones")
        {
        }

        //public async Task<m.Kontrol.Interfaces.IPosicion> GetPosicion(int id)
        //{
        //    return await this.dao.GetPosicion(id);
        //}

        //public async Task<m.Kontrol.Interfaces.IPosicion[]> GetPosiciones(string estatus, int kv) {
        //    return await this.dao.GetPosiciones(null, null, estatus, kv);
        //}

        public async Task<m.Kontrol.Interfaces.IPosicion> AsignarPosicion(int idUsuario, int? idPosicion)
        {
            try
            {
                BeginTransaction();

                var posicionesDAO = Get<d.Kontrol.Interfaces.IPosiciones>();
                m.Kontrol.Interfaces.IPosicion posicionActual = null; //await posicionesDAO.GetPosicionUsuario(idUsuario);
                m.Kontrol.Interfaces.IPosicion posicionNueva = idPosicion == null ? null : await posicionesDAO.GetById(idPosicion.Value);

                var posActual = await posicionesDAO.GetAll(new Dictionary<string, object> { { "idUsuario", idUsuario } });

                if (posActual != null && posActual.Count > 0) {
                    posicionActual = posActual[0];
                }

                if (posicionActual == null)
                {
                    if (posicionNueva == null)
                    {
                        // PA == PN = Usuario sin posición actual y sin posición nueva
                    }
                    else
                    {
                        // !PA && PN = Usuario sin posición actual, se asigna a posición nueva
                        var bpEstatusPosiciones = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var EstatusDisponible = await bpEstatusPosiciones.Get("ESTATUSPOSICION", "O");

                        posicionNueva.IdUsuario = idUsuario;
                        posicionNueva.IdEstatus = EstatusDisponible.ID;
                        posicionNueva.IdModificadoPor = getUserId();
                        posicionNueva.Modificado = DateTime.UtcNow;
                        
                        await posicionesDAO.SaveEntity(posicionNueva);
                    }
                    
                }
                else
                {
                    if (posicionNueva == null)
                    {
                        var bpEstatusPosiciones = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                        var EstatusDisponible = await bpEstatusPosiciones.Get("ESTATUSPOSICION", "D");

                        // PA && !PN == Usuario con posición actual, y sin posición nueva, se remueve de posición actual
                        posicionActual.IdUsuario = null;
                        posicionActual.IdEstatus = EstatusDisponible.ID.Value;
                        posicionActual.IdModificadoPor = getUserId();
                        posicionActual.Modificado = DateTime.UtcNow;

                        await posicionesDAO.SaveEntity(posicionActual);
                    }
                    else
                    {
                        if (posicionActual.ID == posicionNueva.ID)
                        {
                            // PA == PN == Posición actual igual a posición nueva
                            
                        }
                        else
                        {
                            // PA && !PN == Usuario con posición actual, y con posición nueva, 
                            // se remueve de posición actual, y se agrega a posición nueva

                            var bpEstatusPosiciones = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                            var EstatusDisponible = await bpEstatusPosiciones.Get("ESTATUSPOSICION", "D");
                            var EstatusOcupado = await bpEstatusPosiciones.Get("ESTATUSPOSICION", "O");

                            posicionActual.IdUsuario = null;
                            posicionActual.IdEstatus = EstatusDisponible.ID;
                            posicionActual.IdModificadoPor = getUserId();
                            posicionActual.Modificado = DateTime.UtcNow;

                            await posicionesDAO.SaveEntity(posicionActual);
                            
                            posicionNueva.IdUsuario = idUsuario;
                            posicionNueva.IdEstatus = EstatusOcupado.ID;
                            posicionNueva.IdModificadoPor = getUserId();
                            posicionNueva.Modificado = DateTime.UtcNow;

                            await posicionesDAO.SaveEntity(posicionNueva);

                            
                        }
                    }
                }

                Commit();
            }
            catch
            {
                Rollback();
                throw;
            }

            return null;
        }

        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetDescendientes(int? idUsuario)
        {
            return await this.dao.GetDescendientes(idUsuario);
        }

        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetAscendientes(int? idUsuario)
        {
            return await this.dao.GetAscendientes(idUsuario);
        }

        public async override Task<IPosicion> Save(IPosicion item)
        {
            IPosicion retValue = null;

            try
            {
                BeginTransaction(true);
                //
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
                    var estatus = await base.GetCGV("ESTATUSPOSICION", "D");
                    item.IdEstatus = estatus.ID;
                }
                else if(item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Modificado){
                    item.GetChanges().Remove("IdEstatus");
                }
                // no modificar este campo por este medio
                item.GetChanges().Remove("IdUsuario");               
                item.Changed("Clave", true);
                item.Changed("Nombre", true);
                item.Changed("IdPadre", true);
                item.Changed("IdCategoria", true);
                //
                retValue = await this.dao.SaveEntity(item);
                retValue.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                //
                await Log(retValue);
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

        public async Task<m.Kontrol.Interfaces.IPosicion> GetJefeInmediato(int? idUsuario)
        {
            var retValue = Get<m.Kontrol.Interfaces.IPosicion>();
            var ascendientes = await this.dao.GetAscendientes(idUsuario);
            if (ascendientes != null && ascendientes.Count > 1)
            {
                retValue = ascendientes[1];
            }

            return retValue;
        }
     }
}

        ///// <summary>
        ///// Obtiene las posiciones definidas para la organización de la estructura de usuarios de la compañía
        ///// </summary>
        ///// <param name="idPuesto">ID del Puesto</param>
        ///// <returns>Un arreglo de posiciones activas</returns>
        //public async Task<m.Kontrol.Interfaces.IPosicion[]> GetPosicionesPorPuesto(int idPuesto, string estatus, int kv) {
        //    return await this.dao.GetPosiciones(idPuesto, null, estatus, kv);
        //}

        ///// <summary>
        ///// Obtiene las posiciones definidas para la organización de la estructura de usuarios de la compañía
        ///// </summary>
        ///// <param name="idCategoria">ID de la categoría</param>
        ///// <returns>Un arreglo de categorias activas</returns>
        //public async Task<m.Kontrol.Interfaces.IPosicion[]> GetPosicionesPorCategoria(int idCategoria, string estatus, int kv) {
        //    return await this.dao.GetPosiciones(null, idCategoria, estatus, kv);
        //}

        //public async Task<m.Kontrol.Interfaces.IPuesto> GetPuesto(int id)
        //{
        //    return await this.dao.GetPuesto(id);
        //}

        ///// <summary>
        ///// Obtiene los puestos definidos
        ///// </summary>
        ///// <param name="activos">Si es TRUE regresa solo los elementos activos, en caso contrario, regresa todo el catálogo</param>
        ///// <returns>Un arreglo de puestos activos</returns>
        //public async Task<m.Kontrol.Interfaces.IPuesto[]> GetPuestos(bool activos, int kv) {
        //    return await this.dao.GetPuestos(activos, kv);
        //}

        //public async Task<m.Kontrol.Interfaces.ICategoria> GetCategoria(int id)
        //{
        //    return await this.dao.GetCategoria(id);
        //}

        ///// <summary>
        ///// Obtiene las categorías relacionadas a un puesto
        ///// </summary>
        ///// <param name="activos">Si es TRUE regresa solo los elementos activos, en caso contrario, regresa todo el catálogo</param>
        ///// <returns>Un arreglo de categorías activas</returns>
        //public async Task<m.Kontrol.Interfaces.ICategoria[]> GetCategorias(bool activos, int kv) {
        //    return await this.dao.GetCategorias(null, activos, kv);
        //}

        ///// <summary>
        ///// Obtiene las categorías relacionadas a un puesto
        ///// </summary>
        ///// <param name="idPuesto">ID del puesto</param>
        ///// <returns>Un arreglo de categorías activas</returns>
        //public async Task<m.Kontrol.Interfaces.ICategoria[]> GetCategoriasPorPuesto(int idPuesto, bool activos, int kv) {
        //    return await this.dao.GetCategorias(idPuesto, activos, kv);
        //}
