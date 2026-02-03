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
    public class SPVSupervisoresCat
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISVPSupervisoresCAT, d.SCV.Interfaces.ISPVSupervisoresCAT>, p.SCV.Interfaces.ISPVSupervisoresCat
    {
        public SPVSupervisoresCat(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISPVSupervisoresCAT dao)
           : base(factory, dao, "RelacionSupervisoresCat")
        {
        }

        public override async Task<m.SCV.Interfaces.ISVPSupervisoresCAT> Save(m.SCV.Interfaces.ISVPSupervisoresCAT item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoPE = Get<d.SCV.Interfaces.ISPVSupervisoresCAT>();
            var itemSupervisor = Get<m.SCV.Interfaces.ISVPSupervisoresCAT>();
            //m.SCV.Interfaces.ISPVCoordinadoresSupervisores2 ItmSupvr;
            //ItmSupvr.IdSupervisor = 222;
            //var x = Get<m.SCV.Interfaces.ISPVCoordinadoresSupervisores2>;
            //ItmSupvr.IdCoordinador = 100;
            // ItmSupvr.IdCoordinador = 500;
            //ItmSupvr.IdPlaza = 100401;
            try
            {
                BeginTransaction();

                var estatus = await bpCG.Get("ESTATUS", "A");
                item.IdEstatus = estatus.ID;
                item.Estatus = estatus;

                var supervisores = item.Supervisores;

                if (supervisores != null)
                {
                    foreach (var c in supervisores)
                    {
                        itemSupervisor.ID = (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo) ? item.ID : c.ID;
                        //itemSupervisor.Clave = c.Clave;
                        //itemSupervisor.Nombre = c.Nombre;
                        itemSupervisor.clave_supervisor = c.Clave;
                        itemSupervisor.clave_cat = item.clave_cat;
                        //itemSupervisor.IdCoordinador = (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo) ? int.Parse(item.Clave) : c.IdCoordinador;
                        itemSupervisor.IdPlaza = item.IdPlaza;
                        itemSupervisor.Estado = c.Estado;
                        itemSupervisor.Version = c.Version;
                        if (itemSupervisor.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            itemSupervisor.Estatus = estatus;
                            itemSupervisor.IdEstatus = estatus.ID;
                            itemSupervisor.Modificado = DateTime.UtcNow;
                            itemSupervisor.IdModificadoPor = base.getUserId();
                            if (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                itemSupervisor.Creado = DateTime.UtcNow;
                                itemSupervisor.IdCreadoPor = base.getUserId();
                            }
                            if (itemSupervisor.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoPE.Delete(itemSupervisor.ID.Value, "ID", "sv_supervisores_cat", true);
                            }
                            else
                            {
                                List<string> campos = new List<string>();
                                campos.Add("Clave");
                                campos.Add("Nombre");
                                await daoPE.SaveEntity(itemSupervisor, false, false, campos);
                            }
                        }
                    }
                }
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }
            return item;
        }
    }
}
