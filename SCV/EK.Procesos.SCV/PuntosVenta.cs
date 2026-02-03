using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using m = EK.Modelo.SCV.Interfaces;
using d = EK.Datos.SCV.Interfaces;
using p = EK.Procesos.SCV.Interfaces;

using mk = EK.Modelo.Kontrol;
using pk = EK.Procesos.Kontrol;

using mm = EK.Modelo;

namespace EK.Procesos.SCV
{
    public class PuntosVenta
        : pk.BPBase<m.IPuntoVenta, d.IPuntosVentas>, p.IPuntosVenta

    {
        public PuntosVenta(mk.Interfaces.IContainerFactory factory, d.IPuntosVentas dao)
            : base(factory, dao, "PuntosVenta")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
            entity.Clave = obj.Clave;
            entity.Direccion = obj.Direccion;
            entity.IdLocalidad = obj.Localidad.ID;
            entity.Telefono1 = obj.Telefono1;
            entity.Telefono2 = obj.Telefono2;
           // entity.CodigoPostal = obj.CodigoPostal;
        }

        public async Task<List<m.IPuntosVentaDesarrollos>> GetDesarrollosPorPuntoVenta(Dictionary<string, object> parametros)
        {
            if (parametros == null) 
            {
                parametros = new Dictionary<string, object>();
            }

            var daoDesarrollo = Get<d.IPuntosVentaDesarrollos>();

            List<m.IPuntosVentaDesarrollos> desarrollos = await daoDesarrollo.GetAll(parametros);

            return desarrollos;
        }

        public override async Task<m.IPuntoVenta> Save(m.IPuntoVenta item)
        {
            /*Valores de secciones*/
            var PuntosVentaDesarrollos = item.Desarrollos;

            try
            {

                /*Asignado Valor a variables de kontrol*/

                if (item.ID < 1)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }

                item.Modificado = DateTime.UtcNow;
                item.IdModificadoPor = base.getUserId();

                //var result = await this.dao.SaveEntity(item, false, true);
                item = await base.saveModel(item);
                //dynamic resultado = await this.GetById(item.ID.Value);

                /*Obteniendo IdDesarrollo*/
                int IdPuntoVenta = item.ID >= 1 ? Convert.ToInt32(item.ID) : 0;
                // int idDesarrollo = resultado != null ? resultado.ID : 0;

                /*Intancia de modelos*/

                var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatus = await bpEstatus.Get("ESTATUS", "A");

                /*Guardar Valor entidades adicionales*/

                var daoPuntosVentaDesarrollo = Get<d.IPuntosVentaDesarrollos>();

                //Guardar Informacion Adicional
                if (PuntosVentaDesarrollos != null && PuntosVentaDesarrollos.Count > 0)
                {
                    bool refrescar = false;
                    foreach (var c in PuntosVentaDesarrollos)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {

                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdPuntoVenta = IdPuntoVenta;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == mm.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }

                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                               int i = await daoPuntosVentaDesarrollo.Delete(c.ID.Value);
                            }
                            else
                            {
                                refrescar = c.ID == -1 ? true : false;
                                await daoPuntosVentaDesarrollo.SaveEntity(c, refrescar, true);
                            }
                        }
                    }

                }

                return item;
            }
            catch (Exception ex)
            {
                Rollback();
                throw;
            }
        }
    }
}
