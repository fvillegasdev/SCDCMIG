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
    public class SPVSupervisoresCoordinadores
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISPVCoordinadores, d.SCV.Interfaces.ISPVCoordinadores>, p.SCV.Interfaces.ISPVSupervisoresCoordinadores

    {
        public SPVSupervisoresCoordinadores(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISPVCoordinadores dao)
            : base(factory, dao, "RelacionSupervisoresCoordinadores")
        {
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCoordinadores(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();           
            return await localDAO.getCoordinadores(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCatsFromPlaza(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            return await localDAO.GetCatsFromPlaza(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getCatsSupFromPlaza(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            return await localDAO.GetCatsSupFromPlaza(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getResponsablesConstruccion(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "ResponsablesConstruccion");
            return await localDAO.getResponsablesConstruccion(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> getResponsablesConstruccionACUnico(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "ResponsablesConstruccionSingleAC");
            return await localDAO.getResponsablesConstruccion(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getAsignado(Dictionary<string, object> parametros)
        {
            //var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 1);

            return await this.dao.getSupervisores(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>> getNoAsignado(Dictionary<string, object> parametros)
        {
            //var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 0);
            return await this.dao.getSupervisores(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccAsignados(Dictionary<string, object> parametros)
        {
            //var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 1);

            return await this.dao.getFraccionamientosCat(parametros);
        }

        public async Task<List<m.SCV.Interfaces.ISmFraccionamiento>> getFraccNoAsignados(Dictionary<string, object> parametros)
        {
            //var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 0);
            return await this.dao.getFraccionamientosCat(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresDisponiblesCAT(Dictionary<string, object> parametros)
         {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 0);
            return await localDAO.GetSupervisoresDisponiblesCAT(parametros);
        }
        public async Task<List<m.SCV.Interfaces.ISPVCoordinadores>> GetSupervisoresAsignadosCAT(Dictionary<string, object> parametros)
        {
            var localDAO = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            parametros.Add("Asignados", 1);
            return await localDAO.GetSupervisoresAsignadosCAT(parametros);
        }
        public interface ISPVCoordinadoresSupervisores2
        {

            [m.Kontrol.Column("id_identificador_cc")]
            string IdPlaza { get; set; }

            [m.Kontrol.Column("clave_coordinador")]
            int IdCoordinador { get; set; }

            [m.Kontrol.Column("clave_supervisor")]
            int IdSupervisor { get; set; }
        }
        public override async Task<m.SCV.Interfaces.ISPVCoordinadores> Save(m.SCV.Interfaces.ISPVCoordinadores item)
        {
            var bpCG = Get<p.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var daoPE = Get<d.SCV.Interfaces.ISPVCoordinadores>();
            var itemSupervisor = Get<m.SCV.Interfaces.ISPVCoordinadoresSupervisores>();
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
                        itemSupervisor.IdSupervisor = c.IdSupervisor;
                        itemSupervisor.IdCoordinador = (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo) ? int.Parse(item.Clave) : c.IdCoordinador;
                        itemSupervisor.IdPlaza = c.IdPlaza;
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
                               await daoPE.Delete(itemSupervisor.ID.Value);
                            }
                            else
                            {
                                List<string> campos = new List<string>();
                                campos.Add("Clave");
                                campos.Add("Nombre");
                                await daoPE.SaveEntity(itemSupervisor, false, false,campos);
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