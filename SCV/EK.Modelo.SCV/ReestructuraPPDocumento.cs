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
    public class ReestructuraPPDocumento
          : mkontrol.BaseKontrol, IReestructuraPPDocumento
    {
        private IDocumentoPago documento;
        private decimal pagado;
        private int versionPP;
        public IDocumentoPago Documento
        {
            get
            {
                return this.documento;
            }

            set
            {
                this.documento = value;
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
