//using System.Collections.Generic;
//using m = EK.Modelo.SCV;
//using mk = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class Esquema : mk.BaseKontrol, m.Interfaces.IEsquema
//    {
//        private m.Interfaces.ITipoFinanciamiento tipoFinanciamiento;

//        public m.Interfaces.ITipoFinanciamiento TipoFinanciamiento
//        {
//            get { return tipoFinanciamiento; }
//            set
//            {
//                tipoFinanciamiento = value;
//                base.PropertyChanged("TipoFinanciamiento");
//            }
//        }


//        private int idFaseExpediente;

//        public int IdFaseExpediente
//        {
//            get { return idFaseExpediente; }
//            set
//            {
//                idFaseExpediente = value;
//                base.PropertyChanged("IdFaseExpediente");
//            }
//        }

//        private m.Interfaces.IFaseExpediente faseExpediente;

//        public m.Interfaces.IFaseExpediente FaseExpediente
//        {
//            get { return faseExpediente; }
//            set
//            {
//                faseExpediente = value;
//                base.PropertyChanged("FaseExpediente");
//            }
//        }

//        private int idEsquema;

//        public int IdEsquema
//        {
//            get { return idEsquema; }
//            set
//            {
//                idEsquema = value;
//                base.PropertyChanged("IdEsquema");
//            }
//        }

//        private m.Interfaces.IEsquema esquema;

//        public m.Interfaces.IEsquema EsquemaVenta
//        {
//            get { return esquema; }
//            set
//            {
//                esquema = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        private int? idTipoFinanciamiento;

//        public int? IdTipoFinanciamiento
//        {
//            get { return idTipoFinanciamiento; }
//            set
//            {
//                idTipoFinanciamiento = value;
//                base.PropertyChanged("IdTipoFinanciamiento");
//            }
//        }

//        private List<m.Interfaces.IEsquemaNivel> niveles;

//        public List<m.Interfaces.IEsquemaNivel> Niveles
//        {
//            get { return niveles; }
//            set
//            {
//                niveles = value;
//                base.PropertyChanged("Niveles");
//            }
//        }
//    }
//}