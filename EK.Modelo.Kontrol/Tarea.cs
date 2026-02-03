//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Tarea
//        : BaseKontrol, ITarea
//    {
//        private int diasVigencia;
//        private int orden;
//        private bool? jefeDirecto;
//        private int? idPuesto;
//        private int? idPosicion;
//        private bool? puestoJerarquia;
//        private bool? puestoTodos;
//        private IPuesto puesto;
//        private IPosicion posicion;
//        private List<IReglaTarea> reglas;

//        public Tarea() 
//            : base()
//        {
//        }

//        public int DiasVigencia
//        {
//            get
//            {
//                return this.diasVigencia;
//            }

//            set
//            {
//                this.diasVigencia = value;
//                base.PropertyChanged("DiasVigencia");
//            }
//        }
//        public int Orden
//        {
//            get
//            {
//                return this.orden;
//            }

//            set
//            {
//                this.orden = value;
//                base.PropertyChanged("Orden");
//            }
//        }

//        public bool? JefeDirecto
//        {
//            get
//            {
//                return this.jefeDirecto;
//            }
//            set
//            {
//                this.jefeDirecto = value;
//            }
//        }

//        public int? IdPuesto
//        {
//            get
//            {
//                return this.idPuesto;
//            }

//            set
//            {
//                this.idPuesto = value;
//            }
//        }

//        public bool? PuestoJerarquia
//        {
//            get
//            {
//                return this.puestoJerarquia;
//            }

//            set
//            {
//                this.puestoJerarquia = value;
//            }
//        }

//        public bool? PuestoTodos
//        {
//            get
//            {
//                return this.puestoTodos;
//            }

//            set
//            {
//                this.puestoTodos = value;
//            }
//        }

//        public int? IdPosicion
//        {
//            get
//            {
//                return this.idPosicion;
//            }
//            set
//            {
//                this.idPosicion = value;
//            }
//        }

//        public IPuesto Puesto
//        {
//            get
//            {
//                return this.puesto;
//            }
//            set
//            {
//                this.puesto = value;
//            }
//        }

//        public IPosicion Posicion
//        {
//            get
//            {
//                return this.posicion;
//            }
//            set
//            {
//                this.posicion = value;
//            }
//        }

//        public List<IReglaTarea> Reglas {
//            get {
//                return this.reglas;
//            }
//            set {
//                this.reglas = value;
//            }
//        }
//    }

//    public class ReglaTarea
//    : BaseKontrol, IReglaTarea
//    {
//        private string campo;
//        private string operador;
//        private string valor;

//        public ReglaTarea()
//            : base()
//        {
//        }

//        public string Campo
//        {
//            get
//            {
//                return this.campo;
//            }

//            set
//            {
//                this.campo = value;
//            }
//        }
//        public string Operador
//        {
//            get
//            {
//                return this.operador;
//            }

//            set
//            {
//                this.operador = value;
//            }
//        }
//        public string Valor
//        {
//            get
//            {
//                return this.valor;
//            }

//            set
//            {
//                this.valor = value;
//            }
//        }
//    }
//}
