#if ENK
namespace EK.Procesos.Kontrol.Interfaces
{
    public partial interface ICompania
    {
        object[] GetAll(int idcliente, int activos = 0, int todos= 0);
    }
}
#endif