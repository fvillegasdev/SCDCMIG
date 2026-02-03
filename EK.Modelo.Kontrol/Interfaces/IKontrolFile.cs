namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IKontrolFile : IBaseKontrol
    {
        int EntityId { get; set; }
        string EntityType { get; set; }
        string Modulo { get; set; }
        string Uid { get; set; }
        string FilePath { get; set; }
        long? FileSize { get; set; }
        string FileType { get; set; }
        string FileExtension { get; set; }
        string Tipo { get; set; }
        long? FileVersion { get; set; }

        string Clave { get; set; }
        string ClavePlantilla { get; set; }

        int? IdTEOrigen { get; set; }
        int? IdTipoEntidad { get; set; }
        int? IdCategoria { get; set; }


        ITipoEntidad TipoEntidad { get; set; }

        ICategoria Categoria { get; set; }


    }
}