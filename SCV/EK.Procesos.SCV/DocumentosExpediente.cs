using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;

namespace EK.Procesos.SCV
{
    public class DocumentosExpediente
        : p.Kontrol.BPBase<m.SCV.Interfaces.IDocumentoExpediente,
            d.SCV.Interfaces.IDocumentosExpediente>,
        p.SCV.Interfaces.IDocumentosExpediente
    {
        public DocumentosExpediente(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IDocumentosExpediente dao)
            : base(factory, dao, "documentosExpediente")
        {
        }
        
        public override Task<m.SCV.Interfaces.IDocumentoExpediente> Save(m.SCV.Interfaces.IDocumentoExpediente item)
        {
            var tipoDocumento = item.TipoDocumento;
            if (tipoDocumento != null)
            {
                if (tipoDocumento.Clave == "FORMATO")
                {
                    item.IdPlantilla = null;
                    item.Plantilla = null;
                }
            }

            return base.Save(item);
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.ID = obj.ID;
            entity.Clave = obj.Clave;
            entity.Nombre = obj.Nombre;
            entity.NumeroCopias = obj.NumeroCopias;

            if (obj.TipoDocumento != null)
            {
                entity.IdTipoDocumento = obj.TipoDocumento.ID;
                entity.IdTipoDocumentoClave = obj.TipoDocumento.Clave;
                entity.IdTipoDocumentoNombre = obj.TipoDocumento.Nombre;
            }

            if (obj.Plantilla != null)
            {
                entity.IdPlantilla = obj.Plantilla.ID;
                entity.IdPlantillaClave = obj.Plantilla.Clave;
                entity.IdPlantillaNombre = obj.Plantilla.Nombre;
            }
        }
    }
}