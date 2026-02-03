//using System;
//using m = EK.Modelo.SCV;
//using mk = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCV
//{
//    public class ComisionConfiguracion
//        : mk.BaseKontrol, m.Interfaces.IComisionConfiguracion
//    {
//        private string descripcion;
//        private decimal? porcentaje;
//        private decimal? importe;
//        private int? idDesarrollo;
//        private m.Interfaces.IDesarrollos desarrollo;
//        private int? idEsquema;
//        private m.Interfaces.IEsquema esquema;
//        private int? idPrototipo;
//        private m.Interfaces.IPrototipo prototipo;
//        private int? idCategoria;
//        private mk.Interfaces.ICategoria categoria;
//        private int? idUbicacion;
//        private m.Interfaces.IUbicaciones ubicacion;

//        public mk.Interfaces.ICategoria Categoria
//        {
//            get { return this.categoria; }
//            set
//            {
//                this.categoria = value;
//                base.PropertyChanged("Categoria");
//            }
//        }

//        public m.Interfaces.IDesarrollos Desarrollo
//        {
//            get { return this.desarrollo; }
//            set
//            {
//                this.desarrollo = value;
//                base.PropertyChanged("Desarrollo");
//            }
//        }

//        public string Descripcion
//        {
//            get { return this.descripcion; }
//            set
//            {
//                this.descripcion = value;
//                base.PropertyChanged("Descripcion");
//            }
//        }

//        public m.Interfaces.IEsquema Esquema
//        {
//            get { return this.esquema; }
//            set
//            {
//                this.esquema = value;
//                base.PropertyChanged("Esquema");
//            }
//        }

//        public int? IdCategoria
//        {
//            get { return this.idCategoria; }
//            set
//            {
//                this.idCategoria = value;
//                base.PropertyChanged("IdCategoria");
//            }
//        }

//        public int? IdDesarrollo
//        {
//            get { return this.idDesarrollo; }
//            set
//            {
//                this.idDesarrollo = value;
//                base.PropertyChanged("IdDesarrollo");
//            }
//        }

//        public int? IdEsquema
//        {
//            get { return this.idEsquema; }
//            set
//            {
//                this.idEsquema = value;
//                base.PropertyChanged("IdEsquema");
//            }
//        }

//        public int? IdPrototipo
//        {
//            get { return this.idPrototipo; }
//            set
//            {
//                this.idPrototipo = value;
//                base.PropertyChanged("IdPrototipo");
//            }
//        }

//        public int? IdUbicacion
//        {
//            get { return this.idUbicacion; }
//            set
//            {
//                this.idUbicacion = value;
//                base.PropertyChanged("IdUbicacion");
//            }
//        }

//        public decimal? Importe
//        {
//            get { return this.importe; }
//            set
//            {
//                this.importe = value;
//                base.PropertyChanged("Importe");
//            }
//        }

//        public decimal? Porcentaje
//        {
//            get { return this.porcentaje; }
//            set
//            {
//                this.porcentaje = value;
//                base.PropertyChanged("Porcentaje");
//            }
//        }

//        public m.Interfaces.IPrototipo Prototipo
//        {
//            get { return this.prototipo; }
//            set
//            {
//                this.prototipo = value;
//                base.PropertyChanged("Prototipo");
//            }
//        }

//        public m.Interfaces.IUbicaciones Ubicacion
//        {
//            get { return this.ubicacion; }
//            set
//            {
//                this.ubicacion = value;
//                base.PropertyChanged("Ubicacion");
//            }
//        }
//    }
//}