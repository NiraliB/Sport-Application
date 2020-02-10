using SportsApp.Model;
using System;

namespace SportsApp.Repository.Login
{
    public interface ILoginRepository : IDisposable
    {
        UserEntry LoginUser(string userName, string passWord);

    }
}
