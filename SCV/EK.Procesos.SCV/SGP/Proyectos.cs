using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SGP
{
    public class Proyectos
    : p.Kontrol.BPBase<m.SGP.Interfaces.IProyectos, d.SGP.Interfaces.IProyectos>,
    p.SGP.Interfaces.IProyectos
    {
        public Proyectos(m.Kontrol.Interfaces.IContainerFactory factory,
            d.SGP.Interfaces.IProyectos dao)
            : base(factory, dao, "sgp_proyectos")
        {
        }

        public override async Task<m.SGP.Interfaces.IProyectos> Save(m.SGP.Interfaces.IProyectos item)
        {
            //Obteniendo IdProyecto
            int IdProyecto = item.ID >= 1 ? Convert.ToInt32(item.ID) : 0;

            var elementoRecibido = item;
            var CUSTOMFORM = item.CUSTOMFORM;

            //Guardardo elemento actual
            item = await base.saveModel(item);
            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //EntidadesAdicionales
            try
            {
                BeginTransaction(true);

                var daoColaboradores = Get<d.SGP.Interfaces.IColaboradores>();

                var ConfiguracionColaboradores = Get<m.SGP.Interfaces.IColaboradores>();
                if (ConfiguracionColaboradores != null)
                {
                    //Informacion adicional Colaboradores del Proyecto
                    ConfiguracionColaboradores.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    ConfiguracionColaboradores.IdProyecto = IdProyecto;
                    ConfiguracionColaboradores.Estatus = estatus;
                    ConfiguracionColaboradores.IdEstatus = estatus.ID;
                    ConfiguracionColaboradores.Creado = DateTime.UtcNow;
                    ConfiguracionColaboradores.IdCreadoPor = base.getUserId();

                    if (elementoRecibido.Colaboradores != null)
                    {
                        for (var i = 0; i < elementoRecibido.Colaboradores.Count; i++)
                        {
                            var ID = elementoRecibido.Colaboradores[i].ID != null ?(Int32)elementoRecibido.Colaboradores[i].ID : -1;
                            //SI ID < 0, Es registro nuevo, si no,registro ya se encuentra en tabla.
                            if (ID < 0)
                            {
                                var parametros = new Dictionary<string, object>
                                {
                                    { "IdUsuario", elementoRecibido.Colaboradores[i].Usuario.ID.Value },
                                    { "IdProyecto", IdProyecto },
                                    { "activos", 0 }
                                };
                                //Valida si el Colaborador existe, actualiza estatus Activo, si no, inserta nuevo
                                var Colaborador =  await daoColaboradores.GetAll(parametros);
                                if (Colaborador.Count > 0)
                                {
                                    ConfiguracionColaboradores.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                                    ConfiguracionColaboradores.Version = Colaborador[0].Version;
                                    ConfiguracionColaboradores.ID = (Int32)Colaborador[0].ID;
                                    ConfiguracionColaboradores.IdUsuario = elementoRecibido.Colaboradores[i].Usuario.ID.Value;
                                    ConfiguracionColaboradores.IdGrupo = elementoRecibido.Colaboradores[i].Grupo.ID.Value;
                                    await daoColaboradores.SaveEntity(ConfiguracionColaboradores, false, true);
                                }
                                else {                                    
                                    ConfiguracionColaboradores.IdUsuario = elementoRecibido.Colaboradores[i].Usuario.ID.Value;
                                    ConfiguracionColaboradores.IdGrupo = elementoRecibido.Colaboradores[i].Grupo.ID.Value;
                                    await daoColaboradores.SaveEntity(ConfiguracionColaboradores, false, true);
                                }

                            }
                            //SI ID > 0, registro ya se encuentra en tabla, valida si fue eliminado.
                            else if (elementoRecibido.Colaboradores[i]._eliminado == true)
                            {
                                ConfiguracionColaboradores.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                                ConfiguracionColaboradores.ID = elementoRecibido.Colaboradores[i].ID;
                                ConfiguracionColaboradores.Version = elementoRecibido.Colaboradores[i].Version;
                                ConfiguracionColaboradores.IdUsuario = elementoRecibido.Colaboradores[i].Usuario.ID.Value;
                                ConfiguracionColaboradores.IdGrupo = elementoRecibido.Colaboradores[i].Grupo.ID.Value;
                                var estatusInactive = await bpEstatus.Get("ESTATUS", "B");
                                ConfiguracionColaboradores.Estatus = estatusInactive;
                                ConfiguracionColaboradores.IdEstatus = estatusInactive.ID;
                                await daoColaboradores.SaveEntity(ConfiguracionColaboradores, false, true);
                            }
                        }
                    }
                }

                /*Almacenar informacion de los campos personalizados*/
                if (CUSTOMFORM != null && CUSTOMFORM.Count > 0)
                {
                    var CustomForm = Get<p.Kontrol.Interfaces.IPersonalizarCampos>();
                    await CustomForm.SaveCustomForm(CUSTOMFORM, IdProyecto);
                }

                Commit();

            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }
            return item;
        }

        public async Task<List<m.SGP.Interfaces.IColaboradores>> GetColaboradores(Dictionary<string, object> parametros)
        {
            var daoCL = Get<d.SGP.Interfaces.IColaboradores>();
            return await daoCL.GetAll(parametros);
        }

        //public async Task<List<m.Kontrol.Interfaces.IAgenda>> getDashBoardGrid(Dictionary<string, object> parametros)
        //{
        //    var daoAgenda = Get<d.Kontrol.Interfaces.IAgenda>();
        //    parametros.Add("OperacionEspecificaSP", "AgendaDashBoardGrid");
        //    parametros.Add("IdUsuario", base.getUserId());

        //    return await daoAgenda.GetAll(parametros);
        //}

        public async Task<List<m.SGP.Interfaces.IColaboradores>> GetResourceAssignedTask(Dictionary<string, object> parametros)
        {
            //var daoCL = Get<d.SGP.Interfaces.IColaboradores>();
            //return await daoCL.GetResourceAssignedTask(parametros);

           // var daoProject = Get<d.SGP.Interfaces.IProyectos>();
            parametros.Add("OperacionEspecificaSP", "RESOURCES-TASKS");
            parametros.Add("IdUsuario", getUserId());

            return await this.dao.GetResourceAssignedTask(parametros);

        }
    }
}