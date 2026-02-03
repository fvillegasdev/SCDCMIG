//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class TipoWorkflow:BaseKontrol,ITipoWorkflow
//    {
//        private string nombre;
//        private string clave;
//        private int idAmbito;
//        private IItemGeneral ambito;

//        public TipoWorkflow(): base()
//        {

//        }
//        public string Nombre
//        {
//            get
//            {
//                return this.nombre;
//            }

//            set
//            {
//                this.nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }
//        public string Clave
//        {
//            get
//            {
//                return this.clave;
//            }

//            set
//            {
//                this.clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }
//        public int IdAmbito
//        {
//            get
//            {
//                return this.idAmbito;
//            }

//            set
//            {
//                this.idAmbito = value;
//                base.PropertyChanged("IdAmbito");
//            }
//        }

//        public IItemGeneral Ambito
//        {
//            get { return this.ambito; }
//            set { this.ambito = value; }
//        }
//    }
//}
