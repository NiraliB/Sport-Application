using Microsoft.AspNetCore.Mvc;
using SportsApp.Repository.NewTestEntry;
using SportsApp.ViewModels;
using System;
using System.Threading.Tasks;

namespace SportsApp.Controllers
{
    [Route("api/NewTest")]
    [ApiController]
    public class NewTestController : ControllerBase
    {
        private readonly ITestEntryRepository _testRepo;

        public NewTestController(ITestEntryRepository newTestRepo)
        {
            _testRepo = newTestRepo;
        }

        [HttpGet("GetAllTestEntryData"), Produces("application/json")]
        public async Task<IActionResult> GetAllTestEntryData()
        {
            try
            {
                var getData = await _testRepo.GetListOfTestEntry();
                return Ok(getData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetAllTestTypesList")]
        public IActionResult GetAllTestTypesList()
        {
            try
            {
                var getTypeData = _testRepo.GetTestTypesList();
                return Ok(getTypeData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("SaveTestData")]
        public IActionResult SaveTestData(TestEntryViewModel objTest)
        {
            try
            {
                int getId = _testRepo.SaveTestEntryData(objTest);
                return Ok(getId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpGet("GetEditTestEntry")]
        public async Task<ActionResult<TestEntryViewModel>> GetEditTestEntry(int testId)
        {
            try
            {
                return await _testRepo.GetTestEntryById(testId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("DeleteTestEntryData")]
        public IActionResult DeleteTestEntryData(int testId)
        {
            try
            {
                int getDelRow = _testRepo.DeleteTestEntryByTestId(testId);
                return Ok(getDelRow);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}