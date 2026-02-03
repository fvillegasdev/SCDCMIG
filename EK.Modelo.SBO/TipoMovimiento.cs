//using System;
//using EK.Modelo.Kontrol;
//using EK.Modelo.SBO.Interfaces;

//namespace EK.Modelo.SBO
//{
//    public class TipoMovimiento : BaseKontrol, ITipoMovimiento
//    {
//        private string descripcion;
//        private string naturaleza;
//        private string usaSubTipo;
//        private string conciliado;


//        public TipoMovimiento()
//            : base() {
//        }

//        public string Conciliado
//        {
//            get
//            {
//                return this.conciliado;
//            }

//            set
//            {
//                this.conciliado = value;
//                base.PropertyChanged("Conciliado");
//            }
//        }

//       public string Descripcion
//        {
//            get
//            {
//                return this.descripcion;
//            }

//            set
//            {
//                this.descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public string Naturaleza
//        {
//            get
//            {
//                return this.naturaleza;
//            }

//            set
//            {
//                this.naturaleza = value;
//                base.PropertyChanged("Naturaleza");
//            }
//        }

//       public string UsaSubTipo
//        {
//            get
//            {
//                return this.usaSubTipo;
//            }

//            set
//            {
//                this.usaSubTipo = value;
//                base.PropertyChanged("UsaSubTipo");
//            }
//        }
//    }
//}
