using SportsApp.Model;
using SportsApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SportsApp.Repository.NewTestEntry
{
    public interface ITestEntryRepository : IDisposable
    {
        Task<List<TestEntryViewModel>> GetListOfTestEntry();
        List<TestType> GetTestTypesList();
        int SaveTestEntryData(TestEntryViewModel objTestEntry);
        Task<TestEntryViewModel> GetTestEntryById(int TestId);

        int DeleteTestEntryByTestId(int TestId);


    }
}
