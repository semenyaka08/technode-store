namespace TechNode.Core.Entities;

public class ShoppingCart
{
    public required string Id { get; set; }

    public ICollection<CartItem> CartItems { get; set; } = [];

    public int? DeliveryMethodId { get; set; }

    public string? ClientSecret { get; set; }

    public string? PaymentIntendId { get; set; }
}