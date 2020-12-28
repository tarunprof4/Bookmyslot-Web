namespace BookMySlot.Web.Services.Bookmyslot.Api.Client.Models
{
    public class CustomerModel
    {
        [Newtonsoft.Json.JsonProperty("firstName", Required = Newtonsoft.Json.Required.Always)]
        public string FirstName { get; set; }

        [Newtonsoft.Json.JsonProperty("middleName", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string MiddleName { get; set; }

        [Newtonsoft.Json.JsonProperty("lastName", Required = Newtonsoft.Json.Required.Always)]
        public string LastName { get; set; }

        [Newtonsoft.Json.JsonProperty("gender", Required = Newtonsoft.Json.Required.Always)]
        public string Gender { get; set; }

        [Newtonsoft.Json.JsonProperty("email", Required = Newtonsoft.Json.Required.Always)]
        public string Email { get; set; }
    }
}
