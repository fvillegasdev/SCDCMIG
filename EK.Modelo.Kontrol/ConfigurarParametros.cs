using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class ConfigurarParametros 
        : BaseKontrolCompania, IConfigurarParametros
    {
        private IParametro parametro;

        public IParametro Parametro
        {
            get { return parametro; }
            set { parametro = value; }
        }

        private int? idParametro;

        public int? IdParametro
        {
            get { return idParametro; }
            set { idParametro = value; }
        }

        private IDominios cliente;

        public IDominios Cliente
        {
            get { return cliente; }
            set { cliente = value; }
        }

        private int? idCliente;

        public int? IdCliente
        {
            get { return idCliente; }
            set { idCliente = value; }
        }

        private string valor;

        public string Valor
        {
            get { return valor; }
            set { valor = value; }
        }
    }
}