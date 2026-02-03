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
//    public class ComisionPlanEsquemaPeriodo : mkontrol.BaseKontrol, IComisionPlanEsquemaPeriodo
//    {
    
//        private DateTime? fechaInicio;
//        private DateTime? fechaFin;
//        private int idEsquema;
      

//        public DateTime? FechaInicio
//        {
//            get { return fechaInicio; }
//            set
//            {
//                fechaInicio = value;
//                base.PropertyChanged("FechaInicio");
//            }
//        }

//        public DateTime? FechaFin
//        {
//            get { return fechaFin; }
//            set
//            {
//                fechaFin = value;
//                base.PropertyChanged("FechaFin");
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


       
//    }
//}
