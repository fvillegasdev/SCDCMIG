using System;
using miSCO = EK.Modelo.SCO.Interfaces;
using mKontrol = EK.Modelo.Kontrol;

namespace EK.Modelo.SCO
{
    public class CentroCosto :
        mKontrol.BaseKontrol,
        miSCO.ICentroCosto
    {
        private string nombreCorto;

        public string NombreCorto
        {
            get { return nombreCorto; }
            set { nombreCorto = value; }
        }

        string descripcion;

        public string Descripcion
        {
            get { return descripcion; }
            set { descripcion = value; }
        }
    }
}