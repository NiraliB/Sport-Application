using Microsoft.AspNetCore.Mvc;
using SportsApp.Model;
using SportsApp.Repository.Login;
using System;

namespace SportsApp.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        public ILoginRepository _loginService;

        public LoginController(ILoginRepository _login)
        {
            _loginService = _login;
        }

        [HttpPost("GetUserLogin")]
        public IActionResult GetUserLogin(UserEntry objUser)
        {
            try
            {
                if (objUser != null)
                {
                    var getLoginRes = _loginService.LoginUser(objUser.UserName, objUser.Password);
                    return Ok(getLoginRes);
                }
                else
                {
                    return StatusCode(500, "Invalid Username and Password");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}