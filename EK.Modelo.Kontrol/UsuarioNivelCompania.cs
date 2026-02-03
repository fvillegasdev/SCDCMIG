using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class UsuarioNivelCompania 
        : BaseKontrolCompania, IUsuarioNivelCompania
    {
        private int idUsuario;

        public int IdUsuario
        {
            get
            {
                return this.idUsuario;
            }

            set
            {
                this.idUsuario = value;
                base.PropertyChanged("IdUsuario");
            }
        }

        private IUsuario usuario;

        public IUsuario Usuario
        {
            get
            {
                return this.usuario;
            }

            set
            {
                this.usuario = value;
                base.PropertyChanged("Usuario");
            }
        }

        private int idNivel;

        public int IdNivel
        {
            get
            {
                return this.idNivel;
            }

            set
            {
                this.idNivel = value;
                base.PropertyChanged("IdNivel");
            }
        }

        private INivel nivel;

        public INivel Nivel
        {
            get
            {
                return this.nivel;
            }

            set
            {
                this.nivel = value;
                base.PropertyChanged("Nivel");
            }
        }
    }
}