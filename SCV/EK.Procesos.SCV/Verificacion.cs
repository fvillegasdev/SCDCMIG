using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Dynamic;

namespace EK.Procesos.SCV
{
    public class Verificacion
        :p.Kontrol.BPBase<m.SCV.Interfaces.IVerificacion,d.SCV.Interfaces.IVerificacion>,p.SCV.Interfaces.IVerificacion
    {
        public Verificacion(m.Kontrol.Interfaces.IContainerFactory factory,d.SCV.Interfaces.IVerificacion dao)
            :base(factory,dao,"verificacion")
        {

        }

        private int generarCodigoAleatorio()
        {
            int longitud = 6;
            string alfabeto = "0123456789";
            StringBuilder token = new StringBuilder();
            Random rnd = new Random();

            for (int i = 0; i < longitud; i++)
            {
                int indice = rnd.Next(alfabeto.Length);
                token.Append(alfabeto[indice]);
            }
            string codigo = token.ToString();
            return Convert.ToInt32(codigo);
        }


        public async Task<bool> VerificacionItem(Dictionary<string,object> parametros)
        {
            try
            {
                bool result = false;
                int codigoGenerado = 0;

                BeginTransaction(true);
                object claveEntidad = string.Empty;
                object idRegistro = 0;


                parametros.TryGetValue("claveEntidad", out claveEntidad);
                parametros.TryGetValue("idRegistro", out idRegistro);

                var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var entidad = await bpTipoEntidad.Get("ENTVERIFICACIONCONTAC", claveEntidad.ToString());

                string claveEntidadE = entidad.Clave;

                switch (claveEntidadE)
                {
                    case "C":
                        codigoGenerado=await verificarEntidadCliente(Convert.ToInt32(idRegistro));
                        break;
                }


                Commit();
                return result;
            }
           catch(Exception ex)
            {
                Rollback();
                throw new ApplicationException("VerificacionItem::" + ex.Message, ex);
            }
        }

        private async Task<int> verificarEntidadCliente(int IdRegistro)
        {
            int codigoGenerado = 0;

            var bpClientes = Get<EK.Procesos.SCV.Interfaces.IClientes>();
            var daoClientesContacto = Get<EK.Datos.SCV.Interfaces.IClienteContacto>();

            var clienteContacto = await bpClientes.GetContactoClienteById(IdRegistro);

            dynamic obj = new ExpandoObject();

            string tipoContacto= clienteContacto.TipoContacto.Clave;

            codigoGenerado = generarCodigoAleatorio();
            obj.Codigo = codigoGenerado;


            switch (tipoContacto)
            {
                case "CORREO":
                    obj.Correo = clienteContacto.Contacto;
                    await EnvioCorreo(obj);
                    break;
                case "TELEFONO":
                    break;
            }

            var guardar=await SaveVerificacion(IdRegistro, clienteContacto.ID.Value, codigoGenerado);

            clienteContacto.IdVerificacion = guardar.ID;
            clienteContacto.Modificado = DateTime.UtcNow;
            clienteContacto.IdModificadoPor = base.getUserId();
            clienteContacto.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
            await daoClientesContacto.Save(clienteContacto);


            return codigoGenerado;
        }
        private async Task<bool> EnvioCorreo(dynamic obj)
        {
            bool result = true;
            try
            {
                var bpClientEmail = this.factory.GetInstance<NT.IClientEmail>();

                /*Obtenemos plantilla*/
                var plantilla = await this.GetPlantilla("VERIFICACION-NUM-CORREOS", obj);

                /*Areglo de correos*/
                String[] to = { obj.Correo };

                /*Enviamos mensaje*/
                bpClientEmail.SendMessage(to, plantilla.Titulo, plantilla.Plantilla_Contenido);

                return result;

            }
            catch
            {
                result = false;
                throw;
            }
          
        }

        private async Task<m.SCV.Interfaces.IVerificacion> SaveVerificacion(int idOrigen, int idEntidad, int Codigo)
        {
            var daoVerificacion = Get<d.SCV.Interfaces.IVerificacion>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpTipoEntidad.Get("ESTVERI", "E");

            var retvalue = Get<m.SCV.Interfaces.IVerificacion>();
            retvalue.Codigo = Codigo;
            retvalue.IdEntidad = idEntidad;
            retvalue.IdOrigen = idOrigen;
            retvalue.Vigencia = 24;
            retvalue.IdEstatus = estatus.ID;
            retvalue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            retvalue = await daoVerificacion.Save(retvalue);
            return retvalue;
        }

    }
}
