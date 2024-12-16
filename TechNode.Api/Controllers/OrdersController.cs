using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechNode.Api.Extensions;
using TechNode.Core.DTOs.OrderDtos;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController(IOrdersService ordersService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto orderCreateRequest)
    {
        string? userEmail = User.GetEmail();

        if (userEmail == null)
            return BadRequest("Current user has no email");
        
        int orderId = await ordersService.AddOrderAsync(orderCreateRequest, userEmail);
        
        return CreatedAtAction(nameof(GetOrderById), new { id = orderId }, new { orderId });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetOrderById([FromRoute] int id)
    {
        string? userEmail = User.GetEmail();
        
        if (userEmail == null)
            return BadRequest("Current user has no email");

        var order = await ordersService.GetOrderByIdAsync(id, userEmail);

        return Ok(order);
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        string? userEmail = User.GetEmail();
        
        if (userEmail == null)
            return BadRequest("Current user has no email");
        
        var orders = await ordersService.GetOrdersAsync(userEmail);

        return Ok(orders);
    }
}