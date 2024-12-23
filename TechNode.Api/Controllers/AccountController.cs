using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TechNode.Api.Extensions;
using TechNode.Core.DTOs.IdentityDtos;
using TechNode.Core.Entities;
using TechNode.Core.Extensions;

namespace TechNode.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        var appUser = new AppUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName
        };

        var registerResult = await signInManager.UserManager.CreateAsync(appUser, registerDto.Password);

        if (!registerResult.Succeeded)
        {
            foreach (var error in registerResult.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        return Ok();
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }
    
    [Authorize]
    [HttpGet("user-info")]
    public async Task<IActionResult> GetUserInfo()
    {
        var user = await signInManager.UserManager.GetUserByEmailWithAddressAsync(User);

        if (user == null) return Unauthorized();

        return Ok(new
        {
            user.FirstName,
            user.LastName,
            user.Email,
            UserAddress = user.Address?.ToDto(),
            Roles = User.FindFirstValue(ClaimTypes.Role)
        });
    }

    [Authorize]
    [HttpPost("user-address")]
    public async Task<IActionResult> UpdateUserAddress([FromBody] AddressDto addressDto)
    {
        var user = await signInManager.UserManager.GetUserByEmailWithAddressAsync(User);

        if (user == null) return Unauthorized();

        if (user.Address == null)
            user.Address = addressDto.ToEntity();
        else
            user.Address.UpdateEntity(addressDto);

        var result = await signInManager.UserManager.UpdateAsync(user);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok(user.Address.ToDto());
    }
}