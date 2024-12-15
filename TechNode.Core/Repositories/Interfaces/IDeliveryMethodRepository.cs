using TechNode.Core.Entities;

namespace TechNode.Core.Repositories.Interfaces;

public interface IDeliveryMethodRepository
{
    Task<DeliveryMethod?> GetDeliveryMethodByIdAsync(int id);

    Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync();
}