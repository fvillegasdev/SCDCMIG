//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SCV.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class SeguimientoDocumento : mkontrol.BaseKontrol, ISeguimientoDocumento
//    {
//        private int idSeguimiento;
//        private int idEtapa;
//        private int idDocumento;
//        private IDocumentoExpediente documento;
//        private IKontrolFile plantilla;
//        private string uid;
//        private int? readOnlyKontrol;
//        public IDocumentoExpediente Documento
//        {
//            get { return documento; }
//            set
//            {
//                documento = value;
//                base.PropertyChanged("Documento");
//            }
//        }

//        public int IdDocumento
//        {
//            get { return idDocumento; }
//            set
//            {
//                idDocumento = value;
//                base.PropertyChanged("IdDocumento");
//            }
//        }

//        public int IdEtapa
//        {
//            get { return idEtapa; }
//            set
//            {
//                idEtapa = value;
//                base.PropertyChanged("IdEtapa");
//            }
//        }

//        public int IdSeguimiento
//        {
//            get { return idSeguimiento; }
//            set
//            {
//                idSeguimiento = value;
//                base.PropertyChanged("IdSeguimiento");
//            }
//        }

//        public string Uid
//        {
//            get { return uid; }
//            set
//            {
//                uid = value;
//                base.PropertyChanged("Uid");
//            }
//        }

//        public IKontrolFile Plantilla
//        {
//            get { return plantilla; }
//            set
//            {
//                plantilla = value;
//                base.PropertyChanged("Plantilla");
//            }
//        }
//        public int? ReadOnlyKontrol
//        {
//            get { return readOnlyKontrol; }
//            set
//            {
//                readOnlyKontrol = value;
//                base.PropertyChanged("ReadOnlyKontrol");
//            }
//        }
//    }
//}
