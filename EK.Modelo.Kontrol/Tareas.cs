//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Tareas: Dictionary<int, ITarea>, ITareas
//    {
//        public Tareas()
//        {

//        }

//        public ITarea[] GetTareasByFlujo(int FlujoId)
//        {
//            ITarea[] result = base.Values.Where(p => p.FlujoId == FlujoId).ToArray();
//            return result;
//        }

//        public ITarea GetTarea(int TareaId)
//        {
//            ITarea result = base[TareaId];
//            return result;
//        }
//    }
//}
