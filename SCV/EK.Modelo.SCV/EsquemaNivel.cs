using System;
using System.Collections.Generic;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class EsquemaNivel
        : mk.BaseKontrol, m.Interfaces.IEsquemaNivel
    {
        private int idEsquema;
        private int? orden;
        private List<m.Interfaces.IEsquemaEtapa> etapas;

        public List<m.Interfaces.IEsquemaEtapa> Etapas
        {
            get { return etapas; }
            set
            {
                etapas = value;
                base.PropertyChanged("Etapas");
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

        public int? Orden
        {
            get { return orden; }
            set
            {
                orden = value;
                base.PropertyChanged("Orden");
            }
        }
    }
}