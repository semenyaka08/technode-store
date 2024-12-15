using System.ComponentModel.DataAnnotations;
using TechNode.Core.Entities.OrderAggregate;

namespace TechNode.Core.DTOs.OrderDtos;

public class OrderCreateDto
{
    [Required] 
    public string CartId { get; set; } = string.Empty;

    [Required]
    public int DeliveryMethodId { get; set; }
    
    [Required]
    public PaymentSummary PaymentSummary { get; set; } = null!;
    
    [Required]
    public ShippingAddress ShippingAddress { get; set; } = null!;
}