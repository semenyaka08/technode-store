namespace TechNode.Core.Entities;

public class ShoppingCart
{
    public required string Id { get; set; }

    public ICollection<CartItem> CartItems { get; set; } = [];
}