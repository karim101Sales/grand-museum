using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using the_grand_egyptian_museum.Models;

namespace the_grand_egyptian_museum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  
    public class ValuesController : ControllerBase
    {
        private readonly Storecontext _context;

        public ValuesController(Storecontext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Cards>> getCards()
        {
            return _context.Cards.ToList();
        }
        [HttpPost]
        public IActionResult postCards([FromBody] Cards cards)
        {
            var Cards =  _context.Cards.Add(cards);
            _context.SaveChanges();
            return Ok("added succsesfully");
        }
        [HttpDelete]
        public IActionResult deleteCards(int id)
        {
            var card = _context.Cards.FirstOrDefault(c=> c.Id == id);
            if (card == null)
                return NotFound();
            _context.Cards.Remove(card);
            _context.SaveChanges();
            return Ok("deleted successfully");
        }
    }
}
