using System;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IContainerFactory
    {
        object GetInstance(Type type);
        T GetInstance<T>() where T : class;
    }
}