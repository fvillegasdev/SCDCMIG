using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Common.Managers
{
    public class EmailManager
    {
        private string host;
        private int port;
        private bool ssl;
        private string userName;
        private string password;

        private SmtpClient client;

        public static EmailManager Create(string host, int port, bool ssl, string userName, string password) {
            return new EmailManager(host, port, ssl, userName, password);
        }

        private EmailManager(string host, int port, bool ssl, string userName, string password) {
            this.host = host;
            this.port = port;
            this.ssl = ssl;
            this.userName = userName;
            this.password = password;
        }

        public SmtpClient Client {
            get {
                if (this.client == null) {
                    this.client = new SmtpClient();

                    this.client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    this.client.UseDefaultCredentials = false;
                    this.client.Host = this.host;
                    this.client.Port = this.port;
                    this.client.EnableSsl = this.ssl;
                    this.client.Credentials = new System.Net.NetworkCredential(this.userName, this.password);
                }

                return this.client;
            }
        }

        public void Send(string from, string to, string subject, string body) {
            /*
             Parametros:
             [EMAIL] Configuración de Correo
                HOST
                PORT
                SSL ENABLED
                FROM
                USERNAME
                PASSWORD
             */
            try
            {
                MailMessage mail = new MailMessage(from, to, subject, body)
                {
                    IsBodyHtml = true
                };

                this.Client.Send(mail);
            }
            catch {
                throw;
            }
        }
    }
}
