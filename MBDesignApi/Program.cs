using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("MyAllowedOrigins",
//        policy =>
//        {
//            policy.WithOrigins("https://nqqcxgeafb.execute-api.ap-southeast-2.amazonaws.com/mbDesign-api-dev01") // note the port is included 
//                //.AllowAnyOrigin()
//                .AllowAnyHeader()
//                .AllowAnyMethod();
//        });
//});

//enable single domain
//multiple domain
//any domain

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors("corspolicy");
//app.UseCors("MyAllowedOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
