using System;
using SimpleInjector;

namespace EK.Modelo.Kontrol
{
    public class ContainerFactory
        : EK.Modelo.Kontrol.Interfaces.IContainerFactory
    {
        private Container container;
        private object cm;

        public ContainerFactory(Container container) {
            this.container = container;
        }

        public object GetInstance(Type type)
        {
            return this.container.GetInstance(type);
        }

        public T GetInstance<T>() where T: class
        {
            var type = typeof(T);
            T retValue;

            if (type.Name == "CommandManager")
            {
                if (this.cm == null)
                {
                    dynamic tcm = this.container.GetInstance(type);
                    tcm.Factory = this;
                    //
                    this.cm = tcm;
                }

                retValue = (T) this.cm;
            }
            else {
                retValue = this.container.GetInstance<T>();
            }
            //
            return retValue;
        }
    }
}