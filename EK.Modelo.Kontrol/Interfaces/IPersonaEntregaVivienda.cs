
namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("PersonaEntregaVivienda")]
    public interface IPersonaEntregaVivienda
        : IBaseKontrol
    {
        [EK.Modelo.Kontrol.Column()]
        new string ID { get; set; }
    }

}
