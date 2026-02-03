using miKontrol = EK.Modelo.Kontrol.Interfaces;
using pKontrol = EK.Procesos.Kontrol;
using diSCP = EK.Datos.SCP.Interfaces;
using piSCP = EK.Procesos.SCP.Interfaces;
using piSBO = EK.Procesos.SBO.Interfaces;

namespace EK.Procesos.SCP
{
    public partial class PagosProgramados : pKontrol.ProcesoBase, piSCP.IPagosProgramados
    {
        private diSCP.IPagosProgramados dao;
        private piSBO.ICheques procSBO;

        public PagosProgramados(miKontrol.IContainerFactory factory, diSCP.IPagosProgramados dao, piSBO.ICheques procSBO)
             : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
            this.procSBO = procSBO;
        }
    }
}
