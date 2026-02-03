using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Notification
        : BPBase<m.Kontrol.Interfaces.IMessageNotification, d.Kontrol.Interfaces.INotification>, p.Kontrol.Interfaces.INotification
    {
        public Notification(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.INotification dao)
               : base(factory, dao, "notificacion")
        {
        }

        public async Task<object> GetAllNotifications()
        {
            dynamic retValue = new ExpandoObject();
            var idUser = base.getUserId();
            var wm = Get<p.Kontrol.Interfaces.IWorkflowManager>();

            retValue.Tareas = await wm.GetAssignedTasks();
            retValue.Mensajes = await this.dao.GetMessageNotifications(idUser);

            return retValue;
        }
        public async Task<object> GetAllNotificationsFromApp()
        {
            dynamic retValue = new ExpandoObject();
            var idUser = base.getUserId();
            var wm = Get<p.Kontrol.Interfaces.IWorkflowManager>();

            retValue.Tareas = await wm.GetAssignedTasks();
            retValue.Mensajes = await this.dao.GetMessageNotificationsApp(idUser);

            return retValue;
        }
        //public override async Task<IMessageNotification> GetById(string owner, int id)
        //{
        //    var retValue = await this.dao.GetById(id);

        //    return retValue;
        //}

        public async Task<m.Kontrol.Interfaces.IMessageNotification> GuardarNotificacion(m.Kontrol.Interfaces.IMessageNotification mensaje)
        {
            try
            {
                BeginTransaction(true);
                //
                int id = mensaje.ID ?? -1;
                if (id <= 0)
                {
                    var entity = await base.Assign(mensaje);
                    entity.Leido = false;
                    entity.LeidoEn = null;
                    entity.IdNotificacion = null;
                    entity.TipoEntidad = "U";
                    entity = await this.dao.SaveEntity(entity, true);

                    //await base.StartWorkflow("VENTA-INICIO", entity, 6);

                    //var plantilla = await base.GetPlantilla("NOTIFICACION", entity);

                    //plantilla
                    //    .Add("@usuario", entity.User.Nombre)
                    //    .Add("@contenido", entity.Descripcion)
                    //    .Add("@link", entity.Link);

                    //await SendMail(entity.User.ID.Value, "EK (Notificacion) - " + Convert.ToString(entity.Nombre), plantilla.ToString());
                    await SendMail(entity.Entidad.ID.Value, "NOTIFICACION", entity);
                }
                else
                {
                    var entity = await base.Assign(mensaje);

                    if (entity.Leido)
                    {
                        //entity.Changed("Leido", true);
                        entity.Leido = true;
                        entity.LeidoEn = DateTime.UtcNow;

                        await this.dao.SaveEntity(entity);
                    }
                }

                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return mensaje;
        }

        //public List<mod.INotification> GetAllNotifications(string typeElement)
        //{
        //    return this.dao.GetAllNotifications(typeElement);
        //}
    }
}
