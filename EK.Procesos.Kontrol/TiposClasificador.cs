using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class TiposClasificador
        : BPBase<m.Kontrol.Interfaces.ITipoClasificador, d.Kontrol.Interfaces.ITiposClasificador>, p.Kontrol.Interfaces.ITiposClasificador
    {
        public TiposClasificador(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ITiposClasificador dao)
       : base(factory, dao, "tiposClasificador")
        {
        }

        public async Task<object[]> GetAllTiposClasificador(Dictionary<string, object> parametros)
        {
            var daoTC = Get<d.Kontrol.Interfaces.ITiposClasificador>();
            return await daoTC.GetAllTiposClasificador(parametros);
        }

        public override async Task<m.Kontrol.Interfaces.ITipoClasificador> Save(m.Kontrol.Interfaces.ITipoClasificador item)
        {
            //Estatus
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            var clasificadores = item.Clasificadores;
            var tags = item.Tags;

            if (item.ID<1)
            {
                var daoCatalogogeneral = Get<EK.Datos.Kontrol.Interfaces.ICG>();
                var modeloCatalogoClasificador = Get<EK.Modelo.Kontrol.Interfaces.ICatalogoGeneral>();

                modeloCatalogoClasificador.Clave = item.Clave;
                modeloCatalogoClasificador.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                modeloCatalogoClasificador.Nombre = item.Nombre;
                modeloCatalogoClasificador.IdEstatus = estatus.ID;
                modeloCatalogoClasificador = await daoCatalogogeneral.Save(modeloCatalogoClasificador);
                item.IdCatalogosClasificadores =Convert.ToInt32(modeloCatalogoClasificador.ID);
            }
            item = await base.saveModel(item);
            //Obteniendo Id
            int idtipo = item.ID ?? 0;

            // Guardar Informacion Adicional
            if ((clasificadores != null && clasificadores.Count > 0) && item.IdCatalogosClasificadores != null)
            {
                await guadarTagsClasificadores(clasificadores, item.IdCatalogosClasificadores.Value);
            }
            if ((tags != null && tags.Count > 0) && item.IdCatalogosClasificadores != null)
            {
                await guadarTagsClasificadores(tags, item.IdCatalogosClasificadores.Value);
            }
            return item;
        }

        public async Task<int> guadarTagsClasificadores(List<m.Kontrol.Interfaces.IItemGeneral> items, int idCatalogoClasificador)
        {
            var daoCatalogGeneralValor = Get<d.Kontrol.Interfaces.ICGValores>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            int resultado = 1;
            try
            {
                foreach (var c in items)
                {
                    if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                    {
                        c.Estatus = estatus;
                        c.IdEstatus = estatus.ID;
                        c.IdCatalogo = idCatalogoClasificador;
                        c.Modificado = DateTime.UtcNow;
                        c.IdModificadoPor = base.getUserId();

                        if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                        {
                            c.Creado = DateTime.UtcNow;
                            c.IdCreadoPor = base.getUserId();
                        }
                        if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoCatalogGeneralValor.Delete(c.ID.Value, "catalogosgeneralesvalores");
                        }
                        else
                        {
                            await daoCatalogGeneralValor.Save(c);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                resultado = 0;
                Rollback();
                throw new ApplicationException("guadarTagsClasificadores::" + ex.Message, ex);
            }
            return resultado;
        }
    }
}