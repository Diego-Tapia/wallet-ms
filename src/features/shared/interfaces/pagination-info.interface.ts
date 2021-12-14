import { ApiProperty } from "@nestjs/swagger";

export class IPaginationInfo {
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  offset: number;
}
