using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class SCVNotificacion
        : p.Kontrol.BPBase<m.SCV.Interfaces.ISCVNotification, d.SCV.Interfaces.ISCVNotificacion>, p.SCV.Interfaces.ISCVNotificacion
    {
        public SCVNotificacion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ISCVNotificacion dao)
               : base(factory, dao, "notificacion")
        {

        }


        public async override Task<m.SCV.Interfaces.ISCVNotification> Save(m.SCV.Interfaces.ISCVNotification item)
        {
            try
            {
                BeginTransaction(true);

                /*Obteniendo el cliente al cual se la enviara el mensaje, el id del contacto y el expediente*/
                int idCliente = item.idCliente.Value;
                int idExpediente = item.idExpediente.Value;
                int idClienteContacto = item.Entidad.ID.Value;


                int id = item.ID ?? -1;
                if (id <= 0)
                {
                    /*Se asignan valores de bitacora al objeto*/
                    var entity = await base.Assign(item);
                    entity.Leido = false;
                    entity.LeidoEn = null;
                    entity.IdNotificacion = null;

                    /*Asignado Valor a la entidad y el tipo de entidad en este caso Cliente*/
                    entity.IdEntidad = idCliente;
                    entity.TipoEntidad = "C";

                    /*Guardar entidad*/
                    entity = await this.dao.SaveEntity(entity, true);

                    /*Obtenemos datos de contacto(correo electronico) del cliente*/
                    var daoclienteContacto = Get<EK.Datos.SCV.Interfaces.IClienteContacto>();
                    var clienteContacto = await daoclienteContacto.GetById(idClienteContacto);

                    /*Obtenemos datos del titular del cliente*/
                    var daoclienteAsesores = Get<EK.Datos.SCV.Interfaces.IClienteAsesores>();
                    var clienteTitular = await daoclienteAsesores.ObtenerTitularPorCliente(idCliente);

                    /*Obtenemos datos del expediente*/
                    var bpSeguimiento = Get<EK.Procesos.SCV.Interfaces.ISeguimientos>();
                    var agenteRelacionado = await bpSeguimiento.GetAgenteSeguimientoActivo(idExpediente);


                    /*Enviamos mensaje externo al correo del cliente*/
                    string[] emails = new string[1];
                    emails[0] = clienteContacto.Contacto;
                    await SendMail(emails, "NOTIFICACION", entity);

                    /*Enviamos aviso de envio de mensaje al titular del cliente*/
                    await SendNotification(clienteTitular.Usuario, "NOTIFICACION-ALERTA", null, entity, null);

                    /*Enviamos aviso de envio de mensaje al agente relacionado con  la fase activa del expediente*/
                    await SendNotification(agenteRelacionado.Usuario, "NOTIFICACION-ALERTA", null, entity, null);

                    /*Gereramos log en los catalogos correspondientes*/
                    string mensaje = "Se realizo el envió de un mensaje externo por " + entity.ModificadoPor.Nombre + " " + entity.ModificadoPor.Apellidos;
                    await LogEvent(idCliente, "scvclientes", 1053, mensaje);
                    await LogEvent(idExpediente, "expedientes", 1053, mensaje);
                }
                else
                {
                    var entity = await base.Assign(item);

                    if (entity.Leido)
                    {
                        entity.Leido = true;
                        entity.LeidoEn = DateTime.UtcNow;
                        await this.dao.SaveEntity(entity);
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
