using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using mKontrol = EK.Modelo.Kontrol.Interfaces;
using dKontrol = EK.Datos.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol.Interfaces;
using System.Configuration;

namespace EK.Procesos.Kontrol
{
    public class EnvioCorreo : ProcesoBase, pKontrol.IEnvioCorreo
    {
        private dKontrol.IConfigurarParametros dao;
        private dKontrol.IWorkflow daoWF;
        private dKontrol.ITareaInstance daoTI;
        private dKontrol.ITarea daoT;
        private dKontrol.IPlantillasMails daoP;

        private readonly bool testNotification = Convert.ToBoolean(ConfigurationManager.AppSettings["drivers:notifications:email:testNotification"]);
        private readonly string testNotificationsEmail = ConfigurationManager.AppSettings["drivers:notifications:email:testNotificationEmail"];

        public EnvioCorreo(mKontrol.IContainerFactory factory, dKontrol.IConfigurarParametros dao,dKontrol.IWorkflow daoWF, dKontrol.IPlantillasMails daoP, 
                        dKontrol.ITareaInstance daoTI, dKontrol.ITarea daoT)
        {
            this.factory = factory;
            this.dao = dao;
            this.daoWF = daoWF;
            this.daoP = daoP;
            this.daoTI = daoTI;
            this.daoT = daoT;
        }

        public int SendMailTaskAssigned(int IdFlujo, int IdTarea, int IdTareaInstancia, int IdCliente,string NombreUsuario)
        {
            try
            {
                //List<mKontrol.IUsuario> Notificadores = daoWF.GetUsersNotifiersByWorkflow(IdFlujo);
                //List<mKontrol.IUsuario> Notificadores = daoT.GetUsersAssignedByTask(IdTarea); 
                //if (Notificadores.Count > 0)
                //{
                //    mKontrol.IPlantillasMails Plantilla = daoP.GetPlantillaMailsByKey("TAREA-ASIGNACION");
                //    mKontrol.ITareaInstancia Tarea = daoTI.GetTaskInstanceByIdTask(IdTareaInstancia);

                //    List<mKontrol.IConfigurarParametros> paramsMail = dao.GetMailParameters(IdCliente).ToList();
                //    string strSitio = paramsMail[4].Valor.ToString() + "/#/kontrol/Workflows/autorizacion/" + IdTareaInstancia.ToString();
                //    string strBody = "";                   

                //    List<string> NotifArray = new List<string>();
                //    for (int i = 0; i < Notificadores.Count; i++)
                //    {
                //        NotifArray.Clear();
                //        NotifArray.Add(Notificadores[i].Email);

                //        strBody = Plantilla.Plantilla;
                //        strBody = strBody.Replace("@LigaWeb", strSitio);
                //        strBody = strBody.Replace("@NombreDestinatario", Notificadores[i].Nombre + " " + Notificadores[i].Apellidos);

                //        SendEmail(NotifArray.ToArray(),
                //                    Tarea.Descripcion,
                //                    strBody
                //                    );
                //    }                   

                //    return 1;
                //}
                return 0;
            }
            catch (Exception ex)
            {
                return 0;
                throw new ApplicationException("Envio de Correos", ex);
            }
        }


        public async Task SendEmail(string[] To, string Subject, string Body)
        {
            try
            {
                MailMessage mail = new MailMessage();

                var pm = await GetGlobalParameters("EMAIL");

                string Servidor = pm.Value<string>("Servidor SMTP");//"srvcorp-mail16.gruporuba.net"; 
                int Puerto = pm.Value<int>("Puerto SMTP");//25;
                string usuario = pm.Value<string>("Usuario SMTP"); //"mensajeria.enkontrol@ruba.com.mx";//
                string password = pm.Value<string>("Password SMTP"); //"Enkontrol1103";//

                if (!testNotification)
                {
                    foreach (var P in To)
                    {
                        mail.To.Add(P.ToString());
                    }

                }
                else
                {
                    mail.To.Clear();
                    mail.CC.Clear();
                    mail.To.Add(testNotificationsEmail);
                }

              
                //mail.From = new MailAddress(CuentaRemitente, NombreRemitente, Encoding.UTF8);
                mail.From = new MailAddress("ek@enkontrol.com", "Enkontrol", Encoding.UTF8);
                mail.Subject = Subject;
                mail.SubjectEncoding = Encoding.UTF8;
                mail.Body = Body;
                mail.BodyEncoding = Encoding.UTF8;
                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;
                mail.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(Body, Encoding.UTF8, "text/html"));

                SmtpClient client = new SmtpClient();
                client.Credentials = new System.Net.NetworkCredential(usuario, password);
                client.Port = Puerto;
                client.Host = Servidor;
                client.EnableSsl = true;

                client.Send(mail);
            }
            catch(Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
        }

        //public int SendEmail(string[] To, string Subject, string Body,string Servidor, int Puerto,string NombreRemitente, string CuentaRemitente, string PswdRemitente)
        //{
        //    try
        //    {                                                
        //        MailMessage mail = new MailMessage();

        //        foreach (var P in To)
        //        {
        //            mail.To.Add(P.ToString());
        //        }

        //        //mail.From = new MailAddress(CuentaRemitente, NombreRemitente, Encoding.UTF8);
        //        mail.From = new MailAddress("ek@enkontrol.com", NombreRemitente, Encoding.UTF8);
        //        mail.Subject = Subject;
        //        mail.SubjectEncoding = Encoding.UTF8;
        //        mail.Body = Body;
        //        mail.BodyEncoding = Encoding.UTF8;
        //        mail.IsBodyHtml = true;
        //        mail.Priority = MailPriority.High;
        //        SmtpClient client = new SmtpClient();
        //        client.Credentials = new System.Net.NetworkCredential(CuentaRemitente, PswdRemitente);
        //        client.Port = Puerto;
        //        client.Host = Servidor;
        //        client.EnableSsl = true;

        //        client.Send(mail);
        //            return 1;

        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //        throw;
        //    }
        //}
    }
}
