using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bytekontrol.BK_Warez.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddArchivedState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Archived",
                table: "Devices",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Archived",
                table: "Devices");
        }
    }
}
