using System;
using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class EntidadCaracteristica : mk.BaseKontrol, m.Interfaces.IEntidadCaracteristica
    {
        private m.Interfaces.ICaracteristicaAdicional caracteristica;
        private int idEntidad;
        private string tipo;

        private int idTipoEntidad;
        private bool ventaOpcional;
        private decimal importe;
        private decimal? importeCaracteristica;

        private int idCaracteristica;
        private int? idTipoUbicacion;
        private string tipoClave;
        private mk.Interfaces.IItemGeneral tipoEntidad;
        private mk.Interfaces.IItemGeneral tipoUbicacion;

        public m.Interfaces.ICaracteristicaAdicional Caracteristica
        {
            get { return caracteristica; }
            set
            {
                caracteristica = value;
                base.PropertyChanged("Caracteristica");
            }
        }

        public int IdCaracteristica
        {
            get { return idCaracteristica; }
            set
            {
                idCaracteristica = value;
                base.PropertyChanged("IdCaracteristica");
            }
        }

        public string Tipo
        {
            get { return tipo; }
            set
            {
                tipo = value;
                base.PropertyChanged("Tipo");
            }
        }
        public int IdEntidad
        {
            get { return idEntidad; }
            set
            {
                idEntidad = value;
                base.PropertyChanged("IdEntidad");
            }
        }

        public int IdTipoEntidad
        {
            get { return idTipoEntidad; }
            set
            {
                idTipoEntidad = value;
                base.PropertyChanged("IdTipoEntidad");
            }
        }

        public int? IdTipoUbicacion
        {
            get { return idTipoUbicacion; }
            set
            {
                idTipoUbicacion = value;
                base.PropertyChanged("IdTipoUbicacion");
            }
        }

        public decimal Importe
        {
            get { return importe; }
            set
            {
                importe = value;
                base.PropertyChanged("Importe");
            }
        }
        public decimal? ImporteCaracteristica
        {
            get { return importeCaracteristica; }
            set
            {
                importeCaracteristica = value;
                base.PropertyChanged("ImporteCaracteristica");
            }
        }
        public mk.Interfaces.IItemGeneral TipoEntidad
        {
            get { return tipoEntidad; }
            set
            {
                tipoEntidad = value;
                base.PropertyChanged("TipoEntidad");
            }
        }

        public mk.Interfaces.IItemGeneral TipoUbicacion
        {
            get { return tipoUbicacion; }
            set
            {
                tipoUbicacion = value;
                base.PropertyChanged("TipoUbicacion");
            }
        }

        public bool VentaOpcional
        {
            get { return ventaOpcional; }
            set
            {
                ventaOpcional = value;
                base.PropertyChanged("VentaOpcional");
            }
        }

        public string TipoClave
        {
            get { return tipoClave; }
            set
            {
                tipoClave = value;
                base.PropertyChanged("TipoClave");
            }
        }
    }
}