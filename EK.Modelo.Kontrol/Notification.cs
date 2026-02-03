using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.Kontrol;

namespace EK.Modelo.Kontrol
{

    public class Notification : BaseKontrol, INotification
    {
        private string icon;
        private string typeElement;
        private List<INotificationItem> notificationItems;

        public Notification() : base()
        {

        }

        public string Icon
        {
            get { return this.icon; }
            set
            {
                this.icon = value;
                base.PropertyChanged("icon");
            }
        }
        public string TypeElement
        {
            get { return this.typeElement; }
            set
            {
                this.typeElement = value;
                base.PropertyChanged("typeElement");

            }
        }

        public List<INotificationItem> NotificationItems
        {
            get
            {
                return this.notificationItems;
            }
            set
            {
                this.notificationItems = value;
            }
        }
    }

    public class MessageNotification 
        : BaseKontrol, IMessageNotification
    {
        private string descripcion;
        private int Idplantilla;
        private int? idEntidad;
        private int? idNotificacion;
        private bool leido;
        private bool externo;
        private string tipoEntidad;

        private DateTime? leidoEn;
        private string enlace;
        private IMessageNotification notificacion;
        private IItemGeneral entidad;
        private bool fromapp;
        private string folio;
        private string ubicacion;
        private int idordentrabajo;

        public string Descripcion
        {
            get
            {
                return this.descripcion;
            }

            set
            {
                this.descripcion = value;
            }
        }
        public int idplantilla
        {
            get
            {
                return this.Idplantilla;
            }

            set
            {
                this.Idplantilla = value;
            }
        }

        public string TipoEntidad
        {
            get
            {
                return this.tipoEntidad;
            }

            set
            {
                this.tipoEntidad = value;
            }
        }

        public int? IdNotificacion
        {
            get
            {
                return this.idNotificacion;
            }

            set
            {
                this.idNotificacion = value;
            }
        }

        public int? IdEntidad
        {
            get
            {
                return this.idEntidad;
            }

            set
            {
                this.idEntidad = value;
            }
        }

        public bool Leido
        {
            get
            {
                return this.leido;
            }

            set
            {
                this.leido = value;
            }
        }
        public bool FromApp
        {
            get
            {
                return this.fromapp;
            }

            set
            {
                this.fromapp = value;
            }
        }
        public bool Externo
        {
            get
            {
                return this.externo;
            }

            set
            {
                this.externo = value;
            }
        }


        public DateTime? LeidoEn
        {
            get
            {
                return this.leidoEn;
            }

            set
            {
                this.leidoEn = value;
            }
        }

        public string Link
        {
            get
            {
                return this.enlace;
            }

            set
            {
                this.enlace = value;
            }
        }

        public IMessageNotification Notificacion
        {
            get
            {
                return this.notificacion;
            }

            set
            {
                this.notificacion = value;
            }
        }

        public IItemGeneral Entidad
        {
            get
            {
                return this.entidad;
            }

            set
            {
                this.entidad = value;
            }
        }
        public string Folio
        {
            get
            {
                return this.folio;
            }

            set
            {
                this.folio = value;
            }
        }
        public string Ubicacion
        {
            get
            {
                return this.ubicacion;
            }

            set
            {
                this.ubicacion = value;
            }
        }
        public int IdOrdenTrabajo
        {
            get
            {
                return this.idordentrabajo;
            }

            set
            {
                this.idordentrabajo = value;
            }
        }
    }
}
