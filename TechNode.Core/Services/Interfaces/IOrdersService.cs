﻿using Stripe;
using TechNode.Core.Common;
using TechNode.Core.DTOs.OrderDtos;
using TechNode.Core.DTOs.OrderDtos.AdminOrdersSection;

namespace TechNode.Core.Services.Interfaces;

public interface IOrdersService
{
    Task<int> AddOrderAsync(OrderCreateDto orderCreateDto, string userEmail);

    Task<OrderDto> GetOrderByIdAsync(int orderId, string userEmail);

    Task<IEnumerable<OrderDto>> GetOrdersAsync(string userEmail);

    public Task<OrderDto> UpdateOrderStatus(PaymentIntent intent);

    Task<PageResult<OrderDto>> GetAllOrdersAsync(AdminOrdersGetRequest request);
}