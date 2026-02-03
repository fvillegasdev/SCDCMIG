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
//    public class ComisionPeriodoDetalle : mkontrol.BaseKontrol, IComisionPeriodoDetalle
//    {
    
//        private DateTime fechaInicio;
//        private DateTime fechaFin;
//        private int idComisionPeriodo;
//        private string descripcion;

//        public DateTime FechaInicio
//        {
//            get { return fechaInicio; }
//            set
//            {
//                fechaInicio = value;
//                base.PropertyChanged("FechaInicio");
//            }
//        }

//        public DateTime FechaFin
//        {
//            get { return fechaFin; }
//            set
//            {
//                fechaFin = value;
//                base.PropertyChanged("FechaFin");
//            }
//        }


//        public int IdComisionPeriodo
//        {
//            get { return idComisionPeriodo; }
//            set
//            {
//                idComisionPeriodo = value;
//                base.PropertyChanged("IdComisionPeriodo");
//            }
//        }

//        public String Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

       
//    }
//}
