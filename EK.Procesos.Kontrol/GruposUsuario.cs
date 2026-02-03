using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class GruposUsuario
        : p.Kontrol.BPBase<m.Kontrol.Interfaces.IGruposUsuario, d.Kontrol.Interfaces.IGruposUsuario>, p.Kontrol.Interfaces.IGruposUsuario
    {
        public GruposUsuario(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IGruposUsuario dao)
            : base(factory, dao, "GruposUsuario")
        {
        }

        public override async Task<m.Kontrol.Interfaces.IGruposUsuario> Save(m.Kontrol.Interfaces.IGruposUsuario item)
        {
            //Rescatando Valores
            var integrantesGrupo = item.IntegrantesGrupo;

            //Guardardo elemento actual
            item = await base.saveModel(item);
            //Obteniendo Id
            int idGrupo = item.ID ?? 0;
            //Objetos Genericos
            var bpCG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpCG.Get("ESTATUS", "A");
            //EntidadesAdicionales
            try
            {
                var daoGruposUsuarioDetalle = Get<d.Kontrol.Interfaces.IGruposUsuarioDetalle>();

                //Guardar Informacion Adicional
                if ((integrantesGrupo != null && integrantesGrupo.Count > 0))
                {
                    foreach (var c in integrantesGrupo)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdGrupo = idGrupo;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                            }
                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoGruposUsuarioDetalle.Delete(c.ID.Value,"GruposUsuario_Detalle");
                            }
                            else
                            {
                                await daoGruposUsuarioDetalle.SaveEntity(c, false, true);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }
            return item;
        }

        public override async Task<List<m.Kontrol.Interfaces.IGruposUsuario>> GetAll(Dictionary<string, object> parametros)
        {
            Dictionary<string, object> parameters = new Dictionary<string, object>();
            var retvalue = await this.dao.GetAll(parametros);
            if (retvalue != null && retvalue.Count > 0)
            {
                foreach (var c in retvalue)
                {
                    var daoGUD = Get<d.Kontrol.Interfaces.IGruposUsuarioDetalle>();
                    parameters.Clear();
                    parameters.Add("IdGrupo", c.ID);
                    c.IntegrantesGrupo = await daoGUD.GetAll(parameters);
                }
            }
            return retvalue;
        }

        public async Task<List<m.Kontrol.Interfaces.IUsuariosGrupoDetalle>> GetUsersGroupDetails(Dictionary<string, object> parametros)
        {
            var daoGUD = Get<d.Kontrol.Interfaces.IGruposUsuarioDetalle>();
            return await daoGUD.GetUsersGroupDetails(parametros);
        }

        public async Task<object> GetGroupsDetailsUser( Dictionary<string,object> parametros)
        {
            var daoGUD = Get <d.Kontrol.Interfaces.IGruposUsuarioDetalle>();
            return await daoGUD.GetGroupsDetailsUser(parametros);
        }


        public async Task<List<m.Kontrol.Interfaces.IPosicion>> GetUsersGroupWithPositions(Dictionary<string, object> parametros)
        {
            var daoGUD = Get<d.Kontrol.Interfaces.IGruposUsuarioDetalle>();
            return await daoGUD.GetUsersGroupWithPositions(parametros);
        }
    }
}