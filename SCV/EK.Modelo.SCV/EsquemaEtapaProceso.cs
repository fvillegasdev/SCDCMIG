using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo.SCV;
using mk = EK.Modelo.Kontrol;

namespace EK.Modelo.SCV
{
    public class EsquemaEtapaProceso
         : mk.BaseKontrol, m.Interfaces.IEsquemaEtapaProceso
    {
        private m.Interfaces.IEtapa etapa;
        private int idEsquema;
        private int idEtapa;
        private int idProceso;
        private string configuracion;
        private m.Interfaces.IProceso proceso;

        public m.Interfaces.IEtapa Etapa
        {
            get { return etapa; }
            set
            {
                etapa = value;
                base.PropertyChanged("Etapa");
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

        public int IdEtapa
        {
            get { return idEtapa; }
            set
            {
                idEtapa = value;
                base.PropertyChanged("IdEtapa");
            }
        }

        public int IdProceso
        {
            get { return idProceso; }
            set
            {
                idProceso = value;
                base.PropertyChanged("IdProceso");
            }
        }

        public string Configuracion
        {
            get { return configuracion; }
            set
            {
                configuracion = value;
                base.PropertyChanged("Configuracion");
            }
        }

        public m.Interfaces.IProceso Proceso
        {
            get { return proceso; }
            set
            {
                proceso = value;
                base.PropertyChanged("Proceso");
            }
        }
    }
}