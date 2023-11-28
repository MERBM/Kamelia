using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Services
{
    public class UserService
{
    private readonly MyDBContext _context;

    public UserService(MyDBContext context)
    {
        _context = context;
    }

    // Sign up a new user
    public bool SignUp(User newUser)
    {
        var existingUser = _context.users.Any(u => u.Email == newUser.Email);
        if (existingUser)
        {
            // User already exists
            return false;
        }

        // Here, you should hash the password before saving
        newUser.PasswordHash = HashPassword(newUser.PasswordHash);

        _context.users.Add(newUser);
        _context.SaveChanges();
        return true;
    }

    // Login a user
    public User Login(string email, string password)
    {
        var user = _context.users.FirstOrDefault(u => u.Email == email);
        if (user != null && VerifyPassword(password, user.PasswordHash))
        {
            // Authentication successful
            return user;
        }

        // Authentication failed
        return null;
    }

    private string HashPassword(string password)
    {
        // Implement password hashing
        return password; // Placeholder: replace with real hashing
    }

    private bool VerifyPassword(string enteredPassword, string storedHash)
    {
        // Implement password verification
        return enteredPassword == storedHash; // Placeholder: replace with real verification
    }
}

}