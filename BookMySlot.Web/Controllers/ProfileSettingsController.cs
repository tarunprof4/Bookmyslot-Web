using BookMySlot.Web.Common;
using BookMySlot.Web.Contracts.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookMySlot.Web
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileSettingsController : BaseApiController
    {
        private readonly IProfileSettingsBusiness profileSettingsBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomerController"/> class. 
        /// </summary>
        /// <param name="customerBusiness">customer Business</param>
        /// <param name="customerRepository">The customer repository</param>
        public ProfileSettingsController(IProfileSettingsBusiness profileSettingsBusiness)
        {
            this.profileSettingsBusiness = profileSettingsBusiness;
        }

        // GET: api/<ProfileSettingsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProfileSettingsController>/5
        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            Log.Information("Get Profile Settings "+ email);
            var profileSettingsResponse = await this.profileSettingsBusiness.GetProfileSettings(email);
            return this.CreateGetHttpResponse(profileSettingsResponse);
        }

        // POST api/<ProfileSettingsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProfileSettingsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProfileSettingsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
