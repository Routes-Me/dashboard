using Microsoft.EntityFrameworkCore.Migrations;

namespace InteractiveScreenDashboard.Migrations
{
    public partial class SeedUserAccountTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserAccounts",
                columns: new[] { "accountTypeId", "companyId", "name", "password", "userName", "id" },
                values: new object[] {  1, 0, "Vivian", "Tester@123", "vtharaka@routesme.com",1 });

            migrationBuilder.InsertData(
                table: "UserAccounts",
                columns: new[] { "accountTypeId", "companyId", "name", "password", "userName", "id" },
                values: new object[] { 2, 0, "Yahya", "Tester@123", "yshaar@routesme.com",2});
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserAccounts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserAccounts",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
