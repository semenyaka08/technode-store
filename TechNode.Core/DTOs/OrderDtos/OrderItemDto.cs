namespace TechNode.Core.DTOs.OrderDtos;

public class OrderItemDto
{
    public int ProductId { get; set; }

    public required string ProductName { get; set; }

    public required string PictureUrl { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }
}