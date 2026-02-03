//using m = EK.Modelo;

//namespace EK.Modelo.SCV
//{
//    public class EsquemaEtapaDocumento
//        : m.Kontrol.BaseKontrol, m.SCV.Interfaces.IEsquemaEtapaDocumento
//    {
//        private int idEsquema;
//        private int idEtapa;
//        private int idDocumento;
//        private m.SCV.Interfaces.IEtapa etapa;
//        private m.SCV.Interfaces.IDocumentoExpediente documento;
//        private int? idRequisitoRelacionado;
//        private m.Kontrol.Interfaces.IItemGeneral requisitoRelacionado;

//        public m.SCV.Interfaces.IDocumentoExpediente Documento
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

//        public int IdEsquema
//        {
//            get { return idEsquema; }
//            set
//            {
//                idEsquema = value;
//                base.PropertyChanged("IdEsquema");
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

//        public m.SCV.Interfaces.IEtapa Etapa
//        {
//            get { return etapa; }
//            set
//            {
//                etapa = value;
//                base.PropertyChanged("Etapa");
//            }
//        }

//        public int? IdRequisitoRelacionado
//        {
//            get { return this.idRequisitoRelacionado; }
//            set
//            {
//                this.idRequisitoRelacionado = value;
//                base.PropertyChanged("IdRequisitoRelacionado");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral RequisitoRelacionado
//        {
//            get { return this.requisitoRelacionado; }
//            set
//            {
//                this.requisitoRelacionado = value;
//                base.PropertyChanged("RequisitoRelacionado");
//            }
//        }
//    }
//}