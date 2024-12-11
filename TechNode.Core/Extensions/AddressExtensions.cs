using TechNode.Core.DTOs.IdentityDtos;
using TechNode.Core.Entities;

namespace TechNode.Core.Extensions;

public static class AddressExtensions
{
    public static Address ToEntity(this AddressDto addressDto)
    {
        return new Address
        {
            Line1 = addressDto.Line1,
            Line2 = addressDto.Line2,
            City = addressDto.City,
            State = addressDto.State,
            PostalCode = addressDto.PostalCode,
            Country = addressDto.Country
        };
    }

    public static void UpdateEntity(this Address address, AddressDto addressDto)
    {
        address.Line1 = addressDto.Line1;
        address.Line2 = addressDto.Line2;
        address.City = addressDto.City;
        address.State = addressDto.State;
        address.PostalCode = addressDto.PostalCode;
        address.Country = addressDto.Country;
    }
    
    public static AddressDto ToDto(this Address address)
    {
        return new AddressDto
        {
            Line1 = address.Line1,
            Line2 = address.Line2,
            City = address.City,
            State = address.State,
            PostalCode = address.PostalCode,
            Country = address.Country
        };
    }
}