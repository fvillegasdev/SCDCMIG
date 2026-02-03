//using System;
//using EK.Modelo.SCV.Interfaces;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
//using mkontrol = EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;
//using System.Collections.Generic;

//namespace EK.Modelo.SCV
//{
//    public class DesarrolloPrototipos : Prototipos, IDesarrolloPrototipo
//    {
//        //private int idDesarrollo;
//        //public int IdDesarrollo
//        //{
//        //    get
//        //    {
//        //        return idDesarrollo;
//        //    }

//        //    set
//        //    {
//        //        idDesarrollo = value;
//        //        base.PropertyChanged("IdDesarrollo");
//        //    }
//        //}

//        //private int idPrototipo;
//        //public int IdPrototipo
//        //{
//        //    get
//        //    {
//        //        return idPrototipo;
//        //    }

//        //    set
//        //    {
//        //        idPrototipo = value;
//        //        base.PropertyChanged("IdPrototipo");
//        //    }
//        //}
//        private IPrototipo prototipo;
//        private decimal precioBase;
//     //   private int _id;
//        private List<IEntidadCaracteristica> caracteristicas;
//        public List<IEntidadCaracteristica> Caracteristicas
//        {
//            get
//            {
//                return caracteristicas;
//            }

//            set
//            {
//                caracteristicas = value;
//            }
//        }

//        //public int Id
//        //{
//        //    get
//        //    {
//        //        return _id;
//        //    }

//        //    set
//        //    {
//        //        _id = value;
//        //    }
//        //}

//        public decimal PrecioBase
//        {
//            get
//            {
//                return precioBase;
//            }

//            set
//            {
//                precioBase = value;
//                base.PropertyChanged("PrecioBase");
//            }
//        }

//        public IPrototipo Prototipo {
//            get {
//                return prototipo;
//            }
//            set { prototipo = value; }
//        }
//    }
//}
