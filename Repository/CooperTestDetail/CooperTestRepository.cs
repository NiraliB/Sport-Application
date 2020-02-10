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

namespace SportsApp.Repository.CooperTestDetail
{
    public class CooperTestRepository : ICooperTestRepository
    {
        private readonly IConfiguration _config;
        public CooperTestRepository(IConfiguration config)
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

        public async Task<IEnumerable<MapCooperViewModel>> GetAthleteDetailByTestId(int getTestId)
        {
            using (IDbConnection icon = Connection)
            {
                icon.Open();
                var gerAthleteDetails = await icon.QueryAsync<MapCooperViewModel>("GetTestDetailsByTestId", new { TestId = getTestId }, commandType: CommandType.StoredProcedure);
                return gerAthleteDetails.ToList();
            }
        }

        public async Task<IEnumerable<UserEntry>> GetUserAsAthlete()
        {
            using (IDbConnection icon = Connection)
            {
                var getAthleteList = await icon.QueryAsync<UserEntry>("GetAllAthletesDDL", commandType: CommandType.StoredProcedure);
                return getAthleteList.ToList();
            }
        }

        public int SaveCooperTestDetails(MapCooperViewModel objMap)
        {

            using (IDbConnection icon = Connection)
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@TestId", objMap.TestId);
                param.Add("@UserId", objMap.UserId);
                param.Add("@Distance", objMap.Distance);
                param.Add("@Fitness", objMap.Fitness);

                icon.Open();
                int getMapId;
                if (objMap.MapId == 0)
                {
                    param.Add("@id", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    icon.Execute("InsertAthletes", param, commandType: CommandType.StoredProcedure);
                    getMapId = param.Get<int>("@id");
                }
                else
                {
                    param.Add("@MapId", objMap.MapId);
                    param.Add("@getMapId", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    icon.Execute("UpdateAthlete", param, commandType: CommandType.StoredProcedure);
                    getMapId = param.Get<int>("@getMapId");
                }
                return getMapId;
            }
        }

        public async Task<MapCooperViewModel> GetAthleteDetails(int mapId)
        {
            using (IDbConnection icon = Connection)
            {
                icon.Open();
                var getDataById = await icon.QueryFirstOrDefaultAsync<MapCooperViewModel>("GetAthleteDetailsByMapId", new { MapId = mapId }, commandType: CommandType.StoredProcedure);
                return getDataById;
            }

        }

        public int DeleteAthleteFromTest(int mapId)
        {
            using (IDbConnection icon = Connection)
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@MapId", mapId);
                icon.Open();
                int rowAffecred = icon.Execute("DeleteAthleteByMapId", param, commandType: CommandType.StoredProcedure);
                return rowAffecred;
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
