//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Notificador:BaseKontrol,INotificador
//    {
//        private int flujoId;
//        private int? notificadorId;        
//        private string nombreNotificador;        
//        private string tipo;

//        public Notificador() : base()
//        {

//        }

//        public int FlujoId
//        {
//            get
//            {
//                return this.flujoId;
//            }

//            set
//            {
//                this.flujoId = value;
//                base.PropertyChanged("FlujoId");
//            }
//        }
//        public int? NotificadorId
//        {
//            get
//            {
//                return this.notificadorId;
//            }

//            set
//            {
//                this.notificadorId = value;
//                base.PropertyChanged("NotificadorId");
//            }
//        }
      
//        public string NombreNotificador
//        {
//            get
//            {
//                return this.nombreNotificador;
//            }

//            set
//            {
//                this.nombreNotificador = value;                
//            }
//        }
       
//        public string TipoNotificador
//        {
//            get
//            {
//                return this.tipo;
//            }

//            set
//            {
//                this.tipo = value;
//                base.PropertyChanged("TipoNotificador");
//            }
//        }

//    }
//}
