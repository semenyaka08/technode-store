using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TechNode.Core.Entities;

namespace TechNode.Api.Extensions;

public static class ClaimPrincipleExtensions
{
    public static async Task<AppUser?> GetUserByEmailAsync(this UserManager<AppUser> userManager, ClaimsPrincipal claimsPrincipal)
    {
        return await userManager.Users.FirstOrDefaultAsync(z=>z.Email == claimsPrincipal.GetEmail());
    }

    private static string? GetEmail(this ClaimsPrincipal claimsPrincipal)
    {
        return claimsPrincipal.FindFirstValue(ClaimTypes.Email);
    }
    
    public static async Task<AppUser?> GetUserByEmailWithAddressAsync(this UserManager<AppUser> userManager, ClaimsPrincipal claimsPrincipal)
    {
        return await userManager.Users.Include(z=>z.Address).FirstOrDefaultAsync(z=>z.Email == claimsPrincipal.GetEmail());
    }
}