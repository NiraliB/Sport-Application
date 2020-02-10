using Microsoft.AspNetCore.Mvc;
using SportsApp.Repository.CooperTestDetail;
using SportsApp.ViewModels;
using System;
using System.Threading.Tasks;

namespace SportsApp.Controllers
{
    [Route("api/CooperTest")]
    [ApiController]
    public class CooperTestController : ControllerBase
    {
        public ICooperTestRepository _CooperRepo;

        public CooperTestController(ICooperTestRepository Cooper)
        {
            _CooperRepo = Cooper;
        }

        [HttpGet("GetAthleteDetailByTID")]
        public async Task<IActionResult> GetAthleteDetailByTID(int getTestId)
        {
            try
            {
                var GetData = await _CooperRepo.GetAthleteDetailByTestId(getTestId);
                return Ok(GetData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetAthleteNameList")]
        public async Task<IActionResult> GetAthleteNameList()
        {
            try
            {
                var getAthlete = await _CooperRepo.GetUserAsAthlete();
                return Ok(getAthlete);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("SaveAthleteData")]
        public IActionResult SaveAthleteData(MapCooperViewModel objMap)
        {
            try
            {
                int getMapId = _CooperRepo.SaveCooperTestDetails(objMap);
                return Ok(getMapId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpGet("GetEditAthleteDetails")]
        public async Task<ActionResult<MapCooperViewModel>> GetEditAthleteDetails(int mapId)
        {
            try
            {
                return await _CooperRepo.GetAthleteDetails(mapId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("DeleteAthleteByMapId")]
        public IActionResult DeleteAthleteByMapId(int mapId)
        {
            try
            {
                int getRowAff = _CooperRepo.DeleteAthleteFromTest(mapId);
                return Ok(getRowAff);
            }

            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}