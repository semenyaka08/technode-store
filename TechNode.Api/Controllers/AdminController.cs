using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;
using TechNode.Core.Services.Interfaces;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController(IOrdersService ordersService) : ControllerBase
{
    [HttpGet("orders")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetOrders([FromQuery] AdminOrdersGetRequest request)
    {
        var orders = await ordersService.GetAllOrdersAsync(request);
        
        return Ok(orders);
    }
}