//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;
//using Newtonsoft.Json;

//namespace EK.Modelo.Kontrol
//{
//    public class Workflow
//        : BaseKontrol, IWorkflow
//    {
//        private string nombre;
//        private string clave;
//        private int idTipo;
//        private bool jefeDirecto;
//        private int? idPuesto;
//        private int? idPosicion;
//        private bool puestoJerarquia;
//        private bool puestoTodos;
//        private IPuesto puesto;
//        private IPosicion posicion;

//        private ITipoWorkflow tipo;
//        private List<ITarea> tareas;

//        public Workflow() : base()
//        {
//            tareas = new List<ITarea>();
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
//            }
//        }
//        public int IdTipo
//        {
//            get
//            {
//                return this.idTipo;
//            }

//            set
//            {
//                this.idTipo = value;
//                base.PropertyChanged("IdTipo");
//            }
//        }

//        public bool JefeDirecto {
//            get {
//                return this.jefeDirecto;
//            }
//            set {
//                this.jefeDirecto = value;
//            }
//        }

//        public int? IdPuesto {
//            get {
//                return this.idPuesto;
//            }

//            set {
//                this.idPuesto = value;
//            }
//        }

//        public bool PuestoJerarquia
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

//        public bool PuestoTodos
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

//        public int? IdPosicion {
//            get {
//                return this.idPosicion;
//            }
//            set {
//                this.idPosicion = value;
//            }
//        }

//        public IPuesto Puesto {
//            get {
//                return this.puesto;
//            }
//            set {
//                this.puesto = value;
//            }
//        }

//        public IPosicion Posicion {
//            get {
//                return this.posicion;
//            }
//            set {
//                this.posicion = value;
//            }
//        }

//        public ITipoWorkflow Tipo
//        {
//            get { return this.tipo; }
//            set { this.tipo = value; }
//        }

//        public List<ITarea> Tareas
//        {
//            get { return this.tareas; }
//            set { this.tareas = value; }
//        }
//    }
//}
