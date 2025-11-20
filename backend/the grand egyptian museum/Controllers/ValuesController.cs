using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<List<Cards>>> getCards()
        {
            return await _context.Cards.ToListAsync();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> postCards([FromBody] Cards cards)
        {
            if (cards.Id == 0)
            {
                _context.Cards.Add(cards);
            }
            else
            {
                var existingCard = await _context.Cards.FindAsync(cards.Id);
                if (existingCard == null)
                {
                    return NotFound();
                }

                existingCard.Title = cards.Title;
                existingCard.Description = cards.Description;
                existingCard.Era = cards.Era;
                existingCard.Location = cards.Location;
                existingCard.Discoverd = cards.Discoverd;
                existingCard.KeyFeatures = cards.KeyFeatures;
                existingCard.Image = cards.Image;
            }

            await _context.SaveChangesAsync();
            return Ok(cards);
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> deleteCards(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
                return NotFound();
            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();
            return Ok("deleted successfully");
        }
    }
}
