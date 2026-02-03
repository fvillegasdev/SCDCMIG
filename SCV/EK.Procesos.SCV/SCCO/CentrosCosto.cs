using diSCO = EK.Datos.SCO.Interfaces;
using pKontrol = EK.Procesos.Kontrol;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using System;

namespace EK.Procesos.SCO
{
    public partial class CentrosCosto 
        : pKontrol.ProcesoBase, Interfaces.ICentrosCosto
    {
        private diSCO.ICentroCosto dao;

        public CentrosCosto(miKontrol.IContainerFactory factory, diSCO.ICentroCosto dao)
             : base(factory)
        {
            this.factory = factory;
            this.dao = dao;
        }

        public object[] GetAll(int activos)
        {
            int idUser = base.getUserId();

            return this.dao.GetAll(activos, idUser);
        }
    }
}