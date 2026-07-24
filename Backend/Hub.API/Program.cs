using Hub.Application.Interfaces;
using Hub.Application.Services;
using Hub.Infrastructure.Persistance.Data;
using Hub.Infrastructure.Persistance.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUniversityRepository, UniversityRepository>();
builder.Services.AddScoped<IClubRepository, ClubRepository>();
builder.Services.AddScoped<IMembershipRepository, MembershipRepository>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<IUniversityService, UniversityService>();
builder.Services.AddScoped<UniversityService>();
builder.Services.AddScoped<IClubService, ClubService>();
builder.Services.AddScoped<ClubService>();
builder.Services.AddScoped<IMembershipService, MembershipService>();
builder.Services.AddScoped<MembershipService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Hub API");
    });
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
