//using EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;
//using EK.Modelo.SBO.Interfaces;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EK.Modelo.SBO
//{
//    public class SubTipoMovimiento : BaseKontrol, ISubTipoMovimiento
//    {
//        private string descripcion;
//        private ITipoMovimiento tipoMovimiento;
//        private int idTipoMovimiento;

//        public SubTipoMovimiento()
//            : base() {
//        }

//        public string Descripcion
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

//        public ITipoMovimiento TipoMovimiento
//        {
//            get
//            {
//                return this.tipoMovimiento;
//            }

//            set
//            {
//                this.tipoMovimiento = value;
//                base.PropertyChanged("TipoMovimiento");
//            }
//        }

//        public int IdTipoMovimiento
//        {
//            get
//            {
//                return this.idTipoMovimiento;
//            }

//            set
//            {
//                this.idTipoMovimiento = value;
//                base.PropertyChanged("IdTipoMovimiento");
//            }
//        }

//    }
//}
