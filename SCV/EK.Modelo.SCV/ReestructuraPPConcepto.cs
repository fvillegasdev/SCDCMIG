using EK.Modelo.SCV.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mkontrol = EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.SCV
{
    public class ReestructuraPPConcepto
        : mkontrol.BaseKontrol, IReestructuraPPConcepto
    {
        private IVentaPPConcepto concepto;
        private decimal pagado;
        private int versionPP;
        private int idPlanVenta;
        public IVentaPPConcepto Concepto
        {
            get
            {
                return this.concepto;
            }

            set
            {
               this.concepto = value;
            }
        }

        public int IdPlanVenta
        {
            get
            {
               return idPlanVenta;
            }

            set
            {
                this.idPlanVenta = value;
            }
        }

        public decimal Pagado
        {
            get
            {
                return this.pagado;
            }

            set
            {
                this.pagado = value;
            }
        }

        public int VersionPP
        {
            get
            {
                return this.versionPP;
            }

            set
            {
                this.versionPP = value;
            }
        }
    }
}

