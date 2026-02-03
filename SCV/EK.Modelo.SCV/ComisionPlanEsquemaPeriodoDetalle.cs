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
//    public class ComisionPlanEsquemaPeriodoDetalle : mkontrol.BaseKontrol, IComisionPlanEsquemaPeriodoDetalle
//    {

//        private int idPlanEsquemaPeriodo;
//        private int idCategoriaAgente;
//        private int idEtapa;
//        private int idTmComision;
//        private decimal porcentaje;
//        private string descripcion;
//        private int idFechaComision;
//        private ITmComisiones tmComision;
//        private string tmNombre;
//        IFechaComision fechaComision;
//        private IPuesto puesto;
//        public int IdPlanEsquemaPeriodo
//        {
//            get { return idPlanEsquemaPeriodo; }
//            set
//            {
//                idPlanEsquemaPeriodo = value;
//                base.PropertyChanged("IdPlanEsquemaPeriodo");
//            }
//        }
//        public string TMNombre
//        {
//            get { return tmNombre; }
//            set
//            {
//                tmNombre = value;
//                base.PropertyChanged("TMNombre");
//            }
             

//    }


//        public int IdCategoriaAgente
//        {
//            get { return idCategoriaAgente; }
//            set
//            {
//                idCategoriaAgente = value;
//                base.PropertyChanged("IdCategoriaAgente");
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


//        public int IdTmComision
//        {
//            get { return idTmComision; }
//            set
//            {
//                idTmComision = value;
//                base.PropertyChanged("IdTmComision");
//            }
//        }
        
//        public decimal Porcentaje
//        {
//            get { return porcentaje; }
//            set
//            {
//                porcentaje = value;
//                base.PropertyChanged("Porcentaje");
//            }
//        }


//        public string Descripcion
//        {
//            get { return descripcion; }
//            set
//            {
//                descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public int IdFechaComision
//        {
//            get { return idFechaComision; }
//            set
//            {
//                idFechaComision = value;
//                base.PropertyChanged("IdFechaComision");
//            }
//        }
//        public ITmComisiones TMComision
//        {
//            get { return tmComision; }
//            set
//            {
//                tmComision = value;
//                base.PropertyChanged("TMComision");
//            }
//        }
       

//        public IFechaComision FechaComision
//        {
//            get { return fechaComision; }
//            set
//            {
//                fechaComision = value;
//                base.PropertyChanged("FechaComision");
//            }
//        }
//        public IPuesto Puesto
//        {
//            get { return puesto; }
//            set
//            {
//                puesto = value;
//                base.PropertyChanged("Puesto");
//            }
//        }




//    }
//}
