using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using the_grand_egyptian_museum.Models;

namespace the_grand_egyptian_museum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Storecontext _context;

        public AuthController(Storecontext context)
        {
            _context  = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == loginDto.Username && u.Password == loginDto.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            return Ok(new { message = "Login successful!" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var exists = await _context.Users.AnyAsync(u => u.UserName == registerDto.Name);
            if (exists)
                return BadRequest(new { message = "Username already taken" });

            var user = new User
            {
                UserName = registerDto.UserName,
                Password = registerDto.Password,
                Email = registerDto.Email,
                Name = registerDto.Name,
                Role = registerDto.Role,
                
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        [HttpGet]
        public ActionResult<List<User>> getUsers()
        {
           return _context.Users.ToList();
        }


    }

    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

public class RegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }

    }

}
