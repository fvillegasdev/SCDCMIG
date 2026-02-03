using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Dynamic;

namespace EK.Procesos.SCV
{
    public class SPVFraccionamientosCAT
         :p.Kontrol.BPBase<m.SCV.Interfaces.ISmFraccionamiento, d.SCV.Interfaces.ISmFraccionamiento>, p.SCV.Interfaces.ISPVFraccionamientosCAT
    {
        public SPVFraccionamientosCAT(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISmFraccionamiento dao)
           : base(factory, dao, "RelacionFraccionamientosCat")
        {
        }

        public override async Task<m.SCV.Interfaces.ISmFraccionamiento> Save(m.SCV.Interfaces.ISmFraccionamiento item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoPE = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            //var daoFracCat = Get<d.SCV.Interfaces.ISmFraccionamiento>();
            var daoFracCat = Get<d.SCV.Interfaces.ISmFraccionamiento>();

            //var itemSupervisor = Get<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>();
            var ItemFraccionamientos = Get<m.SCV.Interfaces.ISmFraccionamiento>();
            var fraccs = item.Fraccionamientos;
            var estatus = await bpCG.Get("ESTATUS", "A");
            try
            {
                BeginTransaction();
                foreach (var f in fraccs)
                {
                    ItemFraccionamientos.Estado = f.Estado;
                    ItemFraccionamientos.id_identificador = f.id_identificador;
                    ItemFraccionamientos.IdCat = f.IdCat;
                    ItemFraccionamientos.ClaveFrac =f.ClaveFrac;
                    ItemFraccionamientos.ID = f.ID.Value;
                    ItemFraccionamientos.IdEstatus = estatus.ID;
                    switch (ItemFraccionamientos.Estado)
                    {
                        case m.Kontrol.KontrolEstadosEnum.Nuevo:
                            List<string> campos = new List<string>();
                            campos.Add("Id");
                            //campos.Add("Nombre");
                            await daoFracCat.SaveEntity(ItemFraccionamientos, false, false, campos);
                            break;
                        case m.Kontrol.KontrolEstadosEnum.Eliminado:
                            if (ItemFraccionamientos.ID > 0)
                            {
                                await daoFracCat.Delete(ItemFraccionamientos.ID, "ID", "sv_fraccionamiento_cat", true);
                            }
                            break;

                    }
                    //await daoFracCat.SaveEntity(ItemFraccionamientos,false);
                }
                Commit();
            }
            catch(Exception ex)
            {
                Rollback();
                throw ex;
            }
            
            //item.Fraccionamientos
            
            //m.SCV.Interfaces.ISPVCoordinadoresSupervisores2 ItmSupvr;
            //ItmSupvr.IdSupervisor = 222;
            //var x = Get<m.SCV.Interfaces.ISPVCoordinadoresSupervisores2>;
            //ItmSupvr.IdCoordinador = 100;
            // ItmSupvr.IdCoordinador = 500;
            //ItmSupvr.IdPlaza = 100401;
            //try
            //{
            //    BeginTransaction();

            //    var estatus = await bpCG.Get("ESTATUS", "A");
            //    item.IdEstatus = estatus.ID;
            //    item.Estatus = estatus;

            //    var supervisores = item.Supervisores;

            //    if (supervisores != null)
            //    {
            //        foreach (var c in supervisores)
            //        {
            //            itemSupervisor.ID = (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo) ? item.ID : c.ID;
            //            //itemSupervisor.Clave = c.Clave;
            //            //itemSupervisor.Nombre = c.Nombre;
            //            itemSupervisor.IdSupervisor = c.IdSupervisor;
            //            itemSupervisor.IdCoordinador = (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo) ? int.Parse(item.Clave) : c.IdCoordinador;
            //            itemSupervisor.IdPlaza = c.IdPlaza;
            //            itemSupervisor.Estado = c.Estado;
            //            itemSupervisor.Version = c.Version;
            //            if (itemSupervisor.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
            //            {
            //                itemSupervisor.Estatus = estatus;
            //                itemSupervisor.IdEstatus = estatus.ID;
            //                itemSupervisor.Modificado = DateTime.UtcNow;
            //                itemSupervisor.IdModificadoPor = base.getUserId();
            //                if (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
            //                {
            //                    itemSupervisor.Creado = DateTime.UtcNow;
            //                    itemSupervisor.IdCreadoPor = base.getUserId();
            //                }
            //                if (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
            //                {
            //                    await daoPE.Delete(itemSupervisor.ID.Value);
            //                }
            //                else
            //                {
            //                    List<string> campos = new List<string>();
            //                    campos.Add("Clave");
            //                    campos.Add("Nombre");
            //                    await daoPE.SaveEntity(itemSupervisor, false, false, campos);
            //                }
            //            }
            //        }
            //    }
            //    Commit();
            //}
            //catch (Exception ex)
            //{
            //    Rollback();
            //    throw ex;
            //}
            return item;
        }
    }
}
