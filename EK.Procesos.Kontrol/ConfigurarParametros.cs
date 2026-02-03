using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dKontrol = EK.Datos.Kontrol.Interfaces;
using mKontrol = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class ConfigurarParametros : ProcesoBase, pKontrol.IConfigurarParametros
    {
        private dKontrol.IConfigurarParametros dao;
        //private const string entityName = "configurarparametro";


        #region Constructor

        public ConfigurarParametros(mKontrol.IContainerFactory factory, dKontrol.IConfigurarParametros dao)
               : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
            //?
            this.entityName = "configurarparametro";
        }

        #endregion Constructor

        #region Public Functions

        public object[] GetAll(int idmodulo, int idcompania)
        {
            string ambitos = ObtenerAmbito(idmodulo, idcompania);
            return this.dao.GetAll(idmodulo, idcompania, ambitos);
        }

        public object[] Get(int idmodulo, int idcompania)
        {
            return this.dao.Get(idmodulo, idcompania);
        }

        public mKontrol.IConfigurarParametros GetById(int id)
        {
            return this.dao.Get(id);
        }

        public mKontrol.IConfigurarParametros[] Search(string nombre)
        {
            return this.dao.Get(nombre);
        }

        public async Task<mKontrol.IConfigurarParametros> Save(string configurarparametro)
        {
            dynamic obj = JsonConvert.DeserializeObject(configurarparametro);
            var model = factory.GetInstance<mKontrol.IConfigurarParametros>();
            model.ID = (obj.ID == null) ? 0 : obj.ID;
            model.IdParametro = obj.IdParametro;
            model.IdCompania = obj.Compania == null ? null : obj.Compania.ID;
            model.Valor = obj.Valor;
            model.IdEstatus = obj.Estatus.ID;
            model.IdCreadoPor = base.getUserId(); // Obtener del usuario actual
            model.IdModificadoPor = base.getUserId(); // Obtener del usuario actual

            // save
            //int number = 0; // this.dao.Save(model);
            model = this.dao.Get((int)model.IdParametro);
            model.Estado = (obj.ID == 0) ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;

            // refresh the info - log changes
            await this.Log(model);
            return model;
        }

        public List<mKontrol.IConfigurarParametros> GetMailParameters(int idCliente)
        {
            return this.dao.GetMailParameters(idCliente);
        }

        public async Task<object[]> GetHistory(int top)
        {
            return await base.GetEntityHistory(entityName, top);
        }

        public async Task<object[]> GetHistory(int ID, int top)
        {
            return await base.GetEntityHistory(entityName, ID, top);
        }

        public async Task<List<mKontrol.IConfigurarParametros>> getConfiguracionParametro(Dictionary<string, object> parametros)
        {
            var daoCP = Get<Datos.Kontrol.Interfaces.IConfigurarParametros>();
            return await daoCP.GetAllConfiguracionParametros(parametros);
        }



        //public int SendEmail(string To, string Subject, string Body)
        //{
        //    try
        //    {
        //        List<mKontrol.IConfigurarParametros> paramsMail = this.GetMailParameters(base.getClientId(), 12, 1).ToList();
        //        MailMessage mail = new MailMessage();

        //        mail.To.Add(To);
        //        mail.From = new MailAddress(paramsMail[2].Valor.ToString(), base.User.Current.Nombre + " " + base.User.Current.Apellidos, System.Text.Encoding.UTF8);
        //        mail.Subject = Subject;
        //        mail.SubjectEncoding = System.Text.Encoding.UTF8;
        //        mail.Body = Body;
        //        mail.BodyEncoding = System.Text.Encoding.UTF8;
        //        mail.IsBodyHtml = true;
        //        mail.Priority = MailPriority.High;
        //        SmtpClient client = new SmtpClient();
        //        client.Credentials = new System.Net.NetworkCredential(paramsMail[2].Valor.ToString(), paramsMail[3].Valor.ToString());
        //        client.Port = int.Parse(paramsMail[1].Valor.ToString());
        //        client.Host = paramsMail[0].Valor.ToString();
        //        client.EnableSsl = true;
        //        try
        //        {
        //            client.Send(mail);
        //            return 1;
        //        }
        //        catch (Exception ex)
        //        {
        //            return 0;
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        #endregion Public Functions

        #region Private Functios

        private async Task Log(mKontrol.IConfigurarParametros obj)
        {
            dynamic entity = new ElasticEntity();
            entity.ID = obj.ID;

            entity.IdParametro = obj.Parametro.ID;
            entity.IdParametroNombre = obj.Parametro.Nombre;
            entity.IdModulo = obj.Parametro.Modulo.ID;
            entity.IdModuloNombre = obj.Parametro.Modulo.Nombre;
            entity.IdCompania = obj.Compania.ID;
            entity.IdCompaniaNombre = obj.Compania.Nombre;
            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;

            entity.Valor = obj.Valor;
            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();

            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;

            await this.factory.GetInstance<ILogger>().AddAsync(entityName, entity);
        }

        private string ObtenerAmbito(int idmodulo, int idcompania)
        {
            List<string> ambitos = new List<string>();
            if (idmodulo != 0) { ambitos.Add("CL"); }
            if (idcompania != 0) { ambitos.Add("C"); }
            return (ambitos.Any()) ? string.Join(",", ambitos.ToArray()) : null;
        }

        #endregion Private Functios
    }
}