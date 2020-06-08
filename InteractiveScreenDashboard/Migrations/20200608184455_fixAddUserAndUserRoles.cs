using Microsoft.EntityFrameworkCore.Migrations;

namespace InteractiveScreenDashboard.Migrations
{
    public partial class fixAddUserAndUserRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userName",
                table: "UserAccounts",
                newName: "UserName");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "UserAccounts",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "UserAccounts",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "companyId",
                table: "UserAccounts",
                newName: "CompanyId");

            migrationBuilder.RenameColumn(
                name: "accountTypeId",
                table: "UserAccounts",
                newName: "AccountTypeId");

            migrationBuilder.CreateTable(
                name: "User_Roles",
                columns: table => new
                {
                    User_role_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Roles", x => x.User_role_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    First_name = table.Column<string>(nullable: true),
                    Last_name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    User_role_id1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_id);
                    table.ForeignKey(
                        name: "FK_Users_User_Roles_User_role_id1",
                        column: x => x.User_role_id1,
                        principalTable: "User_Roles",
                        principalColumn: "User_role_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "User_Roles",
                columns: new[] { "User_role_id", "Name" },
                values: new object[] { 1, "SuperUser" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "User_id", "Email", "First_name", "Last_name", "Password", "User_role_id1" },
                values: new object[] { 1, "yshaar@routesme.com", "Yahya", "A", "Tester@123", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_role_id1",
                table: "Users",
                column: "User_role_id1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "User_Roles");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "UserAccounts",
                newName: "userName");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "UserAccounts",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "UserAccounts",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "UserAccounts",
                newName: "companyId");

            migrationBuilder.RenameColumn(
                name: "AccountTypeId",
                table: "UserAccounts",
                newName: "accountTypeId");
        }
    }
}
