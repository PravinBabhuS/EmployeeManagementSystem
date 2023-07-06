using EMSAPI.Data;
using EMSAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMSAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly EMSDbContext _EMSDbContext;
        public EmployeesController(EMSDbContext EMSDbContext)
        {
            _EMSDbContext = EMSDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
           var employees= await _EMSDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee = await _EMSDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee == null) { return NotFound(); }
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            employee.Id= Guid.NewGuid();
            await _EMSDbContext.Employees.AddAsync(employee);
            await _EMSDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> updateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest)
        {
            var employee = await _EMSDbContext.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); };
            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Department = updateEmployeeRequest.Department;

            await _EMSDbContext.SaveChangesAsync();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteEmployee([FromRoute] Guid id)
        {
            var employee = await _EMSDbContext.Employees.FindAsync(id);
            if (employee == null) { return NotFound(); }
            _EMSDbContext.Employees.Remove(employee);
            _EMSDbContext.SaveChanges();
            return Ok(employee);
        }
    }
}
