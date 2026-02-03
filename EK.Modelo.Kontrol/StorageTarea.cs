using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class StorageTarea : BaseKontrol, IStorageTarea
    {
        private int tareaInstanciaId;
        private string descripcionTareaInstancia;
        private int tareaId;
        private string descripcionTarea;
        private int idStatus;
        private string nombreStatus;
        private string comentarios;
        private DateTime? fechaAprobacion;
        private DateTime? fechaAsignacion;
        private DateTime? fechaVigencia;
        private int? aprobadoPor;
        private int orden;
        private string estadoStr;
        private string tipo;

        public StorageTarea(): base()
        {
            }

        public int TareaInstanciaId
        {
            get { return this.tareaInstanciaId; }
            set { this.tareaInstanciaId = value; }
        }
        public string DescripcionTareaInstancia
        {
            get { return this.descripcionTareaInstancia; }
            set { this.descripcionTareaInstancia = value; }
        }
        public int TareaId
        {
            get { return this.tareaId; }
            set { this.tareaId = value; }
        }
        public string DescripcionTarea
        {
            get { return this.descripcionTarea; }
            set { this.descripcionTarea = value; }
        }
        public int IdStatus
        {
            get { return this.idStatus; }
            set { this.idStatus = value; }
        }
        public string NombreStatus
        {
            get { return this.nombreStatus; }
            set { this.nombreStatus = value; }
        }
        public string Comentarios
        {
            get { return this.comentarios; }
            set { this.comentarios = value; }
        }
        public DateTime? FechaAprobacion
        {
            get { return this.fechaAprobacion; }
            set { this.fechaAprobacion = value; }
        }
        public DateTime? FechaAsignacion
        {
            get { return this.fechaAsignacion; }
            set { this.fechaAsignacion = value; }
        }
        public DateTime? FechaVigencia
        {
            get { return this.fechaVigencia; }
            set { this.fechaVigencia = value; }
        }
        public int? AprobadoPor
        {
            get { return this.aprobadoPor; }
            set { this.aprobadoPor = value; }
        }
        public int Orden
        {
            get { return this.orden; }
            set { this.orden = value; }
        }
        public string EstadoStr
        {
            get { return this.estadoStr; }
            set { this.estadoStr = value; }
        }
        public string Tipo
        {
            get { return this.tipo; }
            set { this.tipo = value; }
        }
    }
}
