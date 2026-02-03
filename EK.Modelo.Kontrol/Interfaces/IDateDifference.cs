namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IDateDifference : IBaseKontrol
    {
        int Year { get; set; }
        int Month { get; set; }
        int Days { get; set; }
    }
}