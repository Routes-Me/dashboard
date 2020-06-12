using Microsoft.EntityFrameworkCore.Migrations;

namespace InteractiveScreenDashboard.Migrations
{
    public partial class UpdatingColumnNameUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_User_Roles_User_role_id1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_User_role_id1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "User_role_id1",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "User_role_id",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User_id",
                keyValue: 1,
                column: "User_role_id",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User_id",
                keyValue: 2,
                column: "User_role_id",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_role_id",
                table: "Users",
                column: "User_role_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_User_Roles_User_role_id",
                table: "Users",
                column: "User_role_id",
                principalTable: "User_Roles",
                principalColumn: "User_role_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_User_Roles_User_role_id",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_User_role_id",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "User_role_id",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "User_role_id1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User_id",
                keyValue: 1,
                column: "User_role_id1",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "User_id",
                keyValue: 2,
                column: "User_role_id1",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_role_id1",
                table: "Users",
                column: "User_role_id1");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_User_Roles_User_role_id1",
                table: "Users",
                column: "User_role_id1",
                principalTable: "User_Roles",
                principalColumn: "User_role_id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
