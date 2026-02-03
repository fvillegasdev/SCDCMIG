using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public abstract class BaseKontrol
        : IBaseKontrol
    {
        #region "Atributos"
        private List<string> propertyChanges;

        protected int? id;
        protected string clave;
        protected string nombre;
        protected DateTime? creado;
        protected IBaseUsuario creadoPor;
        protected DateTime? modificado;
        protected IBaseUsuario modificadoPor;
        protected string version;
        protected KontrolEstadosEnum estado;
        protected IItemGeneral estatus;
        protected int? idEstatus;
        protected int? idModificadoPor;
        protected int? idCreadoPor;

        private bool isTracking;
        private bool? sistema;
        #endregion

        #region "Constructores"
        /// <summary>
        /// Constructor utilizado para objetos nuevos
        /// </summary>
        protected BaseKontrol()
        {
            this.propertyChanges = new List<string>();
            this.estado = KontrolEstadosEnum.Nuevo;
            this.id = -1;
            this.version = "0";
            this.isTracking = true;
            this.sistema = false;
        }
        #endregion

        #region "Propiedades"
        public int? ID
        {
            get
            {
                return this.id;
            }
            set
            {
                this.id = value;
                //this.PropertyChanged("ID");
            }
        }

        public string Clave
        {
            get
            {
                return this.clave;
            }
            set
            {
                this.clave = value;
                this.PropertyChanged("Clave");
            }
        }

        public string Nombre
        {
            get
            {
                return this.nombre;
            }

            set
            {
                this.nombre = value;
                this.PropertyChanged("Nombre");
            }
        }

        public DateTime? Creado
        {
            get
            {
                return this.creado;
            }
            set
            {
                this.creado = value;
                this.PropertyChanged("Creado");
            }
        }

        public IBaseUsuario CreadoPor
        {
            get
            {
                return this.creadoPor;
            }
            set
            {
                this.creadoPor = value;
                this.PropertyChanged("CreadoPor");
            }
        }

        public DateTime? Modificado
        {
            get
            {
                return this.modificado;
            }
            set
            {
                this.modificado = value;
                this.PropertyChanged("Modificado");
            }
        }

        public IBaseUsuario ModificadoPor
        {
            get
            {
                return this.modificadoPor;
            }
            set
            {
                this.modificadoPor = value;
                this.PropertyChanged("ModificadoPor");
            }
        }

        public string Version
        {
            get
            {
                return this.version;
            }

            set
            {
                this.version = value;
                //this.PropertyChanged("Version");
            }
        }

        public KontrolEstadosEnum Estado
        {
            get
            {
                return this.estado;
            }
            set
            {
                this.estado = value;
            }
        }

        public IItemGeneral Estatus
        {
            get
            {
                return this.estatus;
            }
            set
            {
                this.estatus = value;
                this.PropertyChanged("Estatus");
            }
        }

        public int? IdEstatus
        {
            get
            {
                return this.idEstatus;
            }

            set
            {
                this.idEstatus = value;
                this.PropertyChanged("IdEstatus");
            }
        }

        public int? IdCreadoPor
        {
            get
            {
                return this.idCreadoPor;
            }

            set
            {
                this.idCreadoPor = value;
                this.PropertyChanged("CreadoPor");
            }
        }

        public int? IdModificadoPor
        {
            get
            {
                return this.idModificadoPor;
            }

            set
            {
                this.idModificadoPor = value;
                this.PropertyChanged("IdModificadoPor");
            }
        }

        public bool? Sistema
        {
            get
            {
                return this.sistema;
            }
            set
            {
                this.sistema = value;
                this.PropertyChanged("Sistema");
            }
        }
        #endregion

        #region "Métodos Base"
        protected void PropertyChanged(string propertyName)
        {
            if (this.propertyChanges == null) {
                this.propertyChanges = new List<string>();
            }

            if (this.isTracking)
            {
                if (!this.propertyChanges.Contains(propertyName))
                {
                    this.propertyChanges.Add(propertyName);
                }
            }
        }

        public bool TrackChanges {
            get {
                return this.isTracking;
            }
            set {
                this.isTracking = value;
                if (this.propertyChanges == null) {
                    this.propertyChanges = new List<string>();
                }
                this.propertyChanges.Clear();
            }
        }

        public List<string> GetChanges()
        {
            return this.propertyChanges;
        }

        public bool Changed()
        {
            return this.Changed(null);
        }
        public bool Changed(string propertyName)
        {
            var retValue = false;

            if (this.propertyChanges != null)
            {
                if (string.IsNullOrEmpty(propertyName) && this.propertyChanges.Count > 0)
                {
                    retValue = true;
                }
                else
                {
                    if (this.propertyChanges.Contains(propertyName))
                    {
                        retValue = true;
                    }
                }
            }

            return retValue;
        }

        public bool Changed(string propertyName, bool changed) {
            if (this.propertyChanges != null) {
                if (changed)
                {
                    this.PropertyChanged(propertyName);
                }
                else {
                    this.propertyChanges.Remove(propertyName);
                }
            }

            return changed;
        }

        #endregion
    }
    public abstract class BaseKontrolCompania
        : BaseKontrol, IBaseKontrolCompania
    {
        private int? idCompania;
        private ICompania compania;

        public int? IdCompania {
            get {
                return this.idCompania;
            }
            set {
                this.idCompania = value;
            }
        }

        public ICompania Compania {
            get {
                return this.compania;
            }
            set {
                this.compania = value;
            }
        }
    }
}
