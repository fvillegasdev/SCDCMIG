#if ENK
namespace EK.Procesos.Kontrol
{
    public partial class Compania
    {
        public object[] GetAll(int idcliente, int activos = 0 , int todos = 0)
        {
            return this.dao.GetAll(idcliente, activos, todos );
        }
    }
}
#endif