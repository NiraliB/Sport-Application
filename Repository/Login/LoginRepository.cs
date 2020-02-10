using Dapper;
using Microsoft.Extensions.Configuration;
using SportsApp.Model;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SportsApp.Repository.Login
{
    public class LoginRepository : ILoginRepository
    {
        private readonly IConfiguration _config;
        public LoginRepository(IConfiguration config)
        {
            _config = config;
        }
        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("SportsAppContext"));
            }
        }

        public UserEntry LoginUser(string userName, string passWord)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                var getUserData = conn.QueryFirstOrDefault<UserEntry>("GetLoginUser", new { UserName = userName, Password = passWord }, commandType: CommandType.StoredProcedure);
                return getUserData;
            }
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Connection.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


    }
}
