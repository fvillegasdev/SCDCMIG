using System;
using EK.Modelo.SCV.Interfaces;
using mkontrol = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class InstitucionEsquema 
        : mkontrol.BaseKontrol, IInstitucionEsquema
    {
        private int idInstitucion;
        private IInstitucion institucion;
        private int idEsquema;
        private IEsquema esquema;

        public IEsquema Esquema
        {
            get { return esquema; }
            set
            {
                esquema = value;
                base.PropertyChanged("Esquema");
            }
        }

        public int IdEsquema
        {
            get { return idEsquema; }
            set
            {
                idEsquema = value;
                base.PropertyChanged("IdEsquema");
            }
        }

        public int IdInstitucion
        {
            get { return idInstitucion; }
            set
            {
                idInstitucion = value;
                base.PropertyChanged("IdInstitucion");
            }
        }

        public IInstitucion Institucion
        {
            get { return institucion; }
            set
            {
                institucion = value;
                base.PropertyChanged("Institucion");
            }
        }
    }
}
