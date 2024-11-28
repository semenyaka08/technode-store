﻿namespace TechNode.Core.DTOs.ProductsDtos;

public class ProductAddRequest
{
    public required string Name { get; set; }

    public required string Description { get; set; }

    public decimal Price { get; set; }

    public required string PictureUrl { get; set; }

    public required string Brand { get; set; }

    public int StockQuantity { get; set; }
    
    public required int CategoryId { get; set; }

    public Dictionary<string, string>? Specifications { get; set; }

}