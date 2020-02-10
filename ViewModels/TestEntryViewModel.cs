using System;

namespace SportsApp.ViewModels
{
    public class TestEntryViewModel
    {
        public int TestId { get; set; }
        public DateTime TestDate { get; set; }
        public int NoOfCandidate { get; set; }
        public int TestTypeId { get; set; }
        public string TypeName { get; set; }
        public int id { get; set; }
        //public int recordsFiltered { get; set;}
        //public int recordsTotal { get; set; }
    }
}
