using SportsApp.Model;
using SportsApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportsApp.Repository.CooperTestDetail
{
    public interface ICooperTestRepository : IDisposable
    {
        Task<IEnumerable<MapCooperViewModel>> GetAthleteDetailByTestId(int getTestId);
        Task<IEnumerable<UserEntry>> GetUserAsAthlete();
        int SaveCooperTestDetails(MapCooperViewModel objMap);
        Task<MapCooperViewModel> GetAthleteDetails(int mapId);
        int DeleteAthleteFromTest(int mapId);

    }
}
