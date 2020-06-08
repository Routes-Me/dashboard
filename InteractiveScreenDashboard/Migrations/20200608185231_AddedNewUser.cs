using Microsoft.EntityFrameworkCore.Migrations;

namespace InteractiveScreenDashboard.Migrations
{
    public partial class AddedNewUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User_id", "Email", "First_name", "Last_name", "Password", "User_role_id1" },
                values: new object[] { 2, "vtharaka@routesme.com", "Vivian", "George", "Tester@123", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "User_id",
                keyValue: 2);
        }
    }
}
