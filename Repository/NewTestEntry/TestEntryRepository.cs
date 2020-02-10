using Dapper;
using Microsoft.Extensions.Configuration;
using SportsApp.Model;
using SportsApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SportsApp.Repository.NewTestEntry
{
    public class TestEntryRepository : ITestEntryRepository
    {
        private readonly IConfiguration _config;
        public TestEntryRepository(IConfiguration config)
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

        public async Task<List<TestEntryViewModel>> GetListOfTestEntry()
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                var result = await conn.QueryAsync<TestEntryViewModel>("GetAllEntryWithType", commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
        }
        public List<TestType> GetTestTypesList()
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                var getType = conn.Query<TestType>("Select * from TestType").ToList();
                return getType;
            }
        }

        public int SaveTestEntryData(TestEntryViewModel objTestEntry)
        {

            using (IDbConnection conn = Connection)
            {
                DynamicParameters ObjParm = new DynamicParameters();
                ObjParm.Add("@TestDate", objTestEntry.TestDate);
                ObjParm.Add("@TestTypeId", objTestEntry.TestTypeId);

                conn.Open();
                int getId;
                if (objTestEntry.TestId == 0)
                {
                    ObjParm.Add("@id", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    conn.Execute("InsertTestEntryData", ObjParm, commandType: CommandType.StoredProcedure);
                    getId = ObjParm.Get<int>("@id");
                }
                else
                {
                    ObjParm.Add("@TestId", objTestEntry.TestId);
                    ObjParm.Add("@getTestId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    conn.Execute("UpdateTestEntry", ObjParm, commandType: CommandType.StoredProcedure);
                    getId = ObjParm.Get<int>("@getTestId");
                }
                return getId;
            }
        }

        public async Task<TestEntryViewModel> GetTestEntryById(int testId)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                var getDataById = await conn.QueryFirstOrDefaultAsync<TestEntryViewModel>("TestEntryDataById", new { TestId = testId }, commandType: CommandType.StoredProcedure);
                return getDataById;
            }

        }

        public int DeleteTestEntryByTestId(int TestId)
        {
            using (IDbConnection conn = Connection)
            {
                DynamicParameters ObjParm = new DynamicParameters();
                ObjParm.Add("@TestId", TestId);
                conn.Open();
                int getAffRow = conn.Execute("DeleteTestEntryById", ObjParm, commandType: CommandType.StoredProcedure);
                return getAffRow;
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
