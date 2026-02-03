using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCCO.Calculos
{
    public class CalculoWBS : p.Kontrol.ProcesoBase, p.SCCO.Interfaces.ICalculoWBS
    {
        public CalculoWBS(m.Kontrol.Interfaces.IContainerFactory factory)
        {
            this.factory = factory;
        }

        #region CREATE_WBS
        public async Task<T> CreateNodo<T>(dynamic data) where T : class, m.SCCO.Interfaces.IWBSBase
        {
            T retValue = default(T);

            try
            {
                T item = this.Get<T>();
                item.ID = data.ID ?? -1;
                item.Clave = data.Clave ?? null;
                item.Nombre = data.Nombre ?? null;
                item.Descripcion = data.Descripcion ?? null;
                item.IdPadre = data.IdPadre ?? null;
                item.IdEntidad = data.IdEntidad ?? 0;
                item.Nivel = data.Nivel ?? null;
                item.Codigo = data.Codigo ?? null;
                item.Cantidad = data.Cantidad ?? 0.00000000M;
                item.Precio = data.Precio ?? 0.00000000M;
                item.Importe = data.Importe ?? 0.00000000M;
                item.IdTipoNodo = data.IdTipoNodo ?? 0;
                item.Bloqueado = data.Bloqueado ?? false;
                item.Creado = data.Creado ?? null;
                item.IdCreadoPor = data.IdCreadoPor ?? null;
                item.Modificado = data.Modificado ?? null;
                item.IdModificadoPor = data.IdModificadoPor ?? null;
                item.IdEstatus = data.IdEstatus ?? null;
                item.Sistema = data.Sistema ?? null;
                item.Version = data.Version ?? "0";
                item.Tipo = Convert.ToString(data.Tipo);
                item.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                //
                if (item.ID <= 0)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                }
                else if (data._nuevo != null && data._nuevo == true)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                }
                else if (data._sincambios != null && data._sincambios == true)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.SinCambios;
                }
                else if (data._modificado != null && data._modificado == true)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else if (data._eliminado != null && data._eliminado == true)
                {
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                //
                if (!string.IsNullOrEmpty(item.Tipo))
                {
                    var bpTiposNodos = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                    var tipoNodo = await bpTiposNodos.Get("SCCOWBSTIPOSNODOS", item.Tipo);
                    if (tipoNodo != null)
                    {
                        item.IdTipoNodo = (int)tipoNodo.ID;
                        item.TipoNodo = tipoNodo;
                    }
                    else
                    {
                        throw new Exception("El nodo contiene un tipo no válido.");
                    }
                }
                //
                retValue = await this.Assign<T>(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> CreateComposite<T>(dynamic data) where T : class, m.SCCO.Interfaces.IWBSComposite
        {
            T retValue = default(T);

            try
            {
                retValue = await this.CreateNodo<T>(data);

                var children = new List<m.SCCO.Interfaces.IWBSBase>();

                if (data.Children != null && data.Children.Count > 0)
                {
                    foreach (var dc in data.Children)
                    {
                        var child = await this.Create(dc);
                        if (child != null)
                        {
                            children.Add(child);
                        }
                    }
                }

                retValue.Children = children;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSInsumo> CreateInsumo(dynamic data)
        {
            m.SCCO.Interfaces.IWBSInsumo retValue = await this.CreateNodo<m.SCCO.Interfaces.IWBSInsumo>(data);
            retValue.IdInsumo = data.IdInsumo ?? 0;
            retValue.IdNodo = data.IdNodo ?? 0;
            retValue.IdMoneda = data.IdMoneda ?? 0;

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSNivel> CreateNivel(dynamic data)
        {
            m.SCCO.Interfaces.IWBSNivel retValue = await this.CreateComposite<m.SCCO.Interfaces.IWBSNivel>(data);
            retValue.IdTipoNivelPresupuesto = data.IdTipoNivelPresupuesto ?? 0;
            retValue.IdNivelPresupuesto = data.IdNivelPresupuesto ?? null;
            retValue.IdTipoAvance = data.IdTipoAvance ?? null;
            retValue.Unidades = data.Unidades ?? null;
            retValue.IdNodo = data.IdNodo ?? 0;

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSObra> CreateObra(dynamic data)
        {
            m.SCCO.Interfaces.IWBSObra retValue = await this.CreateComposite<m.SCCO.Interfaces.IWBSObra>(data);
            retValue.IdObra = data.IdObra ?? 0;
            retValue.IdTabulador = data.IdTabulador ?? 0;
            retValue.IdTipoPresupuesto = data.IdTipoPresupuesto ?? 0;
            retValue.IdNodo = data.IdNodo ?? 0;

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSTarjeta> CreateTarjeta(dynamic data)
        {
            m.SCCO.Interfaces.IWBSTarjeta retValue = await this.CreateComposite<m.SCCO.Interfaces.IWBSTarjeta>(data);
            retValue.IdTarjeta = data.IdTarjeta ?? 0;
            retValue.IdNodo = data.IdNodo ?? 0;

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSBase> Create(dynamic data)
        {
            m.SCCO.Interfaces.IWBSBase retValue = null;

            try
            {
                string tipo = Convert.ToString(data.Tipo);
                switch (tipo)
                {
                    case "O":
                        retValue = await this.CreateObra(data); break;
                    case "N":
                        retValue = await this.CreateNivel(data); break;
                    case "T":
                        retValue = await this.CreateTarjeta(data); break;
                    case "I":
                        retValue = await this.CreateInsumo(data); break;
                    default:
                        retValue = await this.CreateNodo<m.SCCO.Interfaces.IWBSNodo>(data); break;
                }

                return retValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region SAVE_WBS
        public async Task<m.SCCO.Interfaces.IWBSBase> Save(m.SCCO.Interfaces.IWBSBase model)
        {
            m.SCCO.Interfaces.IWBSBase retValue = null;

            try
            {
                if (model.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                {
                    if (model.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await this.Delete(model);
                    }
                    else
                    {
                        if (model is m.SCCO.Interfaces.IWBSObra)
                        {
                            retValue = await this.SaveComposite<m.SCCO.Interfaces.IWBSObra, d.SCCO.Interfaces.IWBSObras>(model as m.SCCO.Interfaces.IWBSObra);
                        }
                        else if (model is m.SCCO.Interfaces.IWBSNivel)
                        {
                            retValue = await this.SaveComposite<m.SCCO.Interfaces.IWBSNivel, d.SCCO.Interfaces.IWBSNiveles>(model as m.SCCO.Interfaces.IWBSNivel);
                        }
                        else if (model is m.SCCO.Interfaces.IWBSTarjeta)
                        {
                            retValue = await this.SaveComposite<m.SCCO.Interfaces.IWBSTarjeta, d.SCCO.Interfaces.IWBSTarjetas>(model as m.SCCO.Interfaces.IWBSTarjeta);
                        }
                        else if (model is m.SCCO.Interfaces.IWBSInsumo)
                        {
                            retValue = await this.SaveNodo<m.SCCO.Interfaces.IWBSInsumo, d.SCCO.Interfaces.IWBSInsumos>(model as m.SCCO.Interfaces.IWBSInsumo);
                        }
                        else if (model is m.SCCO.Interfaces.IWBSNodo)
                        {
                            retValue = await this.SaveBase(model, false);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> SaveComposite<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSComposite
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>
        {
            T retValue = default(T);

            try
            {
                var children = model.Children;

                retValue = await this.SaveNodo<T, S>(model);

                if (children != null && children.Count > 0)
                {
                    foreach (var child in children)
                    {
                        child.IdEntidad = model.IdEntidad;
                        child.IdPadre = retValue.IdNodo;

                        await this.Save(child);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> SaveNodo<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSBase
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>
        {
            S dao = Get<S>();

            try
            {
                var item = await this.SaveBase<T>(model);

                model.IdNodo = (int)item.ID;

                return await dao.Save(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<m.SCCO.Interfaces.IWBSBase> SaveBase<T>(T model, bool isComposed)
            where T : class, m.SCCO.Interfaces.IWBSBase
        {
            d.SCCO.Interfaces.IWBSNodos daoBase = Get<d.SCCO.Interfaces.IWBSNodos>();
            m.SCCO.Interfaces.IWBSNodo retValue = null;

            try
            {
                m.SCCO.Interfaces.IWBSNodo item = null;

                int id = model.IdNodo;

                if (!isComposed)
                {
                    id = (int)model.ID;
                }

                if (id > 0)
                {
                    item = await daoBase.GetById(id);
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }
                else
                {
                    item = Get<m.SCCO.Interfaces.IWBSNodo>();
                    item.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                }

                item = await this.Assign(item);
                item.Clave = model.Clave;
                item.Nombre = model.Nombre;
                item.Descripcion = model.Descripcion;
                item.IdPadre = model.IdPadre;
                item.IdEntidad = model.IdEntidad;
                item.Nivel = model.Nivel;
                item.Codigo = model.Codigo;
                item.Cantidad = model.Cantidad;
                item.Precio = model.Precio;
                item.Importe = model.Importe;
                item.IdTipoNodo = model.IdTipoNodo;
                item.Bloqueado = model.Bloqueado;

                retValue = await daoBase.Save(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSBase> SaveBase<T>(T model)
            where T : class, m.SCCO.Interfaces.IWBSBase
        {
            return await this.SaveBase<T>(model, true);
        }
        #endregion

        #region GET_WBS
        public async Task<m.SCCO.Interfaces.IWBSBase> GetWBS(int idEntidad)
        {
            d.SCCO.Interfaces.IWBSNodos dao = Get<d.SCCO.Interfaces.IWBSNodos>();
            m.SCCO.Interfaces.IWBSBase retValue = null;

            try
            {
                var parametros = new Dictionary<string, object>
                {
                    { "idEntidad", idEntidad }
                };

                var items = await dao.GetAll(parametros);
                if (items != null && items.Count > 0)
                {
                    retValue = await this.BuildNode(items[0], items);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSBase> BuildNode(m.SCCO.Interfaces.IWBSNodo item, List<m.SCCO.Interfaces.IWBSNodo> items)
        {
            m.SCCO.Interfaces.IWBSBase retValue = null;

            try
            {
                int idNodo = (int)item.ID;

                if (item.TipoNodo != null)
                {
                    switch (item.TipoNodo.Clave)
                    {
                        case "O":
                            retValue = await this.GetNode<m.SCCO.Interfaces.IWBSObra, d.SCCO.Interfaces.IWBSObras>(idNodo); break;
                        case "N":
                            retValue = await this.GetNode<m.SCCO.Interfaces.IWBSNivel, d.SCCO.Interfaces.IWBSNiveles>(idNodo); break;
                        case "T":
                            retValue = await this.GetNode<m.SCCO.Interfaces.IWBSTarjeta, d.SCCO.Interfaces.IWBSTarjetas>(idNodo); break;
                        case "I":
                            retValue = await this.GetNode<m.SCCO.Interfaces.IWBSInsumo, d.SCCO.Interfaces.IWBSInsumos>(idNodo); break;
                        default:
                            retValue = await this.Assign(item); break;
                    }
                    //
                    retValue.Tipo = item.TipoNodo.Clave;
                }
                else
                {
                    throw new Exception("El nodo no contiene un tipo válido.");
                }
                //
                if (retValue is m.SCCO.Interfaces.IWBSComposite)
                {
                    var parent = retValue as m.SCCO.Interfaces.IWBSComposite;
                    var children = new List<m.SCCO.Interfaces.IWBSBase>();

                    var itemChildren = items.FindAll(i => i.IdPadre == idNodo);
                    if (itemChildren != null)
                    {
                        foreach (var itemChild in itemChildren)
                        {
                            var child = await this.BuildNode(itemChild, items);
                            if (child != null)
                            {
                                children.Add(child);
                            }
                        }
                    }
                    //
                    parent.Children = children;
                    //
                    retValue = parent;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> GetNode<T, S>(int idNodo)
        where T : class, m.SCCO.Interfaces.IWBSBase
        where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>
        {
            S dao = Get<S>();
            T retValue = default(T);

            try
            {
                var parametros = new Dictionary<string, object>
                {
                    { "idNodo", idNodo }
                };

                var items = await dao.GetAll(parametros);
                if (items != null && items.Count > 0)
                {
                    retValue = items.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }
        #endregion

        #region DELETE_WBS
        public async Task<m.SCCO.Interfaces.IWBSBase> Delete(m.SCCO.Interfaces.IWBSBase model)
        {
            m.SCCO.Interfaces.IWBSBase retValue = null;

            try
            {
                if (model is m.SCCO.Interfaces.IWBSObra)
                {
                    retValue = await this.DeleteComposite<m.SCCO.Interfaces.IWBSObra, d.SCCO.Interfaces.IWBSObras>(model as m.SCCO.Interfaces.IWBSObra);
                }
                else if (model is m.SCCO.Interfaces.IWBSNivel)
                {
                    retValue = await this.DeleteComposite<m.SCCO.Interfaces.IWBSNivel, d.SCCO.Interfaces.IWBSNiveles>(model as m.SCCO.Interfaces.IWBSNivel);
                }
                else if (model is m.SCCO.Interfaces.IWBSTarjeta)
                {
                    retValue = await this.DeleteComposite<m.SCCO.Interfaces.IWBSTarjeta, d.SCCO.Interfaces.IWBSTarjetas>(model as m.SCCO.Interfaces.IWBSTarjeta);
                }
                else if (model is m.SCCO.Interfaces.IWBSInsumo)
                {
                    retValue = await this.DeleteNodo<m.SCCO.Interfaces.IWBSInsumo, d.SCCO.Interfaces.IWBSInsumos>((int)model.ID);
                }
                else if (model is m.SCCO.Interfaces.IWBSNodo)
                {
                    retValue = await this.DeleteBase((int)model.ID);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> DeleteComposite<T, S>(T model)
            where T : class, m.SCCO.Interfaces.IWBSComposite
            where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>
        {
            T retValue = default(T);

            try
            {
                var children = model.Children;
                if (children != null && children.Count > 0)
                {
                    foreach (var child in children)
                    {
                        await this.Delete(child);
                    }
                }

                retValue = await this.DeleteNodo<T, S>((int)model.ID);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retValue;
        }

        public async Task<T> DeleteNodo<T, S>(int id)
        where T : class, m.SCCO.Interfaces.IWBSBase
        where S : class, d.Kontrol.Interfaces.IDAOBaseGeneric<T>
        {
            T retValue = default(T);

            S dao = Get<S>();

            d.SCCO.Interfaces.IWBSNodos daoBase = Get<d.SCCO.Interfaces.IWBSNodos>();

            try
            {
                BeginTransaction();

                retValue = await dao.GetById(id);

                await dao.Delete(id);

                var deletedItem = await dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;

                    await daoBase.Delete(retValue.IdNodo);
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        public async Task<m.SCCO.Interfaces.IWBSNodo> DeleteBase(int id)
        {
            m.SCCO.Interfaces.IWBSNodo retValue = null;
            d.SCCO.Interfaces.IWBSNodos dao = Get<d.SCCO.Interfaces.IWBSNodos>();

            try
            {
                BeginTransaction();

                retValue = await dao.GetById(id);

                await dao.Delete(id);

                var deletedItem = await dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }

        #endregion
    }
}