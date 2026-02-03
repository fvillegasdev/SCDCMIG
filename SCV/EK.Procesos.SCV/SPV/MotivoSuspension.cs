using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Data;
using EK.Procesos.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class MotivoSuspension
        : p
        .Kontrol.BPBase<m.SCV.Interfaces.IMotivoSuspension, d.SCV.Interfaces.IMotivoSuspension>, p.SCV.Interfaces.IMotivoSuspension

    {
        public MotivoSuspension(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IMotivoSuspension dao)
            : base(factory, dao, "scv_MotivoSuspension")
        {
        }


        public async  Task<List<m.SCV.Interfaces.IMotivoSuspensionNotificaciones>> GetNotificadores(Dictionary<string, object> parametros)
        {
            var daoMS = Get<d.SCV.Interfaces.IMotivoSuspensionNotificaciones>();
            return await daoMS.GetAll(parametros);
        }
        public async Task<object> GetUsuarios(Dictionary<string, object> parametros)
        {
            var daoMS = Get<d.SCV.Interfaces.IMotivoSuspensionNotificaciones>();
            return await daoMS.GetAllUsuario(parametros);
        }

        public async Task<object> GetMotivoSuspension(Dictionary<string,object> parametros)
        {
            object retValue = null;
            var daoMotivoSuspension = Get<d.SCV.Interfaces.IMotivoSuspension>();
            if (parametros == null) {
                var p = new Dictionary<string, object>();
                p.Add("activos",1);
                retValue = await daoMotivoSuspension.GetAll(p);
                return retValue;
            }
            retValue = await daoMotivoSuspension.GetAll(parametros);
            return retValue;
        }

        public override async Task<m.SCV.Interfaces.IMotivoSuspension>Save(m.SCV.Interfaces.IMotivoSuspension item)
        {
            //Rescatando Valores
            var MotivoSuspensionNotificaciones = item.Notificaciones;

            //Guardardo elemento actual
            item = await base.saveModel(item);
            //Obteniendo Id
            int idGrupo = item.ID ?? 0;
            int idPosicion = item.ID ?? 0;
            int idArea = item.ID ?? 0;
            //Objetos Genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            //EntidadesAdicionales
            try
            {
                var daoMotivoSuspension = Get<d.SCV.Interfaces.IMotivoSuspension>();

                //Guardar Informacion Adicional
                if ((MotivoSuspensionNotificaciones != null && MotivoSuspensionNotificaciones.Count > 0))
                {
                    foreach (var c in MotivoSuspensionNotificaciones)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;

                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                                c.IdMotivoSuspension = item.ID.Value;
                            }
                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoMotivoSuspension.Delete(c.ID.Value, "scv_MotivoSuspension_Notificaciones");
                            }
                            else
                            {
                                await daoMotivoSuspension.SaveEntity(c, false, true);
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

        public override async Task<m.SCV.Interfaces.IMotivoSuspension> Delete(int id)
        {
            m.SCV.Interfaces.IMotivoSuspension retValue = null;
            var daomotivosSN = Get<d.SCV.Interfaces.IMotivoSuspensionNotificaciones>();
            var parametros = new Dictionary<string, object> { { "IdMotivo", id } };

            BeginTransaction();
            try
            {
                retValue = await this.dao.GetById(id);
                var notificadoresMotivosS = await daomotivosSN.GetAll(parametros);

                foreach (var item in notificadoresMotivosS)
                {
                    await daomotivosSN.Delete(item.ID.Value);
                }
                Commit();
                BeginTransaction();

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
    }
}